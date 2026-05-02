import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquare,
  UserPlus,
  ClipboardList,
  Image as ImageIcon,
  ShieldCheck,
  User,
  Users,
  Layers,
  FileText,
  Microscope,
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
  const t = await getTranslations({ locale, namespace: "clinicoPage.meta" });

  const canonical = `https://superclini.com/${locale}/clinico`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/clinico`])
      ),
    },
    openGraph: { type: "website", url: canonical, title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function ClinicoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("clinicoPage");

  const odontoBullets = t.raw("odonto.bullets") as string[];
  const dicomBullets = t.raw("dicom.bullets") as string[];
  const exameBullets = t.raw("exame.bullets") as string[];
  const dicomPresets = t.raw("dicom.presets") as { name: string; values: string }[];

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
        visual={<ClinicoHeroMockup labels={t.raw("hero.mockupLabels") as Record<string, string>} />}
      />

      <section id="how-it-works">
        <HowItWorks
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          steps={[
            { title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc"), Icon: UserPlus },
            { title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc"), Icon: ClipboardList },
            { title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.desc"), Icon: ImageIcon },
            { title: t("howItWorks.steps.4.title"), desc: t("howItWorks.steps.4.desc"), Icon: ShieldCheck },
          ]}
        />
      </section>

      <FeatureBlock
        eyebrow={t("odonto.eyebrow")}
        title={t("odonto.title")}
        description={t("odonto.description")}
        bullets={odontoBullets}
        side="right"
        visual={<OdontogramaMockup labels={t.raw("odonto.statusLabels") as Record<string, string>} />}
      />

      <FeatureBlock
        eyebrow={t("dicom.eyebrow")}
        title={t("dicom.title")}
        description={t("dicom.description")}
        bullets={dicomBullets}
        side="left"
        tone="muted"
        visual={<DicomMockup presets={dicomPresets} viewerLabel={t("dicom.viewerLabel")} />}
      />

      <FeatureBlock
        eyebrow={t("exame.eyebrow")}
        title={t("exame.title")}
        description={t("exame.description")}
        bullets={exameBullets}
        side="right"
        visual={<ExamesGridMockup label={t("exame.gridLabel")} />}
      />

      <UseCases
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        cases={[
          { persona: t("useCases.cases.solo.persona"), pain: t("useCases.cases.solo.pain"), benefit: t("useCases.cases.solo.benefit"), Icon: User },
          { persona: t("useCases.cases.especialista.persona"), pain: t("useCases.cases.especialista.pain"), benefit: t("useCases.cases.especialista.benefit"), Icon: Microscope },
          { persona: t("useCases.cases.clinica.persona"), pain: t("useCases.cases.clinica.pain"), benefit: t("useCases.cases.clinica.benefit"), Icon: Users },
        ]}
      />

      <Comparison
        eyebrow={t("comparison.eyebrow")}
        title={t("comparison.title")}
        beforeHeader={t("comparison.beforeHeader")}
        afterHeader={t("comparison.afterHeader")}
        rows={[
          { topic: t("comparison.rows.papel.topic"), before: t("comparison.rows.papel.before"), after: t("comparison.rows.papel.after") },
          { topic: t("comparison.rows.dicom.topic"), before: t("comparison.rows.dicom.before"), after: t("comparison.rows.dicom.after") },
          { topic: t("comparison.rows.legal.topic"), before: t("comparison.rows.legal.before"), after: t("comparison.rows.legal.after") },
          { topic: t("comparison.rows.mobile.topic"), before: t("comparison.rows.mobile.before"), after: t("comparison.rows.mobile.after") },
          { topic: t("comparison.rows.custo.topic"), before: t("comparison.rows.custo.before"), after: t("comparison.rows.custo.after") },
        ]}
      />

      <LandingFAQ namespace="clinicoPage.faq" />
      <FAQSchema locale={locale} namespace="clinicoPage.faq" />

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

function ClinicoHeroMockup({ labels }: { labels: Record<string, string> }) {
  return (
    <div className="space-y-3">
      {/* Mini ficha do paciente */}
      <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          <FileText className="h-3.5 w-3.5" aria-hidden /> {labels.fichaTitle}
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-[10px] uppercase text-ink-400">{labels.patient}</div>
            <div className="font-semibold text-ink-900 dark:text-ink-50">M. González</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-ink-400">{labels.lastVisit}</div>
            <div className="font-semibold text-ink-900 dark:text-ink-50">2026-04-28</div>
          </div>
        </div>
        {/* Mini odontograma */}
        <div className="mt-4">
          <div className="mb-2 text-[10px] uppercase text-ink-400">{labels.odonto}</div>
          <MiniOdontoSvg />
        </div>
      </div>
    </div>
  );
}

function OdontogramaMockup({ labels }: { labels: Record<string, string> }) {
  const states = [
    { color: "bg-emerald-500", label: labels.healthy },
    { color: "bg-amber-500", label: labels.caries },
    { color: "bg-blue-500", label: labels.restored },
    { color: "bg-violet-500", label: labels.implant },
    { color: "bg-rose-500", label: labels.absent },
  ];
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
      <MiniOdontoSvg />
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {states.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-ink-700 dark:text-ink-200">
            <span className={`inline-block h-2 w-2 rounded-full ${s.color}`} aria-hidden />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniOdontoSvg() {
  // Arco simplificado superior + inferior, 16 dentes cada (32 total)
  const upperFDI = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerFDI = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const states = ["e", "e", "a", "e", "e", "b", "e", "e", "e", "e", "e", "v", "e", "e", "a", "e"];
  const colors: Record<string, string> = {
    e: "#10b981", // emerald
    a: "#f59e0b", // amber caries
    b: "#3b82f6", // blue restored
    v: "#8b5cf6", // violet implant
    r: "#f43f5e", // rose absent
  };
  return (
    <svg viewBox="0 0 320 80" className="w-full" aria-hidden>
      {upperFDI.map((n, i) => (
        <g key={`u-${n}`}>
          <rect
            x={i * 20 + 2}
            y={5}
            width={16}
            height={24}
            rx={3}
            fill={colors[states[i] ?? "e"]}
            opacity={0.9}
          />
          <text x={i * 20 + 10} y={43} fontSize="7" fill="#94a3b8" textAnchor="middle">
            {n}
          </text>
        </g>
      ))}
      {lowerFDI.map((n, i) => (
        <g key={`l-${n}`}>
          <text x={i * 20 + 10} y={52} fontSize="7" fill="#94a3b8" textAnchor="middle">
            {n}
          </text>
          <rect
            x={i * 20 + 2}
            y={55}
            width={16}
            height={24}
            rx={3}
            fill={colors[states[(i + 3) % states.length] ?? "e"]}
            opacity={0.9}
          />
        </g>
      ))}
    </svg>
  );
}

function DicomMockup({
  presets,
  viewerLabel,
}: {
  presets: { name: string; values: string }[];
  viewerLabel: string;
}) {
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        <Layers className="h-4 w-4" aria-hidden /> {viewerLabel}
      </div>
      {/* Slice mockup */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900">
        <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="dicom-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {/* Cranium silhouette */}
          <ellipse cx="100" cy="70" rx="70" ry="55" fill="url(#dicom-grad)" />
          <ellipse cx="100" cy="70" rx="70" ry="55" fill="none" stroke="#fbbf24" strokeOpacity="0.3" strokeWidth="0.5" />
          {/* Dentes inferiores */}
          {[60, 70, 80, 90, 100, 110, 120, 130, 140].map((x) => (
            <rect key={x} x={x - 3} y={92} width={6} height={8} fill="#fbbf24" opacity="0.7" rx={1} />
          ))}
          {/* Cross-hair */}
          <line x1="100" y1="20" x2="100" y2="120" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="30" y1="70" x2="170" y2="70" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="0.5" strokeDasharray="2 2" />
          {/* HU label */}
          <text x="10" y="15" fontSize="6" fill="#06b6d4" fontFamily="monospace">
            HU: 1240
          </text>
          <text x="10" y="135" fontSize="6" fill="#06b6d4" fontFamily="monospace">
            Slice 47/128
          </text>
        </svg>
      </div>
      {/* Presets W/L */}
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {presets.map((p) => (
          <div
            key={p.name}
            className="rounded-lg bg-ink-100 px-2 py-1.5 text-[10px] dark:bg-ink-800"
          >
            <div className="font-bold text-ink-900 dark:text-ink-50">{p.name}</div>
            <div className="font-mono text-[9px] text-ink-500 dark:text-ink-400">{p.values}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamesGridMockup({ label }: { label: string }) {
  // 9 slots simulando o protocolo intraoral padronizado
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        <ImageIcon className="h-4 w-4" aria-hidden /> {label}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl bg-gradient-to-br from-ink-100 to-ink-200 dark:from-ink-800 dark:to-ink-900"
          >
            <div className="flex h-full items-end p-2">
              <span className="text-[9px] font-bold text-ink-500 dark:text-ink-400">
                #{i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
