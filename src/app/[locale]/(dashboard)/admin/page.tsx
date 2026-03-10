import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users, BookOpen, Star, FileText, TrendingUp,
  Shield, AlertTriangle, CheckCircle, Clock,
  Activity, DollarSign, UserCheck, BarChart3,
} from "lucide-react";

async function getAdminStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalUsers,
    newUsersThisMonth,
    newUsersLastMonth,
    totalCourses,
    totalEnrollments,
    newEnrollmentsThisMonth,
    pendingReviews,
    totalBrokers,
    verifiedBrokers,
    blacklistedBrokers,
    openRecoveryCases,
    resolvedRecoveryCases,
    unreadContacts,
    premiumUsers,
    freeUsers,
    totalCertificates,
    totalLessonCompletions,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.user.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.enrollment.count(),
    prisma.enrollment.count({ where: { enrolledAt: { gte: startOfMonth } } }),
    prisma.brokerReview.count({ where: { status: "PENDING" } }),
    prisma.broker.count({ where: { isBlacklisted: false } }),
    prisma.broker.count({ where: { isVerified: true } }),
    prisma.broker.count({ where: { isBlacklisted: true } }),
    prisma.fundRecoveryCase.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS"] } } }),
    prisma.fundRecoveryCase.count({ where: { status: "RESOLVED" } }),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.user.count({ where: { subscription: "PREMIUM" } }),
    prisma.user.count({ where: { subscription: "FREE" } }),
    prisma.certificate.count(),
    prisma.lessonProgress.count(),
  ]);

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: { id: true, name: true, email: true, role: true, subscription: true, createdAt: true, country: true },
  });

  const recentReviews = await prisma.brokerReview.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      broker: { select: { name: true } },
      user: { select: { name: true } },
    },
  });

  const userGrowth = newUsersLastMonth > 0
    ? Math.round(((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100)
    : newUsersThisMonth > 0 ? 100 : 0;

  return {
    totalUsers, newUsersThisMonth, userGrowth,
    totalCourses, totalEnrollments, newEnrollmentsThisMonth,
    pendingReviews, totalBrokers, verifiedBrokers, blacklistedBrokers,
    openRecoveryCases, resolvedRecoveryCases,
    unreadContacts, premiumUsers, freeUsers,
    totalCertificates, totalLessonCompletions,
    premiumRate: Math.round((premiumUsers / Math.max(totalUsers, 1)) * 100),
    recentUsers, recentReviews,
  };
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect(`/${locale}/dashboard`);
  }

  const stats = await getAdminStats();

  return (
    <div className="space-y-6">

      {/* Admin command header - dark slate, distinct from client blue gradient */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Platform Live</span>
            </div>
            <h1 className="text-2xl font-bold">Admin Command Center</h1>
            <p className="text-slate-400 text-sm mt-1">Full platform control &amp; analytics</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="text-slate-300 text-sm mt-1">
              <Clock className="w-3.5 h-3.5 inline mr-1" />
              {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>

        {/* Subscription bar */}
        <div className="mt-5 bg-slate-800/60 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Subscription Breakdown</span>
            <span className="text-xs text-slate-300">{stats.totalUsers} total members</span>
          </div>
          <div className="flex rounded-full overflow-hidden h-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
              style={{ width: `${stats.premiumRate}%` }}
            />
            <div className="bg-slate-600 flex-1" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-slate-300">{stats.premiumUsers} Premium ({stats.premiumRate}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-400">{stats.freeUsers} Free ({100 - stats.premiumRate}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Clients",
            value: stats.totalUsers.toLocaleString(),
            sub: `+${stats.newUsersThisMonth} this month`,
            growth: stats.userGrowth,
            icon: Users,
            color: "blue",
            href: `/${locale}/admin/users`,
          },
          {
            label: "Premium Members",
            value: stats.premiumUsers.toLocaleString(),
            sub: `${stats.premiumRate}% conversion rate`,
            icon: DollarSign,
            color: "amber",
            href: `/${locale}/admin/users?filter=premium`,
          },
          {
            label: "Total Enrollments",
            value: stats.totalEnrollments.toLocaleString(),
            sub: `+${stats.newEnrollmentsThisMonth} this month`,
            icon: BookOpen,
            color: "emerald",
            href: `/${locale}/admin/courses`,
          },
          {
            label: "Certificates Issued",
            value: stats.totalCertificates.toLocaleString(),
            sub: `${stats.totalLessonCompletions} lessons completed`,
            icon: UserCheck,
            color: "purple",
            href: `/${locale}/admin/courses`,
          },
        ].map((card) => {
          const colorMap: Record<string, { bg: string; text: string; border: string }> = {
            blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
            amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
            emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
            purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
          };
          const c = colorMap[card.color];
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`bg-white rounded-2xl border ${c.border} p-5 shadow-sm hover:shadow-md transition-all group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${c.text}`} />
                </div>
                {"growth" in card && card.growth !== undefined && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.growth >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {card.growth >= 0 ? "+" : ""}{card.growth}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Platform health row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Brokers",
            value: stats.totalBrokers,
            sub: `${stats.verifiedBrokers} verified`,
            badge: stats.blacklistedBrokers > 0 ? `${stats.blacklistedBrokers} blacklisted` : "Clean",
            badgeColor: stats.blacklistedBrokers > 0 ? "red" : "emerald",
            icon: Shield,
            href: `/${locale}/admin/brokers`,
          },
          {
            label: "Pending Reviews",
            value: stats.pendingReviews,
            sub: "Awaiting moderation",
            badge: stats.pendingReviews > 5 ? "Urgent" : stats.pendingReviews > 0 ? "Pending" : "All clear",
            badgeColor: stats.pendingReviews > 5 ? "red" : stats.pendingReviews > 0 ? "amber" : "emerald",
            icon: Star,
            href: `/${locale}/admin/reviews`,
          },
          {
            label: "Recovery Cases",
            value: stats.openRecoveryCases,
            sub: `${stats.resolvedRecoveryCases} resolved total`,
            badge: stats.openRecoveryCases > 0 ? "Open" : "All resolved",
            badgeColor: stats.openRecoveryCases > 0 ? "red" : "emerald",
            icon: AlertTriangle,
            href: `/${locale}/admin/fund-recovery`,
          },
          {
            label: "Unread Messages",
            value: stats.unreadContacts,
            sub: "Contact submissions",
            badge: stats.unreadContacts > 0 ? "Unread" : "All read",
            badgeColor: stats.unreadContacts > 0 ? "amber" : "emerald",
            icon: FileText,
            href: `/${locale}/admin/contacts`,
          },
        ].map((card) => {
          const badgeColors: Record<string, string> = {
            red: "bg-red-100 text-red-700",
            amber: "bg-amber-100 text-amber-700",
            emerald: "bg-emerald-100 text-emerald-700",
          };
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                  <card.icon className="w-4.5 h-4.5 text-slate-600" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[card.badgeColor]}`}>
                  {card.badge}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Tables row */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent clients table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-gray-900 text-sm">Recent Clients</h2>
            </div>
            <Link href={`/${locale}/admin/users`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Manage all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.country ?? user.email}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {user.subscription === "PREMIUM" ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Premium</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">Free</span>
                  )}
                  {user.role === "ADMIN" && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>
                  )}
                </div>
              </div>
            ))}
            {stats.recentUsers.length === 0 && (
              <p className="text-center text-gray-400 py-8 text-sm">No users yet</p>
            )}
          </div>
        </div>

        {/* Pending reviews */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <h2 className="font-semibold text-gray-900 text-sm">Pending Review Queue</h2>
              {stats.pendingReviews > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {stats.pendingReviews}
                </span>
              )}
            </div>
            <Link href={`/${locale}/admin/reviews`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              Moderate →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentReviews.map((review) => (
              <div key={review.id} className="flex items-center gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{review.title}</p>
                  <p className="text-xs text-gray-400">{review.broker.name} · {review.user.name}</p>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-xs ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
              </div>
            ))}
            {stats.recentReviews.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-2" />
                <p className="text-gray-400 text-sm font-medium">All reviews moderated!</p>
                <p className="text-gray-300 text-xs mt-1">Nothing in the queue</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform overview bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-slate-500" />
          <h2 className="font-semibold text-gray-900 text-sm">Platform Overview</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Courses Live", value: stats.totalCourses, color: "blue" },
            { label: "Verified Brokers", value: stats.verifiedBrokers, color: "emerald" },
            { label: "Lessons Completed", value: stats.totalLessonCompletions, color: "indigo" },
            { label: "Certificates", value: stats.totalCertificates, color: "amber" },
            { label: "Cases Resolved", value: stats.resolvedRecoveryCases, color: "emerald" },
            { label: "Blacklisted", value: stats.blacklistedBrokers, color: "red" },
          ].map((item) => {
            const colMap: Record<string, string> = {
              blue: "text-blue-600", emerald: "text-emerald-600",
              indigo: "text-indigo-600", amber: "text-amber-600", red: "text-red-600",
            };
            return (
              <div key={item.label} className="text-center">
                <p className={`text-2xl font-bold ${colMap[item.color]}`}>{item.value.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Manage Users", href: `/${locale}/admin/users`, icon: Users, color: "slate" },
          { label: "Review Queue", href: `/${locale}/admin/reviews`, icon: Star, color: "amber" },
          { label: "Broker Control", href: `/${locale}/admin/brokers`, icon: Shield, color: "blue" },
          { label: "Fund Recovery", href: `/${locale}/admin/fund-recovery`, icon: TrendingUp, color: "emerald" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl p-3.5 transition-all group"
          >
            <action.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

    </div>
  );
}
