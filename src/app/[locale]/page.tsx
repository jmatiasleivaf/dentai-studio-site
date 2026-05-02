import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AISection } from "@/components/home/AISection";
import { Personas } from "@/components/home/Personas";
import { Pricing } from "@/components/home/Pricing";
import { PricingMatrix } from "@/components/home/PricingMatrix";
import { Features } from "@/components/home/Features";
import { Totem } from "@/components/home/Totem";
import { Proof } from "@/components/home/Proof";
import { FAQ } from "@/components/home/FAQ";
import { FAQSchema } from "@/components/home/FAQSchema";
import { CtaFinal } from "@/components/home/CtaFinal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <AISection />
      <Features />
      <Personas />
      <Pricing />
      <PricingMatrix />
      <Totem />
      <Proof />
      <FAQ />
      <FAQSchema locale={locale} />
      <CtaFinal />
    </>
  );
}
