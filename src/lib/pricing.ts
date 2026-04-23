import type { CountryCode } from "./countries";

// ─── Tiers ──────────────────────────────────────────────────────────────────
// Alinhado com "Estrategia de Pricing v1.0 / abril 2026".
// 4 tiers com features progressivas e paridade por mercado (PPP).
// No app o campo Organization.plano aceita: starter | professional | avanzado | enterprise.
// Aqui no site marketing usamos os nomes display: Esencial | Profesional | Avanzado | Enterprise.

export type PlanId = "esencial" | "profesional" | "avanzado" | "enterprise";

/**
 * Preços mensais em moeda local.
 * "ARS" usa USD como fallback (revisão trimestral, volatilidade cambial).
 * Enterprise é "cotización" em todos os países — o valor 0 sinaliza "consultar";
 * ENTERPRISE_FLOOR abaixo traz o piso USD/EUR para contexto visual ("Desde $499").
 */
export const PRICING: Record<CountryCode, Record<PlanId, number>> = {
  CL: { esencial: 29000, profesional: 79000, avanzado: 169000, enterprise: 0 },
  BR: { esencial: 149, profesional: 399, avanzado: 849, enterprise: 0 },
  CO: { esencial: 89000, profesional: 249000, avanzado: 549000, enterprise: 0 },
  // ARS: mostrado em USD (cobrança em USD via MercadoPago ao câmbio oficial)
  AR: { esencial: 39, profesional: 119, avanzado: 249, enterprise: 499 },
  MX: { esencial: 499, profesional: 1499, avanzado: 3199, enterprise: 0 },
  PE: { esencial: 79, profesional: 249, avanzado: 549, enterprise: 0 },
  US: { esencial: 39, profesional: 119, avanzado: 249, enterprise: 499 },
  ES: { esencial: 29, profesional: 89, avanzado: 199, enterprise: 399 },
  PT: { esencial: 29, profesional: 89, avanzado: 199, enterprise: 399 },
};

/** Piso USD/EUR do Enterprise — mostrado como "Desde $499" quando o tier é cotización. */
export const ENTERPRISE_FLOOR: Record<CountryCode, { amount: number; currency: "USD" | "EUR" }> = {
  CL: { amount: 499, currency: "USD" },
  BR: { amount: 499, currency: "USD" },
  CO: { amount: 499, currency: "USD" },
  AR: { amount: 499, currency: "USD" },
  MX: { amount: 499, currency: "USD" },
  PE: { amount: 499, currency: "USD" },
  US: { amount: 499, currency: "USD" },
  ES: { amount: 399, currency: "EUR" },
  PT: { amount: 399, currency: "EUR" },
};

/** AR é cobrado em USD — flag para mostrar disclaimer. */
export const PRICE_IN_USD_OVERRIDE: Partial<Record<CountryCode, true>> = {
  AR: true,
};

/** Desconto anual: pagar 10 meses, receber 2 — -16.67% efetivo, arredondamos a -20%. */
export const ANNUAL_DISCOUNT = 0.2;

/** Trial em dias para o tier Profesional (ver §8 do doc). */
export const TRIAL_DAYS = 14;

// ─── Features por plano ─────────────────────────────────────────────────────

export type FeatureHighlight = "ai" | "new" | "auto" | "included";

export interface PlanFeature {
  /** Chave de i18n: pricing.features.* */
  key: string;
  highlight?: FeatureHighlight;
}

/**
 * Features mostradas em cada card (5-10 por card). A matriz completa vive
 * em PLAN_MATRIX abaixo (tabela comparativa logo depois dos cards).
 */
export const PLANS: Record<PlanId, { features: PlanFeature[] }> = {
  esencial: {
    features: [
      { key: "agenda" },
      { key: "prontuarioOdontograma" },
      { key: "financeiroBasico" },
      { key: "procedimentosCatalog" },
      { key: "documentos5" },
      { key: "maxProf2" },
      { key: "supportEmail72h" },
    ],
  },
  profesional: {
    features: [
      { key: "everythingEssential" },
      { key: "maxProf10" },
      { key: "memberships", highlight: "new" },
      { key: "laboratoryPortal" },
      { key: "casosIa20", highlight: "ai" },
      { key: "radiographIa50", highlight: "ai" },
      { key: "planIa5", highlight: "ai" },
      { key: "reportsBi" },
      { key: "supportChat24h" },
    ],
  },
  avanzado: {
    features: [
      { key: "everythingProfessional" },
      { key: "maxProf20" },
      { key: "whatsappIa1k", highlight: "ai" },
      { key: "dicom3d", highlight: "new" },
      { key: "alignersUnlimited" },
      { key: "casosIa100", highlight: "ai" },
      { key: "radiographIa500", highlight: "ai" },
      { key: "planIa30", highlight: "ai" },
      { key: "patientPortal", highlight: "new" },
      { key: "reportsBiAdvanced" },
      { key: "supportChat4h" },
    ],
  },
  enterprise: {
    features: [
      { key: "everythingAdvanced" },
      { key: "unlimitedProfessionals" },
      { key: "multiLocation" },
      { key: "whitelabel" },
      { key: "sso" },
      { key: "apiAccess" },
      { key: "sla999" },
      { key: "accountManager" },
      { key: "onboardingPremium" },
    ],
  },
};

// ─── Feature Matrix (tabela comparativa completa) ───────────────────────────

export type MatrixValue = "yes" | "no" | string;

export interface MatrixRow {
  key: string; // i18n: pricing.matrix.rows.{key}
  values: Record<PlanId, MatrixValue>;
  /** Primeira row do grupo carrega o título do grupo (pricing.matrix.groups.{groupKey}). */
  groupKey?: string;
}

export const PLAN_MATRIX: MatrixRow[] = [
  // Core (todos os tiers)
  { groupKey: "core", key: "agenda", values: { esencial: "yes", profesional: "yes", avanzado: "yes", enterprise: "yes" } },
  { key: "prontuario", values: { esencial: "yes", profesional: "yes", avanzado: "yes", enterprise: "yes" } },
  { key: "financial", values: { esencial: "basic", profesional: "yes", avanzado: "yes", enterprise: "yes" } },
  { key: "proceduresCatalog", values: { esencial: "yes", profesional: "yes", avanzado: "yes", enterprise: "yes" } },

  // Limites
  { groupKey: "limits", key: "professionals", values: { esencial: "2", profesional: "10", avanzado: "20", enterprise: "unlimited" } },
  { key: "boxes", values: { esencial: "1", profesional: "5", avanzado: "unlimited", enterprise: "unlimited" } },
  { key: "activePatients", values: { esencial: "200", profesional: "unlimited", avanzado: "unlimited", enterprise: "unlimited" } },
  { key: "storage", values: { esencial: "5gb", profesional: "50gb", avanzado: "100gb", enterprise: "500gb" } },
  { key: "documents", values: { esencial: "5tpl", profesional: "33tpl", avanzado: "33tpl", enterprise: "custom" } },

  // Crescimento e integração
  { groupKey: "growth", key: "memberships", values: { esencial: "no", profesional: "yes", avanzado: "yes", enterprise: "yes" } },
  { key: "laboratory", values: { esencial: "no", profesional: "yes", avanzado: "yes", enterprise: "yes" } },

  // IA
  { groupKey: "ai", key: "casosIa", values: { esencial: "no", profesional: "20mo", avanzado: "100mo", enterprise: "unlimited" } },
  { key: "radiographIa", values: { esencial: "no", profesional: "50mo", avanzado: "500mo", enterprise: "unlimited" } },
  { key: "planIa", values: { esencial: "no", profesional: "5mo", avanzado: "30mo", enterprise: "unlimited" } },
  { key: "whatsappIa", values: { esencial: "no", profesional: "no", avanzado: "1kmo", enterprise: "10kmo" } },

  // Avançado
  { groupKey: "advanced", key: "dicom3d", values: { esencial: "no", profesional: "no", avanzado: "yes", enterprise: "yes" } },
  { key: "aligners", values: { esencial: "no", profesional: "no", avanzado: "yes", enterprise: "yes" } },
  { key: "patientPortal", values: { esencial: "no", profesional: "no", avanzado: "yes", enterprise: "yes-wl" } },
  { key: "reportsBi", values: { esencial: "basic", profesional: "intermediate", avanzado: "advanced", enterprise: "custom" } },

  // Enterprise-only
  { groupKey: "enterprise", key: "api", values: { esencial: "no", profesional: "no", avanzado: "readonly", enterprise: "full" } },
  { key: "sso", values: { esencial: "no", profesional: "no", avanzado: "no", enterprise: "yes" } },
  { key: "whitelabel", values: { esencial: "no", profesional: "no", avanzado: "no", enterprise: "yes" } },
  { key: "multiLocation", values: { esencial: "no", profesional: "no", avanzado: "no", enterprise: "yes" } },
  { key: "sla", values: { esencial: "email72", profesional: "chat24", avanzado: "chat4", enterprise: "dedicated" } },
];

export const PLAN_ORDER: PlanId[] = ["esencial", "profesional", "avanzado", "enterprise"];
