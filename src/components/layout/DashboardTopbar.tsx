"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Bell, LogOut, Settings, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/lib/utils";

interface DashboardTopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  locale: string;
}

export default function DashboardTopbar({ user, locale }: DashboardTopbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-[#111827]">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-[#6B7280]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 p-2 pr-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || ""}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-sm font-bold">
                {getInitials(user.name || user.email || "U")}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#111827] leading-none">{user.name}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{user.email}</p>
            </div>
            <ChevronDown size={16} className="text-[#6B7280]" />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-12 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 py-2 overflow-hidden">
                <Link
                  href={`/${locale}/dashboard/settings`}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} className="text-[#6B7280]" />
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
