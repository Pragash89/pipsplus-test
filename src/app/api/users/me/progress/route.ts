import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    // Get enrollment stats
    const [
      enrollmentsData,
      completedLessonsCount,
      totalHoursLearned,
      certificates,
    ] = await Promise.all([
      prisma.enrollment.findMany({
        where: { userId: user.id },
        include: {
          course: {
            select: { totalDuration: true },
          },
        },
      }),
      prisma.lessonProgress.count({
        where: { userId: user.id },
      }),
      prisma.lessonProgress.findMany({
        where: { userId: user.id },
        include: {
          lesson: {
            select: { duration: true },
          },
        },
      }),
      prisma.certificate.findMany({
        where: { userId: user.id, status: "ISSUED" },
      }),
    ]);

    const coursesStarted = enrollmentsData.length;
    const coursesCompleted = certificates.length;
    const lessonsCompleted = completedLessonsCount;
    const totalHours = Math.round(
      totalHoursLearned.reduce((sum, lp) => sum + (lp.lesson.duration || 0), 0) / 60
    );

    return NextResponse.json({
      data: {
        coursesStarted,
        coursesCompleted,
        lessonsCompleted,
        totalHoursLearned: totalHours,
        currentStreak: 0, // TODO: Calculate from lastActivityDate
        nextMilestone: `Complete ${Math.ceil((lessonsCompleted + 1) / 25) * 25} lessons`,
      },
    });
  } catch (error) {
    console.error("Error fetching learning progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
