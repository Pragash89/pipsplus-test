import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await params;
    const session = await getServerSession();

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { sortOrder: "asc" },
          include: {
            lessons: {
              orderBy: { sortOrder: "asc" },
              select: {
                id: true,
                title: true,
                titleAr: true,
                titleEs: true,
                titleFr: true,
                type: true,
                duration: true,
                isFree: true,
                content: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // If user is authenticated, get their enrollment info
    let userEnrollment = null;
    let userProgress = null;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });

      if (user) {
        userEnrollment = await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: course.id,
            },
          },
        });

        if (userEnrollment) {
          // Get completed lessons (presence of LessonProgress record = completed)
          const completedLessons = await prisma.lessonProgress.findMany({
            where: {
              userId: user.id,
              lesson: {
                module: {
                  courseId: course.id,
                },
              },
            },
            select: { lessonId: true },
          });

          userProgress = {
            completedLessonCount: completedLessons.length,
            completedLessonIds: completedLessons.map((lp) => lp.lessonId),
          };
        }
      }
    }

    return NextResponse.json({
      data: {
        ...course,
        isEnrolled: !!userEnrollment,
        enrollment: userEnrollment,
        progress: userProgress,
      },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
