"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Star, Search, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Broker {
  id: string;
  name: string;
  slug: string;
  regulation: string;
  isVerified: boolean;
  isFeatured: boolean;
  isBlacklisted: boolean;
  overallRating: { toString(): string };
  totalReviews: number;
  minDeposit: { toString(): string } | null;
  createdAt: Date;
}

interface Props {
  brokers: Broker[];
  total: number;
  locale: string;
  filter?: string;
  search?: string;
}

const FILTERS = [
  { key: "all", label: "All Brokers" },
  { key: "verified", label: "Verified" },
  { key: "featured", label: "Featured" },
  { key: "blacklisted", label: "Blacklisted" },
];

export default function AdminBrokersClient({ brokers, total, locale, filter, search }: Props) {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState(search ?? "");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleFilter = (f: string) => {
    const params = new URLSearchParams();
    if (f !== "all") params.set("filter", f);
    if (searchVal) params.set("search", searchVal);
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    if (filter && filter !== "all") params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  const toggleField = async (brokerId: string, field: "isVerified" | "isFeatured" | "isBlacklisted", current: boolean) => {
    setActionLoading(brokerId + field);
    try {
      await fetch("/api/admin/brokers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brokerId, [field]: !current }),
      });
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Broker Management</h1>
          <p className="text-gray-500 text-sm mt-1">{total} brokers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
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
              placeholder="Search broker name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
            Search
          </button>
        </form>
      </div>

      {/* Broker table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rating</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Verified</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Blacklisted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {brokers.map((broker) => {
                const rating = Number(broker.overallRating.toString());
                return (
                  <tr key={broker.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                          broker.isBlacklisted ? "bg-red-100" : "bg-blue-100"
                        )}>
                          {broker.isBlacklisted
                            ? <AlertTriangle className="w-4 h-4 text-red-600" />
                            : <Shield className="w-4 h-4 text-blue-600" />
                          }
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{broker.name}</p>
                          <p className="text-xs text-gray-400">{broker.regulation} · {broker.totalReviews} reviews</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleField(broker.id, "isVerified", broker.isVerified)}
                        disabled={!!actionLoading}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          broker.isVerified
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}
                      >
                        {broker.isVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {broker.isVerified ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleField(broker.id, "isFeatured", broker.isFeatured)}
                        disabled={!!actionLoading}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          broker.isFeatured
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}
                      >
                        {broker.isFeatured ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {broker.isFeatured ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleField(broker.id, "isBlacklisted", broker.isBlacklisted)}
                        disabled={!!actionLoading}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                          broker.isBlacklisted
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}
                      >
                        {broker.isBlacklisted ? <AlertTriangle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {broker.isBlacklisted ? "Yes" : "No"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {brokers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No brokers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
