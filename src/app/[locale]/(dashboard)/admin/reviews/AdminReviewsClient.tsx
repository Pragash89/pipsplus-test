"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, XCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  ratingTrust: number;
  ratingPlatform: number;
  ratingSupport: number;
  ratingFees: number;
  ratingWithdrawal: number;
  status: string;
  createdAt: Date;
  broker: { id: string; name: string; slug: string };
  user: { id: string; name: string; email: string };
}

interface Props {
  reviews: Review[];
  total: number;
  currentPage: number;
  pageSize: number;
  statusFilter: string;
  statusCounts: Record<string, number>;
  locale: string;
}

const STATUS_TABS = [
  { key: "PENDING", label: "Pending", color: "amber" },
  { key: "APPROVED", label: "Approved", color: "emerald" },
  { key: "REJECTED", label: "Rejected", color: "red" },
];

export default function AdminReviewsClient({
  reviews, total, currentPage, pageSize, statusFilter, statusCounts, locale
}: Props) {
  const router = useRouter();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const totalPages = Math.ceil(total / pageSize);

  const handleAction = async (reviewId: string, action: "APPROVED" | "REJECTED" | "delete") => {
    setActionLoading(reviewId + "-" + action);
    try {
      if (action === "delete") {
        await fetch(`/api/admin/reviews?id=${reviewId}`, { method: "DELETE" });
      } else {
        await fetch("/api/admin/reviews", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewId, status: action }),
        });
      }
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  const handleTab = (status: string) => {
    router.push(`?status=${status}`);
  };

  const handlePage = (p: number) => {
    router.push(`?status=${statusFilter}&page=${p}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>
        <p className="text-gray-500 text-sm mt-1">Approve or reject broker reviews</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 bg-white rounded-2xl border border-gray-200 p-2">
        {STATUS_TABS.map((tab) => {
          const count = statusCounts[tab.key] ?? 0;
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center",
                isActive ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="font-semibold text-gray-900 text-base">{review.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    {review.broker.name}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200")} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{review.content}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span>By <span className="font-medium text-gray-600">{review.user.name}</span></span>
                  <span>{review.user.email}</span>
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                {/* Sub-ratings */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                  {[
                    { label: "Trust", val: review.ratingTrust },
                    { label: "Platform", val: review.ratingPlatform },
                    { label: "Support", val: review.ratingSupport },
                    { label: "Fees", val: review.ratingFees },
                    { label: "Withdrawal", val: review.ratingWithdrawal },
                  ].map((r) => (
                    <div key={r.label} className="text-center bg-gray-50 rounded-lg p-2">
                      <p className="text-sm font-bold text-gray-900">{r.val}/5</p>
                      <p className="text-xs text-gray-400">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {statusFilter === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleAction(review.id, "APPROVED")}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-all disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(review.id, "REJECTED")}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleAction(review.id, "delete")}
                  disabled={!!actionLoading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 text-gray-500 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="font-semibold text-gray-900">No {statusFilter.toLowerCase()} reviews</p>
            <p className="text-gray-400 text-sm mt-1">Check back later</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, total)} of {total}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage >= totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
