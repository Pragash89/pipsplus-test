"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, Clock, BookOpen, Award, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { COURSE_CATEGORY_ICONS } from "@/lib/constants/site";
import type { Course, CourseCategory } from "@/types";

const CATEGORIES = [
  "ALL",
  "BASICS",
  "FOREX",
  "CRYPTO",
  "STOCKS",
  "RISK_MANAGEMENT",
  "TECHNICAL_ANALYSIS",
  "FUNDAMENTAL_ANALYSIS",
  "PSYCHOLOGY",
  "OPTIONS",
  "COMMODITIES",
] as const;

const LEVEL_COLORS: Record<string, string> = {
  BEGINNER: "#10B981",
  INTERMEDIATE: "#F59E0B",
  ADVANCED: "#EF4444",
};

// Demo courses for when DB is not connected
const DEMO_COURSES: Course[] = [
  {
    id: "1", slug: "forex-trading-basics", title: "Forex Trading for Beginners",
    description: "Master the fundamentals of forex trading. Learn currency pairs, market mechanics, and your first trading strategies.",
    thumbnailUrl: null as any, category: "FOREX", level: "BEGINNER", isPremium: false,
    isPublished: true, totalDuration: 180, totalLessons: 24, instructor: "Sarah Mitchell",
    tags: ["forex", "beginner", "currency"], createdAt: new Date().toISOString(),
  },
  {
    id: "2", slug: "technical-analysis-mastery", title: "Technical Analysis Mastery",
    description: "Advanced chart patterns, indicators, and trading signals. Become a professional technical analyst.",
    thumbnailUrl: null as any, category: "TECHNICAL_ANALYSIS", level: "INTERMEDIATE", isPremium: true,
    isPublished: true, totalDuration: 360, totalLessons: 42, instructor: "James Okafor",
    tags: ["technical", "charts", "indicators"], createdAt: new Date().toISOString(),
  },
  {
    id: "3", slug: "crypto-trading-essentials", title: "Cryptocurrency Trading Essentials",
    description: "Navigate crypto markets with confidence. Bitcoin, Ethereum, DeFi, and portfolio management strategies.",
    thumbnailUrl: null as any, category: "CRYPTO", level: "BEGINNER", isPremium: false,
    isPublished: true, totalDuration: 240, totalLessons: 30, instructor: "Sarah Mitchell",
    tags: ["crypto", "bitcoin", "defi"], createdAt: new Date().toISOString(),
  },
  {
    id: "4", slug: "risk-management-pro", title: "Professional Risk Management",
    description: "Protect your capital with proven risk management techniques used by professional traders worldwide.",
    thumbnailUrl: null as any, category: "RISK_MANAGEMENT", level: "INTERMEDIATE", isPremium: false,
    isPublished: true, totalDuration: 150, totalLessons: 18, instructor: "David Chen",
    tags: ["risk", "money management", "protection"], createdAt: new Date().toISOString(),
  },
  {
    id: "5", slug: "trading-psychology-mastery", title: "Trading Psychology & Mindset",
    description: "Overcome fear, greed, and emotional trading. Develop the mindset of consistently profitable traders.",
    thumbnailUrl: null as any, category: "PSYCHOLOGY", level: "ADVANCED", isPremium: true,
    isPublished: true, totalDuration: 200, totalLessons: 22, instructor: "Dr. Priya Sharma",
    tags: ["psychology", "mindset", "emotions"], createdAt: new Date().toISOString(),
  },
  {
    id: "6", slug: "stock-market-investing", title: "Stock Market Investing A-Z",
    description: "From understanding stocks to building a diversified portfolio. Everything a stock trader needs to succeed.",
    thumbnailUrl: null as any, category: "STOCKS", level: "BEGINNER", isPremium: false,
    isPublished: true, totalDuration: 280, totalLessons: 35, instructor: "Alexander Reed",
    tags: ["stocks", "investing", "portfolio"], createdAt: new Date().toISOString(),
  },
  {
    id: "7", slug: "fundamental-analysis-deep-dive", title: "Fundamental Analysis Deep Dive",
    description: "Read financial statements, evaluate company performance, and find undervalued assets before the market does.",
    thumbnailUrl: null as any, category: "FUNDAMENTAL_ANALYSIS", level: "ADVANCED", isPremium: true,
    isPublished: true, totalDuration: 320, totalLessons: 38, instructor: "James Okafor",
    tags: ["fundamental", "analysis", "valuation"], createdAt: new Date().toISOString(),
  },
  {
    id: "8", slug: "options-trading-strategies", title: "Options Trading Strategies",
    description: "From calls and puts to complex spreads. Master options trading with real trade examples and live markets.",
    thumbnailUrl: null as any, category: "OPTIONS", level: "ADVANCED", isPremium: true,
    isPublished: true, totalDuration: 400, totalLessons: 48, instructor: "Alexander Reed",
    tags: ["options", "derivatives", "hedging"], createdAt: new Date().toISOString(),
  },
  {
    id: "9", slug: "commodities-trading-guide", title: "Commodities Trading Complete Guide",
    description: "Trade gold, oil, silver, and agricultural commodities. Understand supply-demand dynamics and seasonal patterns.",
    thumbnailUrl: null as any, category: "COMMODITIES", level: "INTERMEDIATE", isPremium: false,
    isPublished: true, totalDuration: 220, totalLessons: 26, instructor: "David Chen",
    tags: ["commodities", "gold", "oil"], createdAt: new Date().toISOString(),
  },
];

export default function CourseGrid({ locale }: { locale: string }) {
  const t = useTranslations("education");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeLevel, setActiveLevel] = useState<string>("ALL");
  const [showPremiumOnly, setShowPremiumOnly] = useState<boolean | null>(null);

  const filteredCourses = DEMO_COURSES.filter((course) => {
    if (search && !course.title.toLowerCase().includes(search.toLowerCase()) &&
        !course.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory !== "ALL" && course.category !== activeCategory) return false;
    if (activeLevel !== "ALL" && course.level !== activeLevel) return false;
    if (showPremiumOnly === true && !course.isPremium) return false;
    if (showPremiumOnly === false && course.isPremium) return false;
    return true;
  });

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        {/* Search bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 bg-white shadow-sm"
          />
        </div>

        {/* Category Tabs - scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#1E40AF] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-[#6B7280] hover:border-[#1E40AF] hover:text-[#1E40AF]"
              }`}
            >
              {cat !== "ALL" && (
                <span>{COURSE_CATEGORY_ICONS[cat]}</span>
              )}
              {cat === "ALL" ? t("allCategories") : t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Level + Type filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-[#6B7280] font-medium">Filter:</span>
          {["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"].map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeLevel === level
                  ? "bg-[#111827] text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              {level === "ALL" ? "All Levels" : t(`levels.${level}`)}
            </button>
          ))}
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => setShowPremiumOnly(showPremiumOnly === false ? null : false)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                showPremiumOnly === false
                  ? "bg-[#10B981] text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              ✓ Free Only
            </button>
            <button
              onClick={() => setShowPremiumOnly(showPremiumOnly === true ? null : true)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                showPremiumOnly === true
                  ? "bg-[#1E40AF] text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              ★ Premium
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#6B7280] mb-6">
        Showing <strong className="text-[#111827]">{filteredCourses.length}</strong> courses
      </p>

      {/* Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-[#6B7280] text-lg">{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, locale, t }: { course: Course; locale: string; t: any }) {
  const categoryIcon = COURSE_CATEGORY_ICONS[course.category] || "📚";
  const levelColor = LEVEL_COLORS[course.level] || "#6B7280";
  const durationHrs = Math.floor(course.totalDuration / 60);
  const durationMins = course.totalDuration % 60;

  return (
    <Link
      href={`/${locale}/education/${course.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#1E40AF]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div
        className="h-44 relative flex items-center justify-center"
        style={{ background: course.isPremium
          ? "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)"
          : "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)" }}
      >
        <span className="text-6xl">{categoryIcon}</span>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isPremium ? (
            <span className="inline-flex items-center gap-1 bg-[#1E40AF] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <Lock size={10} />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#10B981] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Free
            </span>
          )}
        </div>

        {/* Level badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: levelColor }}
          >
            {t(`levels.${course.level}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#1E40AF] transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-4">
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {course.totalLessons} {t("lessons")}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {durationHrs > 0 ? `${durationHrs}h ` : ""}{durationMins > 0 ? `${durationMins}m` : ""}
          </span>
          {course.instructor && (
            <span className="truncate">by {course.instructor}</span>
          )}
        </div>

        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span className="text-xs bg-gray-100 text-[#6B7280] px-2.5 py-1 rounded-full font-medium">
            {t(`categories.${course.category}`)}
          </span>
          {!course.isPremium && (
            <span className="flex items-center gap-1 text-xs text-[#10B981] font-semibold">
              <Award size={13} />
              Certificate
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
