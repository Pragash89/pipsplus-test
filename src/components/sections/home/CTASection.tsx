"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp } from "lucide-react";

export default function CTASection({ locale }: { locale: string }) {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 60%, #0EA5E9 100%)" }}
      />

      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-300 opacity-10 blur-3xl" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-5 py-2 text-sm font-medium mb-8">
            <TrendingUp size={15} />
            Start your trading journey today
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Trade{" "}
            <span className="text-yellow-300">Smarter?</span>
          </h2>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 3.72 million traders who trust PipsPlus for world-class education,
            verified broker reviews, and professional fund protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register`}
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#1E40AF] font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              <Users size={22} />
              Get Started Free Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/education`}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-lg backdrop-blur-sm"
            >
              Browse Free Courses
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free access to basic courses
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel premium anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
