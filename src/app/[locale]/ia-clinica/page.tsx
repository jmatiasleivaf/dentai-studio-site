import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquare,
  Upload,
  Sparkles,
  Eye,
  Share2,
  User,
  Users,
  Building2,
  Scan,
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
  const t = await getTranslations({ locale, namespace: "iaClinicaPage.meta" });

  const canonical = `https://superclini.com/${locale}/ia-clinica`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/ia-clinica`])
      ),
    },
    openGraph: { type: "website", url: canonical, title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function IAClinicaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("iaClinicaPage");

  const smileBullets = t.raw("smile.bullets") as string[];
  const radioBullets = t.raw("radio.bullets") as string[];

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
        visual={<IAVisualMockup labels={{ before: t("smile.beforeLabel"), after: t("smile.afterLabel"), radio: t("radio.heroLabel") }} />}
      />

      <section id="how-it-works">
        <HowItWorks
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          steps={[
            { title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc"), Icon: Upload },
            { title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc"), Icon: Sparkles },
            { title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.desc"), Icon: Eye },
            { title: t("howItWorks.steps.4.title"), desc: t("howItWorks.steps.4.desc"), Icon: Share2 },
          ]}
        />
      </section>

      <FeatureBlock
        eyebrow={t("smile.eyebrow")}
        title={t("smile.title")}
        description={t("smile.description")}
        bullets={smileBullets}
        side="right"
        visual={<SmileBeforeAfter beforeLabel={t("smile.beforeLabel")} afterLabel={t("smile.afterLabel")} />}
      />

      <FeatureBlock
        eyebrow={t("radio.eyebrow")}
        title={t("radio.title")}
        description={t("radio.description")}
        bullets={radioBullets}
        side="left"
        tone="muted"
        visual={<RadiographAnalysisCard hotSpots={t.raw("radio.detections") as string[]} />}
      />

      <UseCases
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        cases={[
          { persona: t("useCases.cases.solo.persona"), pain: t("useCases.cases.solo.pain"), benefit: t("useCases.cases.solo.benefit"), Icon: User },
          { persona: t("useCases.cases.clinic.persona"), pain: t("useCases.cases.clinic.pain"), benefit: t("useCases.cases.clinic.benefit"), Icon: Users },
          { persona: t("useCases.cases.network.persona"), pain: t("useCases.cases.network.pain"), benefit: t("useCases.cases.network.benefit"), Icon: Building2 },
        ]}
      />

      <Comparison
        eyebrow={t("comparison.eyebrow")}
        title={t("comparison.title")}
        beforeHeader={t("comparison.beforeHeader")}
        afterHeader={t("comparison.afterHeader")}
        rows={[
          { topic: t("comparison.rows.aceitacao.topic"), before: t("comparison.rows.aceitacao.before"), after: t("comparison.rows.aceitacao.after") },
          { topic: t("comparison.rows.tempo.topic"), before: t("comparison.rows.tempo.before"), after: t("comparison.rows.tempo.after") },
          { topic: t("comparison.rows.diagnostico.topic"), before: t("comparison.rows.diagnostico.before"), after: t("comparison.rows.diagnostico.after") },
          { topic: t("comparison.rows.auditoria.topic"), before: t("comparison.rows.auditoria.before"), after: t("comparison.rows.auditoria.after") },
        ]}
      />

      <LandingFAQ namespace="iaClinicaPage.faq" />
      <FAQSchema locale={locale} namespace="iaClinicaPage.faq" />

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

function IAVisualMockup({ labels }: { labels: { before: string; after: string; radio: string } }) {
  return (
    <div className="relative mx-auto max-w-[520px] space-y-4">
      <SmileBeforeAfter beforeLabel={labels.before} afterLabel={labels.after} />
      <div className="relative -mt-2 ml-12 w-[80%]">
        <RadiographMiniCard label={labels.radio} />
      </div>
    </div>
  );
}

function SmileBeforeAfter({ beforeLabel, afterLabel }: { beforeLabel: string; afterLabel: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white p-4 shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
        <Sparkles className="h-3.5 w-3.5" aria-hidden /> AI Smile
      </div>
      <div className="grid grid-cols-2 gap-2">
        <figure className="relative">
          <Image
            src="/showcase/smile-antes.png"
            alt={beforeLabel}
            width={400}
            height={300}
            className="h-40 w-full rounded-2xl object-cover"
          />
          <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">
            {beforeLabel}
          </figcaption>
        </figure>
        <figure className="relative">
          <Image
            src="/showcase/smile-depois.png"
            alt={afterLabel}
            width={400}
            height={300}
            className="h-40 w-full rounded-2xl object-cover"
          />
          <figcaption className="absolute bottom-2 left-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-white">
            {afterLabel}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function RadiographMiniCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
      <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        <Scan className="h-3.5 w-3.5" aria-hidden /> AI Radio
      </div>
      <div className="mt-2 flex h-24 items-center justify-center rounded-xl bg-ink-900">
        <RadiographSvg />
      </div>
      <p className="mt-2 text-[11px] font-medium text-ink-600 dark:text-ink-400">{label}</p>
    </div>
  );
}

function RadiographAnalysisCard({ hotSpots }: { hotSpots: string[] }) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        <Scan className="h-4 w-4" aria-hidden /> AI Radiograph Analysis
      </div>
      <div className="flex h-44 items-center justify-center rounded-2xl bg-ink-900">
        <RadiographSvg />
      </div>
      <ul className="mt-4 space-y-2">
        {hotSpots.map((spot, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-ink-700 dark:text-ink-200">
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-[9px] font-extrabold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
              {i + 1}
            </span>
            <span>{spot}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RadiographSvg() {
  return (
    <svg viewBox="0 0 200 80" className="h-32 w-full" aria-hidden>
      <defs>
        <linearGradient id="rx-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Hot spots circulados */}
      <g fill="none" stroke="url(#rx-grad)" strokeWidth="1.5">
        <circle cx="40" cy="30" r="6" />
        <circle cx="100" cy="40" r="8" />
        <circle cx="160" cy="28" r="5" />
      </g>
      {/* Dentes simulados */}
      <g fill="#94a3b8" opacity="0.5">
        {[20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185].map((x) => (
          <rect key={x} x={x - 5} y={50} width={10} height={20} rx={2} />
        ))}
      </g>
      {/* Numeração das anotações */}
      <g fill="#fbbf24" fontSize="8" fontWeight="bold">
        <text x="48" y="20">1</text>
        <text x="110" y="30">2</text>
        <text x="166" y="18">3</text>
      </g>
    </svg>
  );
}
