import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return {
    title: {
      default: "PipsPlus — Trading Education & Broker Reviews",
      template: "%s | PipsPlus",
    },
    description: t("subheadline"),
    keywords: [
      "trading education",
      "broker reviews",
      "forex trading",
      "fund recovery",
      "trading courses",
      "broker ratings",
    ],
    openGraph: {
      type: "website",
      siteName: "PipsPlus",
      locale: locale === "ar" ? "ar_AE" : locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@PipsPlus",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const [messages, session] = await Promise.all([
    getMessages(),
    getServerSession(authOptions),
  ]);
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${inter.variable} ${notoArabic.variable}`}
    >
      <body className="antialiased min-h-screen bg-white text-gray-900">
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
