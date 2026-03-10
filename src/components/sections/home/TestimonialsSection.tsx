"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TestimonialsSectionProps {
  locale: string;
}

const testimonials = [
  {
    name: "Ahmed Al-Rashidi",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    content:
      "PipsPlus helped me choose a regulated broker and avoid scams. The education courses are exceptional and I earned my certificate!",
    rating: 5,
    verified: true,
    role: "Forex Trader",
    initials: "AA",
    avatarBg: "bg-blue-500",
  },
  {
    name: "Maria Gonzalez",
    country: "Spain",
    flag: "🇪🇸",
    content:
      "I lost funds to a fraudulent broker and PipsPlus legal team recovered 80% within 3 months. Forever grateful!",
    rating: 5,
    verified: true,
    role: "Crypto Investor",
    initials: "MG",
    avatarBg: "bg-emerald-500",
  },
  {
    name: "James Okonkwo",
    country: "Nigeria",
    flag: "🇳🇬",
    content:
      "The free courses are better than paid courses I've taken elsewhere. Now trading Forex profitably after 3 months!",
    rating: 5,
    verified: true,
    role: "Day Trader",
    initials: "JO",
    avatarBg: "bg-indigo-500",
  },
  {
    name: "Sophie Laurent",
    country: "France",
    flag: "🇫🇷",
    content:
      "As a beginner, PipsPlus Education Hub was exactly what I needed. Clear, structured, and practical lessons.",
    rating: 5,
    verified: true,
    role: "Stocks Trader",
    initials: "SL",
    avatarBg: "bg-purple-500",
  },
  {
    name: "Wang Wei",
    country: "Singapore",
    flag: "🇸🇬",
    content:
      "Broker reviews saved me from choosing a scam broker. Real, honest reviews from real traders. Highly recommend.",
    rating: 5,
    verified: true,
    role: "Swing Trader",
    initials: "WW",
    avatarBg: "bg-orange-500",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ locale: _locale }: TestimonialsSectionProps) {
  const t = useTranslations("home.testimonials");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Visible 3 at a time
  const visibleCount = 3;
  const visibleTestimonials = Array.from({ length: visibleCount }, (_, i) => {
    const index = (activeIndex + i) % testimonials.length;
    return { ...testimonials[index], displayIndex: i };
  });

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #3B82F6, #10B981, transparent)",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-blue-300 border border-white/10 mb-4">
            Real Trader Stories
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Overall rating display */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9/5</span>
            <span className="text-blue-200/60 text-sm">
              from 3.72M+ traders
            </span>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial, i) => (
              <motion.div
                key={`${testimonial.name}-${activeIndex}-${i}`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative flex flex-col bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300 cursor-default group"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-5 text-5xl font-black text-white/[0.07] leading-none select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Content */}
                <p className="text-sm lg:text-base text-white/85 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${testimonial.avatarBg} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <span className="text-sm font-black text-white">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-blue-300/70 text-xs">
                      {testimonial.flag} {testimonial.country} &middot;{" "}
                      {testimonial.role}
                    </p>
                  </div>
                  {testimonial.verified && (
                    <div className="ml-auto flex-shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-8 h-2.5 bg-blue-400"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Trust numbers row */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { value: "3.72M+", label: "Happy Traders" },
            { value: "150+", label: "Countries" },
            { value: "4.9★", label: "Average Rating" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10"
            >
              <p className="text-xl font-black text-white">{item.value}</p>
              <p className="text-xs text-blue-300/70 mt-0.5">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
