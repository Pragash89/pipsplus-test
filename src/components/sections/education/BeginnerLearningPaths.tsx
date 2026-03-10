"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, BookOpen } from "lucide-react";

interface PathStep {
  id: string;
  courseTitle: string;
  courseSlug: string;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  skills: string[];
}

interface LearningPath {
  id: string;
  icon: string;
  title: string;
  description: string;
  targetRole: string;
  duration: number;
  steps: PathStep[];
  recommended: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { y: -5, transition: { duration: 0.2 } },
};

const LEARNING_PATHS: LearningPath[] = [
  {
    id: "forex-trader",
    icon: "🌍",
    title: "Become a Forex Trader",
    description: "Master currency trading from basics to professional strategies",
    targetRole: "Forex Trader",
    duration: 420,
    recommended: true,
    steps: [
      {
        id: "1",
        courseTitle: "Trading Basics: Complete Beginner's Guide",
        courseSlug: "trading-basics-complete-guide",
        duration: 300,
        difficulty: "Beginner",
        description: "Learn foundational concepts of financial markets",
        skills: ["Market basics", "Risk management", "Trading psychology"],
      },
      {
        id: "2",
        courseTitle: "Forex Trading Masterclass",
        courseSlug: "forex-trading-masterclass",
        duration: 480,
        difficulty: "Beginner",
        description: "Deep dive into forex-specific strategies and mechanics",
        skills: ["Currency pairs", "Forex mechanics", "Practical strategies"],
      },
      {
        id: "3",
        courseTitle: "Technical Analysis Mastery",
        courseSlug: "technical-analysis-mastery",
        duration: 600,
        difficulty: "Intermediate",
        description: "Read charts and identify profitable trading opportunities",
        skills: ["Chart reading", "Pattern recognition", "Indicator usage"],
      },
    ],
  },
  {
    id: "crypto-investor",
    icon: "₿",
    title: "Start Crypto Investing",
    description: "Navigate cryptocurrency markets and build your digital portfolio",
    targetRole: "Crypto Investor",
    duration: 480,
    recommended: false,
    steps: [
      {
        id: "1",
        courseTitle: "Trading Basics: Complete Beginner's Guide",
        courseSlug: "trading-basics-complete-guide",
        duration: 300,
        difficulty: "Beginner",
        description: "Learn foundational concepts of trading and markets",
        skills: ["Market basics", "Risk management", "Portfolio building"],
      },
      {
        id: "2",
        courseTitle: "Cryptocurrency Trading Complete Course",
        courseSlug: "crypto-trading-complete-course",
        duration: 420,
        difficulty: "Beginner",
        description: "Understand blockchain, crypto exchanges, and DeFi",
        skills: ["Blockchain basics", "Asset security", "DeFi strategies"],
      },
    ],
  },
  {
    id: "stock-investor",
    icon: "📈",
    title: "Build Stock Investment Portfolio",
    description: "Learn long-term wealth building through stock market investing",
    targetRole: "Stock Investor",
    duration: 640,
    recommended: false,
    steps: [
      {
        id: "1",
        courseTitle: "Stock Market Investing for Beginners",
        courseSlug: "stock-market-investing",
        duration: 360,
        difficulty: "Beginner",
        description: "Understand stocks, valuation, and portfolio construction",
        skills: ["Stock basics", "Valuation metrics", "Dividend investing"],
      },
      {
        id: "2",
        courseTitle: "Technical Analysis Mastery",
        courseSlug: "technical-analysis-mastery",
        duration: 600,
        difficulty: "Intermediate",
        description: "Apply technical analysis to stock trading",
        skills: ["Chart patterns", "Support/resistance", "Indicators"],
      },
    ],
  },
  {
    id: "options-trader",
    icon: "📊",
    title: "Master Options Trading",
    description: "Learn income generation and hedging with options strategies",
    targetRole: "Options Trader",
    duration: 480,
    recommended: false,
    steps: [
      {
        id: "1",
        courseTitle: "Trading Basics: Complete Beginner's Guide",
        courseSlug: "trading-basics-complete-guide",
        duration: 300,
        difficulty: "Beginner",
        description: "Essential trading fundamentals and psychology",
        skills: ["Trading basics", "Risk management", "Psychology"],
      },
      {
        id: "2",
        courseTitle: "Stock Market Investing for Beginners",
        courseSlug: "stock-market-investing",
        duration: 360,
        difficulty: "Beginner",
        description: "Understand underlying stock market mechanics",
        skills: ["Stock market", "Valuation", "Market structure"],
      },
      {
        id: "3",
        courseTitle: "Advanced Options Trading Strategies",
        courseSlug: "advanced-options-trading",
        duration: 720,
        difficulty: "Advanced",
        description: "Master calls, puts, spreads, and the Greeks",
        skills: ["Options pricing", "Greeks", "Complex strategies"],
      },
    ],
  },
];

export default function BeginnerLearningPaths({
  locale,
  userRole,
}: {
  locale: string;
  userRole?: string;
}) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const displayPaths = LEARNING_PATHS.sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return 0;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Choose Your Learning Path 🎯
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Guided learning journeys designed for beginners. Start from the
          fundamentals and build expertise step by step.
        </p>
      </motion.div>

      {/* Learning Paths Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {displayPaths.map((path) => (
          <motion.button
            key={path.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() =>
              setSelectedPath(selectedPath === path.id ? null : path.id)
            }
            className="text-left bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-blue-300 transition-all group relative overflow-hidden"
          >
            {/* Recommended Badge */}
            {path.recommended && (
              <div className="absolute top-6 right-6">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  ⭐ Recommended
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{path.icon}</div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {path.title}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{path.description}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {Math.round(path.duration / 60)} hours
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                {path.steps.length} courses
              </div>
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
              View Path <ArrowRight size={18} />
            </div>

            {/* Steps Preview (when expanded) */}
            {selectedPath === path.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200 space-y-4"
              >
                {path.steps.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/${locale}/education/${step.courseSlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {step.courseTitle}
                      </Link>
                      <p className="text-xs text-gray-600 mt-1">
                        {step.duration} minutes • {step.difficulty}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Link
                  href={`/${locale}/education`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-shadow text-center"
                >
                  Start This Path
                </Link>
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200"
      >
        <h3 className="text-2xl font-black text-gray-900 mb-4">
          How Learning Paths Work 📚
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "1️⃣",
              title: "Choose Your Goal",
              description:
                "Pick the role you want to achieve - Forex Trader, Crypto Investor, Stock Investor, or Options Trader.",
            },
            {
              icon: "2️⃣",
              title: "Follow the Curriculum",
              description:
                "Each path includes carefully sequenced courses that build on each other, progressing from basics to advanced.",
            },
            {
              icon: "3️⃣",
              title: "Track Your Progress",
              description:
                "Earn certificates, badges, and achievements as you complete each course. Stay motivated with streaks!",
            },
          ].map((step, idx) => (
            <div key={idx}>
              <p className="text-4xl mb-4">{step.icon}</p>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
