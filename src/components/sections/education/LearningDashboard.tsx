"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star,
  Zap,
  Award,
} from "lucide-react";

interface LearningProgress {
  coursesStarted: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  totalHoursLearned: number;
  currentStreak: number;
  nextMilestone: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function LearningDashboard({
  progress = {
    coursesStarted: 3,
    coursesCompleted: 1,
    lessonsCompleted: 24,
    totalHoursLearned: 18,
    currentStreak: 7,
    nextMilestone: "Complete 50 lessons",
  },
  userId,
  locale,
}: {
  progress?: LearningProgress;
  userId?: string;
  locale: string;
}) {
  const progressPercentage = Math.min(
    (progress.lessonsCompleted / 200) * 100,
    100
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white"
      >
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Welcome back! 👋</h2>
          <p className="text-blue-100 text-lg mb-6">
            You're on day {progress.currentStreak} of your learning journey.
            Let's keep the momentum going!
          </p>
          <Link
            href={`/${locale}/education`}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            Continue Learning
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4">
        {[
          {
            icon: BookOpen,
            label: "Lessons Completed",
            value: progress.lessonsCompleted,
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: Clock,
            label: "Hours Learned",
            value: progress.totalHoursLearned,
            color: "from-purple-500 to-purple-600",
            suffix: "h",
          },
          {
            icon: Flame,
            label: "Day Streak",
            value: progress.currentStreak,
            color: "from-orange-500 to-orange-600",
          },
          {
            icon: Trophy,
            label: "Courses Completed",
            value: progress.coursesCompleted,
            color: "from-emerald-500 to-emerald-600",
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon size={32} className="opacity-80" />
            </div>
            <div className="text-3xl font-black mb-1">
              {stat.value}
              {stat.suffix && stat.suffix}
            </div>
            <p className="text-sm opacity-90">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Overall Progress Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Your Progress
            </h3>
            <p className="text-gray-600">
              {progress.nextMilestone} to unlock new achievements
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-blue-600">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
          />
        </div>

        {/* Milestone badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "First Steps", lessons: 5, unlocked: progress.lessonsCompleted >= 5 },
            { label: "Learning Path", lessons: 25, unlocked: progress.lessonsCompleted >= 25 },
            { label: "Expert Track", lessons: 50, unlocked: progress.lessonsCompleted >= 50 },
            { label: "Master Trader", lessons: 100, unlocked: progress.lessonsCompleted >= 100 },
          ].map((milestone, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`rounded-xl p-4 text-center border-2 transition-all ${
                milestone.unlocked
                  ? "bg-amber-50 border-amber-300"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-center mb-2">
                {milestone.unlocked ? (
                  <Trophy size={24} className="text-amber-600" />
                ) : (
                  <Star size={24} className="text-gray-400" />
                )}
              </div>
              <p className="font-bold text-sm text-gray-900">{milestone.label}</p>
              <p className="text-xs text-gray-600">{milestone.lessons} lessons</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Next Steps */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <Zap size={28} className="text-blue-600" />
          Recommended for You
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: "📊",
              title: "Continue: Technical Analysis Mastery",
              description: "You're 40% done. 5 lessons remaining.",
              progress: 40,
              color: "from-blue-50 to-indigo-50",
            },
            {
              icon: "💰",
              title: "Start: Risk Management Fundamentals",
              description: "Recommended for traders who completed basics.",
              isNew: true,
              color: "from-emerald-50 to-teal-50",
            },
          ].map((course, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`bg-gradient-to-br ${course.color} rounded-2xl p-6 border border-transparent hover:border-gray-300 transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{course.icon}</div>
                {course.isNew && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              {course.progress && (
                <div className="mb-4">
                  <div className="bg-white/60 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{course.progress}% Complete</p>
                </div>
              )}
              <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all group-hover:translate-x-0.5">
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <Award size={28} className="text-amber-600" />
          Your Achievements
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔥", title: "7 Day Warrior", unlock: "Maintain 7-day streak" },
            { icon: "📚", title: "Bookworm", unlock: "Complete 10 lessons" },
            { icon: "⚡", title: "Quick Learner", unlock: "Complete course in 5 days" },
            { icon: "👑", title: "Master", unlock: "Complete 5 courses" },
            { icon: "🎯", title: "Focused", unlock: "Complete 3 courses same week" },
            { icon: "🌟", title: "Superstar", unlock: "Score 95%+ on all quizzes" },
          ].map((achievement, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 text-center border border-amber-200/50"
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <p className="font-bold text-sm text-gray-900 mb-1">
                {achievement.title}
              </p>
              <p className="text-xs text-gray-600">{achievement.unlock}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
