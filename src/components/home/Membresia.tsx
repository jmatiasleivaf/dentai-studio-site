"use client";

import { Check, ArrowRight, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/home/ContactDialog";
import { formatMoney, type CountryConfig } from "@/lib/countries";
import { getMembresia, isAsociadoCountry } from "@/lib/pricing";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * Vitrine da membresía anual única, nascida no Chile em 2026-08-04 e estendida
 * aos 9 mercados em 2026-08-10. Renderizada por <Pricing> para todo país (por
 * host cl.superclini.com, por cookie do picker ou por geo do edge), nunca por
 * idioma: um brasileiro lendo em espanhol continua vendo o preço em reais.
 *
 * REGRA INVIOLÁVEL: todo valor sai de MEMBRESIA[país], que é NETO, e passa por
 * <Money>, que carrega o rótulo de imposto junto do número. Não existe caminho
 * de código neste arquivo que publique preço sem o sufixo.
 */

const UNLIMITED_ITEMS = [
  "dentists",
  "chairs",
  "patients",
  "agenda",
  "finance",
  "documents",
  "whatsapp",
] as const;

/**
 * Preço neto formatado, sempre acompanhado do rótulo de imposto. Componente de
 * módulo, não closure dentro do render: definir componente durante o render
 * remonta a subárvore a cada ciclo (e o lint do Next barra o build).
 *
 * `suffix` entra por prop em vez de ler i18n aqui para manter este componente
 * puro e deixar um único ponto de decisão de idioma no pai.
 */
function Money({
  value,
  suffix,
  country,
  className,
}: {
  value: number;
  suffix: string;
  country: CountryConfig;
  className?: string;
}) {
  const { currency, currencyDecimals } = getMembresia(country.code);
  return (
    <span className={className}>
      {formatMoney(value, country.intlLocale, currency, currencyDecimals)}{" "}
      <span className="whitespace-nowrap text-[0.7em] font-semibold text-ink-400">{suffix}</span>
    </span>
  );
}

export function Membresia({ country }: { country: CountryConfig }) {
  const t = useTranslations("membresia");
  const tCta = useTranslations("salesCta");
  const membresia = getMembresia(country.code);
  const tax = t(`price.tax.${membresia.taxLabel}`);

  const PACKS = [
    { key: "patient", value: membresia.packs.aiPatient },
    { key: "patientPack", value: membresia.packs.aiPatientPack20 },
    { key: "conv500", value: membresia.packs.conversations500 },
    { key: "conv1500", value: membresia.packs.conversations1500 },
  ] as const;

  const AGENTS = [
    { key: "sofia", count: SUPERCLINI_FACTS.membresia.sofiaConversations },
    { key: "alicia", count: SUPERCLINI_FACTS.membresia.aiPatients },
    { key: "iandra", count: 0 },
  ] as const;

  /**
   * Parcelamento só entra onde há gateway que o faça. Em US, ES e PT o
   * MercadoPago não opera e o Stripe nunca foi ligado: prometer cuotas ali
   * seria vender uma forma de pagamento que o checkout não oferece.
   */
  const paymentItems = membresia.maxInstallments
    ? (["credit", "debit", "installments", "renewal"] as const)
    : (["credit", "debit", "renewal"] as const);

  return (
    <div className="mt-12">
      {/* ── Preço da membresía ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl rounded-3xl border-2 border-brand-400/60 bg-gradient-to-br from-brand-500/15 via-accent-500/5 to-transparent p-7 shadow-brand sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Badge tone="onBrand" className="bg-brand-gradient text-white">
            {t("campaign.badge")}
          </Badge>

          <p className="mt-5 text-sm text-ink-300">{t("campaign.window")}</p>

          <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <Money
              suffix={tax}
              country={country}
              value={membresia.promo}
              className="font-display text-fluid-3xl font-extrabold text-white"
            />
            <span className="text-sm text-ink-300">{t("price.perYear")}</span>
          </div>

          <p className="mt-3 text-sm text-ink-400">
            {t("price.listLabel")}{" "}
            <Money
              suffix={tax}
              country={country}
              value={membresia.list}
              className="font-semibold text-ink-300 line-through"
            />{" "}
            {t("price.perYear")}
          </p>

          <p className="mt-5 max-w-md text-sm font-medium text-emerald-300">
            {t("campaign.keepsPrice")}
          </p>

          <div className="mt-8 w-full sm:max-w-xs">
            <ContactDialog
              defaultInteresse="avaliar"
              trigger={({ onClick }) => (
                <Button variant="primary" size="lg" onClick={onClick} className="w-full">
                  {tCta(isAsociadoCountry(country.code) ? "asociado" : "ventas")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              )}
            />
          </div>
        </div>
      </div>

      {/* ── Ilimitado + agentes ────────────────────────────────────────── */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-xl font-bold text-white">{t("unlimited.title")}</h3>
          <ul className="mt-6 space-y-3">
            {UNLIMITED_ITEMS.map((key) => (
              <li key={key} className="flex items-start gap-2.5 text-sm text-ink-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden />
                <span>{t(`unlimited.items.${key}`)}</span>
              </li>
            ))}
            <li className="flex items-start gap-2.5 text-sm text-ink-200">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden />
              <span>{t("unlimited.storage", { gb: SUPERCLINI_FACTS.membresia.storageGB })}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-xl font-bold text-white">{t("agents.title")}</h3>
          <ul className="mt-6 space-y-5">
            {AGENTS.map(({ key, count }) => (
              <li key={key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-white">{t(`agents.${key}.name`)}</span>
                  <span className="text-right text-sm font-semibold text-brand-300">
                    {t(`agents.${key}.quota`, { count })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-400">{t(`agents.${key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── Paquetes ───────────────────────────────────────────────────── */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
        <h3 className="font-display text-xl font-bold text-white">{t("packs.title")}</h3>
        <ul className="mt-6 divide-y divide-white/10">
          {PACKS.map(({ key, value }) => (
            <li
              key={key}
              className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="text-sm text-ink-200">{t(`packs.items.${key}`)}</span>
              <Money
                suffix={tax}
                country={country}
                value={value}
                className="text-sm font-bold text-white sm:text-right"
              />
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-medium text-emerald-300">{t("packs.note")}</p>
      </section>

      {/* ── Rede, migração e pagamento ─────────────────────────────────── */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-lg font-bold text-white">{t("network.title")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-200">
            <li className="flex items-baseline justify-between gap-3">
              <span>{t("network.first")}</span>
              <Money
                suffix={tax}
                country={country}
                value={membresia.network.firstBranch}
                className="font-bold text-white"
              />
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>{t("network.additional")}</span>
              <Money
                suffix={tax}
                country={country}
                value={membresia.network.additionalBranch}
                className="font-bold text-white"
              />
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-400">{t("network.pool")}</p>
          <p className="mt-2 text-sm text-ink-400">
            {t("network.corporate", { count: membresia.network.corporateFrom })}
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="font-display text-lg font-bold text-white">{t("migration.title")}</h3>
          <Money
            suffix={tax}
            country={country}
            value={membresia.migration}
            className="mt-5 block font-display text-fluid-xl font-extrabold text-white"
          />
          <p className="mt-3 text-sm text-ink-400">{t("migration.desc")}</p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <CreditCard className="h-4 w-4 text-brand-300" aria-hidden />
            {t("payment.title")}
          </h3>
          <ul className="mt-5 space-y-3">
            {paymentItems.map((key) => (
              <li key={key} className="flex items-start gap-2.5 text-sm text-ink-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden />
                <span>{t(`payment.items.${key}`, { count: membresia.maxInstallments })}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-400">{t("payment.note")}</p>
        </section>
      </div>

      {/* ── Nota legal do teto por paciente ────────────────────────────── */}
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-400">
        {t("legal", {
          simulations: SUPERCLINI_FACTS.membresia.perPatient.simulations,
          radiographs: SUPERCLINI_FACTS.membresia.perPatient.radiographs,
        })}{" "}
        {/* A frase fiscal é separada porque nomeia o tributo: IVA no Chile,
            genérico nos demais. Ver taxLabel em MEMBRESIA. */}
        {t(`legalTax.${membresia.taxLabel}`)}
      </p>
    </div>
  );
}
