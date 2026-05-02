import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  MessageSquare,
  Phone,
  Bot,
  Calendar,
  Send,
  User,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/home/ContactDialog";
import { LandingHero } from "@/components/landing/LandingHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureBlock } from "@/components/landing/FeatureBlock";
import { UseCases } from "@/components/landing/UseCases";
import { Comparison } from "@/components/landing/Comparison";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { ChatMockup, type ChatMessage } from "@/components/landing/ChatMockup";
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
  const t = await getTranslations({ locale, namespace: "sofiaPage.meta" });

  const canonical = `https://superclini.com/${locale}/sofia`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://superclini.com/${l}/sofia`])
      ),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function SofiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sofiaPage");

  const messages: ChatMessage[] = [
    { side: "user", text: t("hero.chat.messages.user1") },
    { side: "bot", text: t("hero.chat.messages.bot1") },
    { side: "user", text: t("hero.chat.messages.user2") },
    { side: "bot", text: t("hero.chat.messages.bot2") },
    { side: "user", text: t("hero.chat.messages.user3") },
    { side: "bot", text: t("hero.chat.messages.bot3") },
  ];

  const onlineLabel =
    locale === "pt" ? "Sofía está online" : locale === "en" ? "Sofía is online" : "Sofía está en línea";

  const feature1Bullets = t.raw("feature1.bullets") as string[];
  const feature2Bullets = t.raw("feature2.bullets") as string[];

  return (
    <>
      <LandingHero
        badge={t("hero.badge")}
        title={t("hero.h1")}
        sub={t("hero.sub")}
        primaryCta={
          <ContactDialog
            defaultInteresse="trial_profesional"
            trigger={({ onClick }) => (
              <Button size="lg" onClick={onClick}>
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            )}
          />
        }
        secondaryCta={
          <Button asChild variant="outline" size="lg">
            <a href="#how-it-works">{t("hero.ctaSecondary")}</a>
          </Button>
        }
        visual={
          <ChatMockup
            messages={messages}
            proofLabel={t("hero.chat.proofLabel")}
            onlineLabel={onlineLabel}
          />
        }
      />

      <section id="how-it-works">
        <HowItWorks
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          steps={[
            {
              title: t("howItWorks.steps.1.title"),
              desc: t("howItWorks.steps.1.desc"),
              Icon: Phone,
            },
            {
              title: t("howItWorks.steps.2.title"),
              desc: t("howItWorks.steps.2.desc"),
              Icon: Calendar,
            },
            {
              title: t("howItWorks.steps.3.title"),
              desc: t("howItWorks.steps.3.desc"),
              Icon: Bot,
            },
            {
              title: t("howItWorks.steps.4.title"),
              desc: t("howItWorks.steps.4.desc"),
              Icon: Send,
            },
          ]}
        />
      </section>

      <FeatureBlock
        eyebrow={t("feature1.eyebrow")}
        title={t("feature1.title")}
        description={t("feature1.description")}
        side="right"
        visual={<FunctionGrid items={feature1Bullets} />}
      />

      <FeatureBlock
        eyebrow={t("feature2.eyebrow")}
        title={t("feature2.title")}
        description={t("feature2.description")}
        bullets={feature2Bullets}
        side="left"
        tone="muted"
        visual={<AgendaPreview locale={locale} />}
      />

      <UseCases
        eyebrow={t("useCases.eyebrow")}
        title={t("useCases.title")}
        cases={[
          {
            persona: t("useCases.cases.solo.persona"),
            pain: t("useCases.cases.solo.pain"),
            benefit: t("useCases.cases.solo.benefit"),
            Icon: User,
          },
          {
            persona: t("useCases.cases.clinic.persona"),
            pain: t("useCases.cases.clinic.pain"),
            benefit: t("useCases.cases.clinic.benefit"),
            Icon: Users,
          },
          {
            persona: t("useCases.cases.network.persona"),
            pain: t("useCases.cases.network.pain"),
            benefit: t("useCases.cases.network.benefit"),
            Icon: Building2,
          },
        ]}
      />

      <Comparison
        eyebrow={t("comparison.eyebrow")}
        title={t("comparison.title")}
        beforeHeader={t("comparison.beforeHeader")}
        afterHeader={t("comparison.afterHeader")}
        rows={[
          {
            topic: t("comparison.rows.horario.topic"),
            before: t("comparison.rows.horario.before"),
            after: t("comparison.rows.horario.after"),
          },
          {
            topic: t("comparison.rows.resposta.topic"),
            before: t("comparison.rows.resposta.before"),
            after: t("comparison.rows.resposta.after"),
          },
          {
            topic: t("comparison.rows.agenda.topic"),
            before: t("comparison.rows.agenda.before"),
            after: t("comparison.rows.agenda.after"),
          },
          {
            topic: t("comparison.rows.leads.topic"),
            before: t("comparison.rows.leads.before"),
            after: t("comparison.rows.leads.after"),
          },
          {
            topic: t("comparison.rows.secretaria.topic"),
            before: t("comparison.rows.secretaria.before"),
            after: t("comparison.rows.secretaria.after"),
          },
        ]}
      />

      <LandingFAQ namespace="sofiaPage.faq" />
      <FAQSchema locale={locale} namespace="sofiaPage.faq" />

      <LandingCTA
        title={t("ctaFinal.title")}
        sub={t("ctaFinal.sub")}
        primaryCta={
          <ContactDialog
            defaultInteresse="trial_profesional"
            trigger={({ onClick }) => (
              <Button size="lg" variant="secondary" onClick={onClick}>
                {t("ctaFinal.ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            )}
          />
        }
        secondaryCta={
          <ContactDialog
            trigger={({ onClick }) => (
              <Button size="lg" variant="dark" onClick={onClick}>
                <MessageSquare className="h-4 w-4" aria-hidden />
                {t("ctaFinal.ctaSecondary")}
              </Button>
            )}
          />
        }
      />
    </>
  );
}

function FunctionGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((label) => (
        <li
          key={label}
          className="flex items-start gap-2.5 rounded-2xl border border-ink-100 bg-white px-3.5 py-3 text-xs font-medium text-ink-700 shadow-sm dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200"
        >
          <span
            aria-hidden
            className="mt-0.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gradient"
          />
          <span className="flex-1">{label}</span>
        </li>
      ))}
    </ul>
  );
}

function AgendaPreview({ locale }: { locale: string }) {
  const dayLabels = locale === "pt"
    ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    : locale === "en"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const slots = [
    { time: "09:00", state: "ok" },
    { time: "10:00", state: "busy" },
    { time: "11:00", state: "ok" },
    { time: "14:00", state: "busy" },
    { time: "15:00", state: "new" },
    { time: "16:00", state: "ok" },
  ] as const;
  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          {locale === "pt" ? "Agenda — semana" : locale === "en" ? "Schedule — this week" : "Agenda — esta semana"}
        </span>
        <Calendar className="h-4 w-4 text-brand-500" aria-hidden />
      </div>
      <div className="grid grid-cols-6 gap-1.5 border-b border-ink-100 pb-2 dark:border-ink-800">
        {dayLabels.map((d) => (
          <span key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-ink-400">
            {d}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {slots.map(({ time, state }) => (
          <li
            key={time}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium ${
              state === "new"
                ? "bg-brand-50 text-brand-700 ring-2 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-700"
                : state === "busy"
                  ? "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-500"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
          >
            <span>{time}</span>
            <span className="text-[10px] uppercase tracking-wider">
              {state === "new"
                ? locale === "pt" ? "Sofía marcou" : locale === "en" ? "Booked by Sofía" : "Sofía agendó"
                : state === "busy"
                  ? locale === "pt" ? "Ocupado" : locale === "en" ? "Busy" : "Ocupado"
                  : locale === "pt" ? "Livre" : locale === "en" ? "Free" : "Libre"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
