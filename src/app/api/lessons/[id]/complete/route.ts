import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: lessonId } = await params;
    const body = await request.json();
    const { enrollmentId } = body;

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get lesson
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, moduleId: true },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    // Get module to find course
    const module = await prisma.module.findUnique({
      where: { id: lesson.moduleId },
      select: { courseId: true },
    });

    if (!module) {
      return NextResponse.json(
        { error: "Module not found" },
        { status: 404 }
      );
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: module.courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    // Update lesson progress (presence of record = completed)
    const lessonProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
      update: {
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        lessonId: lessonId,
      },
    });

    // Calculate course progress
    const course = await prisma.course.findUnique({
      where: { id: module.courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    const totalLessons = course?.modules.reduce(
      (sum, m) => sum + m.lessons.length,
      0
    ) ?? 0;

    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId: user.id,
        lesson: {
          module: {
            courseId: module.courseId,
          },
        },
      },
    });

    const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    // Update enrollment progress
    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: module.courseId,
        },
      },
      data: {
        progressPct: Math.round(progress),
      },
    });

    // Check if course is complete (100% progress)
    if (progress === 100) {
      // Issue certificate
      await prisma.certificate.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: module.courseId,
          },
        },
        update: {
          issuedAt: new Date(),
          status: "ISSUED",
        },
        create: {
          userId: user.id,
          courseId: module.courseId,
          issuedAt: new Date(),
          status: "ISSUED",
        },
      });
    }

    return NextResponse.json(
      {
        data: lessonProgress,
        progress,
        message: "Lesson marked as complete",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
