import {
  Calendar,
  FileText,
  ClipboardList,
  DollarSign,
  Sparkles,
  Layers,
  MessageSquare,
  FlaskConical,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "agenda", Icon: Calendar, tone: "brand" },
  { id: "prontuario", Icon: FileText, tone: "emerald" },
  { id: "planos", Icon: ClipboardList, tone: "amber" },
  { id: "financeiro", Icon: DollarSign, tone: "amber" },
  { id: "memberships", Icon: Sparkles, tone: "violet" },
  { id: "dicom", Icon: Layers, tone: "rose" },
  { id: "whatsapp", Icon: MessageSquare, tone: "emerald" },
  { id: "laboratory", Icon: FlaskConical, tone: "teal" },
  { id: "totem", Icon: Monitor, tone: "indigo" },
] as const;

const TONE: Record<string, string> = {
  brand: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
};

export function Features() {
  const t = useTranslations("features");

  return (
    <Section id="features" tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ id, Icon, tone }) => (
            <article
              key={id}
              className="group rounded-3xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
            >
              <div
                className={cn(
                  "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                  TONE[tone]
                )}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight">
                {t(`items.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
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
