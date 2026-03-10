"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Shield, FileText, Scale, CheckCircle2, AlertTriangle,
  ArrowRight, DollarSign, Clock, TrendingUp, Send
} from "lucide-react";

export default function FundRecoveryPage() {
  const t = useTranslations("fundRecovery");
  const params = useParams();
  const locale = params.locale as string;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    brokerName: "",
    amountLost: "",
    currency: "USD",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/fund-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amountLost: form.amountLost ? parseFloat(form.amountLost) : undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      icon: FileText,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
      color: "#1E40AF",
      bg: "#EFF6FF",
      step: "01",
    },
    {
      icon: Shield,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
      color: "#10B981",
      bg: "#ECFDF5",
      step: "02",
    },
    {
      icon: Scale,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
      color: "#F59E0B",
      bg: "#FFFBEB",
      step: "03",
    },
    {
      icon: CheckCircle2,
      title: t("howItWorks.step4.title"),
      description: t("howItWorks.step4.description"),
      color: "#8B5CF6",
      bg: "#F5F3FF",
      step: "04",
    },
  ];

  const stats = [
    { value: "$47M+", label: t("stats.recovered"), icon: DollarSign, color: "#10B981" },
    { value: "2,847", label: t("stats.cases"), icon: CheckCircle2, color: "#1E40AF" },
    { value: "78%", label: t("stats.rate"), icon: TrendingUp, color: "#F59E0B" },
    { value: "90 days", label: t("stats.time"), icon: Clock, color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-24 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-500 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Scale size={14} />
            {t("badge")}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed mb-10">
            {t("subtitle")}
          </p>
          <a
            href="#submit-case"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E40AF] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-lg"
          >
            Submit Your Case
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-6 px-4 bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto flex items-center gap-4 text-amber-800">
          <AlertTriangle className="flex-shrink-0 text-amber-600" size={24} />
          <p className="text-sm">
            <strong>Important:</strong> We only pursue legally recoverable funds from regulated jurisdictions. We do not charge upfront fees. Success-based compensation only. Beware of imposters.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-black text-[#111827] mb-1">{stat.value}</div>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("howItWorks.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="text-6xl font-black text-gray-100 mb-4">{step.step}</div>
                  <div className="p-3 rounded-xl inline-flex mb-4" style={{ backgroundColor: step.bg }}>
                    <step.icon size={24} style={{ color: step.color }} />
                  </div>
                  <h3 className="font-bold text-[#111827] text-lg mb-2">{step.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 items-center">
                    <ArrowRight className="text-gray-300" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Submission Form */}
      <section id="submit-case" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
              {t("form.title")}
            </h2>
            <p className="text-[#6B7280] text-lg">
              Fill in the details below. Our team will review your case within 24-48 hours.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-[#10B981]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-3">Case Submitted Successfully</h3>
                <p className="text-[#6B7280] text-lg">{t("form.success")}</p>
                <p className="text-sm text-[#6B7280] mt-2">{t("form.disclaimer")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.name")} *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                      placeholder="Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.email")} *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                      placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.phone")}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.country")}</label>
                    <input type="text" name="country" value={form.country} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                      placeholder="United States" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.brokerName")} *</label>
                  <input type="text" name="brokerName" value={form.brokerName} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                    placeholder="Broker Company Name" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.amountLost")}</label>
                    <input type="number" name="amountLost" value={form.amountLost} onChange={handleChange} min="0"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 transition-all"
                      placeholder="10000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Currency</label>
                    <select name="currency" value={form.currency} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] bg-white transition-all">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t("form.description")} *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required
                    rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-[#111827] placeholder-gray-400 resize-none transition-all"
                    placeholder={t("form.descriptionPlaceholder")} />
                </div>

                <div className="bg-[#F9FAFB] rounded-xl p-4 text-sm text-[#6B7280]">
                  <p>🔒 {t("form.disclaimer")}</p>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[0.99] text-base">
                  {isLoading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Send size={18} />}
                  {isLoading ? t("form.submitting") : t("form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
