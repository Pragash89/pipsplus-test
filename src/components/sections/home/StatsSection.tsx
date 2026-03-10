"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CountUp } from "@/components/animations/CountUp";
import { Users, BookOpen, BarChart2, DollarSign } from "lucide-react";

interface StatsSectionProps {
  locale: string;
}

const stats = [
  {
    key: "traders",
    end: 3720000,
    prefix: "",
    suffix: "+",
    label: "Active Traders",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accentColor: "#1E40AF",
    description: "Traders learning & growing daily",
  },
  {
    key: "courses",
    end: 87,
    prefix: "",
    suffix: "",
    label: "Free Courses",
    icon: BookOpen,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accentColor: "#10B981",
    description: "Covering all trading topics",
  },
  {
    key: "brokers",
    end: 1247,
    prefix: "",
    suffix: "+",
    label: "Reviewed Brokers",
    icon: BarChart2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    accentColor: "#6366F1",
    description: "Independently verified ratings",
  },
  {
    key: "recovered",
    end: 47,
    prefix: "$",
    suffix: "M+",
    label: "Funds Recovered",
    icon: DollarSign,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    accentColor: "#F97316",
    description: "Returned to victimized traders",
  },
];

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  }
  if (value >= 1000) {
    return value.toLocaleString();
  }
  return String(value);
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

export default function StatsSection({ locale: _locale }: StatsSectionProps) {
  const t = useTranslations("home.stats");

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Subtle top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1E40AF 30%, #10B981 70%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2
            className="text-3xl lg:text-4xl font-black mb-3"
            style={{ color: "#111827" }}
          >
            {t("title")}
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                variants={cardVariants}
                className="group relative flex flex-col items-center text-center p-6 lg:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.accentColor}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>

                {/* Animated number */}
                <div className="mb-2">
                  {stat.key === "traders" ? (
                    <span
                      className="text-3xl lg:text-4xl font-black tabular-nums"
                      style={{ color: "#111827" }}
                    >
                      {stat.prefix}
                      <CountUp
                        end={3.72}
                        decimals={2}
                        duration={2.5}
                        suffix="M+"
                        className="text-3xl lg:text-4xl font-black"
                      />
                    </span>
                  ) : (
                    <span
                      className="text-3xl lg:text-4xl font-black tabular-nums"
                      style={{ color: "#111827" }}
                    >
                      <CountUp
                        end={stat.end}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2.2}
                        className="text-3xl lg:text-4xl font-black"
                      />
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  className="text-base font-bold mb-1"
                  style={{ color: "#111827" }}
                >
                  {t(stat.key as "traders" | "courses" | "brokers" | "recovered")}
                </p>

                {/* Description */}
                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
