import { getTranslations } from "next-intl/server";
import { Shield, Users, BookOpen, Globe, Eye, Heart, Lock, Star } from "lucide-react";
import { STATS, TEAM_MEMBERS } from "@/lib/constants/site";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const stats = [
    { value: "3.72M+", label: t("stats.traders"), color: "#1E40AF" },
    { value: "1,247+", label: t("stats.brokers"), color: "#10B981" },
    { value: "87", label: t("stats.courses"), color: "#F59E0B" },
    { value: "150+", label: t("stats.countries"), color: "#8B5CF6" },
  ];

  const values = [
    {
      icon: Eye,
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
      color: "#1E40AF",
      bg: "#EFF6FF",
    },
    {
      icon: BookOpen,
      title: t("values.education.title"),
      description: t("values.education.description"),
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      icon: Shield,
      title: t("values.protection.title"),
      description: t("values.protection.description"),
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    {
      icon: Heart,
      title: t("values.community.title"),
      description: t("values.community.description"),
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Star size={14} fill="currentColor" />
            Trusted since 2018
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="text-4xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <p className="text-[#6B7280] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-6">
              {t("mission.title")}
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              {t("mission.description")}
            </p>
            <div className="space-y-4">
              {[
                "Free education for every trader worldwide",
                "100% independent broker evaluations",
                "Legal fund recovery for cheated traders",
                "Physical certificates shipped globally",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[#374151] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)" }}>
              <div className="p-12 text-white">
                <div className="text-7xl font-black mb-4 opacity-20">6+</div>
                <div className="text-5xl font-black mb-2">Years</div>
                <p className="text-blue-200 text-lg">of protecting and educating traders worldwide</p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="text-3xl font-black">78%</div>
                    <div className="text-blue-200 text-sm mt-1">Fund Recovery Rate</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="text-3xl font-black">4.9★</div>
                    <div className="text-blue-200 text-sm mt-1">Avg. User Rating</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#10B981] opacity-20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("values.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div
                  className="p-3 rounded-xl h-fit flex-shrink-0"
                  style={{ backgroundColor: v.bg }}
                >
                  <v.icon size={24} style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-lg mb-2">{v.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("team.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-bold text-[#111827] text-lg">{member.name}</h3>
                <p className="text-[#1E40AF] text-sm font-medium mt-1">{member.role}</p>
                <p className="text-[#6B7280] text-sm mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Together, we can make trading safer and more accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/register`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1E40AF] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              <Users size={20} />
              Join 3.72M+ Traders
            </a>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
