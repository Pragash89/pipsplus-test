import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { BookOpen, Award, Clock, Users } from "lucide-react";
import CourseGrid from "@/components/sections/education/CourseGrid";
import BeginnerLearningPaths from "@/components/sections/education/BeginnerLearningPaths";

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education" });

  const stats = [
    { icon: BookOpen, value: "87", label: "Total Courses", color: "#1E40AF" },
    { icon: Award, value: "500+", label: "Free Lessons", color: "#10B981" },
    { icon: Clock, value: "200+ hrs", label: "Of Content", color: "#F59E0B" },
    { icon: Users, value: "3.72M+", label: "Students", color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 border border-[#1E40AF]/20 text-[#1E40AF] rounded-full px-4 py-2 text-sm font-medium mb-6">
            <BookOpen size={15} />
            Free courses available — no sign-up required
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#111827] mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto mb-12">
            {t("subtitle")}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-white/50 shadow-sm"
              >
                <stat.icon size={20} style={{ color: stat.color }} className="mx-auto mb-2" />
                <div className="text-2xl font-black" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="text-center py-20 text-[#6B7280]">Loading learning paths...</div>}>
            <BeginnerLearningPaths locale={locale} />
          </Suspense>
        </div>
      </section>

      {/* Course Grid with Filters */}
      <section className="py-12 px-4 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="text-center py-20 text-[#6B7280]">Loading courses...</div>}>
            <CourseGrid locale={locale} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
