import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import LearningDashboard from "@/components/sections/education/LearningDashboard";
import { prisma } from "@/lib/prisma";
import { BookOpen, Award, Flame, Clock } from "lucide-react";

async function DashboardContent({ locale }: { locale: string }) {
  const session = await getServerSession(authOptions);

  let progress = {
    coursesStarted: 0,
    coursesCompleted: 0,
    lessonsCompleted: 0,
    totalHoursLearned: 0,
    currentStreak: 0,
    nextMilestone: "Enroll in your first course",
  };

  let recentEnrollments: Array<{
    course: { id: string; title: string; totalLessons: number };
    progressPct: number;
    enrolledAt: Date;
  }> = [];

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (user) {
      const [enrollments, completedLessons, certificates] = await Promise.all([
        prisma.enrollment.findMany({
          where: { userId: user.id },
          orderBy: { enrolledAt: "desc" },
          take: 4,
          include: {
            course: { select: { id: true, title: true, totalLessons: true } },
          },
        }),
        prisma.lessonProgress.findMany({
          where: { userId: user.id },
          include: { lesson: { select: { duration: true } } },
        }),
        prisma.certificate.findMany({
          where: { userId: user.id },
        }),
      ]);

      const totalHoursVal = Math.round(
        completedLessons.reduce((sum, lp) => sum + (lp.lesson.duration ?? 0), 0) / 60
      );

      const lessonsCount = completedLessons.length;

      // Simple streak: days since last activity
      const lastLesson = completedLessons.sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )[0];
      const daysSinceLast = lastLesson
        ? Math.floor((Date.now() - new Date(lastLesson.completedAt).getTime()) / 86400000)
        : 99;
      const streak = daysSinceLast <= 1 ? Math.min(lessonsCount, 30) : 0;

      progress = {
        coursesStarted: enrollments.length,
        coursesCompleted: certificates.length,
        lessonsCompleted: lessonsCount,
        totalHoursLearned: totalHoursVal,
        currentStreak: streak,
        nextMilestone:
          lessonsCount === 0
            ? "Complete your first lesson"
            : `Complete ${Math.ceil((lessonsCount + 1) / 10) * 10} lessons`,
      };

      recentEnrollments = enrollments.map((e) => ({
        course: e.course,
        progressPct: e.progressPct,
        enrolledAt: e.enrolledAt,
      }));
    }
  }

  const userName = session?.user?.name?.split(" ")[0] ?? "Trader";

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {userName}! 👋</h1>
        <p className="text-blue-100 mt-1 text-sm">
          {progress.lessonsCompleted === 0
            ? "Start your forex learning journey today."
            : `You've completed ${progress.lessonsCompleted} lessons. Keep going!`}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Courses Enrolled", value: progress.coursesStarted, icon: BookOpen, color: "blue" },
          { label: "Lessons Done", value: progress.lessonsCompleted, icon: Award, color: "emerald" },
          { label: "Day Streak", value: progress.currentStreak, icon: Flame, color: "orange" },
          { label: "Hours Learned", value: progress.totalHoursLearned, icon: Clock, color: "purple" },
        ].map((stat) => {
          const colorMap: Record<string, { bg: string; icon: string }> = {
            blue: { bg: "bg-blue-50", icon: "text-blue-600" },
            emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
            orange: { bg: "bg-orange-50", icon: "text-orange-600" },
            purple: { bg: "bg-purple-50", icon: "text-purple-600" },
          };
          const colors = colorMap[stat.color];
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Continue Learning */}
      {recentEnrollments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Continue Learning</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.course.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{enrollment.course.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[160px]">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                        style={{ width: `${enrollment.progressPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{enrollment.progressPct}%</span>
                  </div>
                </div>
                <a
                  href={`/${locale}/dashboard/courses`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex-shrink-0"
                >
                  Continue →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning path CTA if no enrollments */}
      {recentEnrollments.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Start Learning Forex</h3>
          <p className="text-gray-500 text-sm mb-4">Browse our courses and start your trading education journey.</p>
          <a
            href={`/${locale}/education`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </a>
        </div>
      )}

      {/* Full learning dashboard component */}
      <LearningDashboard
        progress={progress}
        userId={session?.user?.id}
        locale={locale}
      />
    </div>
  );
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-500">Loading your dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent locale={locale} />
    </Suspense>
  );
}
