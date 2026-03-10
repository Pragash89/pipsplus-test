"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clock, CheckCircle, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface FundCase {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  brokerName: string;
  amountLost: { toString(): string } | null;
  currency: string | null;
  description: string;
  status: string;
  adminNotes: string | null;
  createdAt: Date;
}

interface Props {
  cases: FundCase[];
  total: number;
  currentPage: number;
  pageSize: number;
  statusFilter?: string;
  statusCounts: Record<string, number>;
  locale: string;
}

const STATUS_OPTIONS = [
  { key: "SUBMITTED", label: "Submitted", icon: Clock, color: "bg-gray-100 text-gray-700" },
  { key: "UNDER_REVIEW", label: "Under Review", icon: AlertTriangle, color: "bg-amber-100 text-amber-700" },
  { key: "IN_PROGRESS", label: "In Progress", icon: Clock, color: "bg-blue-100 text-blue-700" },
  { key: "RESOLVED", label: "Resolved", icon: CheckCircle, color: "bg-emerald-100 text-emerald-700" },
  { key: "CLOSED", label: "Closed", icon: CheckCircle, color: "bg-gray-100 text-gray-500" },
];

export default function AdminFundRecoveryClient({
  cases, total, currentPage, pageSize, statusFilter, statusCounts, locale
}: Props) {
  const router = useRouter();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const totalPages = Math.ceil(total / pageSize);

  const handleStatusChange = async (caseId: string, status: string) => {
    setActionLoading(caseId + "-status");
    try {
      await fetch("/api/admin/fund-recovery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId, status, adminNotes: notesMap[caseId] }),
      });
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  const handleTab = (s?: string) => {
    if (s) router.push(`?status=${s}`);
    else router.push("?");
  };

  const handlePage = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    if (statusFilter) params.set("status", statusFilter);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Fund Recovery Cases</h1>
        <p className="text-gray-500 text-sm mt-1">{total} total cases</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleTab()}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
            !statusFilter ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          )}
        >
          All ({Object.values(statusCounts).reduce((a, b) => a + b, 0)})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => handleTab(s.key)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              statusFilter === s.key ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            )}
          >
            {s.label} ({statusCounts[s.key] ?? 0})
          </button>
        ))}
      </div>

      {/* Cases */}
      <div className="space-y-3">
        {cases.map((c) => {
          const statusOpt = STATUS_OPTIONS.find((s) => s.key === c.status);
          const isExpanded = expandedCase === c.id;

          return (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div
                className="flex items-start justify-between gap-4 p-5 cursor-pointer"
                onClick={() => setExpandedCase(isExpanded ? null : c.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold", statusOpt?.color ?? "bg-gray-100 text-gray-600")}>
                      {statusOpt?.label ?? c.status}
                    </span>
                    {c.amountLost && (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                        <DollarSign className="w-3 h-3" />
                        {c.amountLost.toString()} {c.currency ?? "USD"} lost
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{c.email} {c.phone && `· ${c.phone}`} {c.country && `· ${c.country}`}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">Broker: <span className="text-red-600">{c.brokerName}</span></p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 p-5 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{c.description}</p>
                  </div>

                  {c.adminNotes && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs font-bold text-amber-700 mb-1">Admin Notes</p>
                      <p className="text-sm text-amber-900">{c.adminNotes}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Admin Notes</label>
                    <textarea
                      value={notesMap[c.id] ?? c.adminNotes ?? ""}
                      onChange={(e) => setNotesMap((prev) => ({ ...prev, [c.id]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                      placeholder="Add internal notes..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => handleStatusChange(c.id, s.key)}
                        disabled={c.status === s.key || !!actionLoading}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                          c.status === s.key
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {cases.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="font-semibold text-gray-900">No cases found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, total)} of {total}</p>
          <div className="flex gap-1">
            <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage >= totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
