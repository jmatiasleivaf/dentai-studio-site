import {
  Bot,
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
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { cn } from "@/lib/utils";

// 8 destaques regulares; spotlight (Sofía/WhatsApp) renderizado separado.
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
  const totalShown = ITEMS.length + 1; // +1 do spotlight

  return (
    <Section id="features" tone="default">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow", {
            shown: totalShown,
            total: SUPERCLINI_FACTS.modulesCount,
          })}
          title={t("title")}
          sub={t("sub")}
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {/* Spotlight — Sofía / WhatsApp · 2×2 em desktop, full-width em mobile */}
          <article className="group relative col-span-2 row-span-1 overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-white p-6 transition-all hover:border-brand-300 hover:shadow-card-hover dark:border-brand-500/30 dark:from-brand-500/10 dark:via-ink-900 dark:to-ink-900 dark:hover:border-brand-400/50 sm:p-8 md:row-span-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-300/20 blur-3xl dark:bg-brand-400/10"
            />

            <div className="relative flex h-full flex-col">
              <div className="mb-5 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient">
                  <Bot className="h-6 w-6 text-white" aria-hidden />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  {t("spotlight.chatLabel")}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold leading-tight text-ink-950 dark:text-white sm:text-3xl">
                {t("spotlight.title")}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t("spotlight.desc")}
              </p>

              {/* Mini chat preview (2 bubbles) */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-2.5 text-sm text-white shadow-sm">
                    {t("spotlight.chatQ")}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink-100 px-4 py-2.5 text-sm text-ink-800 shadow-sm dark:bg-ink-800 dark:text-ink-100">
                    {t("spotlight.chatA")}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href="/sofia"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  {t("spotlight.linkText")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </article>

          {/* 8 features regulares */}
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
            <a href="#pricing">
              {t("ctaAll")} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
