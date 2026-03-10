import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding PipsPlus database...");

  // ─── Clean existing data ──────────────────────────────────────────────────
  await prisma.testimonial.deleteMany();
  await prisma.brokerReview.deleteMany();
  await prisma.savedBroker.deleteMany();
  await prisma.broker.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.course.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.fundRecoveryCase.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@123456", 12);
  const traderHash = await bcrypt.hash("Trader@123456", 12);

  const admin = await prisma.user.create({
    data: {
      name: "PipsPlus Admin",
      email: "admin@pipsplus.com",
      passwordHash: adminHash,
      role: "ADMIN",
      subscription: "PREMIUM",
      isVerifiedTrader: true,
    },
  });

  const demoTrader = await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "trader@pipsplus.com",
      passwordHash: traderHash,
      role: "TRADER",
      subscription: "PREMIUM",
      country: "United Kingdom",
      isVerifiedTrader: true,
      bio: "Forex trader for 5 years. Passionate about technical analysis.",
    },
  });

  console.log("✅ Users created");

  // ─── Brokers ──────────────────────────────────────────────────────────────
  const brokers = [
    {
      slug: "interactive-brokers",
      name: "Interactive Brokers",
      regulation: "SEC" as const,
      regulatoryBody: "SEC / FINRA / FCA",
      licenseNumber: "IB-001",
      founded: 1978,
      headquarters: "Greenwich, CT, USA",
      minDeposit: 0,
      maxLeverage: "1:50",
      spreadsFrom: 0.1,
      platforms: ["IBKR Trader Workstation", "IBKR Mobile", "Client Portal"],
      instruments: ["Stocks", "Options", "Futures", "Forex", "ETFs", "Bonds"],
      withdrawalMethods: ["Bank Wire", "ACH", "Check"],
      customerSupportHours: "24/7",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.7,
      totalReviews: 2847,
      ratingTrustScore: 4.9,
      ratingPlatform: 4.6,
      ratingSupport: 4.3,
      ratingFees: 4.8,
      ratingWithdrawal: 4.7,
      description:
        "Interactive Brokers is one of the largest and most reputable online brokers in the world, founded in 1978. Known for extremely low commissions, a powerful trading platform, and access to global markets across stocks, options, futures, forex, bonds, and funds.",
    },
    {
      slug: "pepperstone",
      name: "Pepperstone",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / ASIC / CySEC / DFSA / SCB",
      licenseNumber: "684312",
      founded: 2010,
      headquarters: "Melbourne, Australia",
      minDeposit: 200,
      maxLeverage: "1:500",
      spreadsFrom: 0.0,
      platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
      instruments: ["Forex", "CFDs", "Crypto", "Commodities", "Indices", "Shares"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "PayPal"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.6,
      totalReviews: 1923,
      ratingTrustScore: 4.8,
      ratingPlatform: 4.7,
      ratingSupport: 4.5,
      ratingFees: 4.6,
      ratingWithdrawal: 4.5,
      description:
        "Pepperstone is an award-winning forex and CFD broker regulated by FCA, ASIC, and CySEC. Offering razor-thin spreads, multiple platforms including MT4, MT5 and cTrader, and lightning-fast execution for professional and retail traders worldwide.",
    },
    {
      slug: "ic-markets",
      name: "IC Markets",
      regulation: "ASIC" as const,
      regulatoryBody: "ASIC / CySEC / FSA Seychelles",
      licenseNumber: "335692",
      founded: 2007,
      headquarters: "Sydney, Australia",
      minDeposit: 200,
      maxLeverage: "1:500",
      spreadsFrom: 0.0,
      platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader"],
      instruments: ["Forex", "CFDs", "Crypto", "Commodities", "Indices", "Bonds"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "PayPal", "Skrill", "Neteller"],
      customerSupportHours: "24/7",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.5,
      totalReviews: 3214,
      ratingTrustScore: 4.7,
      ratingPlatform: 4.6,
      ratingSupport: 4.4,
      ratingFees: 4.5,
      ratingWithdrawal: 4.4,
      description:
        "IC Markets is a global ECN forex and CFD broker regulated by ASIC with ultra-low latency execution and raw spreads starting from 0.0 pips. Popular among scalpers and algorithmic traders for its institutional-grade infrastructure.",
    },
    {
      slug: "etoro",
      name: "eToro",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CySEC / ASIC / SEC",
      licenseNumber: "583263",
      founded: 2007,
      headquarters: "Tel Aviv, Israel",
      minDeposit: 50,
      maxLeverage: "1:30",
      spreadsFrom: 1.0,
      platforms: ["eToro Platform", "eToro Mobile App"],
      instruments: ["Stocks", "Crypto", "ETFs", "Forex", "Commodities", "Indices"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "PayPal", "Skrill", "Neteller"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.2,
      totalReviews: 5632,
      ratingTrustScore: 4.5,
      ratingPlatform: 4.4,
      ratingSupport: 4.0,
      ratingFees: 3.8,
      ratingWithdrawal: 4.0,
      description:
        "eToro is the world's leading social trading platform with 30M+ users. Features unique CopyTrading that lets you automatically copy successful traders. Regulated by FCA, CySEC, and ASIC with access to stocks, crypto, forex, and ETFs.",
    },
    {
      slug: "plus500",
      name: "Plus500",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CySEC / ASIC / MAS",
      licenseNumber: "509909",
      founded: 2008,
      headquarters: "London, UK",
      minDeposit: 100,
      maxLeverage: "1:300",
      spreadsFrom: 0.6,
      platforms: ["Plus500 WebTrader", "Plus500 Mobile App"],
      instruments: ["CFDs", "Forex", "Stocks", "Crypto", "Commodities", "Indices"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "PayPal"],
      customerSupportHours: "24/7",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.1,
      totalReviews: 1847,
      ratingTrustScore: 4.4,
      ratingPlatform: 4.2,
      ratingSupport: 3.9,
      ratingFees: 4.0,
      ratingWithdrawal: 4.1,
      description:
        "Plus500 is a leading CFD broker listed on the London Stock Exchange. Offers a simple, intuitive platform for trading CFDs on forex, stocks, crypto, and commodities with no commissions. Regulated by FCA, CySEC, ASIC, and MAS.",
    },
    {
      slug: "xm",
      name: "XM",
      regulation: "CySEC" as const,
      regulatoryBody: "CySEC / ASIC / IFSC",
      licenseNumber: "120/10",
      founded: 2009,
      headquarters: "Limassol, Cyprus",
      minDeposit: 5,
      maxLeverage: "1:888",
      spreadsFrom: 0.6,
      platforms: ["MetaTrader 4", "MetaTrader 5", "XM WebTrader"],
      instruments: ["Forex", "CFDs", "Stocks", "Commodities", "Indices", "Crypto"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "China UnionPay"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.0,
      totalReviews: 4123,
      ratingTrustScore: 4.2,
      ratingPlatform: 4.1,
      ratingSupport: 4.3,
      ratingFees: 3.9,
      ratingWithdrawal: 4.0,
      description:
        "XM is a globally established forex and CFD broker operating since 2009, serving 10M+ clients in 196 countries. Known for its ultra-low minimum deposit of $5, generous bonuses, and excellent educational resources.",
    },
    {
      slug: "oanda",
      name: "OANDA",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CFTC / NFA / MAS / ASIC / IIROC",
      licenseNumber: "542574",
      founded: 1996,
      headquarters: "New York, USA",
      minDeposit: 0,
      maxLeverage: "1:50",
      spreadsFrom: 0.6,
      platforms: ["OANDA Trade", "MetaTrader 4", "TradingView"],
      instruments: ["Forex", "CFDs", "Indices", "Commodities", "Bonds", "Metals"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "PayPal"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.3,
      totalReviews: 2156,
      ratingTrustScore: 4.7,
      ratingPlatform: 4.4,
      ratingSupport: 4.2,
      ratingFees: 4.0,
      ratingWithdrawal: 4.2,
      description:
        "OANDA is one of the most trusted forex brokers with 25+ years of experience. Regulated by 6 major authorities worldwide including FCA, CFTC, and NFA. Known for transparent pricing, no minimum deposit, and superior execution.",
    },
    {
      slug: "ig-markets",
      name: "IG Markets",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / ASIC / MAS / BaFin / FSCA",
      licenseNumber: "195355",
      founded: 1974,
      headquarters: "London, UK",
      minDeposit: 250,
      maxLeverage: "1:30",
      spreadsFrom: 0.6,
      platforms: ["IG Platform", "MetaTrader 4", "ProRealTime", "L2 Dealer"],
      instruments: ["CFDs", "Forex", "Spread Betting", "Stocks", "Crypto", "Options"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Debit Card"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.4,
      totalReviews: 3089,
      ratingTrustScore: 4.8,
      ratingPlatform: 4.5,
      ratingSupport: 4.3,
      ratingFees: 4.1,
      ratingWithdrawal: 4.4,
      description:
        "IG Markets is the world's No.1 CFD provider, founded in 1974. With 50 years of experience, IG offers 17,000+ markets with advanced charting, direct market access, and spread betting. Regulated by FCA, ASIC, and multiple other top-tier authorities.",
    },
    {
      slug: "saxo-bank",
      name: "Saxo Bank",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / FSA Denmark / MAS / ASIC / SFC",
      licenseNumber: "551422",
      founded: 1992,
      headquarters: "Copenhagen, Denmark",
      minDeposit: 2000,
      maxLeverage: "1:200",
      spreadsFrom: 0.4,
      platforms: ["SaxoTraderGO", "SaxoTraderPRO", "SaxoInvestor"],
      instruments: ["Forex", "CFDs", "Stocks", "ETFs", "Bonds", "Options", "Futures"],
      withdrawalMethods: ["Bank Wire"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.4,
      totalReviews: 987,
      ratingTrustScore: 4.8,
      ratingPlatform: 4.7,
      ratingSupport: 4.2,
      ratingFees: 3.9,
      ratingWithdrawal: 4.3,
      description:
        "Saxo Bank is a premium multi-asset broker and bank offering access to 70,000+ instruments across stocks, ETFs, bonds, forex, and derivatives. With 30 years of fintech innovation and regulation by the strictest authorities globally.",
    },
    {
      slug: "avatrade",
      name: "AvaTrade",
      regulation: "ASIC" as const,
      regulatoryBody: "ASIC / BVI FSC / CBI Ireland / FSCA / JFSA",
      licenseNumber: "406684",
      founded: 2006,
      headquarters: "Dublin, Ireland",
      minDeposit: 100,
      maxLeverage: "1:400",
      spreadsFrom: 0.9,
      platforms: ["MetaTrader 4", "MetaTrader 5", "AvaTradeGO", "DupliTrade", "ZuluTrade"],
      instruments: ["Forex", "CFDs", "Crypto", "Commodities", "Stocks", "Indices"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.2,
      totalReviews: 2431,
      ratingTrustScore: 4.5,
      ratingPlatform: 4.3,
      ratingSupport: 4.4,
      ratingFees: 3.9,
      ratingWithdrawal: 4.1,
      description:
        "AvaTrade is a leading online broker regulated in 6 jurisdictions including ASIC, CBI, and FSCA. Offers over 1,250 trading instruments with flexible platforms including MT4, MT5, and AvaTradeGO mobile app, plus copy trading via ZuluTrade.",
    },
    {
      slug: "fxtm",
      name: "FXTM (ForexTime)",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CySEC / FSCA / FSC Mauritius",
      licenseNumber: "777911",
      founded: 2011,
      headquarters: "Limassol, Cyprus",
      minDeposit: 10,
      maxLeverage: "1:2000",
      spreadsFrom: 0.1,
      platforms: ["MetaTrader 4", "MetaTrader 5", "FXTM Trader App"],
      instruments: ["Forex", "Stocks", "Commodities", "Indices", "Crypto"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "FasaPay"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.0,
      totalReviews: 1678,
      ratingTrustScore: 4.3,
      ratingPlatform: 4.1,
      ratingSupport: 4.2,
      ratingFees: 3.9,
      ratingWithdrawal: 3.9,
      description:
        "FXTM is an international broker regulated by FCA, CySEC, and FSCA. Known for its low minimum deposit, educational resources, and FXTM Invest copy trading. Serves 2M+ clients across 190 countries with competitive spreads.",
    },
    {
      slug: "blackbull-markets",
      name: "BlackBull Markets",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / FSP New Zealand",
      licenseNumber: "FSP403326",
      founded: 2014,
      headquarters: "Auckland, New Zealand",
      minDeposit: 0,
      maxLeverage: "1:500",
      spreadsFrom: 0.0,
      platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
      instruments: ["Forex", "CFDs", "Commodities", "Indices", "Crypto", "Shares"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "UnionPay"],
      customerSupportHours: "24/7",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.3,
      totalReviews: 892,
      ratingTrustScore: 4.5,
      ratingPlatform: 4.4,
      ratingSupport: 4.3,
      ratingFees: 4.5,
      ratingWithdrawal: 4.2,
      description:
        "BlackBull Markets is a New Zealand-based ECN broker offering institutional-grade execution with raw spreads from 0.0 pips. Regulated by FCA and NZ FSP, it supports MT4, MT5, cTrader, and TradingView with no minimum deposit.",
    },
    {
      slug: "exness",
      name: "Exness",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CySEC / FSA Seychelles / CBCS / FSC BVI",
      licenseNumber: "730729",
      founded: 2008,
      headquarters: "Limassol, Cyprus",
      minDeposit: 1,
      maxLeverage: "1:2000",
      spreadsFrom: 0.1,
      platforms: ["MetaTrader 4", "MetaTrader 5", "Exness Terminal", "Exness Trade App"],
      instruments: ["Forex", "Metals", "Crypto", "Energies", "Stocks", "Indices"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "Perfect Money", "Crypto"],
      customerSupportHours: "24/7",
      isVerified: true,
      isFeatured: true,
      isBlacklisted: false,
      overallRating: 4.1,
      totalReviews: 6234,
      ratingTrustScore: 4.3,
      ratingPlatform: 4.2,
      ratingSupport: 4.4,
      ratingFees: 4.0,
      ratingWithdrawal: 4.5,
      description:
        "Exness is a globally recognised broker with over $4 trillion monthly trading volume. Regulated by FCA, CySEC, and multiple authorities. Known for instant withdrawals, no deposit limits, and competitive spreads across 200+ instruments.",
    },
    {
      slug: "hycm",
      name: "HYCM",
      regulation: "FCA" as const,
      regulatoryBody: "FCA / CySEC / DFSA / CIMA",
      licenseNumber: "186171",
      founded: 1977,
      headquarters: "London, UK",
      minDeposit: 100,
      maxLeverage: "1:500",
      spreadsFrom: 0.2,
      platforms: ["MetaTrader 4", "MetaTrader 5"],
      instruments: ["Forex", "Stocks", "Commodities", "Indices", "Crypto", "ETFs"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 4.0,
      totalReviews: 743,
      ratingTrustScore: 4.5,
      ratingPlatform: 4.0,
      ratingSupport: 4.1,
      ratingFees: 3.8,
      ratingWithdrawal: 3.9,
      description:
        "HYCM is one of the world's oldest forex and CFD brokers, established in 1977. Regulated by FCA, CySEC, DFSA, and CIMA, HYCM offers 300+ instruments with competitive spreads and award-winning customer service.",
    },
    {
      slug: "cmtrading",
      name: "CMTrading",
      regulation: "FSCA" as const,
      regulatoryBody: "FSCA South Africa",
      licenseNumber: "FSP 41187",
      founded: 2012,
      headquarters: "Johannesburg, South Africa",
      minDeposit: 250,
      maxLeverage: "1:200",
      spreadsFrom: 1.5,
      platforms: ["MetaTrader 4", "CMTrading App"],
      instruments: ["Forex", "CFDs", "Commodities", "Indices", "Crypto"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller"],
      customerSupportHours: "24/5",
      isVerified: false,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 3.2,
      totalReviews: 456,
      ratingTrustScore: 3.5,
      ratingPlatform: 3.2,
      ratingSupport: 3.4,
      ratingFees: 2.9,
      ratingWithdrawal: 3.0,
      description:
        "CMTrading is a South Africa-based broker regulated by FSCA. Offers forex and CFD trading with MT4 platform. Known for its customer support in the African market but has higher spreads compared to competitors.",
    },
    {
      slug: "marketscom",
      name: "Markets.com",
      regulation: "CySEC" as const,
      regulatoryBody: "CySEC / FSCA / FSA Seychelles",
      licenseNumber: "092/08",
      founded: 2008,
      headquarters: "Limassol, Cyprus",
      minDeposit: 100,
      maxLeverage: "1:300",
      spreadsFrom: 0.6,
      platforms: ["MetaTrader 4", "MetaTrader 5", "Markets.com App"],
      instruments: ["Forex", "Stocks", "Commodities", "Indices", "Crypto", "ETFs"],
      withdrawalMethods: ["Bank Wire", "Credit Card", "Skrill", "Neteller", "PayPal"],
      customerSupportHours: "24/5",
      isVerified: true,
      isFeatured: false,
      isBlacklisted: false,
      overallRating: 3.8,
      totalReviews: 612,
      ratingTrustScore: 4.0,
      ratingPlatform: 3.8,
      ratingSupport: 3.9,
      ratingFees: 3.6,
      ratingWithdrawal: 3.7,
      description:
        "Markets.com is a global CFD and forex broker regulated by CySEC with 2,000+ instruments across forex, stocks, indices, and commodities. Offers MT4, MT5, and its own trading platform with educational resources for beginners.",
    },
    {
      slug: "scam-broker-fx",
      name: "ScamBroker FX",
      regulation: "UNREGULATED" as const,
      regulatoryBody: undefined,
      licenseNumber: undefined,
      founded: 2021,
      headquarters: "Unknown",
      minDeposit: 250,
      maxLeverage: "1:1000",
      spreadsFrom: 0,
      platforms: ["Proprietary Platform"],
      instruments: ["Forex", "Crypto"],
      withdrawalMethods: ["Crypto"],
      customerSupportHours: "Email Only",
      isVerified: false,
      isFeatured: false,
      isBlacklisted: true,
      overallRating: 1.2,
      totalReviews: 87,
      ratingTrustScore: 1.0,
      ratingPlatform: 1.5,
      ratingSupport: 1.2,
      ratingFees: 1.0,
      ratingWithdrawal: 1.0,
      description:
        "⚠️ BLACKLISTED: ScamBroker FX has been identified as a fraudulent operation. Multiple traders have reported inability to withdraw funds, manipulation of trading results, and unresponsive customer support. This broker is NOT regulated by any legitimate authority. Do NOT deposit funds with this broker.",
    },
  ];

  for (const broker of brokers) {
    await prisma.broker.create({
      data: {
        ...broker,
        minDeposit: broker.minDeposit !== undefined ? broker.minDeposit : null,
        spreadsFrom: broker.spreadsFrom !== undefined ? broker.spreadsFrom : null,
        overallRating: broker.overallRating,
        ratingTrustScore: broker.ratingTrustScore,
        ratingPlatform: broker.ratingPlatform,
        ratingSupport: broker.ratingSupport,
        ratingFees: broker.ratingFees,
        ratingWithdrawal: broker.ratingWithdrawal,
      },
    });
  }
  console.log(`✅ ${brokers.length} brokers created`);

  // ─── Courses ──────────────────────────────────────────────────────────────
  const coursesData = [
    {
      slug: "trading-basics-complete-guide",
      title: "Trading Basics: Complete Beginner's Guide",
      titleAr: "أساسيات التداول: الدليل الشامل للمبتدئين",
      titleEs: "Fundamentos del Trading: Guía Completa para Principiantes",
      titleFr: "Bases du Trading: Guide Complet pour Débutants",
      description:
        "Master the fundamentals of trading in this comprehensive beginner's course. Learn what financial markets are, how they work, key terminology, and how to start trading safely. No prior knowledge required.",
      category: "BASICS" as const,
      level: "BEGINNER" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 300,
      totalLessons: 12,
      instructor: "Sarah Mitchell, CFA",
      tags: ["beginner", "fundamentals", "markets", "trading basics"],
      sortOrder: 1,
      modules: [
        {
          title: "Introduction to Financial Markets",
          lessons: [
            { title: "What Are Financial Markets?", type: "TEXT" as const, duration: 15, isFree: true, content: "Financial markets are platforms where buyers and sellers trade financial assets like stocks, bonds, currencies, and commodities. They play a crucial role in the global economy by facilitating capital allocation, price discovery, and risk management.\n\n## Types of Financial Markets\n\n**Stock Markets** – Where shares of publicly listed companies are bought and sold. Examples: NYSE, NASDAQ, LSE.\n\n**Forex Markets** – The largest financial market in the world where currencies are exchanged. $7.5 trillion daily trading volume.\n\n**Bond Markets** – Where government and corporate debt securities are traded.\n\n**Commodity Markets** – Where raw materials like gold, oil, and agricultural products are traded.\n\n**Cryptocurrency Markets** – Where digital currencies like Bitcoin and Ethereum are traded 24/7.\n\n## Why Markets Matter\n\nFinancial markets allow companies to raise capital, help investors grow wealth, enable price discovery, and facilitate international trade." },
            { title: "How Trading Works", type: "TEXT" as const, duration: 20, isFree: true, content: "Trading is the act of buying and selling financial instruments with the goal of generating profit from price movements.\n\n## The Trading Process\n\n1. **Open an Account** – Choose a regulated broker and complete KYC verification\n2. **Deposit Funds** – Fund your trading account\n3. **Analyze the Market** – Use technical or fundamental analysis\n4. **Place a Trade** – Buy or sell at market or limit price\n5. **Manage Your Position** – Set stop-loss and take-profit levels\n6. **Close the Trade** – Exit when your target is reached or stop-loss is hit\n\n## Key Concepts\n\n**Long Position** – Buying an asset expecting the price to rise\n**Short Position** – Selling an asset expecting the price to fall\n**Leverage** – Using borrowed capital to increase potential returns (and losses)\n**Margin** – The collateral required to open a leveraged position" },
            { title: "Market Participants", type: "TEXT" as const, duration: 15, isFree: false, content: "Understanding who participates in financial markets helps you understand price movements and market dynamics.\n\n## Major Market Participants\n\n**Retail Traders** – Individual investors like you and me\n**Institutional Investors** – Banks, hedge funds, pension funds\n**Central Banks** – Control monetary policy and currency values\n**Market Makers** – Provide liquidity by quoting bid/ask prices\n**High-Frequency Traders** – Use algorithms for ultra-fast trading" },
          ],
        },
        {
          title: "Trading Terminology",
          lessons: [
            { title: "Essential Trading Terms A-Z", type: "TEXT" as const, duration: 25, isFree: false, content: "Master the language of trading with this comprehensive glossary.\n\n**Ask Price** – The lowest price a seller will accept\n**Bid Price** – The highest price a buyer will pay\n**Spread** – The difference between bid and ask price\n**Pip** – Smallest unit of price movement in forex (0.0001)\n**Lot** – Standard unit of trading volume\n**Leverage** – Ratio of position size to margin (e.g. 1:100)\n**Margin** – Deposit required to open a leveraged trade\n**Stop Loss** – Order to close a trade at a specified loss level\n**Take Profit** – Order to close a trade at a specified profit level\n**Drawdown** – Reduction in account value from peak to trough" },
            { title: "Quiz: Trading Basics", type: "QUIZ" as const, duration: 10, isFree: false, content: null },
          ],
        },
      ],
    },
    {
      slug: "forex-trading-masterclass",
      title: "Forex Trading Masterclass",
      titleAr: "دورة تداول الفوركس الشاملة",
      titleEs: "Masterclass de Trading Forex",
      titleFr: "Masterclass de Trading Forex",
      description:
        "Dive deep into the world's largest financial market. Learn currency pairs, how the forex market works, reading quotes, fundamental and technical factors affecting exchange rates, and practical trading strategies.",
      category: "FOREX" as const,
      level: "BEGINNER" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 480,
      totalLessons: 18,
      instructor: "James Okafor",
      tags: ["forex", "currency trading", "currency pairs", "pips", "lots"],
      sortOrder: 2,
      modules: [
        {
          title: "Forex Market Fundamentals",
          lessons: [
            { title: "What is the Forex Market?", type: "TEXT" as const, duration: 20, isFree: true, content: "The foreign exchange market (forex/FX) is the world's largest and most liquid financial market with over $7.5 trillion traded daily — more than all stock markets combined.\n\n## How Forex Works\n\nUnlike stocks, forex has no central exchange. Trading happens over-the-counter (OTC) between banks, institutions, and retail traders through electronic networks.\n\n## The Major Sessions\n\n- **Sydney Session** – 10 PM – 7 AM GMT\n- **Tokyo Session** – 12 AM – 9 AM GMT\n- **London Session** – 8 AM – 5 PM GMT (most liquid)\n- **New York Session** – 1 PM – 10 PM GMT\n\n## Why Trade Forex?\n\n✅ 24/5 market access\n✅ Highest liquidity\n✅ Low transaction costs\n✅ Ability to go long or short\n✅ High leverage available" },
            { title: "Currency Pairs Explained", type: "TEXT" as const, duration: 25, isFree: true, content: "In forex, currencies are always traded in pairs. The first currency is the base, the second is the quote.\n\n## Major Pairs\nEUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD\n\n## Minor Pairs (Cross Pairs)\nEUR/GBP, EUR/JPY, GBP/JPY — pairs that don't include USD\n\n## Exotic Pairs\nUSD/TRY, EUR/ZAR — one major + one emerging market currency\n\n## Reading a Quote\nEUR/USD = 1.0850 means 1 Euro = 1.0850 US Dollars\n\n**Bid/Ask**: Bid 1.0848 / Ask 1.0852 → Spread = 0.4 pips" },
          ],
        },
      ],
    },
    {
      slug: "technical-analysis-mastery",
      title: "Technical Analysis Mastery",
      titleAr: "إتقان التحليل التقني",
      titleEs: "Dominio del Análisis Técnico",
      titleFr: "Maîtrise de l'Analyse Technique",
      description:
        "Learn to read price charts and identify profitable trading opportunities using technical analysis. Master candlestick patterns, support & resistance, trend lines, and popular indicators like RSI, MACD, and Bollinger Bands.",
      category: "TECHNICAL_ANALYSIS" as const,
      level: "INTERMEDIATE" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 600,
      totalLessons: 22,
      instructor: "Sarah Mitchell, CFA",
      tags: ["technical analysis", "chart patterns", "indicators", "candlesticks", "RSI", "MACD"],
      sortOrder: 3,
      modules: [
        {
          title: "Candlestick Patterns",
          lessons: [
            { title: "Reading Candlestick Charts", type: "TEXT" as const, duration: 30, isFree: true, content: "Candlestick charts originated in Japan in the 18th century and are the most popular chart type among traders.\n\n## Anatomy of a Candlestick\n\nEach candle represents a time period and shows:\n- **Open** – Price at start of period\n- **Close** – Price at end of period\n- **High** – Highest price reached\n- **Low** – Lowest price reached\n\n**Bullish Candle (Green/White)** – Close > Open\n**Bearish Candle (Red/Black)** – Close < Open\n\n## Key Patterns\n\n**Doji** – Open ≈ Close → indecision\n**Hammer** – Long lower wick → potential reversal up\n**Shooting Star** – Long upper wick → potential reversal down\n**Engulfing** – Large candle engulfs previous → strong reversal signal" },
          ],
        },
      ],
    },
    {
      slug: "risk-management-fundamentals",
      title: "Risk Management: Protect Your Capital",
      titleAr: "إدارة المخاطر: حماية رأس مالك",
      titleEs: "Gestión de Riesgos: Protege tu Capital",
      titleFr: "Gestion des Risques: Protégez Votre Capital",
      description:
        "The most critical skill in trading. Learn position sizing, risk-reward ratios, stop-loss placement, portfolio diversification, and the psychological aspects of risk management to protect and grow your trading account.",
      category: "RISK_MANAGEMENT" as const,
      level: "BEGINNER" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 360,
      totalLessons: 14,
      instructor: "David Okafor",
      tags: ["risk management", "position sizing", "stop loss", "risk/reward", "money management"],
      sortOrder: 4,
      modules: [
        {
          title: "Core Risk Principles",
          lessons: [
            { title: "The 1% Rule — Never Risk More", type: "TEXT" as const, duration: 20, isFree: true, content: "The single most important rule in trading: never risk more than 1-2% of your account on any single trade.\n\n## Why the 1% Rule Saves Accounts\n\nIf you have a $10,000 account:\n- 1% risk per trade = $100 maximum loss\n- Even 20 consecutive losing trades only costs $2,000 (20% drawdown)\n- Your account survives to fight another day\n\n## Position Sizing Formula\n\n**Position Size = (Account × Risk%) ÷ Stop Loss in $**\n\nExample:\n- Account: $10,000\n- Risk: 1% = $100\n- Stop Loss: 50 pips = $5 per pip\n- Position Size: $100 ÷ $5 = 20,000 units (0.2 lots)\n\n## Risk/Reward Ratio\n\nAlways aim for minimum 1:2 risk/reward.\nIf you risk $100, target at least $200 profit." },
          ],
        },
      ],
    },
    {
      slug: "crypto-trading-complete-course",
      title: "Cryptocurrency Trading Complete Course",
      titleAr: "دورة تداول العملات الرقمية الشاملة",
      titleEs: "Curso Completo de Trading de Criptomonedas",
      titleFr: "Cours Complet de Trading de Cryptomonnaies",
      description:
        "Comprehensive guide to cryptocurrency trading from Bitcoin basics to advanced DeFi strategies. Understand blockchain technology, major cryptocurrencies, exchanges, wallets, and how to trade crypto safely.",
      category: "CRYPTO" as const,
      level: "BEGINNER" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 420,
      totalLessons: 16,
      instructor: "Priya Sharma",
      tags: ["cryptocurrency", "bitcoin", "ethereum", "DeFi", "blockchain", "crypto trading"],
      sortOrder: 5,
      modules: [
        {
          title: "Crypto Fundamentals",
          lessons: [
            { title: "What is Cryptocurrency?", type: "TEXT" as const, duration: 20, isFree: true, content: "Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit.\n\n## Key Characteristics\n\n- **Decentralised** – No central authority controls it\n- **Transparent** – All transactions on public blockchain\n- **Secure** – Protected by cryptographic algorithms\n- **Borderless** – Send anywhere in the world instantly\n- **24/7 Markets** – Trade any time, any day\n\n## Top Cryptocurrencies by Market Cap\n\n1. **Bitcoin (BTC)** – Digital gold, store of value\n2. **Ethereum (ETH)** – Smart contracts platform\n3. **BNB** – Binance ecosystem token\n4. **XRP** – Cross-border payments\n5. **USDT** – Stablecoin pegged to USD" },
          ],
        },
      ],
    },
    {
      slug: "advanced-options-trading",
      title: "Advanced Options Trading Strategies",
      titleAr: "استراتيجيات تداول الخيارات المتقدمة",
      titleEs: "Estrategias Avanzadas de Trading de Opciones",
      titleFr: "Stratégies Avancées de Trading d'Options",
      description:
        "Master options trading with proven strategies for income generation, hedging, and speculation. Learn calls, puts, spreads, straddles, and the Greeks (Delta, Gamma, Theta, Vega) for professional options trading.",
      category: "OPTIONS" as const,
      level: "ADVANCED" as const,
      isPremium: true,
      isPublished: true,
      totalDuration: 720,
      totalLessons: 28,
      instructor: "Sarah Mitchell, CFA",
      tags: ["options", "derivatives", "calls", "puts", "spreads", "the greeks", "advanced"],
      sortOrder: 6,
      modules: [
        {
          title: "Options Fundamentals",
          lessons: [
            { title: "What Are Options?", type: "TEXT" as const, duration: 25, isFree: true, content: "An option is a contract that gives the buyer the RIGHT, but not the OBLIGATION, to buy or sell an underlying asset at a specified price (strike price) on or before a specific date (expiration).\n\n## Types of Options\n\n**Call Option** – Right to BUY at strike price\n**Put Option** – Right to SELL at strike price\n\n## Key Terms\n\n- **Strike Price** – The agreed-upon transaction price\n- **Premium** – Cost of buying the option\n- **Expiration Date** – When the contract expires\n- **In The Money (ITM)** – Option has intrinsic value\n- **Out of The Money (OTM)** – Option has no intrinsic value\n\n## Why Trade Options?\n\n✅ Lower capital requirement than owning shares\n✅ Defined risk for buyers (max loss = premium paid)\n✅ Leverage and flexibility\n✅ Income generation through selling options" },
          ],
        },
      ],
    },
    {
      slug: "trading-psychology-mastery",
      title: "Trading Psychology: Master Your Mind",
      titleAr: "علم نفس التداول: اتقن عقلك",
      titleEs: "Psicología del Trading: Domina tu Mente",
      titleFr: "Psychologie du Trading: Maîtrisez Votre Esprit",
      description:
        "90% of trading success is mental. This premium course teaches you to control emotions, overcome fear and greed, develop a winning mindset, and build the discipline needed for consistent profitability.",
      category: "PSYCHOLOGY" as const,
      level: "INTERMEDIATE" as const,
      isPremium: true,
      isPublished: true,
      totalDuration: 480,
      totalLessons: 18,
      instructor: "Dr. Emma Williams",
      tags: ["psychology", "mindset", "discipline", "emotions", "fear", "greed", "trading mindset"],
      sortOrder: 7,
      modules: [
        {
          title: "The Trader's Mind",
          lessons: [
            { title: "Why 80% of Traders Lose Money", type: "TEXT" as const, duration: 25, isFree: true, content: "Studies show that approximately 70-80% of retail traders lose money over time. The reasons are rarely lack of strategy — they're psychological.\n\n## The Real Reasons Traders Fail\n\n**1. Overtrading** – Taking too many trades out of boredom or excitement\n**2. Revenge Trading** – Trying to 'win back' losses with bigger positions\n**3. Fear of Missing Out (FOMO)** – Entering trades late chasing price\n**4. Moving Stop Losses** – Letting losing trades run, hoping for reversal\n**5. Taking Profits Too Early** – Fear making you close winners prematurely\n**6. Position Sizing Errors** – Risking too much on any single trade\n**7. No Trading Plan** – Trading on impulse rather than rules\n\n## The Solution\n\nSuccess in trading comes from:\n✅ A clearly defined trading plan\n✅ Strict risk management rules\n✅ Emotional discipline and self-awareness\n✅ Consistent execution regardless of outcome" },
          ],
        },
      ],
    },
    {
      slug: "stock-market-investing",
      title: "Stock Market Investing for Beginners",
      titleAr: "الاستثمار في سوق الأسهم للمبتدئين",
      titleEs: "Inversión en Bolsa para Principiantes",
      titleFr: "Investissement en Bourse pour Débutants",
      description:
        "Learn how to invest in the stock market with confidence. Covers stock valuation, portfolio construction, dividend investing, growth investing, ETFs, and building long-term wealth through equities.",
      category: "STOCKS" as const,
      level: "BEGINNER" as const,
      isPremium: false,
      isPublished: true,
      totalDuration: 360,
      totalLessons: 14,
      instructor: "James Okafor",
      tags: ["stocks", "investing", "equities", "dividends", "portfolio", "ETFs", "long-term investing"],
      sortOrder: 8,
      modules: [
        {
          title: "Stock Market Basics",
          lessons: [
            { title: "How the Stock Market Works", type: "TEXT" as const, duration: 20, isFree: true, content: "The stock market is a marketplace where buyers and sellers trade shares of publicly listed companies.\n\n## Key Stock Exchanges\n\n- **NYSE** – New York Stock Exchange (US)\n- **NASDAQ** – Technology-focused US exchange\n- **LSE** – London Stock Exchange (UK)\n- **TSE** – Tokyo Stock Exchange (Japan)\n- **SSE** – Shanghai Stock Exchange (China)\n\n## How Stocks Generate Returns\n\n**Capital Appreciation** – Stock price increases over time\n**Dividends** – Regular cash payments from company profits\n\n## Stock Market Indices\n\n**S&P 500** – 500 largest US companies\n**DJIA** – 30 major US blue-chip companies\n**FTSE 100** – 100 largest UK companies\n**Nikkei 225** – 225 major Japanese companies" },
          ],
        },
      ],
    },
  ];

  for (const courseData of coursesData) {
    const { modules, ...courseFields } = courseData;
    const course = await prisma.course.create({ data: courseFields });

    for (let mi = 0; mi < modules.length; mi++) {
      const { lessons, ...moduleFields } = modules[mi];
      const mod = await prisma.module.create({
        data: { ...moduleFields, courseId: course.id, sortOrder: mi },
      });

      for (let li = 0; li < lessons.length; li++) {
        const { content, ...lessonFields } = lessons[li];
        const lesson = await prisma.lesson.create({
          data: {
            ...lessonFields,
            content: content ?? undefined,
            moduleId: mod.id,
            sortOrder: li,
          },
        });

        // Create quiz for quiz-type lessons
        if (lesson.type === "QUIZ") {
          const quiz = await prisma.quiz.create({
            data: { lessonId: lesson.id, passMark: 70 },
          });
          await prisma.quizQuestion.createMany({
            data: [
              {
                quizId: quiz.id,
                question: "What is the primary purpose of financial markets?",
                options: JSON.stringify([
                  { id: "a", text: "To facilitate capital allocation and price discovery" },
                  { id: "b", text: "To generate government revenue" },
                  { id: "c", text: "To provide employment" },
                  { id: "d", text: "To control inflation" },
                ]),
                correctOption: "a",
                explanation: "Financial markets facilitate capital allocation, price discovery, and risk management.",
                sortOrder: 0,
              },
              {
                quizId: quiz.id,
                question: "What does 'going long' mean in trading?",
                options: JSON.stringify([
                  { id: "a", text: "Holding a trade for a long time" },
                  { id: "b", text: "Buying an asset expecting the price to rise" },
                  { id: "c", text: "Selling an asset expecting the price to fall" },
                  { id: "d", text: "Trading with high leverage" },
                ]),
                correctOption: "b",
                explanation: "Going long means buying an asset with the expectation that its price will increase.",
                sortOrder: 1,
              },
              {
                quizId: quiz.id,
                question: "What is a 'spread' in trading?",
                options: JSON.stringify([
                  { id: "a", text: "The daily price range" },
                  { id: "b", text: "The broker's commission fee" },
                  { id: "c", text: "The difference between bid and ask price" },
                  { id: "d", text: "The leverage ratio" },
                ]),
                correctOption: "c",
                explanation: "The spread is the difference between the bid (buy) price and the ask (sell) price.",
                sortOrder: 2,
              },
            ],
          });
        }
      }
    }
  }
  console.log(`✅ ${coursesData.length} courses created with modules, lessons, and quizzes`);

  // ─── Testimonials ─────────────────────────────────────────────────────────
  await prisma.testimonial.createMany({
    data: [
      { name: "Ahmed Al-Rashidi", country: "Saudi Arabia 🇸🇦", rating: 5, isActive: true, sortOrder: 1, content: "PipsPlus helped me identify regulated brokers and avoid scams. The free courses are exceptional quality — better than many paid courses I've tried. I earned my certificate and now trade Forex profitably!" },
      { name: "Maria Gonzalez", country: "Spain 🇪🇸", rating: 5, isActive: true, sortOrder: 2, content: "I lost €8,000 to a fraudulent broker and felt hopeless. PipsPlus legal team reviewed my case and recovered 80% within 3 months. Their fund recovery service is genuine and professional. Forever grateful!" },
      { name: "James Okonkwo", country: "Nigeria 🇳🇬", rating: 5, isActive: true, sortOrder: 3, content: "As someone completely new to trading, the PipsPlus Education Hub was exactly what I needed. Clear, structured, and practical lessons that took me from zero to profitable trader in 6 months." },
      { name: "Sophie Laurent", country: "France 🇫🇷", rating: 5, isActive: true, sortOrder: 4, content: "The broker reviews are genuinely independent and detailed. I compared 5 brokers using PipsPlus ratings and chose Pepperstone — excellent decision. No commissions hidden, fast withdrawals, just as promised." },
      { name: "Wang Wei", country: "Singapore 🇸🇬", rating: 5, isActive: true, sortOrder: 5, content: "PipsPlus broker ratings saved me from an unregulated broker that a friend recommended. The blacklist feature is incredibly valuable. Now using a top-rated broker with full peace of mind." },
      { name: "Carlos Mendez", country: "Mexico 🇲🇽", rating: 5, isActive: true, sortOrder: 6, content: "Completed the Technical Analysis course and received my physical certificate within 2 weeks! The certificate looks incredibly professional. My employer was impressed and it helped me land a trading analyst role." },
    ],
  });
  console.log("✅ Testimonials created");

  // ─── Broker Reviews ───────────────────────────────────────────────────────
  const ib = await prisma.broker.findUnique({ where: { slug: "interactive-brokers" } });
  const pepperstone = await prisma.broker.findUnique({ where: { slug: "pepperstone" } });

  if (ib) {
    await prisma.brokerReview.create({
      data: {
        brokerId: ib.id,
        userId: demoTrader.id,
        title: "Best broker for serious traders",
        content: "Been with IBKR for 4 years. The platform is powerful, commissions are the lowest I've found, and withdrawals are always processed within 1 business day. Customer support is excellent via chat. The only downside is the learning curve with TWS platform.",
        rating: 5,
        ratingTrust: 5,
        ratingPlatform: 5,
        ratingSupport: 4,
        ratingFees: 5,
        ratingWithdrawal: 5,
        tradingExperience: 6,
        accountType: "IBKR Pro",
        country: "United Kingdom",
        status: "APPROVED",
        isVerified: true,
      },
    });
  }

  if (pepperstone) {
    await prisma.brokerReview.create({
      data: {
        brokerId: pepperstone.id,
        userId: demoTrader.id,
        title: "Excellent execution, tight spreads",
        content: "Pepperstone is my go-to for forex trading. Raw spreads on EUR/USD regularly at 0.0-0.1 pips during London session. MT5 integration is seamless and withdrawals via PayPal arrive same day. Highly regulated and transparent.",
        rating: 5,
        ratingTrust: 5,
        ratingPlatform: 5,
        ratingSupport: 4,
        ratingFees: 5,
        ratingWithdrawal: 5,
        tradingExperience: 4,
        accountType: "Razor Account",
        country: "United Kingdom",
        status: "APPROVED",
        isVerified: true,
      },
    });
  }
  console.log("✅ Sample broker reviews created");


  // ─── Demo Enrollment ──────────────────────────────────────────────────────
  const firstCourse = await prisma.course.findFirst({
    where: { slug: "trading-basics-complete-guide" },
  });
  if (firstCourse) {
    await prisma.enrollment.create({
      data: {
        userId: demoTrader.id,
        courseId: firstCourse.id,
        progressPct: 45,
      },
    });
  }
  console.log("✅ Demo enrollment created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Demo Accounts:");
  console.log("   Admin:  admin@pipsplus.com  / Admin@123456");
  console.log("   Trader: trader@pipsplus.com / Trader@123456");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
