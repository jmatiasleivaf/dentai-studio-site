"use client";

import * as React from "react";
import { Check, ChevronDown, ArrowRight, MessageSquare } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactDialog } from "@/components/home/ContactDialog";
import { useCountry } from "@/contexts/CountryContext";
import { COUNTRIES, COUNTRY_LIST, formatCurrency, type CountryCode } from "@/lib/countries";
import {
  PRICING,
  PLANS,
  ANNUAL_DISCOUNT,
  PLAN_ORDER,
  type PlanId,
} from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";

export function Pricing() {
  const t = useTranslations("pricing");
  const tFeat = useTranslations("pricing.features");
  const locale = useLocale() as Locale;
  const { country, setCountry } = useCountry();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [cycle, setCycle] = React.useState<"monthly" | "annual">("annual");

  return (
    <Section id="pricing" tone="dark">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        {/* País picker + toggle mensual/anual */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3 text-sm text-ink-300">
            <span>{t("countryLabel")}</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={pickerOpen}
                className="inline-flex min-h-touch items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <span aria-hidden>{country.flag}</span>
                <span>{country.name[locale]}</span>
                <span className="text-ink-400">({country.currency})</span>
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
              {pickerOpen ? (
                <CountryPicker
                  locale={locale}
                  current={country.code}
                  onPick={(c) => {
                    setCountry(c);
                    setPickerOpen(false);
                  }}
                  onClose={() => setPickerOpen(false)}
                />
              ) : null}
            </div>
          </div>

          {/* Toggle cycle */}
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1">
            {(["monthly", "annual"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                aria-pressed={cycle === c}
                className={
                  cycle === c
                    ? "relative inline-flex min-h-touch items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-1.5 text-sm font-semibold text-white shadow-brand"
                    : "inline-flex min-h-touch items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-medium text-ink-300 hover:text-white"
                }
              >
                {t(`cycle.${c}`)}
                {c === "annual" ? (
                  <span
                    className={
                      cycle === "annual"
                        ? "rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-bold"
                        : "rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300"
                    }
                  >
                    {t("cycle.discount")}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLAN_ORDER.map((planId) => (
            <PlanCard
              key={planId}
              planId={planId}
              country={country.code}
              cycle={cycle}
              tFeat={tFeat}
              t={t}
            />
          ))}
        </div>

        {/* Disclaimer ARS — revisão trimestral por volatilidade cambial */}
        {country.code === "AR" ? (
          <p className="mt-6 text-center text-xs text-ink-400">{t("arsDisclaimer")}</p>
        ) : null}

        {/* Link para matrix */}
        <div className="mt-10 text-center">
          <a
            href="#plan-matrix"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 underline-offset-4 hover:underline"
          >
            {t("seeMatrixLink")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Container>
    </Section>
  );
}

// ─── Card individual ────────────────────────────────────────────────────────

function PlanCard({
  planId,
  country,
  cycle,
  tFeat,
  t,
}: {
  planId: PlanId;
  country: CountryCode;
  cycle: "monthly" | "annual";
  tFeat: ReturnType<typeof useTranslations>;
  t: ReturnType<typeof useTranslations>;
}) {
  const isPopular = planId === "profesional";
  const isCorporativo = planId === "corporativo";

  // Corporativo: 100% cotización, sem floor público
  const rawPrice = PRICING[country][planId];

  // Aplicar desconto anual (exceto Corporativo)
  const priceMonthly = rawPrice > 0 && !isCorporativo && cycle === "annual"
    ? Math.round(rawPrice * (1 - ANNUAL_DISCOUNT))
    : rawPrice;

  const countryObj = COUNTRIES[country];

  // Render de preço
  const priceDisplay = (() => {
    if (isCorporativo) {
      return {
        prefix: null,
        amount: t("quoteLabel"),
        period: null,
        quote: t("quoteBadge"),
      };
    }
    return {
      prefix: null,
      amount: formatCurrency(priceMonthly, countryObj),
      period: cycle === "annual" ? t("perMonthAnnual") : t("perMonth"),
      quote: null,
    };
  })();

  const cardClass = isPopular
    ? "relative rounded-3xl border-2 border-brand-400/60 bg-gradient-to-br from-brand-500/15 via-accent-500/5 to-transparent p-7 shadow-brand"
    : isCorporativo
      ? "relative rounded-3xl border border-violet-400/40 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent p-7"
      : "relative rounded-3xl border border-white/10 bg-white/[0.03] p-7";

  // Mantém a chave `cotizacion_enterprise` no contact form para não quebrar integração de backend/CRM existente.
  const interesseMap: Record<PlanId, "avaliar" | "trial_profesional" | "cotizacion_enterprise"> = {
    esencial: "avaliar",
    profesional: "trial_profesional",
    avanzado: "avaliar",
    corporativo: "cotizacion_enterprise",
  };

  return (
    <article className={cardClass}>
      {isPopular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="onBrand" className="bg-brand-gradient text-white">
            ★ {t("popular")}
          </Badge>
        </div>
      ) : null}
      {isCorporativo ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="onBrand" className="bg-violet-500 text-white">
            {t("forNetworks")}
          </Badge>
        </div>
      ) : null}

      <h3 className="font-display text-xl font-bold text-white">
        {t(`plans.${planId}.name`)}
      </h3>
      <p className="mt-1 min-h-[2.5rem] text-sm text-ink-400">{t(`plans.${planId}.desc`)}</p>

      <div className="mt-6">
        {priceDisplay.prefix ? (
          <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
            {priceDisplay.prefix}
          </span>
        ) : null}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-fluid-3xl font-extrabold text-white">
            {priceDisplay.amount}
          </span>
          {priceDisplay.period ? (
            <span className="text-sm text-ink-400">{priceDisplay.period}</span>
          ) : null}
        </div>
        {cycle === "annual" && !isCorporativo ? (
          <p className="mt-1 text-xs text-emerald-400">{t("billedAnnually")}</p>
        ) : !isCorporativo ? (
          <p className="mt-1 text-xs text-ink-500">{t("billedMonthly")}</p>
        ) : priceDisplay.quote ? (
          <p className="mt-1 text-xs text-violet-300">{priceDisplay.quote}</p>
        ) : null}
      </div>

      <ul className="mt-7 space-y-3">
        {PLANS[planId].features.map((f) => (
          <li key={f.key} className="flex items-start gap-2.5 text-sm text-ink-200">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden />
            <span className="flex-1">{tFeat(f.key)}</span>
            {f.highlight ? (
              <span
                className={
                  f.highlight === "ai"
                    ? "rounded bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-violet-300"
                    : f.highlight === "new"
                      ? "rounded bg-brand-500/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-brand-300"
                      : "rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-amber-300"
                }
              >
                {f.highlight}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <ContactDialog
          defaultInteresse={interesseMap[planId]}
          trigger={({ onClick }) => (
            <Button
              variant={isPopular ? "primary" : "outline"}
              size="lg"
              onClick={onClick}
              className={
                isPopular
                  ? "w-full"
                  : isCorporativo
                    ? "w-full border-violet-400/40 text-white hover:border-violet-300 hover:text-white"
                    : "w-full border-white/20 text-white hover:border-white/40 hover:text-white"
              }
            >
              {isCorporativo ? (
                <>
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  {t("ctaContact")}
                </>
              ) : (
                <>
                  {t(`plans.${planId}.cta`)}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </Button>
          )}
        />
      </div>
    </article>
  );
}

// ─── Country picker (mantido como antes, com pequenos ajustes) ──────────────

function CountryPicker({
  locale,
  current,
  onPick,
  onClose,
}: {
  locale: Locale;
  current: CountryCode;
  onPick: (c: CountryCode) => void;
  onClose: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="listbox"
      className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl"
    >
      <ul className="max-h-72 overflow-y-auto py-2">
        {COUNTRY_LIST.map((c) => (
          <li key={c.code} role="option" aria-selected={c.code === current}>
            <button
              type="button"
              onClick={() => onPick(c.code)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink-200 hover:bg-white/5 min-h-touch"
            >
              <span className="flex items-center gap-2.5">
                <span aria-hidden>{c.flag}</span>
                <span>{COUNTRIES[c.code].name[locale]}</span>
              </span>
              <span className="text-xs text-ink-500">{c.currency}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
