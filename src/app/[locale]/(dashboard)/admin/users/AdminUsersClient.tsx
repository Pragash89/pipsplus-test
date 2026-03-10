"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, ChevronLeft, ChevronRight, Trash2, Shield, Crown, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription: string;
  country: string | null;
  createdAt: Date;
  _count: { enrollments: number; certificates: number };
}

interface Props {
  users: User[];
  total: number;
  currentPage: number;
  pageSize: number;
  locale: string;
  filter?: string;
  search?: string;
}

export default function AdminUsersClient({ users, total, currentPage, pageSize, locale, filter, search }: Props) {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState(search ?? "");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    if (filter) params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  const handleFilter = (f: string) => {
    const params = new URLSearchParams();
    if (f !== "all") params.set("filter", f);
    if (searchVal) params.set("search", searchVal);
    router.push(`?${params.toString()}`);
  };

  const handleRoleChange = async (userId: string, role: string) => {
    setActionLoading(userId + "-role");
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setActionLoading(userId + "-delete");
    try {
      await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  const handlePage = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    if (filter) params.set("filter", filter);
    if (searchVal) params.set("search", searchVal);
    router.push(`?${params.toString()}`);
  };

  const FILTERS = [
    { key: "all", label: "All Users" },
    { key: "premium", label: "Premium" },
    { key: "admin", label: "Admins" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">{total.toLocaleString()} total users</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                (filter === f.key || (!filter && f.key === "all"))
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Activity</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{user.name?.charAt(0).toUpperCase() ?? "U"}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={actionLoading === user.id + "-role"}
                      className={cn(
                        "text-xs font-medium px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500",
                        user.role === "ADMIN" ? "bg-purple-50 text-purple-700 border-purple-200" :
                        user.role === "INSTRUCTOR" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-gray-50 text-gray-700 border-gray-200"
                      )}
                    >
                      <option value="TRADER">Trader</option>
                      <option value="INSTRUCTOR">Instructor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold",
                      user.subscription === "PREMIUM" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {user.subscription === "PREMIUM" ? "PRO" : "FREE"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{user._count.enrollments}</span> courses ·{" "}
                      <span className="font-medium text-gray-700">{user._count.certificates}</span> certs
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={actionLoading === user.id + "-delete"}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, total)} of {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                return (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all",
                      p === currentPage ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => handlePage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
