"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { useCountry } from "@/contexts/CountryContext";
import { COUNTRIES, COUNTRY_LIST, formatCurrency, type CountryCode } from "@/lib/countries";
import { PRICING, PLANS, type PlanId } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";

const PLAN_ORDER: PlanId[] = ["starter", "professional", "enterprise"];

export function Pricing() {
  const t = useTranslations("pricing");
  const tFeat = useTranslations("pricing.features");
  const locale = useLocale() as Locale;
  const { country, setCountry } = useCountry();
  const [pickerOpen, setPickerOpen] = React.useState(false);

  return (
    <Section id="pricing" tone="dark">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink-300">
          <span>{t("countryLabel")}</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={pickerOpen}
              className="inline-flex min-h-touch items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:border-white/30"
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

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLAN_ORDER.map((planId) => {
            const price = PRICING[country.code][planId];
            const isPopular = planId === "professional";
            return (
              <article
                key={planId}
                className={
                  isPopular
                    ? "relative rounded-3xl border-2 border-brand-400/50 bg-gradient-to-br from-brand-500/10 via-accent-500/5 to-transparent p-8 shadow-brand"
                    : "relative rounded-3xl border border-white/10 bg-white/[0.03] p-8"
                }
              >
                {isPopular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="onBrand" className="bg-brand-gradient text-white">
                      ★ {t("popular")}
                    </Badge>
                  </div>
                ) : null}

                <h3 className="font-display text-xl font-bold text-white">
                  {t(`plans.${planId}.name`)}
                </h3>
                <p className="mt-1 text-sm text-ink-400">{t(`plans.${planId}.desc`)}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-fluid-3xl font-extrabold text-white">
                    {formatCurrency(price, country)}
                  </span>
                  <span className="text-sm text-ink-400">{t("perMonth")}</span>
                </div>
                <p className="mt-1 text-xs text-ink-500">{t("billedMonthly")}</p>

                <ul className="mt-6 space-y-3">
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
                  <Button
                    asChild
                    variant={isPopular ? "primary" : "outline"}
                    size="lg"
                    className={
                      isPopular
                        ? "w-full"
                        : "w-full border-white/20 text-white hover:border-white/40 hover:text-white"
                    }
                  >
                    <a href="https://app.superclini.com">
                      {planId === "enterprise" ? t("ctaContact") : t("ctaPlan")}
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

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
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink-200 hover:bg-white/5"
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
