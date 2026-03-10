"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface FeaturesSectionProps {
  locale: string;
}

const features = [
  {
    key: "educate",
    emoji: "📚",
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-50",
    borderHover: "hover:border-blue-200",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    key: "evaluate",
    emoji: "⭐",
    gradient: "from-yellow-400 to-orange-500",
    iconBg: "bg-yellow-50",
    borderHover: "hover:border-yellow-200",
    glowColor: "rgba(234,179,8,0.12)",
  },
  {
    key: "recover",
    emoji: "💰",
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50",
    borderHover: "hover:border-emerald-200",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    key: "certificates",
    emoji: "🎓",
    gradient: "from-purple-500 to-pink-600",
    iconBg: "bg-purple-50",
    borderHover: "hover:border-purple-200",
    glowColor: "rgba(168,85,247,0.12)",
  },
  {
    key: "community",
    emoji: "🌍",
    gradient: "from-sky-500 to-cyan-600",
    iconBg: "bg-sky-50",
    borderHover: "hover:border-sky-200",
    glowColor: "rgba(14,165,233,0.12)",
  },
  {
    key: "protection",
    emoji: "🛡️",
    gradient: "from-rose-500 to-red-600",
    iconBg: "bg-rose-50",
    borderHover: "hover:border-rose-200",
    glowColor: "rgba(244,63,94,0.12)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

export default function FeaturesSection({ locale: _locale }: FeaturesSectionProps) {
  const t = useTranslations("home.features");

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "#F9FAFB" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)",
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
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-700 mb-4">
            Platform Features
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

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.key}
              variants={cardVariants}
              className={`group relative bg-white rounded-3xl border border-gray-100 ${feature.borderHover} p-7 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-default overflow-hidden`}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.glowColor} 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl">{feature.emoji}</span>
                {/* Gradient ring on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-black mb-2.5 relative"
                style={{ color: "#111827" }}
              >
                {t(`${feature.key}.title` as any)}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed relative"
                style={{ color: "#6B7280" }}
              >
                {t(`${feature.key}.description` as any)}
              </p>

              {/* Bottom gradient line on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl origin-left`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
