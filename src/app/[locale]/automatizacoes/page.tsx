import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquare,
  Settings,
  Activity,
  Moon,
  TrendingUp,
  User,
  Users,
  Building2,
  DollarSign,
  Wallet,
  Repeat,
  CheckCircle2,
  AlertCircle,
  XCircle,
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
  const t = await getTranslations({ locale, namespace: "automatizacoesPage.meta" });

  const canonical = `https://superclini.com/${locale}/automatizacoes`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/automatizacoes`])
      ),
    },
    openGraph: { type: "website", url: canonical, title: t("title"), description: t("description") },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function AutomatizacoesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("automatizacoesPage");

  const caixaBullets = t.raw("caixa.bullets") as string[];
  const liquidacaoBullets = t.raw("liquidacao.bullets") as string[];
  const membershipBullets = t.raw("membership.bullets") as string[];

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
        visual={<KpiDashboardMockup labels={t.raw("hero.mockupLabels") as Record<string, string>} />}
      />

      <section id="how-it-works">
        <HowItWorks
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          steps={[
            { title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc"), Icon: Settings },
            { title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc"), Icon: Activity },
            { title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.desc"), Icon: Moon },
            { title: t("howItWorks.steps.4.title"), desc: t("howItWorks.steps.4.desc"), Icon: TrendingUp },
          ]}
        />
      </section>

      <FeatureBlock
        eyebrow={t("caixa.eyebrow")}
        title={t("caixa.title")}
        description={t("caixa.description")}
        bullets={caixaBullets}
        side="right"
        visual={<CaixaMockup labels={t.raw("caixa.mockupLabels") as Record<string, string>} />}
      />

      <FeatureBlock
        eyebrow={t("liquidacao.eyebrow")}
        title={t("liquidacao.title")}
        description={t("liquidacao.description")}
        bullets={liquidacaoBullets}
        side="left"
        tone="muted"
        visual={<LiquidacaoMockup labels={t.raw("liquidacao.mockupLabels") as Record<string, string>} />}
      />

      <FeatureBlock
        eyebrow={t("membership.eyebrow")}
        title={t("membership.title")}
        description={t("membership.description")}
        bullets={membershipBullets}
        side="right"
        visual={<MembershipMockup labels={t.raw("membership.mockupLabels") as Record<string, string>} />}
      />

      <UseCases
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        cases={[
          { persona: t("useCases.cases.solo.persona"), pain: t("useCases.cases.solo.pain"), benefit: t("useCases.cases.solo.benefit"), Icon: User },
          { persona: t("useCases.cases.clinica.persona"), pain: t("useCases.cases.clinica.pain"), benefit: t("useCases.cases.clinica.benefit"), Icon: Users },
          { persona: t("useCases.cases.rede.persona"), pain: t("useCases.cases.rede.pain"), benefit: t("useCases.cases.rede.benefit"), Icon: Building2 },
        ]}
      />

      <Comparison
        eyebrow={t("comparison.eyebrow")}
        title={t("comparison.title")}
        beforeHeader={t("comparison.beforeHeader")}
        afterHeader={t("comparison.afterHeader")}
        rows={[
          { topic: t("comparison.rows.fechamento.topic"), before: t("comparison.rows.fechamento.before"), after: t("comparison.rows.fechamento.after") },
          { topic: t("comparison.rows.comissao.topic"), before: t("comparison.rows.comissao.before"), after: t("comparison.rows.comissao.after") },
          { topic: t("comparison.rows.cobranca.topic"), before: t("comparison.rows.cobranca.before"), after: t("comparison.rows.cobranca.after") },
          { topic: t("comparison.rows.lembrete.topic"), before: t("comparison.rows.lembrete.before"), after: t("comparison.rows.lembrete.after") },
          { topic: t("comparison.rows.mrr.topic"), before: t("comparison.rows.mrr.before"), after: t("comparison.rows.mrr.after") },
        ]}
      />

      <LandingFAQ namespace="automatizacoesPage.faq" />
      <FAQSchema locale={locale} namespace="automatizacoesPage.faq" />

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

function KpiDashboardMockup({ labels }: { labels: Record<string, string> }) {
  const kpis = [
    { Icon: Wallet, label: labels.caixa, value: "R$ 12.450", trend: "+18%" },
    { Icon: Repeat, label: labels.mrr, value: "R$ 8.900", trend: "+24%" },
    { Icon: AlertCircle, label: labels.pendente, value: "R$ 1.230", trend: "-12%" },
    { Icon: TrendingUp, label: labels.retencao, value: "92%", trend: "+3pp" },
  ];
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {labels.title}
        </span>
        <span className="text-[10px] text-ink-400">{labels.period}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map(({ Icon, label, value, trend }) => (
          <div
            key={label}
            className="rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-ink-50 p-3 dark:border-ink-800 dark:from-ink-900 dark:to-ink-950"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-4 w-4 text-brand-500" aria-hidden />
              <span
                className={`text-[10px] font-bold ${
                  trend.startsWith("+") || trend.startsWith("+3")
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {trend}
              </span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-ink-500">{label}</div>
            <div className="mt-0.5 font-display text-lg font-extrabold text-ink-900 dark:text-ink-50">
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          {labels.cronStatus}
        </div>
      </div>
    </div>
  );
}

function CaixaMockup({ labels }: { labels: Record<string, string> }) {
  const movimentos = [
    { type: "in", label: labels.consulta, value: "R$ 350" },
    { type: "in", label: labels.pix, value: "R$ 850" },
    { type: "out", label: labels.fornecedor, value: "R$ 220" },
    { type: "in", label: labels.cartao, value: "R$ 1.200" },
  ];
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          <Wallet className="h-4 w-4" aria-hidden /> {labels.title}
        </span>
        <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
          {labels.closed}
        </span>
      </div>
      <ul className="space-y-1.5">
        {movimentos.map((m, i) => (
          <li key={i} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2 dark:bg-ink-800">
            <span className="flex items-center gap-2 text-xs text-ink-700 dark:text-ink-200">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  m.type === "in" ? "bg-emerald-500" : "bg-rose-500"
                }`}
                aria-hidden
              />
              {m.label}
            </span>
            <span
              className={`font-mono text-xs font-bold ${
                m.type === "in" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {m.type === "in" ? "+" : "-"}
              {m.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3 dark:border-ink-800">
        <span className="text-xs uppercase text-ink-500">{labels.balance}</span>
        <span className="font-display text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
          R$ 2.180
        </span>
      </div>
    </div>
  );
}

function LiquidacaoMockup({ labels }: { labels: Record<string, string> }) {
  const profs = [
    { name: "Dra. Carolina", spec: labels.dentista, comission: "30%", value: "R$ 4.200" },
    { name: "Dr. Ricardo", spec: labels.implantodontista, comission: "40%", value: "R$ 6.800" },
    { name: "Dra. Marina", spec: labels.ortodontista, comission: "35%", value: "R$ 3.450" },
  ];
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          <DollarSign className="h-4 w-4" aria-hidden /> {labels.title}
        </span>
        <span className="text-[10px] uppercase text-ink-400">{labels.period}</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-ink-100 dark:border-ink-800">
            <th className="pb-1.5 text-left font-bold uppercase text-[9px] tracking-wider text-ink-500">
              {labels.professional}
            </th>
            <th className="pb-1.5 text-center font-bold uppercase text-[9px] tracking-wider text-ink-500">
              %
            </th>
            <th className="pb-1.5 text-right font-bold uppercase text-[9px] tracking-wider text-ink-500">
              {labels.payout}
            </th>
          </tr>
        </thead>
        <tbody>
          {profs.map((p) => (
            <tr key={p.name} className="border-b border-ink-50 dark:border-ink-900">
              <td className="py-2">
                <div className="font-semibold text-ink-900 dark:text-ink-50">{p.name}</div>
                <div className="text-[10px] text-ink-500">{p.spec}</div>
              </td>
              <td className="text-center font-mono text-ink-700 dark:text-ink-300">{p.comission}</td>
              <td className="text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {p.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/30">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {labels.total}
        </span>
        <span className="font-mono text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
          R$ 14.450
        </span>
      </div>
    </div>
  );
}

function MembershipMockup({ labels }: { labels: Record<string, string> }) {
  const states = [
    { Icon: CheckCircle2, label: labels.active, color: "emerald", count: 248 },
    { Icon: Clock, label: labels.dueSoon, color: "amber", count: 12 },
    { Icon: AlertCircle, label: labels.overdue, color: "rose", count: 5 },
    { Icon: XCircle, label: labels.cancelled, color: "ink", count: 18 },
  ];
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    ink: "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-400",
  };
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        <Repeat className="h-4 w-4" aria-hidden /> {labels.title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {states.map(({ Icon, label, color, count }) => (
          <div
            key={label}
            className={`rounded-2xl px-3 py-2.5 ${colorMap[color]}`}
          >
            <div className="flex items-center justify-between">
              <Icon className="h-3.5 w-3.5" aria-hidden />
              <span className="font-display text-base font-extrabold">{count}</span>
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-ink-100 bg-ink-50 p-3 dark:border-ink-800 dark:bg-ink-800/50">
        <div className="text-[10px] uppercase tracking-wider text-ink-500">{labels.timeline}</div>
        <ul className="mt-2 space-y-1 text-[10px] text-ink-700 dark:text-ink-300">
          <li>📩 7d antes · WhatsApp + Email</li>
          <li>📩 3d antes · WhatsApp + Email</li>
          <li>💳 D-day · cobrança automática</li>
          <li>🔁 D+1..D+7 · retry escalonado</li>
        </ul>
      </div>
    </div>
  );
}
