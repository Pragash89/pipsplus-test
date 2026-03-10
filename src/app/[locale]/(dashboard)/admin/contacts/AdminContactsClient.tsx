"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  locale: string;
  isRead: boolean;
  createdAt: Date;
}

interface Props {
  contacts: Contact[];
  total: number;
  currentPage: number;
  pageSize: number;
  showRead: boolean;
  unreadCount: number;
  locale: string;
}

export default function AdminContactsClient({ contacts, total, currentPage, pageSize, showRead, unreadCount, locale }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const totalPages = Math.ceil(total / pageSize);

  const markRead = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: true }),
      });
      router.refresh();
    } finally {
      setActionLoading(null);
    }
  };

  const handlePage = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    if (showRead) params.set("read", "true");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 text-sm mt-1">{unreadCount} unread messages</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-2xl border border-gray-200 p-2">
        <button
          onClick={() => router.push("?")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center",
            !showRead ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Mail className="w-4 h-4" />
          Unread
          {unreadCount > 0 && (
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", !showRead ? "bg-white/20 text-white" : "bg-red-100 text-red-600")}>
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => router.push("?read=true")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1 justify-center",
            showRead ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <MailOpen className="w-4 h-4" />
          Read
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {contacts.map((c) => {
          const isExpanded = expanded === c.id;
          return (
            <div
              key={c.id}
              className={cn(
                "bg-white rounded-2xl border shadow-sm overflow-hidden",
                !c.isRead ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
              )}
            >
              <div
                className="flex items-start justify-between gap-4 p-5 cursor-pointer"
                onClick={() => {
                  setExpanded(isExpanded ? null : c.id);
                  if (!c.isRead && !isExpanded) markRead(c.id);
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                    !c.isRead ? "bg-blue-100" : "bg-gray-100"
                  )}>
                    {c.isRead
                      ? <MailOpen className="w-4 h-4 text-gray-400" />
                      : <Mail className="w-4 h-4 text-blue-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={cn("font-semibold", !c.isRead ? "text-blue-900" : "text-gray-900")}>
                        {c.name}
                      </h3>
                      {!c.isRead && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">NEW</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 truncate mt-0.5">{c.subject}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{c.email}</span>
                      {c.phone && <span className="flex items-center gap-1 text-xs text-gray-400"><Phone className="w-3 h-3" />{c.phone}</span>}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 p-5">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{c.message}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {contacts.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <MailOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-900">No messages</p>
            <p className="text-gray-400 text-sm mt-1">{showRead ? "No read messages" : "All messages have been read!"}</p>
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
