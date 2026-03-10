export const SITE_NAME = "PipsPlus";
export const SITE_DESCRIPTION =
  "Learn trading from A-Z, find trusted brokers rated by 3.72M+ traders, and recover lost funds.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pipsplus.com";

export const STATS = {
  traders: 3720000,
  tradersDisplay: "3.72M+",
  brokers: 1247,
  brokersDisplay: "1,247",
  courses: 87,
  freeLessons: 500,
  countriesServed: 150,
  fundsRecovered: 47000000,
  fundsRecoveredDisplay: "$47M+",
  successRate: 78,
} as const;

export const NAV_LINKS = [
  { href: "/education", labelKey: "common.nav.education" },
  { href: "/brokers", labelKey: "common.nav.brokers" },
  { href: "/fund-recovery", labelKey: "common.nav.fundRecovery" },
  { href: "/subscriptions", labelKey: "common.nav.subscriptions" },
  { href: "/about", labelKey: "common.nav.about" },
  { href: "/contact", labelKey: "common.nav.contact" },
] as const;

export const LOCALES = ["en", "ar", "es", "fr"] as const;
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  ar: { name: "العربية", flag: "🇸🇦" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
};

export const BROKER_REGULATION_LABELS: Record<string, string> = {
  FCA: "FCA (UK)",
  ASIC: "ASIC (Australia)",
  CySEC: "CySEC (Cyprus)",
  NFA: "NFA (USA)",
  FSCA: "FSCA (South Africa)",
  SEC: "SEC (USA)",
  OTHER: "Other Regulation",
  UNREGULATED: "Unregulated",
};

export const COURSE_CATEGORIES = [
  "BASICS",
  "FOREX",
  "CRYPTO",
  "STOCKS",
  "RISK_MANAGEMENT",
  "TECHNICAL_ANALYSIS",
  "FUNDAMENTAL_ANALYSIS",
  "PSYCHOLOGY",
  "OPTIONS",
  "COMMODITIES",
] as const;

export const COURSE_CATEGORY_ICONS: Record<string, string> = {
  BASICS: "📚",
  FOREX: "💱",
  CRYPTO: "₿",
  STOCKS: "📈",
  RISK_MANAGEMENT: "🛡️",
  TECHNICAL_ANALYSIS: "📊",
  FUNDAMENTAL_ANALYSIS: "🔍",
  PSYCHOLOGY: "🧠",
  OPTIONS: "⚡",
  COMMODITIES: "🏆",
};

export const TEAM_MEMBERS = [
  {
    name: "Alexander Reed",
    role: "CEO & Co-Founder",
    bio: "15 years in financial markets and fintech.",
    image: "/images/team/alex.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Education",
    bio: "Former hedge fund analyst with CFA certification.",
    image: "/images/team/sarah.jpg",
  },
  {
    name: "David Okafor",
    role: "Chief Legal Officer",
    bio: "Specialist in financial regulation and dispute resolution.",
    image: "/images/team/david.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Head of Technology",
    bio: "Ex-Google engineer passionate about fintech.",
    image: "/images/team/priya.jpg",
  },
];
