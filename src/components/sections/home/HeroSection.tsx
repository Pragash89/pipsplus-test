"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, TrendingUp, BookOpen, Shield, Users } from "lucide-react";

interface HeroSectionProps {
  locale: string;
}

const COURSE_LEVELS = [
  { label: "Beginner", color: "bg-emerald-100 text-emerald-700", lessons: "24 Lessons" },
  { label: "Intermediate", color: "bg-blue-100 text-blue-700", lessons: "32 Lessons" },
  { label: "Advanced", color: "bg-purple-100 text-purple-700", lessons: "28 Lessons" },
];

const CHECKLIST = [
  "Free courses for all skill levels",
  "Broker reviews & safety ratings",
  "Quizzes to track your progress",
  "Expert-verified content",
];

export default function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0F172A]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/40 via-transparent to-[#059669]/20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              #1 Forex Education Platform
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
              Learn Forex
              <span className="block" style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                The Right Way
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              From complete beginner to confident trader. Master forex, find trusted brokers,
              and protect yourself from scams — all in one place.
            </p>

            {/* Checklist */}
            <ul className="space-y-2.5 mb-8">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/register`}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)" }}
              >
                Start Learning Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/brokers`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
              >
                <Play className="w-4 h-4" />
                Browse Brokers
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
              {[
                { value: "50K+", label: "Students" },
                { value: "200+", label: "Lessons" },
                { value: "100+", label: "Broker Reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interactive course card mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">School of Pips</p>
                  <p className="text-white text-xl font-bold mt-0.5">Your Learning Path</p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-bold">LIVE</span>
                </div>
              </div>

              {/* Level cards */}
              <div className="space-y-3 mb-5">
                {COURSE_LEVELS.map((level, i) => (
                  <motion.div
                    key={level.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 bg-white/8 rounded-2xl p-4 border border-white/10 cursor-pointer hover:bg-white/12 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-semibold text-sm">{level.label} Course</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${level.color}`}>{level.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/10 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                            style={{ width: i === 0 ? "65%" : i === 1 ? "30%" : "0%" }}
                          />
                        </div>
                        <span className="text-white/50 text-xs">{level.lessons}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>

              {/* Current lesson ticker */}
              <div className="bg-blue-600/30 border border-blue-500/30 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Play className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-blue-200 text-xs font-semibold truncate">Continue: Understanding Pip Values</p>
                  <p className="text-blue-400/70 text-xs">Lesson 8 of 24 · 65% complete</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ animation: "floatBadge 4s ease-in-out infinite" }}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verified Broker</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-[10px]">★</span>)}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              style={{ animation: "floatBadge2 5s ease-in-out infinite" }}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">+127 joined today</p>
                <p className="text-xs text-gray-400">Global community</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatBadge2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
