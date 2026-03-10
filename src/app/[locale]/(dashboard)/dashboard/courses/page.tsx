"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlayCircle,
  Lock,
  Filter,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  emoji: string;
  color: string;
  accentColor: string;
  totalLessons: number;
  completedLessons: number;
  status: "completed" | "in_progress" | "not_started";
}

const demoCourses: Course[] = [
  {
    id: "1",
    title: "Forex Trading Fundamentals",
    slug: "forex-fundamentals",
    category: "Basics",
    description: "Master the core concepts of forex trading, from reading charts to understanding pip values.",
    emoji: "📈",
    color: "#EFF6FF",
    accentColor: "#1E40AF",
    totalLessons: 24,
    completedLessons: 24,
    status: "completed",
  },
  {
    id: "2",
    title: "Technical Analysis Mastery",
    slug: "technical-analysis",
    category: "Technical Analysis",
    description: "Learn to read price action, identify patterns, and use indicators to find high-probability trades.",
    emoji: "📊",
    color: "#F0FDF4",
    accentColor: "#10B981",
    totalLessons: 18,
    completedLessons: 11,
    status: "in_progress",
  },
  {
    id: "3",
    title: "Risk Management Strategies",
    slug: "risk-management",
    category: "Risk Management",
    description: "Protect your capital with proven risk management techniques used by professional traders.",
    emoji: "🛡️",
    color: "#FFFBEB",
    accentColor: "#F59E0B",
    totalLessons: 15,
    completedLessons: 3,
    status: "in_progress",
  },
  {
    id: "4",
    title: "Candlestick Pattern Recognition",
    slug: "candlestick-patterns",
    category: "Technical Analysis",
    description: "Identify powerful candlestick patterns that signal market reversals and continuations.",
    emoji: "🕯️",
    color: "#F5F3FF",
    accentColor: "#8B5CF6",
    totalLessons: 12,
    completedLessons: 0,
    status: "not_started",
  },
];

type FilterTab = "all" | "in_progress" | "completed";

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  in_progress: {
    label: "In Progress",
    badge: "bg-blue-100 text-[#1E40AF]",
    icon: PlayCircle,
  },
  not_started: {
    label: "Not Started",
    badge: "bg-gray-100 text-gray-600",
    icon: Lock,
  },
};

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}

function CourseCard({ course, locale }: { course: Course; locale: string }) {
  const progress = course.totalLessons > 0
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0;
  const config = STATUS_CONFIG[course.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Thumbnail */}
      <div
        className="relative h-36 flex items-center justify-center text-5xl"
        style={{ backgroundColor: course.color }}
      >
        <span>{course.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <span
          className={cn(
            "absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold",
            config.badge
          )}
        >
          <StatusIcon size={10} />
          {config.label}
        </span>
      </div>

      <div className="p-4">
        {/* Category */}
        <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[#111827] text-base mt-1 mb-1.5 leading-snug line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#6B7280] mb-3 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Progress */}
        {course.status !== "not_started" && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#6B7280]">
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
              <span className="text-[11px] font-semibold" style={{ color: course.accentColor }}>
                {progress}%
              </span>
            </div>
            <ProgressBar progress={progress} color={course.accentColor} />
          </div>
        )}

        {/* Lessons count for not started */}
        {course.status === "not_started" && (
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-3">
            <BookOpen size={12} />
            <span>{course.totalLessons} lessons</span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/${locale}/education/${course.slug}`}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200",
            course.status === "completed"
              ? "bg-green-50 text-green-700 hover:bg-green-100"
              : course.status === "in_progress"
              ? "bg-[#1E40AF] text-white hover:bg-[#1E3A8A]"
              : "bg-[#F3F4F6] text-[#374151] hover:bg-blue-50 hover:text-[#1E40AF]"
          )}
        >
          {course.status === "completed" ? (
            <>Review Course<ArrowRight size={14} /></>
          ) : course.status === "in_progress" ? (
            <>Continue Learning<PlayCircle size={14} /></>
          ) : (
            <>Start Course<ArrowRight size={14} /></>
          )}
        </Link>
      </div>
    </div>
  );
}

export default function DashboardCoursesPage() {
  const t = useTranslations("dashboard");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filters: { key: FilterTab; label: string }[] = [
    { key: "all", label: `All (${demoCourses.length})` },
    { key: "in_progress", label: `In Progress (${demoCourses.filter(c => c.status === "in_progress").length})` },
    { key: "completed", label: `Completed (${demoCourses.filter(c => c.status === "completed").length})` },
  ];

  const filteredCourses = activeFilter === "all"
    ? demoCourses
    : demoCourses.filter((c) =>
        activeFilter === "in_progress"
          ? c.status === "in_progress" || c.status === "not_started"
          : c.status === activeFilter
      );

  const completedCount = demoCourses.filter(c => c.status === "completed").length;
  const inProgressCount = demoCourses.filter(c => c.status === "in_progress").length;
  const totalHours = 24;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827]">My Courses</h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            Track your learning progress and continue where you left off.
          </p>
        </div>
        <Link
          href={`/${locale}/education`}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
        >
          Browse Courses
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Enrolled", value: demoCourses.length, icon: BookOpen, color: "#1E40AF", bg: "#EFF6FF" },
          { label: "In Progress", value: inProgressCount, icon: Clock, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Completed", value: completedCount, icon: CheckCircle2, color: "#10B981", bg: "#ECFDF5" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: stat.bg }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#111827]">{stat.value}</div>
              <div className="text-xs text-[#6B7280]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 bg-[#F3F4F6] p-1 rounded-xl w-fit">
        <Filter size={14} className="text-[#6B7280] ml-1" />
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeFilter === f.key
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#6B7280] hover:text-[#374151]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-[#1E40AF]" size={28} />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">No courses here yet</h3>
          <p className="text-[#6B7280] mb-6">Browse our course catalog to start learning.</p>
          <Link
            href={`/${locale}/education`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
          >
            Browse Courses <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Total hours note */}
      <p className="text-center text-xs text-[#9CA3AF] mt-6">
        You&apos;ve spent approximately {totalHours} hours learning on PipsPlus.
      </p>
    </div>
  );
}
