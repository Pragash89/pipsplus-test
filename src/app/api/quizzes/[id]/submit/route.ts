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

    const { id: quizId } = await params;
    const body = await request.json();
    const { answers } = body; // answers: { questionId: optionId }

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

    // Get quiz with questions
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
        lesson: {
          include: {
            module: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Verify enrollment in course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: quiz.lesson.module.courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "Not enrolled in this course" },
        { status: 403 }
      );
    }

    // Calculate score (options stored as Json, correctOption is a String)
    let correctCount = 0;
    const detailedAnswers = quiz.questions.map((question) => {
      const selectedOption = answers[question.id];
      const isCorrect = selectedOption === question.correctOption;

      if (isCorrect) correctCount++;

      return {
        questionId: question.id,
        selectedOption,
        correctOption: question.correctOption,
        isCorrect,
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passMark;

    // Create quiz attempt (attemptedAt defaults to now())
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId: quizId,
        score,
        passed,
        answers: JSON.stringify(detailedAnswers),
      },
    });

    // If quiz passed, mark lesson as complete (presence of record = completed)
    if (passed) {
      await prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: quiz.lessonId,
          },
        },
        update: {
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          lessonId: quiz.lessonId,
        },
      });

      // Calculate course progress
      const course = await prisma.course.findUnique({
        where: { id: quiz.lesson.module.courseId },
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
              courseId: quiz.lesson.module.courseId,
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
            courseId: quiz.lesson.module.courseId,
          },
        },
        data: {
          progressPct: Math.round(progress),
        },
      });

      // Check if course is complete
      if (progress === 100) {
        await prisma.certificate.upsert({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: quiz.lesson.module.courseId,
            },
          },
          update: {
            issuedAt: new Date(),
            status: "ISSUED",
          },
          create: {
            userId: user.id,
            courseId: quiz.lesson.module.courseId,
            issuedAt: new Date(),
            status: "ISSUED",
          },
        });
      }
    }

    return NextResponse.json(
      {
        data: attempt,
        score,
        passed,
        correctCount,
        totalQuestions: quiz.questions.length,
        message: passed
          ? "Quiz passed! Great job!"
          : "Quiz failed. Review the material and try again.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
