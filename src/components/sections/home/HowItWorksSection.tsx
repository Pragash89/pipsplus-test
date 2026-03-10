"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface HowItWorksSectionProps {
  locale: string;
}

const steps = [
  {
    number: "01",
    emoji: "🎓",
    key: "step1",
    iconBg: "bg-blue-100",
    numberBg: "bg-blue-600",
    accentColor: "#1E40AF",
    ringColor: "ring-blue-200",
  },
  {
    number: "02",
    emoji: "🏦",
    key: "step2",
    iconBg: "bg-emerald-100",
    numberBg: "bg-emerald-600",
    accentColor: "#10B981",
    ringColor: "ring-emerald-200",
  },
  {
    number: "03",
    emoji: "📈",
    key: "step3",
    iconBg: "bg-indigo-100",
    numberBg: "bg-indigo-600",
    accentColor: "#6366F1",
    ringColor: "ring-indigo-200",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.4, ease: "easeInOut" as const },
  },
};

export default function HowItWorksSection({ locale: _locale }: HowItWorksSectionProps) {
  const t = useTranslations("home.howItWorks");

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E40AF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 mb-4">
            Simple Process
          </span>
          <h2
            className="text-3xl lg:text-5xl font-black mb-4"
            style={{ color: "#111827" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+48px)] right-[calc(16.67%+48px)] h-0.5 pointer-events-none overflow-hidden">
            <motion.div
              className="h-full origin-left"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #CBD5E1 0, #CBD5E1 8px, transparent 8px, transparent 16px)",
              }}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                variants={stepVariants}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle + icon */}
                <div className="relative mb-8">
                  {/* Outer ring */}
                  <div
                    className={`w-24 h-24 rounded-full ring-4 ${step.ringColor} ring-offset-4 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110`}
                    style={{ background: `${step.accentColor}15` }}
                  >
                    <span className="text-4xl">{step.emoji}</span>
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${step.numberBg} flex items-center justify-center shadow-md z-20`}
                  >
                    <span className="text-xs font-black text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Step number label */}
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: step.accentColor }}
                >
                  Step {step.number}
                </span>

                {/* Title */}
                <h3
                  className="text-xl font-black mb-3"
                  style={{ color: "#111827" }}
                >
                  {t(`${step.key}.title` as any)}
                </h3>

                {/* Description */}
                <p
                  className="text-base leading-relaxed max-w-xs"
                  style={{ color: "#6B7280" }}
                >
                  {t(`${step.key}.description` as any)}
                </p>

                {/* Feature pills */}
                {step.key === "step1" && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Forex", "Crypto", "Stocks", "Risk Mgmt"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {step.key === "step2" && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Regulated", "1,247+ Brokers", "Verified Reviews"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                )}
                {step.key === "step3" && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Earn Certificate", "Fund Recovery", "Community"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100">
            <span className="text-2xl">🚀</span>
            <p className="text-sm font-semibold" style={{ color: "#374151" }}>
              Start your journey today — it&apos;s completely free to begin
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
