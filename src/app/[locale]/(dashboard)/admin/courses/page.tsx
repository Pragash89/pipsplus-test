import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Users, CheckCircle, XCircle, Star, Plus, BarChart2 } from "lucide-react";

export default async function AdminCoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { enrollments: true, certificates: true, modules: true },
      },
    },
  });

  const levelColors: Record<string, string> = {
    BEGINNER: "bg-emerald-100 text-emerald-700",
    INTERMEDIATE: "bg-blue-100 text-blue-700",
    ADVANCED: "bg-purple-100 text-purple-700",
  };

  const categoryLabels: Record<string, string> = {
    BASICS: "Basics",
    FOREX: "Forex",
    CRYPTO: "Crypto",
    STOCKS: "Stocks",
    RISK_MANAGEMENT: "Risk Mgmt",
    TECHNICAL_ANALYSIS: "Tech Analysis",
    FUNDAMENTAL_ANALYSIS: "Fund Analysis",
    PSYCHOLOGY: "Psychology",
    OPTIONS: "Options",
    COMMODITIES: "Commodities",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} courses total</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Published", value: courses.filter((c) => c.isPublished).length, color: "emerald" },
          { label: "Draft", value: courses.filter((c) => !c.isPublished).length, color: "amber" },
          { label: "Premium", value: courses.filter((c) => c.isPremium).length, color: "purple" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border border-gray-200 p-4 shadow-sm`}>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Courses table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Stats</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{course.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{categoryLabels[course.category] ?? course.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${levelColors[course.level] ?? "bg-gray-100 text-gray-600"}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course._count.enrollments} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{course._count.certificates} certs</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      {course.isPublished ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          <CheckCircle className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                          <XCircle className="w-3 h-3" /> Draft
                        </span>
                      )}
                      {course.isPremium && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">PRO</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {courses.length === 0 && (
          <div className="text-center py-12 text-gray-400">No courses yet</div>
        )}
      </div>
    </div>
  );
}
