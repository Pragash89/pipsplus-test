"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  Star,
  Shield,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Send,
  ArrowLeft,
  Building,
  Globe,
  Calendar,
  Award,
} from "lucide-react";

interface BrokerData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  regulation: string[];
  founded: string;
  headquarters: string;
  overallRating: number;
  ratings: {
    platformQuality: number;
    customerService: number;
    tradingCosts: number;
    educationResources: number;
    overall: number;
  };
  stats: {
    minDeposit: string;
    maxLeverage: string;
    spreadFrom: string;
    execution: string;
    platforms: string;
  };
  instruments: string;
  reviewCount: number;
  features: string[];
  color: string;
  initials: string;
}

const DEMO_BROKERS: Record<string, BrokerData> = {
  etoro: {
    name: "eToro",
    slug: "etoro",
    tagline: "The World's Leading Social Trading Platform",
    description:
      "eToro is a multi-asset investment platform with 30 million users in over 140 countries. eToro offers stocks, crypto, ETFs and more, alongside social trading features that let you follow and copy professional traders. Founded in 2007, eToro has revolutionized the way people trade and invest.",
    regulation: ["FCA", "CySEC", "ASIC"],
    founded: "2007",
    headquarters: "Tel Aviv, Israel",
    overallRating: 4.7,
    ratings: {
      platformQuality: 4.8,
      customerService: 4.5,
      tradingCosts: 4.2,
      educationResources: 4.9,
      overall: 4.7,
    },
    stats: {
      minDeposit: "$50",
      maxLeverage: "1:30",
      spreadFrom: "1 pip",
      execution: "Market",
      platforms: "eToro Platform, Mobile App",
    },
    instruments: "3,000+",
    reviewCount: 2847,
    features: [
      "Copy Trading",
      "Social Feed",
      "CryptoPortfolio",
      "Real Stocks (0% commission)",
      "Demo Account ($100K virtual)",
      "24/7 Customer Support",
      "Regulated in Multiple Jurisdictions",
      "Negative Balance Protection",
    ],
    color: "#10B981",
    initials: "eT",
  },
  "interactive-brokers": {
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    tagline: "Professional Trading for Everyone",
    description:
      "Interactive Brokers is one of the world's largest online brokers, offering access to over 150 markets across 33 countries. Founded in 1978, IBKR is known for its rock-bottom commissions, sophisticated trading platform, and vast market access.",
    regulation: ["SEC", "FINRA", "FCA"],
    founded: "1978",
    headquarters: "Greenwich, Connecticut, USA",
    overallRating: 4.8,
    ratings: {
      platformQuality: 4.9,
      customerService: 4.3,
      tradingCosts: 5.0,
      educationResources: 4.7,
      overall: 4.8,
    },
    stats: {
      minDeposit: "$0",
      maxLeverage: "1:50",
      spreadFrom: "0.0 pips",
      execution: "DMA",
      platforms: "TWS, IBKR Mobile, WebTrader",
    },
    instruments: "1,000,000+",
    reviewCount: 4120,
    features: [
      "Direct Market Access (DMA)",
      "Fractional Shares",
      "Options Trading",
      "Bond & Futures Markets",
      "IBKR GlobalAnalyst",
      "Paper Trading Account",
      "SIPC Protection",
      "Lowest Margin Rates",
    ],
    color: "#1E40AF",
    initials: "IB",
  },
  "xm-group": {
    name: "XM Group",
    slug: "xm-group",
    tagline: "Trading Just Got Better",
    description:
      "XM Group is a global forex and CFD broker serving over 5 million clients in 196 countries. Known for low minimum deposits, tight spreads, and generous bonuses, XM offers a comprehensive trading environment for traders of all levels.",
    regulation: ["CySEC", "ASIC", "DFSA"],
    founded: "2009",
    headquarters: "Limassol, Cyprus",
    overallRating: 4.5,
    ratings: {
      platformQuality: 4.6,
      customerService: 4.7,
      tradingCosts: 4.4,
      educationResources: 4.3,
      overall: 4.5,
    },
    stats: {
      minDeposit: "$5",
      maxLeverage: "1:888",
      spreadFrom: "0.6 pips",
      execution: "Market",
      platforms: "MT4, MT5, XM App",
    },
    instruments: "1,000+",
    reviewCount: 3560,
    features: [
      "Ultra-Low Minimum Deposit",
      "MT4 & MT5 Platforms",
      "No Requotes Policy",
      "Negative Balance Protection",
      "Free Webinars & Education",
      "24/5 Multilingual Support",
      "Islamic (Swap-Free) Accounts",
      "Loyalty Points Program",
    ],
    color: "#F59E0B",
    initials: "XM",
  },
};

const DEFAULT_BROKER = DEMO_BROKERS.etoro;

const MOCK_REVIEWS = [
  {
    id: "r1",
    name: "Alex M.",
    initials: "AM",
    date: "Feb 2026",
    rating: 5,
    title: "Best social trading platform",
    body: "I've been using this broker for 3 years and the copy trading feature is a game-changer. The platform is intuitive and the customer support is excellent.",
    helpful: 42,
  },
  {
    id: "r2",
    name: "Sarah K.",
    initials: "SK",
    date: "Jan 2026",
    rating: 4,
    title: "Great for beginners, solid overall",
    body: "The educational resources are top-notch and the demo account helped me learn risk management before going live. Spreads could be tighter but overall very satisfied.",
    helpful: 28,
  },
  {
    id: "r3",
    name: "Tariq B.",
    initials: "TB",
    date: "Jan 2026",
    rating: 4,
    title: "Reliable with good execution",
    body: "Using this broker for forex trading for 18 months. Order execution is fast, withdrawals are processed within 2 days. The app is smooth on mobile.",
    helpful: 19,
  },
];

type Tab = "overview" | "reviews" | "conditions" | "regulation";

function StarFill({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#374151] w-44 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-700"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-bold text-[#111827] w-8 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

export default function BrokerDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const slug = params?.slug as string;
  const { data: session } = useSession();

  const broker = DEMO_BROKERS[slug] ?? DEFAULT_BROKER;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "reviews", label: `Reviews (${broker.reviewCount.toLocaleString()})` },
    { key: "conditions", label: "Trading Conditions" },
    { key: "regulation", label: "Regulation" },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href={`/${locale}/brokers`}
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#1E40AF] transition-colors mb-4"
        >
          <ArrowLeft size={15} /> Back to Broker Directory
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Logo */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shrink-0"
              style={{ backgroundColor: broker.color }}
            >
              {broker.initials}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-black text-[#111827]">{broker.name}</h1>
                {broker.regulation.map((reg) => (
                  <span
                    key={reg}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"
                  >
                    <Shield size={10} /> {reg}
                  </span>
                ))}
              </div>
              <p className="text-[#6B7280] text-base mb-3">{broker.tagline}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarFill rating={broker.overallRating} size={18} />
                  <span className="text-2xl font-black text-[#111827]">
                    {broker.overallRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-[#6B7280]">
                    ({broker.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white font-bold rounded-xl hover:bg-[#1E3A8A] transition-all shadow-sm"
              >
                Visit Broker <ExternalLink size={14} />
              </a>
              <p className="text-[10px] text-center text-[#9CA3AF]">CFD trading involves risk of loss</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-gray-100">
            {Object.entries(broker.stats).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="font-black text-[#111827] text-base">{val}</div>
                <div className="text-[11px] text-[#6B7280] capitalize mt-0.5">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap",
                  activeTab === tab.key
                    ? "border-[#1E40AF] text-[#1E40AF]"
                    : "border-transparent text-[#6B7280] hover:text-[#374151]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-[#111827] mb-3">About {broker.name}</h2>
                <p className="text-[#374151] leading-relaxed text-sm">{broker.description}</p>
              </div>

              {/* Ratings Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-[#111827] mb-5">Rating Breakdown</h2>
                <div className="space-y-4">
                  <RatingBar label="Overall Experience" value={broker.ratings.overall} />
                  <RatingBar label="Platform Quality" value={broker.ratings.platformQuality} />
                  <RatingBar label="Customer Service" value={broker.ratings.customerService} />
                  <RatingBar label="Trading Costs" value={broker.ratings.tradingCosts} />
                  <RatingBar label="Education Resources" value={broker.ratings.educationResources} />
                </div>
              </div>
            </div>

            {/* Key Features sidebar */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-base font-bold text-[#111827] mb-4">Key Features</h2>
                <ul className="space-y-2.5">
                  {broker.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#374151]">
                      <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Broker info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-4">
                <h2 className="text-base font-bold text-[#111827] mb-4">Broker Info</h2>
                <div className="space-y-3">
                  {[
                    { icon: Calendar, label: "Founded", value: broker.founded },
                    { icon: Globe, label: "Headquarters", value: broker.headquarters },
                    { icon: Building, label: "Instruments", value: broker.instruments },
                    { icon: Award, label: "Regulated by", value: broker.regulation.join(", ") },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon size={14} className="text-[#6B7280] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] text-[#9CA3AF]">{label}</div>
                        <div className="text-sm font-medium text-[#374151]">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-sm font-bold">
                        {review.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[#111827] text-sm">{review.name}</div>
                        <div className="text-[11px] text-[#9CA3AF]">{review.date}</div>
                      </div>
                    </div>
                    <StarFill rating={review.rating} size={13} />
                  </div>
                  <h4 className="font-bold text-[#111827] text-sm mb-1">{review.title}</h4>
                  <p className="text-sm text-[#374151] leading-relaxed">{review.body}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#1E40AF] transition-colors">
                      <ThumbsUp size={12} /> Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Write review */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#1E40AF]" />
                  Write a Review
                </h3>
                {!session ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-[#6B7280] mb-4">Sign in to share your experience</p>
                    <Link
                      href={`/${locale}/login`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all"
                    >
                      Sign In <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : reviewSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="text-[#10B981] mx-auto mb-2" size={32} />
                    <p className="text-sm font-semibold text-[#111827]">Review submitted!</p>
                    <p className="text-xs text-[#6B7280] mt-1">It will appear after moderation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-2">Your Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewRating(s)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={24}
                              className={s <= reviewRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1.5">Your Review</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        required
                        placeholder="Share your experience with this broker..."
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none text-[#111827] placeholder-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!reviewRating || !reviewText}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1E40AF] text-white text-sm font-bold rounded-xl hover:bg-[#1E3A8A] transition-all disabled:opacity-50"
                    >
                      <Send size={14} /> Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Trading Conditions Tab */}
        {activeTab === "conditions" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#111827]">Trading Conditions</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: "Minimum Deposit", value: broker.stats.minDeposit },
                { label: "Maximum Leverage", value: broker.stats.maxLeverage },
                { label: "Spread From", value: broker.stats.spreadFrom },
                { label: "Order Execution", value: broker.stats.execution },
                { label: "Available Instruments", value: broker.instruments },
                { label: "Trading Platforms", value: broker.stats.platforms },
                { label: "Negative Balance Protection", value: "Yes" },
                { label: "Islamic (Swap-Free) Account", value: "Available" },
                { label: "Demo Account", value: "Yes – Unlimited" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-6 py-3.5">
                  <span className="text-sm text-[#6B7280]">{label}</span>
                  <span className="text-sm font-semibold text-[#111827]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regulation Tab */}
        {activeTab === "regulation" && (
          <div className="space-y-4">
            {broker.regulation.map((reg, idx) => (
              <div key={reg} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Shield size={20} className="text-[#10B981]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#111827]">{reg}</div>
                    <div className="text-xs text-[#6B7280]">License #{Math.floor(Math.random() * 900000 + 100000)}</div>
                  </div>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed">
                  {reg === "FCA"
                    ? "Financial Conduct Authority — UK regulator ensuring financial markets work well and consumers are treated fairly."
                    : reg === "CySEC"
                    ? "Cyprus Securities and Exchange Commission — EU financial regulator providing passporting rights across the European Union."
                    : reg === "ASIC"
                    ? "Australian Securities & Investments Commission — Australian regulator overseeing financial services firms."
                    : reg === "SEC"
                    ? "U.S. Securities and Exchange Commission — Federal agency responsible for enforcing federal securities laws."
                    : reg === "FINRA"
                    ? "Financial Industry Regulatory Authority — Self-regulatory organization overseeing U.S. broker-dealers."
                    : `${reg} is a recognized financial regulatory authority ensuring client funds protection and fair trading.`}
                </p>
              </div>
            ))}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-sm text-amber-800">
                <strong>Risk Warning:</strong> Trading CFDs and forex involves significant risk of loss. Ensure you understand the risks involved and only trade with money you can afford to lose.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
