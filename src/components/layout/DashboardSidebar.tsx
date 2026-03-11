"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, Award, Bookmark, Settings, LogOut,
  Menu, X, ChevronRight, Crown, Sparkles, Shield, Users,
  Star, FileText, AlertTriangle, MessageSquare, BarChart2
} from "lucide-react";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  adminOnly?: boolean;
}

const USER_NAV: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/courses", icon: BookOpen, label: "My Courses" },
  { href: "/dashboard/certificates", icon: Award, label: "Certificates" },
  { href: "/dashboard/brokers", icon: Bookmark, label: "Saved Brokers" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", icon: BarChart2, label: "Overview" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/courses", icon: BookOpen, label: "Courses" },
  { href: "/admin/brokers", icon: Shield, label: "Brokers" },
  { href: "/admin/reviews", icon: Star, label: "Review Queue" },
  { href: "/admin/fund-recovery", icon: AlertTriangle, label: "Fund Recovery" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Messages" },
];

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  closed: { x: "-100%", transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

const overlayVariants = {
  open: { opacity: 1, transition: { duration: 0.2 } },
  closed: { opacity: 0, transition: { duration: 0.2 } },
};

interface SidebarContentProps {
  locale: string;
  pathname: string;
  session: ReturnType<typeof useSession>["data"];
  onNavClick?: () => void;
}

function SidebarContent({ locale, pathname, session, onNavClick }: SidebarContentProps) {
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isAdminSection = pathname.includes("/admin");

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === "/dashboard" || href === "/admin") return pathname === fullPath;
    return pathname.startsWith(fullPath);
  };

  const userName = session?.user?.name ?? "Trader";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image;
  const isPremium = ["TRADER", "PROFESSIONAL"].includes((session?.user as any)?.subscription);

  const navItems = isAdminSection && isAdmin ? ADMIN_NAV : USER_NAV;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-200 shrink-0">
        <Image src="/logo-dark.png" alt="PipsPlus" width={120} height={32} className="h-8 w-auto" />
      </div>

      {/* Admin/User toggle for admins */}
      {isAdmin && (
        <div className="px-3 pt-3">
          <div className="flex rounded-xl bg-gray-100 p-1">
            <Link
              href={`/${locale}/dashboard`}
              onClick={onNavClick}
              className={cn(
                "flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all",
                !isAdminSection ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              My Dashboard
            </Link>
            <Link
              href={`/${locale}/admin`}
              onClick={onNavClick}
              className={cn(
                "flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all",
                isAdminSection ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5" aria-label="Dashboard navigation">
        {isAdminSection && isAdmin && (
          <p className="px-3 pb-1 pt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Administration</p>
        )}
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              onClick={onNavClick}
              className={cn(
                "group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? isAdminSection ? "bg-purple-50 text-purple-700 shadow-sm" : "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full",
                  isAdminSection ? "bg-purple-600" : "bg-blue-600"
                )} />
              )}
              <span className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                active
                  ? isAdminSection ? "bg-purple-600 text-white shadow-md shadow-purple-200" : "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
              )}>
                <Icon size={16} />
              </span>
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={14} className={isAdminSection ? "text-purple-500" : "text-blue-500"} />}
            </Link>
          );
        })}
      </nav>

      {/* Premium upsell (user only) */}
      {!isAdminSection && !isPremium && (
        <div className="mx-3 mb-3">
          <Link
            href={`/${locale}/subscriptions`}
            onClick={onNavClick}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-900 transition-all hover:shadow-lg group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 text-yellow-300 shrink-0">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Upgrade to Premium</p>
              <p className="text-[10px] text-blue-200 mt-0.5 leading-tight">Unlock advanced courses & certificates</p>
            </div>
          </Link>
        </div>
      )}

      {/* User section */}
      <div className="border-t border-gray-200 px-3 py-3 space-y-1.5 shrink-0">
        <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-gray-50">
          <div className="relative shrink-0">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200" />
            ) : (
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600 ring-2 ring-gray-200">
                {getInitials(userName)}
              </div>
            )}
            {isPremium && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-yellow-400 rounded-full shadow-sm">
                <Crown size={9} className="text-yellow-900" />
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight">{userName}</p>
              {isPremium && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200 shrink-0">PRO</span>
              )}
              {isAdmin && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700 border border-purple-200 shrink-0">ADMIN</span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 truncate leading-tight mt-0.5">{userEmail}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: `/${locale}` })}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-600 transition-all">
            <LogOut size={16} />
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0" aria-label="Dashboard sidebar">
        <SidebarContent locale={locale} pathname={pathname} session={session} />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial="closed" animate="open" exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="sidebar"
            initial="closed" animate="open" exit="closed"
            variants={sidebarVariants}
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
          >
            <SidebarContent locale={locale} pathname={pathname} session={session} onNavClick={() => setMobileOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile topbar button — rendered outside the sidebar in layout */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>
    </>
  );
}
