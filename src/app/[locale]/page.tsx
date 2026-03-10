import HeroSection from "@/components/sections/home/HeroSection";
import StatsSection from "@/components/sections/home/StatsSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import TrustSection from "@/components/sections/home/TrustSection";
import CTASection from "@/components/sections/home/CTASection";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div>
      <HeroSection locale={locale} />
      <StatsSection locale={locale} />
      <FeaturesSection locale={locale} />
      <HowItWorksSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <TrustSection locale={locale} />
      <CTASection locale={locale} />
    </div>
  );
}
