"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  Star,
  ExternalLink,
  Bookmark,
  ArrowRight,
  Shield,
  X,
} from "lucide-react";

interface SavedBroker {
  id: string;
  name: string;
  slug: string;
  regulation: string;
  rating: number;
  minDeposit: string;
  spreadType: string;
  instruments: string;
  color: string;
  initials: string;
}

const initialBrokers: SavedBroker[] = [
  {
    id: "1",
    name: "eToro",
    slug: "etoro",
    regulation: "FCA, CySEC, ASIC",
    rating: 4.7,
    minDeposit: "$50",
    spreadType: "Variable",
    instruments: "3,000+",
    color: "#10B981",
    initials: "eT",
  },
  {
    id: "2",
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    regulation: "SEC, FINRA, FCA",
    rating: 4.8,
    minDeposit: "$0",
    spreadType: "Commission",
    instruments: "1M+",
    color: "#1E40AF",
    initials: "IB",
  },
  {
    id: "3",
    name: "XM Group",
    slug: "xm-group",
    regulation: "CySEC, ASIC, DFSA",
    rating: 4.5,
    minDeposit: "$5",
    spreadType: "Variable",
    instruments: "1,000+",
    color: "#F59E0B",
    initials: "XM",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
      <span className="text-sm font-bold text-[#111827] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function BrokerCard({
  broker,
  locale,
  onRemove,
}: {
  broker: SavedBroker;
  locale: string;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-start gap-4">
        {/* Logo placeholder */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-extrabold shrink-0 shadow-sm"
          style={{ backgroundColor: broker.color }}
        >
          {broker.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-[#111827] text-base leading-tight">{broker.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield size={11} className="text-[#10B981]" />
                <span className="text-[11px] text-[#6B7280] truncate">{broker.regulation}</span>
              </div>
            </div>
            <button
              onClick={() => onRemove(broker.id)}
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-all"
              title="Remove from saved"
            >
              <X size={14} />
            </button>
          </div>

          <div className="mt-2">
            <StarRating rating={broker.rating} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-t border-gray-100">
        {[
          { label: "Min Deposit", value: broker.minDeposit },
          { label: "Spread", value: broker.spreadType },
          { label: "Instruments", value: broker.instruments },
        ].map((spec) => (
          <div key={spec.label} className="text-center">
            <div className="text-xs font-bold text-[#111827]">{spec.value}</div>
            <div className="text-[10px] text-[#6B7280] mt-0.5">{spec.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Link
          href={`/${locale}/brokers/${broker.slug}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
        >
          View Profile
          <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function SavedBrokersPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const [search, setSearch] = useState("");
  const [savedBrokers, setSavedBrokers] = useState(initialBrokers);

  const filtered = savedBrokers.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id: string) => {
    setSavedBrokers((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827]">Saved Brokers</h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            Brokers you&apos;ve bookmarked for comparison and reference.
          </p>
        </div>
        <Link
          href={`/${locale}/brokers`}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
        >
          Browse Brokers
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Search */}
      {savedBrokers.length > 0 && (
        <div className="relative mb-6 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search saved brokers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] text-sm text-[#111827] placeholder-gray-400 bg-white"
          />
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((broker) => (
            <BrokerCard
              key={broker.id}
              broker={broker}
              locale={locale}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : savedBrokers.length === 0 ? (
        /* Empty state - no saved brokers */
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-[#1E40AF]" size={28} />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-2">No saved brokers</h3>
          <p className="text-[#6B7280] mb-6 max-w-sm mx-auto text-sm">
            Browse our broker directory and bookmark brokers you want to compare or revisit later.
          </p>
          <Link
            href={`/${locale}/brokers`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
          >
            Browse Brokers <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* No search results */
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <p className="text-[#6B7280] mb-2">No brokers match &quot;{search}&quot;</p>
          <button
            onClick={() => setSearch("")}
            className="text-[#1E40AF] text-sm font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      <p className="text-center text-xs text-[#9CA3AF] mt-6">
        Saved brokers are stored locally. Sign in on any device to sync your list.
      </p>
    </div>
  );
}
