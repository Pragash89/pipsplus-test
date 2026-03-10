"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, Clock, Send, CheckCircle, MapPin } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError(t("form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 border border-[#1E40AF]/20 text-[#1E40AF] rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Mail size={16} />
            We respond within 24 hours
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#111827]">Contact Info</h2>

            {[
              {
                icon: Mail,
                title: "Email Us",
                value: t("info.email"),
                sub: t("info.responseTime"),
                color: "#1E40AF",
                bg: "#EFF6FF",
              },
              {
                icon: Clock,
                title: "Business Hours",
                value: t("info.office"),
                sub: "Excluding public holidays",
                color: "#10B981",
                bg: "#ECFDF5",
              },
              {
                icon: MapPin,
                title: "Headquarters",
                value: "PipsPlus Ltd.",
                sub: "Global operations",
                color: "#F59E0B",
                bg: "#FFFBEB",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{item.title}</p>
                  <p className="text-[#1E40AF] font-medium">{item.value}</p>
                  <p className="text-sm text-[#6B7280]">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* FAQ Prompt */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-[#1E40AF]/20 bg-[#EFF6FF]/50">
              <h3 className="font-bold text-[#111827] mb-2">Looking for quick answers?</h3>
              <p className="text-sm text-[#6B7280] mb-3">Check our frequently asked questions before reaching out.</p>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 text-sm text-[#1E40AF] font-semibold hover:underline"
              >
                View FAQ →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Send us a Message</h2>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-[#10B981]" size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">Message Sent!</h3>
                  <p className="text-[#6B7280]">{t("form.success")}</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-[#1E40AF] font-medium hover:underline"
                  >
                    Send another message
                  </button>
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
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">
                        {t("form.name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all text-[#111827] placeholder-gray-400"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">
                        {t("form.email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all text-[#111827] placeholder-gray-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">
                        {t("form.phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all text-[#111827] placeholder-gray-400"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">
                        {t("form.subject")} *
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all text-[#111827] bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Education Support">Education Support</option>
                        <option value="Broker Dispute">Broker Dispute</option>
                        <option value="Fund Recovery">Fund Recovery</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">
                      {t("form.message")} *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all text-[#111827] placeholder-gray-400 resize-none"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[0.99] text-base"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {isLoading ? t("form.submitting") : t("form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
