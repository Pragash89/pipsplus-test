import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { beginnerCourse } from "./beginner-course-data";

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
      subscription: "PROFESSIONAL",
      isVerifiedTrader: true,
    },
  });

  const demoTrader = await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "trader@pipsplus.com",
      passwordHash: traderHash,
      role: "TRADER",
      subscription: "PROFESSIONAL",
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
    beginnerCourse,
  ];

  for (const courseData of coursesData) {
    const { modules, ...courseFields } = courseData as any;
    const course = await prisma.course.create({ data: courseFields });

    for (let mi = 0; mi < modules.length; mi++) {
      const { lessons, planAccess, ...moduleFields } = modules[mi];
      const mod = await prisma.module.create({
        data: {
          ...moduleFields,
          courseId: course.id,
          sortOrder: mi,
          ...(planAccess ? { planAccess } : {}),
        },
      });

      for (let li = 0; li < lessons.length; li++) {
        const { content, quizQuestions, ...lessonFields } = lessons[li];
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

          if (quizQuestions && quizQuestions.length > 0) {
            await prisma.quizQuestion.createMany({
              data: quizQuestions.map(
                (q: { question: string; options: { id: string; text: string }[]; correctOption: string; explanation: string }, qi: number) => ({
                  quizId: quiz.id,
                  question: q.question,
                  options: JSON.stringify(q.options),
                  correctOption: q.correctOption,
                  explanation: q.explanation,
                  sortOrder: qi,
                })
              ),
            });
          }
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
    where: { slug: "beginner-trader-foundation" },
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
