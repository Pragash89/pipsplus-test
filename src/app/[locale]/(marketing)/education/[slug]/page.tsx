"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Lock,
  Clock,
  BarChart2,
  BookOpen,
  Award,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  slug: string;
  level: string;
  duration: string;
  totalLessons: number;
  description: string;
  modules: Module[];
}

const DEMO_COURSE: CourseData = {
  title: "Forex Trading Fundamentals",
  slug: "forex-fundamentals",
  level: "Beginner",
  duration: "6 hours",
  totalLessons: 10,
  description:
    "Master the fundamentals of forex trading from scratch. Learn currency pairs, market sessions, basic analysis, and risk management principles.",
  modules: [
    {
      id: "m1",
      title: "Introduction to Forex",
      lessons: [
        { id: "l1", title: "What is Forex Trading?", type: "video", duration: "12 min", completed: false },
        { id: "l2", title: "Currency Pairs Explained", type: "text", duration: "8 min", completed: false },
        { id: "l3", title: "Market Sessions & Hours", type: "video", duration: "15 min", completed: false },
        { id: "l4", title: "Module 1 Quiz", type: "quiz", duration: "5 min", completed: false },
      ],
    },
    {
      id: "m2",
      title: "Reading the Market",
      lessons: [
        { id: "l5", title: "Reading Price Action", type: "video", duration: "20 min", completed: false },
        { id: "l6", title: "Support & Resistance", type: "text", duration: "15 min", completed: false },
        { id: "l7", title: "Trend Identification", type: "video", duration: "18 min", completed: false },
      ],
    },
    {
      id: "m3",
      title: "Risk Management",
      lessons: [
        { id: "l8", title: "Position Sizing", type: "video", duration: "14 min", completed: false },
        { id: "l9", title: "Stop Loss Strategies", type: "text", duration: "12 min", completed: false },
        { id: "l10", title: "Final Assessment", type: "quiz", duration: "10 min", completed: false },
      ],
    },
  ],
};

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "What is a currency pair in forex trading?",
    options: [
      "A pair of matching currencies you can trade",
      "The exchange rate between two currencies",
      "Two currencies quoted against each other in a transaction",
      "A forex trading strategy",
    ],
    correct: 2,
  },
  {
    id: "q2",
    question: "Which forex market session has the highest trading volume?",
    options: ["Sydney Session", "Tokyo Session", "London Session", "New York Session"],
    correct: 2,
  },
  {
    id: "q3",
    question: "What does 'pip' stand for in forex trading?",
    options: [
      "Price in Points",
      "Percentage in Point",
      "Price Interest Point",
      "Profit in Proportion",
    ],
    correct: 1,
  },
];

const LESSON_CONTENT: Record<string, { title: string; body: string }> = {
  l1: {
    title: "What is Forex Trading?",
    body: `The foreign exchange (forex or FX) market is the world's largest and most liquid financial market, with average daily trading volumes exceeding $7 trillion. Unlike stock markets, forex has no central exchange and operates 24 hours a day, five days a week across global financial centers.

**What You'll Learn in This Lesson:**
- The definition of forex trading and how markets work
- Why traders participate in the forex market
- The role of banks, institutions, and retail traders
- How currency values fluctuate and why

Forex trading involves the simultaneous buying of one currency and selling of another. Currencies are traded in pairs — for example, EUR/USD represents the euro against the US dollar. When you trade this pair, you're speculating on whether the euro will strengthen or weaken against the dollar.

**Key Participants in the Forex Market:**
1. **Central Banks** — Control monetary policy and intervene in currency markets
2. **Commercial Banks** — Execute trades for clients and trade on their own accounts
3. **Hedge Funds** — Speculate on currency movements for profit
4. **Retail Traders** — Individual traders like you, accessing the market through brokers`,
  },
  l2: {
    title: "Currency Pairs Explained",
    body: `Every forex trade involves two currencies — the base currency and the quote currency. Understanding currency pairs is fundamental to forex trading.

**Structure of a Currency Pair**

In the pair EUR/USD:
- **EUR** is the base currency (the first currency)
- **USD** is the quote currency (the second currency)
- If EUR/USD = 1.1000, it means 1 euro buys 1.10 US dollars

**Types of Currency Pairs:**

**Major Pairs** — Most traded, involve USD:
- EUR/USD (Euro/US Dollar)
- GBP/USD (British Pound/US Dollar)
- USD/JPY (US Dollar/Japanese Yen)
- USD/CHF (US Dollar/Swiss Franc)

**Minor Pairs** — Don't involve USD but include major currencies:
- EUR/GBP, EUR/JPY, GBP/JPY

**Exotic Pairs** — One major + one emerging market currency:
- USD/TRY, EUR/ZAR, GBP/SGD

Major pairs have the tightest spreads and highest liquidity, making them ideal for beginners.`,
  },
};

const TYPE_ICON = {
  video: PlayCircle,
  text: FileText,
  quiz: HelpCircle,
};

const TYPE_COLOR = {
  video: "text-blue-500",
  text: "text-emerald-500",
  quiz: "text-purple-500",
};

function getAllLessons(modules: Module[]): Lesson[] {
  return modules.flatMap((m) => m.lessons);
}

export default function CourseDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const { data: session } = useSession();

  const course = DEMO_COURSE;
  const allLessons = getAllLessons(course.modules);

  const [selectedLessonId, setSelectedLessonId] = useState(allLessons[0].id);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ m1: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedLesson = allLessons.find((l) => l.id === selectedLessonId) ?? allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const progress = Math.round((completedLessons.size / allLessons.length) * 100);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const markComplete = () => {
    setCompletedLessons((prev) => new Set([...prev, selectedLessonId]));
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
      setSidebarOpen(false);
    }
  };

  const handleEnroll = () => {
    if (!session) {
      window.location.href = `/${locale}/login?callbackUrl=/${locale}/education/${course.slug}`;
      return;
    }
    setEnrolled(true);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizSubmitted(true);
  };

  const getQuizScore = () => {
    return QUIZ_QUESTIONS.filter((q) => quizAnswers[q.id] === q.correct).length;
  };

  const content = LESSON_CONTENT[selectedLessonId];

  const LessonTypeIcon = TYPE_ICON[selectedLesson.type];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 z-20 sticky top-0">
        <Link
          href={`/${locale}/education`}
          className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#1E40AF] transition-colors shrink-0"
        >
          <ArrowLeft size={15} /> Courses
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-[#111827] text-sm truncate">{course.title}</h1>
          {enrolled && (
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex-1 max-w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-[#6B7280]">{progress}%</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg text-[#374151] hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col",
            "fixed inset-y-0 left-0 z-40 top-[53px] transition-transform duration-300",
            "lg:static lg:translate-x-0 lg:z-auto lg:top-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Enroll prompt */}
          {!enrolled && (
            <div className="p-4 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] text-white">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={14} />
                <span className="text-xs font-semibold">Enroll to track progress</span>
              </div>
              <button
                onClick={handleEnroll}
                className="w-full py-2 bg-white text-[#1E40AF] text-sm font-bold rounded-xl hover:bg-blue-50 transition-all"
              >
                Enroll — Free
              </button>
            </div>
          )}

          {/* Course info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BarChart2 size={11} /> {course.level}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={11} /> {course.totalLessons} lessons
              </span>
            </div>
          </div>

          {/* Modules accordion */}
          <nav className="flex-1 overflow-y-auto">
            {course.modules.map((module) => (
              <div key={module.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-[#111827]">{module.title}</span>
                  {openModules[module.id] ? (
                    <ChevronDown size={14} className="text-[#6B7280] shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="text-[#6B7280] shrink-0" />
                  )}
                </button>

                {openModules[module.id] && (
                  <div>
                    {module.lessons.map((lesson) => {
                      const Icon = TYPE_ICON[lesson.type];
                      const isSelected = lesson.id === selectedLessonId;
                      const isDone = completedLessons.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLessonId(lesson.id);
                            setSidebarOpen(false);
                            setQuizSubmitted(false);
                            setQuizAnswers({});
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all",
                            isSelected
                              ? "bg-blue-50 border-l-2 border-[#1E40AF]"
                              : "hover:bg-gray-50 border-l-2 border-transparent"
                          )}
                        >
                          {isDone ? (
                            <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                          ) : (
                            <Icon size={14} className={cn(TYPE_COLOR[lesson.type], "shrink-0")} />
                          )}
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                "text-xs font-medium truncate",
                                isSelected ? "text-[#1E40AF]" : "text-[#374151]"
                              )}
                            >
                              {lesson.title}
                            </div>
                            <div className="text-[10px] text-[#9CA3AF]">{lesson.duration}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Lesson header */}
            <div className="flex items-center gap-2 mb-4">
              <LessonTypeIcon size={18} className={TYPE_COLOR[selectedLesson.type]} />
              <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                {selectedLesson.type === "video"
                  ? "Video Lesson"
                  : selectedLesson.type === "text"
                  ? "Reading"
                  : "Quiz"}
              </span>
              <span className="text-xs text-[#9CA3AF]">· {selectedLesson.duration}</span>
            </div>

            <h2 className="text-2xl font-black text-[#111827] mb-6">{selectedLesson.title}</h2>

            {/* VIDEO lesson */}
            {selectedLesson.type === "video" && (
              <div className="rounded-2xl overflow-hidden mb-6 bg-[#111827] aspect-video flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} className="text-white" />
                </div>
                <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium">
                  {selectedLesson.title} · {selectedLesson.duration}
                </div>
              </div>
            )}

            {/* TEXT lesson */}
            {selectedLesson.type === "text" && content && (
              <div className="prose prose-sm max-w-none bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                {content.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#374151] leading-relaxed mb-4 text-sm last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {selectedLesson.type === "text" && !content && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center mb-6">
                <FileText size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-[#6B7280]">Lesson content coming soon.</p>
              </div>
            )}

            {/* QUIZ lesson */}
            {selectedLesson.type === "quiz" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                {quizSubmitted ? (
                  <div className="text-center py-8">
                    <Award
                      size={48}
                      className={getQuizScore() >= 2 ? "text-yellow-400 mx-auto mb-3" : "text-gray-400 mx-auto mb-3"}
                    />
                    <h3 className="text-xl font-black text-[#111827] mb-2">
                      You scored {getQuizScore()}/{QUIZ_QUESTIONS.length}
                    </h3>
                    <p className="text-[#6B7280] mb-6">
                      {getQuizScore() >= 2 ? "Great job! You can proceed." : "Review the material and try again."}
                    </p>
                    {getQuizScore() < 2 && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="px-6 py-2.5 border border-[#1E40AF] text-[#1E40AF] font-semibold rounded-xl hover:bg-blue-50 transition-all text-sm"
                      >
                        Retry Quiz
                      </button>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleQuizSubmit}>
                    <h3 className="font-bold text-[#111827] mb-6">Answer all questions to continue</h3>
                    <div className="space-y-6">
                      {QUIZ_QUESTIONS.map((q, qi) => (
                        <div key={q.id}>
                          <p className="font-semibold text-[#111827] mb-3 text-sm">
                            {qi + 1}. {q.question}
                          </p>
                          <div className="space-y-2">
                            {q.options.map((opt, oi) => (
                              <label
                                key={oi}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm",
                                  quizAnswers[q.id] === oi
                                    ? "border-[#1E40AF] bg-blue-50 text-[#1E40AF]"
                                    : "border-gray-200 hover:border-gray-300 text-[#374151]"
                                )}
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={oi}
                                  className="sr-only"
                                  onChange={() =>
                                    setQuizAnswers((prev) => ({ ...prev, [q.id]: oi }))
                                  }
                                />
                                <div
                                  className={cn(
                                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                                    quizAnswers[q.id] === oi
                                      ? "border-[#1E40AF] bg-[#1E40AF]"
                                      : "border-gray-300"
                                  )}
                                >
                                  {quizAnswers[q.id] === oi && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                      className="mt-6 w-full py-3 bg-[#1E40AF] text-white font-bold rounded-xl hover:bg-[#1E3A8A] transition-all disabled:opacity-50 text-sm"
                    >
                      Submit Answers
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Mark complete + navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevLesson ? (
                <button
                  onClick={() => {
                    setSelectedLessonId(prevLesson.id);
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#374151] hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft size={14} /> Previous
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                {!completedLessons.has(selectedLessonId) &&
                  selectedLesson.type !== "quiz" && (
                    <button
                      onClick={markComplete}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-bold hover:bg-[#059669] transition-all"
                    >
                      <CheckCircle2 size={15} /> Mark Complete
                    </button>
                  )}
                {nextLesson && (
                  <button
                    onClick={() => {
                      setSelectedLessonId(nextLesson.id);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1E40AF] text-white rounded-xl text-sm font-bold hover:bg-[#1E3A8A] transition-all"
                  >
                    Next <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Certificate hint */}
            {completedLessons.size === allLessons.length && (
              <div className="mt-6 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-5 text-center">
                <Award size={32} className="text-yellow-500 mx-auto mb-2" />
                <h3 className="font-black text-[#111827] mb-1">Course Complete! 🎉</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  Your certificate is ready. Request your physical certificate from the dashboard.
                </p>
                <Link
                  href={`/${locale}/dashboard/certificates`}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#1E40AF] text-white text-sm font-bold rounded-xl hover:bg-[#1E3A8A] transition-all"
                >
                  View Certificate <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
