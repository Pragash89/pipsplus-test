"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants/site";
import { Mail, ArrowRight, Linkedin, Youtube } from "lucide-react";

const TelegramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FOOTER_LINKS = {
  learn: [
    { href: "/education", label: "Trading Basics" },
    { href: "/education?category=FOREX", label: "Forex Trading" },
    { href: "/education?category=CRYPTO", label: "Cryptocurrency" },
    { href: "/education?category=TECHNICAL_ANALYSIS", label: "Technical Analysis" },
    { href: "/education?category=RISK_MANAGEMENT", label: "Risk Management" },
    { href: "/education?category=PSYCHOLOGY", label: "Trading Psychology" },
  ],
  brokers: [
    { href: "/brokers", label: "All Broker Reviews" },
    { href: "/brokers?regulation=FCA", label: "FCA Regulated" },
    { href: "/brokers?regulation=ASIC", label: "ASIC Regulated" },
    { href: "/brokers?regulation=CySEC", label: "CySEC Regulated" },
    { href: "/brokers?sort=rating", label: "Top Rated Brokers" },
    { href: "/brokers?blacklisted=true", label: "Blacklisted Brokers" },
  ],
  services: [
    { href: "/fund-recovery", label: "Fund Recovery" },
    { href: "/subscriptions", label: "Pricing Plans" },
    { href: "/subscriptions#certificates", label: "Certificates" },
    { href: "/register", label: "Get Started Free" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/about#team", label: "Our Team" },
    { href: "/about#values", label: "Our Values" },
    { href: "/about#careers", label: "Careers" },
  ],
};

const SOCIAL_LINKS = [
  { href: "https://twitter.com/pipsplus", label: "X (Twitter)", icon: XIcon },
  { href: "https://linkedin.com/company/pipsplus", label: "LinkedIn", icon: Linkedin },
  { href: "https://youtube.com/@pipsplus", label: "YouTube", icon: Youtube },
  { href: "https://t.me/pipsplus", label: "Telegram", icon: TelegramIcon },
];

export default function Footer() {
  const t = useTranslations("common");
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubscribed(true);
    setSubscribing(false);
    setEmail("");
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(155deg, #0F172A 0%, #0D1F4E 40%, #1E3A8A 100%)" }}
      aria-label="Site footer"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Glow accents */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1E40AF, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #10B981, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Logo + newsletter */}
        <div className="py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center group mb-4"
              aria-label="PipsPlus Home"
            >
              <Image
                src="/logo-light.png"
                alt="PipsPlus"
                width={140}
                height={40}
                className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
              {t("footer.tagline")}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["150+ Countries", "3.72M+ Traders", "$47M+ Recovered"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/8 text-[#CBD5E1] border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-md w-full">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail size={16} className="text-[#10B981]" />
                <span className="text-sm font-semibold text-white">Trading Insights Newsletter</span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
                Weekly market analysis, broker alerts, and exclusive course content — free.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2.5 py-3 px-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl">
                  <span className="text-[#10B981] text-lg">✓</span>
                  <span className="text-sm text-[#6EE7B7] font-medium">You're subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className={cn(
                        "w-full pl-9 pr-3 py-2.5 rounded-xl text-sm",
                        "bg-white/8 border border-white/15 text-white placeholder-[#475569]",
                        "focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent",
                        "transition-all duration-200"
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribing}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold",
                      "bg-[#1E40AF] hover:bg-[#1E3A8A] text-white",
                      "transition-all duration-200 shrink-0",
                      "focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 focus:ring-offset-[#0F172A]",
                      subscribing && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {subscribing ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 border-b border-white/10">
          {/* Learn */}
          <div>
            <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-widest mb-5">
              {t("footer.links.learn")}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brokers */}
          <div>
            <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-widest mb-5">
              {t("footer.links.brokers")}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.brokers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-widest mb-5">
              {t("footer.links.services")}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-widest mb-5">
              {t("footer.links.company")}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright + legal */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-[#64748B]">
            <span>{t("footer.copyright")}</span>
            <span className="hidden sm:inline text-[#334155]">·</span>
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/privacy`}
                className="hover:text-white transition-colors duration-150"
              >
                {t("footer.privacy")}
              </Link>
              <span className="text-[#334155]">·</span>
              <Link
                href={`/${locale}/terms`}
                className="hover:text-white transition-colors duration-150"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl",
                  "text-[#64748B] hover:text-white",
                  "bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20",
                  "transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                )}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-6">
          <p className="text-xs text-[#475569] leading-relaxed max-w-3xl">
            <strong className="text-[#64748B]">Risk Disclaimer:</strong>{" "}
            Trading financial instruments involves substantial risk and may not be suitable for all investors.
            Past performance is not indicative of future results. {SITE_NAME} does not provide financial advice.
            Always conduct your own research before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
