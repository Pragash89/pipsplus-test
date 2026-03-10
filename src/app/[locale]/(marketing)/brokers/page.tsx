"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Search, Star, Shield, CheckCircle, AlertTriangle,
  ExternalLink, ChevronDown, Filter, SlidersHorizontal
} from "lucide-react";
import Link from "next/link";

// Demo broker data for display
const DEMO_BROKERS = [
  {
    id: "1", slug: "interactive-brokers", name: "Interactive Brokers",
    logoUrl: null, regulation: "SEC", regulatoryBody: "SEC/FINRA", founded: 1978,
    headquarters: "Greenwich, CT, USA", minDeposit: 0, maxLeverage: "1:50",
    spreadsFrom: 0.1, platforms: ["TWS", "WebTrader", "IBKR Mobile"],
    instruments: ["Stocks", "Forex", "Options", "Futures", "ETFs"],
    isVerified: true, isFeatured: true, isBlacklisted: false,
    overallRating: 4.7, totalReviews: 2847, ratingTrustScore: 4.9,
    ratingPlatform: 4.6, ratingSupport: 4.3, ratingFees: 4.8, ratingWithdrawal: 4.7,
  },
  {
    id: "2", slug: "pepperstone", name: "Pepperstone",
    logoUrl: null, regulation: "FCA", regulatoryBody: "FCA/ASIC/CySEC", founded: 2010,
    headquarters: "Melbourne, Australia", minDeposit: 200, maxLeverage: "1:500",
    spreadsFrom: 0.0, platforms: ["MT4", "MT5", "cTrader", "TradingView"],
    instruments: ["Forex", "CFDs", "Crypto", "Commodities", "Indices"],
    isVerified: true, isFeatured: true, isBlacklisted: false,
    overallRating: 4.6, totalReviews: 3421, ratingTrustScore: 4.7,
    ratingPlatform: 4.8, ratingSupport: 4.5, ratingFees: 4.6, ratingWithdrawal: 4.5,
  },
  {
    id: "3", slug: "ig-group", name: "IG Group",
    logoUrl: null, regulation: "FCA", regulatoryBody: "FCA/ASIC/MAS", founded: 1974,
    headquarters: "London, UK", minDeposit: 250, maxLeverage: "1:30",
    spreadsFrom: 0.6, platforms: ["IG Platform", "MT4", "L2 Dealer"],
    instruments: ["Forex", "CFDs", "Stocks", "Commodities", "Options"],
    isVerified: true, isFeatured: false, isBlacklisted: false,
    overallRating: 4.4, totalReviews: 5234, ratingTrustScore: 4.8,
    ratingPlatform: 4.3, ratingSupport: 4.2, ratingFees: 4.0, ratingWithdrawal: 4.5,
  },
  {
    id: "4", slug: "etoro", name: "eToro",
    logoUrl: null, regulation: "CySEC", regulatoryBody: "CySEC/FCA/ASIC", founded: 2007,
    headquarters: "Limassol, Cyprus", minDeposit: 50, maxLeverage: "1:30",
    spreadsFrom: 1.0, platforms: ["eToro Platform", "CopyTrader"],
    instruments: ["Stocks", "Crypto", "Forex", "ETFs", "Commodities"],
    isVerified: true, isFeatured: true, isBlacklisted: false,
    overallRating: 4.2, totalReviews: 8765, ratingTrustScore: 4.4,
    ratingPlatform: 4.5, ratingSupport: 4.0, ratingFees: 3.8, ratingWithdrawal: 4.1,
  },
  {
    id: "5", slug: "xm-group", name: "XM Group",
    logoUrl: null, regulation: "CySEC", regulatoryBody: "CySEC/ASIC/DFSA", founded: 2009,
    headquarters: "Limassol, Cyprus", minDeposit: 5, maxLeverage: "1:888",
    spreadsFrom: 0.6, platforms: ["MT4", "MT5", "XM App"],
    instruments: ["Forex", "CFDs", "Stocks", "Commodities", "Indices"],
    isVerified: true, isFeatured: false, isBlacklisted: false,
    overallRating: 4.1, totalReviews: 4523, ratingTrustScore: 4.2,
    ratingPlatform: 4.1, ratingSupport: 4.3, ratingFees: 4.2, ratingWithdrawal: 4.0,
  },
  {
    id: "6", slug: "oanda", name: "OANDA",
    logoUrl: null, regulation: "NFA", regulatoryBody: "NFA/FCA/ASIC/MAS", founded: 1996,
    headquarters: "New York, USA", minDeposit: 0, maxLeverage: "1:50",
    spreadsFrom: 1.0, platforms: ["OANDA Platform", "MT4", "TradingView"],
    instruments: ["Forex", "CFDs", "Commodities", "Indices"],
    isVerified: true, isFeatured: false, isBlacklisted: false,
    overallRating: 4.3, totalReviews: 3102, ratingTrustScore: 4.8,
    ratingPlatform: 4.2, ratingSupport: 4.1, ratingFees: 3.9, ratingWithdrawal: 4.4,
  },
];

const REGULATION_OPTIONS = ["All", "FCA", "ASIC", "CySEC", "NFA", "FSCA", "SEC"];

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BrokersPage() {
  const t = useTranslations("brokers");
  const params = useParams();
  const locale = params.locale as string;

  const [search, setSearch] = useState("");
  const [regulation, setRegulation] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filtered = DEMO_BROKERS.filter((b) => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (regulation !== "All" && b.regulation !== regulation) return false;
    if (showFeaturedOnly && !b.isFeatured) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.overallRating - a.overallRating;
    if (sortBy === "reviews") return b.totalReviews - a.totalReviews;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 border border-[#1E40AF]/20 text-[#1E40AF] rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Shield size={15} />
            100% independent reviews — no broker pays for ratings
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#111827] mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-[#111827] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent text-base"
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-4 items-center mb-8 p-4 bg-[#F9FAFB] rounded-2xl border border-gray-200">
            <SlidersHorizontal size={18} className="text-[#6B7280]" />

            {/* Regulation filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[#374151]">{t("filters.regulation")}:</label>
              <div className="flex gap-1.5 flex-wrap">
                {REGULATION_OPTIONS.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setRegulation(reg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      regulation === reg
                        ? "bg-[#1E40AF] text-white"
                        : "bg-white border border-gray-200 text-[#6B7280] hover:border-[#1E40AF] hover:text-[#1E40AF]"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm font-medium text-[#374151]">{t("sortBy")}:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="rating">{t("sortOptions.rating")}</option>
                <option value="reviews">{t("sortOptions.reviews")}</option>
                <option value="name">{t("sortOptions.name")}</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-[#6B7280] mb-6">
            Found <strong className="text-[#111827]">{filtered.length}</strong> brokers
          </p>

          {/* Broker Cards */}
          <div className="space-y-4">
            {filtered.map((broker, idx) => (
              <BrokerCard key={broker.id} broker={broker} locale={locale} rank={idx + 1} t={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BrokerCard({ broker, locale, rank, t }: { broker: any; locale: string; rank: number; t: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#1E40AF]/20 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Rank + Logo + Name */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="text-2xl font-black text-gray-200 w-8 flex-shrink-0">
              #{rank}
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-sm">
              {broker.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-[#111827] text-xl">{broker.name}</h3>
                {broker.isVerified && (
                  <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#10B981] text-xs font-bold px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} />
                    Verified
                  </span>
                )}
                {broker.isFeatured && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    ★ Featured
                  </span>
                )}
                {broker.isBlacklisted && (
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    <AlertTriangle size={10} />
                    BLACKLISTED
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-[#6B7280]">
                <span className="inline-flex items-center gap-1 bg-blue-50 text-[#1E40AF] rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  <Shield size={10} />
                  {broker.regulation} Regulated
                </span>
                <span>·</span>
                <span>Est. {broker.founded}</span>
                <span>·</span>
                <span>{broker.headquarters}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 md:ml-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-[#111827]">{broker.overallRating.toFixed(1)}</div>
              <StarDisplay rating={broker.overallRating} size={16} />
              <div className="text-xs text-[#6B7280] mt-1">{broker.totalReviews.toLocaleString()} reviews</div>
            </div>

            {/* Key specs */}
            <div className="hidden lg:grid grid-cols-3 gap-4 ml-6 pl-6 border-l border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-[#111827]">
                  {broker.minDeposit === 0 ? "No min." : `$${broker.minDeposit}`}
                </div>
                <div className="text-xs text-[#6B7280]">Min. Deposit</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#111827]">{broker.maxLeverage}</div>
                <div className="text-xs text-[#6B7280]">Max Leverage</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#111827]">
                  {broker.spreadsFrom === 0 ? "0.0 pips" : `${broker.spreadsFrom} pips`}
                </div>
                <div className="text-xs text-[#6B7280]">Spreads from</div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/brokers/${broker.slug}`}
              className="flex-shrink-0 px-5 py-2.5 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all text-sm shadow-sm hover:shadow-md"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Platforms + Instruments */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-[#6B7280] font-medium">Platforms:</span>
          {broker.platforms.slice(0, 4).map((p: string) => (
            <span key={p} className="text-xs bg-gray-100 text-[#374151] px-2 py-0.5 rounded-full">
              {p}
            </span>
          ))}
          <span className="text-xs text-[#6B7280] ml-2 font-medium">Instruments:</span>
          {broker.instruments.slice(0, 4).map((inst: string) => (
            <span key={inst} className="text-xs bg-[#EFF6FF] text-[#1E40AF] px-2 py-0.5 rounded-full">
              {inst}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
