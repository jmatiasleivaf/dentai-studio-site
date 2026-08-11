"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Flag } from "@/components/ui/flag";
import { Membresia } from "@/components/home/Membresia";
import { useCountry } from "@/contexts/CountryContext";
import { useSite } from "@/contexts/SiteContext";
import { COUNTRIES, COUNTRY_LIST, type CountryCode } from "@/lib/countries";
import { getMembresia } from "@/lib/pricing";
import type { Locale } from "@/i18n/routing";

/**
 * Vitrine de preços. Desde 2026-08-10 é uma só em todo mercado: membresía anual
 * única, decidida por PAÍS e não por host nem por idioma. O que muda de um país
 * para outro é a moeda de cobrança (CLP no Chile, BRL no Brasil, USD nos demais)
 * e o rótulo de imposto, ambos em MEMBRESIA (lib/pricing.ts).
 *
 * O caminho dos 3 planos mensais saiu daqui junto com o toggle mensal/anual e o
 * link para a matriz comparativa. Os dados seguem em PRICING/PLAN_MATRIX, sem
 * consumidor de tela, para o caso de um mercado voltar atrás.
 */
export function Pricing() {
  const t = useTranslations("pricing");
  const tm = useTranslations("membresia");
  const locale = useLocale() as Locale;
  const { country, setCountry } = useCountry();
  const { isChile } = useSite();
  const [pickerOpen, setPickerOpen] = React.useState(false);

  return (
    <Section id="pricing" tone="dark">
      <Container>
        <SectionHeader eyebrow={tm("eyebrow")} title={tm("title")} sub={tm("sub")} />

        {/* País picker. No site dedicado do Chile o país é fixo: mostramos o
            rótulo travado em vez do seletor (mono-país, sem escolha a fazer).
            A moeda exibida é a de COBRANÇA da membresía, não a do país: no
            México o preço sai em USD, e escrever MXN aqui seria mentir. */}
        <div className="mt-8 flex flex-col items-center gap-5">
          {isChile ? (
            <div className="inline-flex min-h-touch items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              <Flag code={country.code} />
              <span>{country.name[locale]}</span>
              <span className="text-ink-400">({getMembresia(country.code).currency})</span>
            </div>
          ) : (
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
                  <Flag code={country.code} />
                  <span>{country.name[locale]}</span>
                  <span className="text-ink-400">({getMembresia(country.code).currency})</span>
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
          )}
        </div>

        <Membresia country={country} />
      </Container>
    </Section>
  );
}

// ─── Country picker ─────────────────────────────────────────────────────────

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
                <Flag code={c.code} />
                <span>{COUNTRIES[c.code].name[locale]}</span>
              </span>
              <span className="text-xs text-ink-500">{getMembresia(c.code).currency}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
