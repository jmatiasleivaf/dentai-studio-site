import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquare,
  Hand,
  CreditCard,
  Calendar,
  PenLine,
  User,
  Building2,
  Users,
  Monitor,
  Search,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { LandingHero } from "@/components/landing/LandingHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureBlock } from "@/components/landing/FeatureBlock";
import { UseCases } from "@/components/landing/UseCases";
import { Comparison } from "@/components/landing/Comparison";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { FAQSchema } from "@/components/home/FAQSchema";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "totemPage.meta" });

  const canonical = `https://superclini.com/${locale}/totem`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/totem`])
      ),
    },
    openGraph: { type: "website", url: canonical, title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function TotemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("totemPage");

  const checkinBullets = t.raw("checkin.bullets") as string[];
  const consentBullets = t.raw("consent.bullets") as string[];

  return (
    <>
      <LandingHero
        badge={t("hero.badge")}
        title={t("hero.h1")}
        sub={t("hero.sub")}
        primaryCta={
          <ContactCTAButton defaultInteresse="trial_profesional">
            {t("hero.ctaPrimary")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ContactCTAButton>
        }
        secondaryCta={
          <Button asChild variant="outline" size="lg">
            <a href="#how-it-works">{t("hero.ctaSecondary")}</a>
          </Button>
        }
        visual={<TabletMockup labels={t.raw("hero.mockupLabels") as Record<string, string>} />}
      />

      <section id="how-it-works">
        <HowItWorks
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          steps={[
            { title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc"), Icon: Hand },
            { title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc"), Icon: Search },
            { title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.desc"), Icon: Calendar },
            { title: t("howItWorks.steps.4.title"), desc: t("howItWorks.steps.4.desc"), Icon: PenLine },
          ]}
        />
      </section>

      <FeatureBlock
        eyebrow={t("checkin.eyebrow")}
        title={t("checkin.title")}
        description={t("checkin.description")}
        bullets={checkinBullets}
        side="right"
        visual={<CheckinMockup labels={t.raw("checkin.mockupLabels") as Record<string, string>} />}
      />

      <FeatureBlock
        eyebrow={t("consent.eyebrow")}
        title={t("consent.title")}
        description={t("consent.description")}
        bullets={consentBullets}
        side="left"
        tone="muted"
        visual={<ConsentMockup labels={t.raw("consent.mockupLabels") as Record<string, string>} />}
      />

      <UseCases
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        cases={[
          { persona: t("useCases.cases.alto.persona"), pain: t("useCases.cases.alto.pain"), benefit: t("useCases.cases.alto.benefit"), Icon: Users },
          { persona: t("useCases.cases.luxo.persona"), pain: t("useCases.cases.luxo.pain"), benefit: t("useCases.cases.luxo.benefit"), Icon: User },
          { persona: t("useCases.cases.rede.persona"), pain: t("useCases.cases.rede.pain"), benefit: t("useCases.cases.rede.benefit"), Icon: Building2 },
        ]}
      />

      <Comparison
        eyebrow={t("comparison.eyebrow")}
        title={t("comparison.title")}
        beforeHeader={t("comparison.beforeHeader")}
        afterHeader={t("comparison.afterHeader")}
        rows={[
          { topic: t("comparison.rows.tempo.topic"), before: t("comparison.rows.tempo.before"), after: t("comparison.rows.tempo.after") },
          { topic: t("comparison.rows.fila.topic"), before: t("comparison.rows.fila.before"), after: t("comparison.rows.fila.after") },
          { topic: t("comparison.rows.dados.topic"), before: t("comparison.rows.dados.before"), after: t("comparison.rows.dados.after") },
          { topic: t("comparison.rows.consent.topic"), before: t("comparison.rows.consent.before"), after: t("comparison.rows.consent.after") },
          { topic: t("comparison.rows.recep.topic"), before: t("comparison.rows.recep.before"), after: t("comparison.rows.recep.after") },
        ]}
      />

      <LandingFAQ namespace="totemPage.faq" />
      <FAQSchema locale={locale} namespace="totemPage.faq" />

      <LandingCTA
        title={t("ctaFinal.title")}
        sub={t("ctaFinal.sub")}
        primaryCta={
          <ContactCTAButton defaultInteresse="trial_profesional" variant="secondary">
            {t("ctaFinal.ctaPrimary")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ContactCTAButton>
        }
        secondaryCta={
          <ContactCTAButton variant="dark">
            <MessageSquare className="h-4 w-4" aria-hidden />
            {t("ctaFinal.ctaSecondary")}
          </ContactCTAButton>
        }
      />
    </>
  );
}

function TabletMockup({ labels }: { labels: Record<string, string> }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Frame de tablet */}
      <div className="rounded-[2.5rem] border-[10px] border-ink-900 bg-ink-900 p-3 shadow-2xl dark:border-ink-700">
        <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-50 via-white to-accent-50 p-6 dark:from-ink-900 dark:via-ink-950 dark:to-ink-900">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              <Hand className="h-3 w-3" aria-hidden /> {labels.welcome}
            </div>
            <h3 className="mt-4 font-display text-xl font-extrabold leading-tight text-ink-900 dark:text-ink-50">
              {labels.title}
            </h3>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{labels.subtitle}</p>
          </div>

          {/* RUT input */}
          <div className="mt-6">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-ink-500">
              {labels.idLabel}
            </label>
            <div className="rounded-2xl border-2 border-brand-200 bg-white px-4 py-3 text-base font-mono font-bold text-ink-900 dark:border-brand-700 dark:bg-ink-900 dark:text-ink-50">
              12.345.678-9
              <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-brand-500" />
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-brand-gradient px-4 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-brand"
          >
            {labels.cta}
          </button>

          {/* Numpad mockup */}
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((n) => (
              <div
                key={String(n)}
                className="flex h-9 items-center justify-center rounded-lg bg-ink-100 text-sm font-bold text-ink-700 dark:bg-ink-800 dark:text-ink-200"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="mx-auto mt-1 h-2 w-3/5 rounded-b-3xl bg-gradient-to-b from-ink-700 to-ink-900" />
      <div className="mx-auto mt-0.5 h-1 w-2/3 rounded-full bg-ink-800" />
    </div>
  );
}

function CheckinMockup({ labels }: { labels: Record<string, string> }) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        <Monitor className="h-4 w-4" aria-hidden /> {labels.title}
      </div>

      {/* Simulated tablet screen showing patient detected + appointment */}
      <div className="space-y-3 rounded-2xl bg-gradient-to-br from-brand-50 to-white p-4 dark:from-brand-950/30 dark:to-ink-900">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-ink-400">{labels.patientLabel}</div>
            <div className="font-display text-base font-bold text-ink-900 dark:text-ink-50">
              María González
            </div>
            <div className="text-[10px] text-ink-500">12.345.678-9</div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            ✓
          </div>
        </div>

        <div className="rounded-xl border border-brand-200 bg-white px-3 py-2.5 dark:border-brand-700 dark:bg-ink-900">
          <div className="flex items-center gap-2 text-[10px] uppercase text-ink-400">
            <Calendar className="h-3 w-3" aria-hidden /> {labels.nextLabel}
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-900 dark:text-ink-50">10:30 · Dra. Carolina</span>
            <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              {labels.confirmed}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-ink-500 dark:text-ink-400">
          <Clock className="h-3 w-3" aria-hidden /> {labels.queueLabel}: <strong className="text-brand-600">#3</strong>
        </div>
      </div>
    </div>
  );
}

function ConsentMockup({ labels }: { labels: Record<string, string> }) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        <PenLine className="h-4 w-4" aria-hidden /> {labels.title}
      </div>

      {/* Mock consent doc */}
      <div className="rounded-2xl bg-gradient-to-br from-ink-50 to-white p-4 dark:from-ink-900 dark:to-ink-950">
        <div className="text-[10px] uppercase text-ink-400">{labels.docTitle}</div>
        <div className="mt-1 space-y-1">
          <div className="h-1.5 w-full rounded bg-ink-200 dark:bg-ink-700" />
          <div className="h-1.5 w-11/12 rounded bg-ink-200 dark:bg-ink-700" />
          <div className="h-1.5 w-4/5 rounded bg-ink-200 dark:bg-ink-700" />
          <div className="h-1.5 w-3/4 rounded bg-ink-200 dark:bg-ink-700" />
        </div>

        {/* Signature canvas mock */}
        <div className="mt-4 rounded-xl border-2 border-dashed border-brand-300 bg-white p-3 dark:border-brand-700 dark:bg-ink-900">
          <div className="text-[9px] uppercase text-ink-400">{labels.signLabel}</div>
          <svg viewBox="0 0 200 50" className="h-12 w-full">
            <path
              d="M 10 35 Q 20 10, 30 25 T 60 30 Q 75 15, 90 25 Q 110 35, 130 20 T 170 25"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px]">
          <span className="text-ink-500">{labels.dateLabel}: 2026-05-02 10:28</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
            ✓ {labels.signed}
          </span>
        </div>
      </div>
    </div>
  );
}
