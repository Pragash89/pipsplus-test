"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Menu, X, ChevronDown, Globe, BookOpen,
  Shield, BarChart2, Users, TrendingUp, LayoutDashboard
} from "lucide-react";

const LOCALES = ["en", "ar", "es", "fr"] as const;
const LOCALE_LABELS: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  ar: { name: "العربية", flag: "🇦🇪" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
};

const NAV_ITEMS = [
  {
    label: "Learn Forex",
    href: "/education",
    children: [
      { label: "Forex Basics", href: "/education?category=BASICS", icon: BookOpen, desc: "Start from the very beginning" },
      { label: "Technical Analysis", href: "/education?category=TECHNICAL_ANALYSIS", icon: BarChart2, desc: "Charts, patterns & indicators" },
      { label: "Risk Management", href: "/education?category=RISK_MANAGEMENT", icon: Shield, desc: "Protect your capital" },
      { label: "Trading Psychology", href: "/education?category=PSYCHOLOGY", icon: Users, desc: "Master your mindset" },
    ],
  },
  {
    label: "Brokers",
    href: "/brokers",
    children: [
      { label: "Top Brokers", href: "/brokers", icon: TrendingUp, desc: "Reviewed & rated brokers" },
      { label: "Blacklist", href: "/brokers?filter=blacklisted", icon: Shield, desc: "Scam brokers to avoid" },
      { label: "Compare Brokers", href: "/brokers?view=compare", icon: BarChart2, desc: "Side-by-side comparison" },
    ],
  },
  { label: "Quizzes", href: "/education" },
  {
    label: "Tools",
    href: "#",
    children: [
      { label: "Fund Recovery", href: "/fund-recovery", icon: Shield, desc: "Report & recover lost funds" },
      { label: "Subscriptions", href: "/subscriptions", icon: TrendingUp, desc: "Premium plans" },
    ],
  },
  { label: "About", href: "/about" },
];

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  desc?: string;
}

function NavDropdown({ items, locale }: { items: DropdownItem[]; locale: string }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          href={`/${locale}${item.href}`}
          className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
        >
          {item.icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
              <item.icon className="w-4 h-4 text-blue-700" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{item.label}</p>
            {item.desc && <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "#") return false;
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
  };

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.replace(segments.join("/") || "/");
    setLangOpen(false);
  };

  const currentLocale = LOCALE_LABELS[locale] ?? LOCALE_LABELS["en"];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16" ref={navRef}>
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0" aria-label="PipsPlus Home">
              <Image
                src="/logo-dark.png"
                alt="PipsPlus"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                          openDropdown === item.label
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"
                        )}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={cn("transition-transform duration-200", openDropdown === item.label && "rotate-180")}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div
                          onMouseEnter={() => setOpenDropdown(item.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <NavDropdown items={item.children} locale={locale} />
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 block",
                        isActive(item.href)
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Language switcher */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
                  aria-expanded={langOpen}
                >
                  <Globe size={15} />
                  <span>{currentLocale.flag}</span>
                  <ChevronDown size={12} className={cn("transition-transform", langOpen && "rotate-180")} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    {LOCALES.map((loc) => {
                      const info = LOCALE_LABELS[loc];
                      return (
                        <button
                          key={loc}
                          onClick={() => handleLocaleChange(loc)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors",
                            loc === locale ? "text-blue-700 bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          <span>{info.flag}</span>
                          <span>{info.name}</span>
                          {loc === locale && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-700" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="w-px h-5 bg-gray-200 mx-1" />

              {session ? (
                <>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href={`/${locale}/admin`}>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-purple-700 hover:bg-purple-50">
                        <LayoutDashboard size={14} />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href={`/${locale}/dashboard`}>
                    <Button variant="primary" size="sm">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/${locale}/login`}>
                    <Button variant="ghost" size="sm">Log In</Button>
                  </Link>
                  <Link href={`/${locale}/register`}>
                    <Button variant="primary" size="sm" className="shadow-md">Get Started Free</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[min(320px,90vw)] bg-white shadow-2xl lg:hidden",
          "transform transition-transform duration-300 ease-in-out flex flex-col",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <Link href={`/${locale}`} onClick={() => setMobileOpen(false)}>
            <Image src="/logo-dark.png" alt="PipsPlus" width={120} height={36} className="h-8 w-auto" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <p className="px-3 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={`/${locale}${child.href}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all"
                    >
                      {child.icon && <child.icon className="w-4 h-4 text-gray-400" />}
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive(item.href) ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-gray-200">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">Language</p>
          <div className="grid grid-cols-2 gap-1.5">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                onClick={() => { handleLocaleChange(loc); setMobileOpen(false); }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border",
                  loc === locale ? "bg-blue-50 text-blue-700 font-semibold border-blue-200" : "text-gray-600 border-transparent hover:bg-gray-50"
                )}
              >
                <span>{LOCALE_LABELS[loc].flag}</span>
                <span>{LOCALE_LABELS[loc].name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-200 flex flex-col gap-2.5">
          {session ? (
            <Link href={`/${locale}/dashboard`} onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href={`/${locale}/login`} onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="md" className="w-full justify-center">Log In</Button>
              </Link>
              <Link href={`/${locale}/register`} onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center">Get Started Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="h-16" aria-hidden="true" />
    </>
  );
}
