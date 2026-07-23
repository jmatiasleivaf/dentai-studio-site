import {
  Calendar,
  FileText,
  Layers,
  ClipboardList,
  DollarSign,
  Sparkles,
  FlaskConical,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Mockup } from "@/components/help/mockups";
import { Slider } from "@/components/ui/slider";
import type { MockupKey } from "@/lib/help/types";
import type { Locale } from "@/i18n/routing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { cn } from "@/lib/utils";

type Dict = Record<Locale, string>;
const pick = (d: Dict, l: Locale) => d[l] ?? d.es;

// Telas reais do produto que passam no slider (mockups fiéis do Centro de Ayuda).
const SCREENS: { screen: MockupKey; cap: Dict }[] = [
  { screen: "panel-kpis", cap: { es: "Panel del día: tu clínica de un vistazo", pt: "Painel do dia: tua clínica num relance", en: "Daily panel: your clinic at a glance" } },
  { screen: "agenda-dia", cap: { es: "Agenda en grilla, por profesional", pt: "Agenda em grade, por profissional", en: "Grid schedule, by professional" } },
  { screen: "caja-detalle", cap: { es: "Caja y cobros, sin planillas", pt: "Caixa e cobranças, sem planilhas", en: "Cash and payments, no spreadsheets" } },
  { screen: "ficha-overview", cap: { es: "La ficha del paciente, completa", pt: "A ficha do paciente, completa", en: "The complete patient record" } },
];
const SLIDER_LABEL: Dict = { es: "Pantallas reales del producto", pt: "Telas reais do produto", en: "Real product screens" };

/**
 * A plataforma que sustenta os agentes (Direção B, 2026-07-23).
 *
 * Reescrita: saiu o "spotlight" da Sofía, que era a TERCEIRA aparição da Sofía na
 * home (Hero + AgentsBand + aqui) e reabria a moldura de IA que a AgentsBand já
 * fecha. No lugar entra uma tela REAL do produto (mockup fiel do Centro de Ayuda,
 * tri-língue, sem PII) como prova visual, seguida da grade de módulos comprimida.
 */
const ITEMS = [
  { id: "agenda", Icon: Calendar, tone: "brand" },
  { id: "prontuario", Icon: FileText, tone: "emerald" },
  { id: "dicom", Icon: Layers, tone: "rose" },
  { id: "planos", Icon: ClipboardList, tone: "amber" },
  { id: "financeiro", Icon: DollarSign, tone: "amber" },
  { id: "memberships", Icon: Sparkles, tone: "violet" },
  { id: "laboratory", Icon: FlaskConical, tone: "teal" },
  { id: "totem", Icon: Monitor, tone: "indigo" },
] as const;

const TONE: Record<string, string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400",
  emerald:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  violet:
    "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
};

export function Features() {
  const t = useTranslations("features");
  const locale = useLocale() as Locale;

  return (
    <Section id="features" tone="default">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow", {
            shown: ITEMS.length,
            total: SUPERCLINI_FACTS.modulesCount,
          })}
          title={t("title")}
          sub={t("sub")}
        />

        {/* Slider de telas REAIS do produto: prova visual, mostra a amplitude. */}
        <div className="mx-auto mt-12 w-full max-w-3xl">
          <Slider label={pick(SLIDER_LABEL, locale)} autoMs={6000}>
            {SCREENS.map((s) => (
              <div key={s.screen} className="px-1">
                <Mockup screen={s.screen} locale={locale} />
                <p className="mt-4 text-center text-sm text-ink-500 dark:text-ink-400">
                  {pick(s.cap, locale)}
                </p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {ITEMS.map(({ id, Icon, tone }) => (
            <article
              key={id}
              className="group rounded-3xl border border-ink-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
            >
              <div
                className={cn(
                  "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                  TONE[tone]
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-base font-bold leading-tight text-ink-950 dark:text-white">
                {t(`items.${id}.title`)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`items.${id}.desc`)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/precios">
              {t("ctaAll")} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
