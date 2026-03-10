"use client";

import { motion } from "framer-motion";
import { Eye, Search, Scale, Globe } from "lucide-react";

export default function TrustSection({ locale }: { locale: string }) {
  const trustItems = [
    {
      icon: Eye,
      title: "100% Independent",
      description: "No broker pays for reviews. Our ratings are entirely based on real trader experiences.",
      color: "#1E40AF",
      bg: "#EFF6FF",
    },
    {
      icon: Search,
      title: "Verified Reviews",
      description: "Every review is verified and tied to a real trader account before publishing.",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      icon: Scale,
      title: "Legal Support",
      description: "Professional legal team handles fund recovery with a 78% success rate.",
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving traders in 150+ countries with support in 4 languages.",
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
            Why Traders Trust PipsPlus
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Our commitment to transparency and trader protection sets us apart from every other platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={26} style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-[#111827] text-lg mb-2">{item.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 pt-10 border-t border-gray-100"
        >
          <p className="text-center text-sm text-[#6B7280] mb-6 font-medium uppercase tracking-wider">
            Recognized by the trading community
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["FCA", "ASIC", "CySEC", "NFA", "FSCA"].map((reg) => (
              <div
                key={reg}
                className="px-6 py-2 border border-gray-300 rounded-lg text-[#6B7280] font-bold text-sm tracking-wider"
              >
                {reg}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
