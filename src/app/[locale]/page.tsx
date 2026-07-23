import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { AgentsBand } from "@/components/home/AgentsBand";
import { ChileHighlights } from "@/components/home/ChileHighlights";
import { TrustStrip } from "@/components/home/TrustStrip";
import { isChileSite } from "@/lib/site-host";
import { AISection } from "@/components/home/AISection";
import { Features } from "@/components/home/Features";
import { Proof } from "@/components/home/Proof";
import { FAQ } from "@/components/home/FAQ";
import { FAQSchema } from "@/components/home/FAQSchema";
import { Closing } from "@/components/home/Closing";
import { CtaFinal } from "@/components/home/CtaFinal";

/**
 * Home da tese agêntica (2026-07-20).
 *
 * Ordem: o sujeito (os três agentes) antes do predicado (a plataforma).
 *   Hero        estabelece que os três trabalham hoje
 *   AgentsBand  o trabalho de cada um, em peso igual, com prova real
 *   TrustStrip  o mínimo de confiança, sem contagem de teste
 *   AISection   a IA clínica sob demanda
 *   Features    os módulos, comprimidos: a plataforma sustenta os agentes
 *   Proof       a história e os números que importam
 *   FAQ         matéria-prima extraível
 *   Closing     o fecho de categoria
 *
 * Saíram desta página em 2026-07-20:
 *   Pricing e PricingMatrix  ~160 unidades de informação numa home; a matriz de
 *                            25 linhas exigia scroll horizontal em mobile.
 *   Totem                    já tem landing própria em /totem.
 *   Personas                 segmentar por tamanho de clínica é argumento de
 *                            módulo; a tese não muda com o tamanho.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chile = await isChileSite();

  return (
    <>
      <Hero />
      <AgentsBand />
      {chile ? <ChileHighlights /> : null}
      <TrustStrip />
      <AISection />
      <Features />
      <Proof />
      <FAQ />
      <FAQSchema locale={locale} />
      <Closing />
      <CtaFinal />
    </>
  );
}
