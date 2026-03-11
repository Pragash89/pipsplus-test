import { getTranslations } from "next-intl/server";
import { Check, Star, Award, Package, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default async function SubscriptionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "subscriptions" });

  const explorerFeatures = t.raw("explorer.features") as string[];
  const traderFeatures = t.raw("trader.features") as string[];
  const professionalFeatures = t.raw("professional.features") as string[];

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  const certFeatures = [
    t("certificate.feature1"),
    t("certificate.feature2"),
    t("certificate.feature3"),
    t("certificate.feature4"),
    t("certificate.feature5"),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 border border-[#1E40AF]/20 text-[#1E40AF] rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Zap size={14} />
            No credit card required to start
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Explorer Plan */}
            <div className="relative bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="mb-8">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap size={20} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-[#111827] mb-1">
                  {t("explorer.name")}
                </h2>
                <p className="text-[#6B7280] text-sm mb-6">{t("explorer.description")}</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-[#111827]">{t("explorer.price")}</span>
                  <span className="text-[#6B7280] mb-2">{t("explorer.period")}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/register`}
                className="block w-full text-center py-3 px-6 border-2 border-[#1E40AF] text-[#1E40AF] font-bold rounded-xl hover:bg-[#EFF6FF] transition-all mb-8"
              >
                {t("explorer.cta")}
              </Link>

              <ul className="space-y-3">
                {explorerFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-emerald-600" />
                    </div>
                    <span className="text-[#374151] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trader Plan */}
            <div className="relative bg-white rounded-3xl border-2 border-[#1E40AF]/30 p-8 shadow-md hover:shadow-lg transition-all">
              <div className="mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Star size={20} className="text-[#1E40AF]" />
                </div>
                <h2 className="text-2xl font-black text-[#111827] mb-1">
                  {t("trader.name")}
                </h2>
                <p className="text-[#6B7280] text-sm mb-6">{t("trader.description")}</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-[#111827]">{t("trader.price")}</span>
                  <span className="text-[#6B7280] mb-2">{t("trader.period")}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/register`}
                className="block w-full text-center py-3 px-6 bg-[#1E40AF] text-white font-bold rounded-xl hover:bg-[#1E3A8A] transition-all mb-8 shadow-md"
              >
                {t("trader.cta")}
              </Link>

              <ul className="space-y-3">
                {traderFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#1E40AF]" />
                    </div>
                    <span className="text-[#374151] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Plan */}
            <div className="relative bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl p-8 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Star size={12} fill="currentColor" />
                  {t("professional.badge")}
                </span>
              </div>

              <div className="mb-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Award size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-black text-white mb-1">
                  {t("professional.name")}
                </h2>
                <p className="text-blue-200 text-sm mb-6">{t("professional.description")}</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white">{t("professional.price")}</span>
                  <span className="text-blue-200 mb-2">{t("professional.period")}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/register`}
                className="block w-full text-center py-3 px-6 bg-white text-[#1E40AF] font-bold rounded-xl hover:bg-blue-50 transition-all mb-8 shadow-md"
              >
                {t("professional.cta")}
              </Link>

              <ul className="space-y-3">
                {professionalFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-blue-100 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <Award size={16} />
              Professional Feature
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("certificate.title")}
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-6">
              {t("certificate.description")}
            </p>
            <p className="font-semibold text-[#111827] mb-4">{t("certificate.includes")}</p>
            <ul className="space-y-3">
              {certFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-amber-600" />
                  </div>
                  <span className="text-[#374151]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificate Preview */}
          <div className="relative">
            <div className="bg-white rounded-3xl border-4 border-amber-200 p-8 shadow-2xl shadow-amber-100 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="text-amber-600" size={36} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Certificate of Completion</p>
                <h3 className="text-2xl font-black text-[#111827] mb-1">PipsPlus Academy</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#1E40AF] to-[#10B981] mx-auto rounded-full mb-4" />
              </div>
              <p className="text-[#6B7280] text-sm mb-1">This certifies that</p>
              <p className="text-xl font-bold text-[#111827] mb-1">John Smith</p>
              <p className="text-[#6B7280] text-sm mb-4">has successfully completed</p>
              <p className="text-lg font-bold text-[#1E40AF] mb-6">Beginner Trader Foundation</p>
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <p className="text-xs text-gray-400">Date Issued</p>
                  <p className="text-sm font-medium text-[#374151]">Feb 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Certificate Code</p>
                  <p className="text-sm font-mono font-bold text-[#1E40AF]">PP-A8F3K9</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
                <Package size={14} className="text-[#10B981]" />
                <span className="text-xs text-[#6B7280]">Physical copy shipped via tracked post</span>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-100 opacity-50 blur-xl" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-blue-100 opacity-50 blur-xl" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("faq.title")}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-[#F9FAFB] border border-gray-200 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#111827] hover:text-[#1E40AF] list-none">
                  {faq.q}
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 ml-4 group-open:bg-[#1E40AF] transition-colors">
                    <svg
                      className="w-3 h-3 transition-transform group-open:rotate-180 text-gray-600 group-open:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-[#6B7280] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Start Learning Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 3.72M+ traders. No credit card required to get started.
          </p>
          <Link
            href={`/${locale}/register`}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1E40AF] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-lg"
          >
            Get Started Free
            <Shield size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
