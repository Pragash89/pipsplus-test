"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Lock,
  BookOpen,
  Video,
  HelpCircle,
  Clock,
  Check,
  Play,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: "TEXT" | "VIDEO" | "QUIZ";
  duration: number;
  isFree: boolean;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completedLessons?: number;
}

interface CourseCurriculumProps {
  courseTitle: string;
  modules: Module[];
  totalLessons: number;
  totalDuration: number;
  onEnroll?: () => void;
  isEnrolled?: boolean;
  completionPercentage?: number;
}

const moduleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const lessonVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export default function CourseCurriculum({
  courseTitle,
  modules,
  totalLessons,
  totalDuration,
  onEnroll,
  isEnrolled = false,
  completionPercentage = 0,
}: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set([modules[0]?.id])
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video size={16} className="text-blue-600" />;
      case "QUIZ":
        return <HelpCircle size={16} className="text-purple-600" />;
      case "TEXT":
      default:
        return <BookOpen size={16} className="text-emerald-600" />;
    }
  };

  const getDurationLabel = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Course Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200"
      >
        <h2 className="text-3xl font-black text-gray-900 mb-4">
          {courseTitle}
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {[
            { label: "Total Lessons", value: totalLessons, icon: "📚" },
            { label: "Duration", value: getDurationLabel(totalDuration), icon: "⏱️" },
            { label: "Difficulty", value: "Beginner to Advanced", icon: "📊" },
            { label: "Format", value: "Video + Text + Quizzes", icon: "🎓" },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {isEnrolled && (
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-900">Your Progress</p>
              <p className="text-lg font-black text-blue-600">
                {completionPercentage}%
              </p>
            </div>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Curriculum */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-gray-900">Course Curriculum</h3>

        <AnimatePresence>
          {modules.map((module) => (
            <motion.div
              key={module.id}
              variants={moduleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-blue-300 transition-colors"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="text-2xl">📖</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {module.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {module.lessons.length} lessons •{" "}
                      {getDurationLabel(
                        module.lessons.reduce(
                          (sum, lesson) => sum + lesson.duration,
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {isEnrolled && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">
                        {module.completedLessons || 0}/{module.lessons.length}
                      </p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                  )}
                  <motion.div
                    animate={{
                      rotate: expandedModules.has(module.id) ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-400" />
                  </motion.div>
                </div>
              </button>

              {/* Lessons List */}
              <AnimatePresence>
                {expandedModules.has(module.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50/50 overflow-hidden"
                  >
                    <div className="p-6 space-y-3">
                      {module.lessons.map((lesson, idx) => (
                        <motion.div
                          key={lesson.id}
                          variants={lessonVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                            lesson.isFree
                              ? "bg-white border border-emerald-200/50 hover:border-emerald-300"
                              : isEnrolled
                                ? "bg-white border border-blue-200/50 hover:border-blue-300"
                                : "bg-gray-100/50 border border-gray-200"
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isEnrolled && lesson.completed ? (
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Check size={16} className="text-emerald-600" />
                              </div>
                            ) : !lesson.isFree && !isEnrolled ? (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <Lock size={16} className="text-gray-600" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 flex items-center justify-center">
                                {getLessonIcon(lesson.type)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h5
                              className={`font-semibold text-sm transition-colors ${
                                isEnrolled && lesson.completed
                                  ? "text-emerald-600 line-through"
                                  : "text-gray-900"
                              }`}
                            >
                              {lesson.title}
                            </h5>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {lesson.type === "QUIZ"
                                ? "Assessment"
                                : lesson.type === "VIDEO"
                                  ? "Video Lesson"
                                  : "Reading"}{" "}
                              • {lesson.duration} mins
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {lesson.isFree && (
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                Free
                              </span>
                            )}
                            {isEnrolled && !lesson.completed && (
                              <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                                <Play size={16} />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      {!isEnrolled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6 flex gap-3"
        >
          <button
            onClick={onEnroll}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-2xl hover:shadow-lg transition-shadow text-lg"
          >
            Enroll Now - Start Learning
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-900 font-bold py-4 px-6 rounded-2xl hover:border-blue-300 transition-colors">
            <span>👁️</span> Preview
          </button>
        </motion.div>
      )}
    </div>
  );
}
