import type { CountryCode } from "./countries";

// ─── Tiers ──────────────────────────────────────────────────────────────────
// Alinhado com "Estrategia de Pricing v1.1 / abril 2026" (decisões com sócios).
// 4 tiers com features progressivas e paridade por mercado (PPP).
// Display names: Esencial | Profesional | Avanzado | Corporativo (renomeado de Enterprise).
// Cotas IA atualizadas: T2 30/30, T3 100/100, WhatsApp em conversaciones únicas.

export type PlanId = "esencial" | "profesional" | "avanzado" | "corporativo";

/**
 * Preços mensais em moeda local, com terminação .990 / .90 (varejo).
 * Corporativo é "cotización" em todos os países — valor 0 sinaliza "consultar"
 * (UI mostra apenas badge "Cotización", sem floor público).
 * Argentina: agora cobrado em ARS com revisão trimestral por volatilidade.
 */
export const PRICING: Record<CountryCode, Record<PlanId, number>> = {
  CL: { esencial: 29990,   profesional: 79990,   avanzado: 169990,  corporativo: 0 },
  BR: { esencial: 149.90,  profesional: 399.90,  avanzado: 849.90,  corporativo: 0 },
  CO: { esencial: 89900,   profesional: 249900,  avanzado: 549900,  corporativo: 0 },
  AR: { esencial: 19990,   profesional: 49990,   avanzado: 99990,   corporativo: 0 },
  MX: { esencial: 499,     profesional: 1499,    avanzado: 3199,    corporativo: 0 },
  PE: { esencial: 79,      profesional: 249,     avanzado: 549,     corporativo: 0 },
  US: { esencial: 39,      profesional: 119,     avanzado: 249,     corporativo: 0 },
  ES: { esencial: 29,      profesional: 89,      avanzado: 199,     corporativo: 0 },
  PT: { esencial: 29,      profesional: 89,      avanzado: 199,     corporativo: 0 },
};

/** Desconto anual: pagar 10 meses, receber 2 — -16.67% efetivo, arredondamos a -20%. */
export const ANNUAL_DISCOUNT = 0.2;

/** Trial em dias para o tier Profesional (ver §8 do doc estratégico). */
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
      { key: "documentos33" },
      { key: "maxProf2" },
      { key: "boxes2" },
      { key: "patientsUnlimited" },
      { key: "supportEmail72h" },
    ],
  },
  profesional: {
    features: [
      { key: "everythingEssential" },
      { key: "maxProf10" },
      { key: "totemUnlimited", highlight: "new" },
      { key: "memberships", highlight: "new" },
      { key: "laboratoryPortal" },
      { key: "casosIa30", highlight: "ai" },
      { key: "radiographIa30", highlight: "ai" },
      { key: "reportsBi" },
      { key: "supportChat24h" },
    ],
  },
  avanzado: {
    features: [
      { key: "everythingProfessional" },
      { key: "maxProf20" },
      { key: "branches3", highlight: "new" },
      { key: "whatsappConv300", highlight: "ai" },
      { key: "dicom3d", highlight: "new" },
      { key: "alignersUnlimited" },
      { key: "casosIa100", highlight: "ai" },
      { key: "radiographIa100", highlight: "ai" },
      { key: "patientPortal", highlight: "new" },
      { key: "reportsBiAdvanced" },
      { key: "supportChat4h" },
    ],
  },
  corporativo: {
    features: [
      { key: "everythingAdvanced" },
      { key: "unlimitedProfessionals" },
      { key: "unlimitedBranches" },
      { key: "customAiQuotas" },
      { key: "whitelabel" },
      { key: "sso" },
      { key: "apiAccess" },
      { key: "slaContractual" },
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
  { groupKey: "core", key: "agenda",            values: { esencial: "yes",   profesional: "yes",          avanzado: "yes",         corporativo: "yes" } },
  { key: "prontuario",                           values: { esencial: "yes",   profesional: "yes",          avanzado: "yes",         corporativo: "yes" } },
  { key: "financial",                            values: { esencial: "basic", profesional: "yes",          avanzado: "yes",         corporativo: "yes" } },
  { key: "proceduresCatalog",                    values: { esencial: "yes",   profesional: "yes",          avanzado: "yes",         corporativo: "yes" } },

  // Limites
  { groupKey: "limits", key: "professionals",    values: { esencial: "2",         profesional: "10",        avanzado: "20",          corporativo: "custom" } },
  { key: "boxes",                                values: { esencial: "2",         profesional: "5",         avanzado: "unlimited",   corporativo: "unlimited" } },
  { key: "branches",                             values: { esencial: "1",         profesional: "1",         avanzado: "3",           corporativo: "unlimited" } },
  { key: "activePatients",                       values: { esencial: "unlimited", profesional: "unlimited", avanzado: "unlimited",   corporativo: "unlimited" } },
  { key: "storage",                              values: { esencial: "5gb",       profesional: "50gb",      avanzado: "100gb",       corporativo: "custom" } },
  { key: "documents",                            values: { esencial: "33tpl",     profesional: "33tpl",     avanzado: "33tpl",       corporativo: "custom" } },
  { key: "totems",                               values: { esencial: "no",        profesional: "unlimited", avanzado: "unlimited",   corporativo: "unlimited" } },

  // Crescimento e integração
  { groupKey: "growth", key: "memberships",      values: { esencial: "no", profesional: "yes", avanzado: "yes", corporativo: "yes" } },
  { key: "laboratory",                           values: { esencial: "no", profesional: "yes", avanzado: "yes", corporativo: "yes" } },

  // IA
  { groupKey: "ai", key: "casosIa",              values: { esencial: "no", profesional: "30mo",  avanzado: "100mo",  corporativo: "custom" } },
  { key: "radiographIa",                         values: { esencial: "no", profesional: "30mo",  avanzado: "100mo",  corporativo: "custom" } },
  { key: "whatsappIa",                           values: { esencial: "no", profesional: "no",    avanzado: "300conv", corporativo: "custom" } },

  // Avançado
  { groupKey: "advanced", key: "dicom3d",        values: { esencial: "no",    profesional: "no",          avanzado: "yes",      corporativo: "yes" } },
  { key: "aligners",                             values: { esencial: "no",    profesional: "no",          avanzado: "yes",      corporativo: "yes" } },
  { key: "patientPortal",                        values: { esencial: "no",    profesional: "no",          avanzado: "yes",      corporativo: "yes-wl" } },
  { key: "reportsBi",                            values: { esencial: "basic", profesional: "intermediate", avanzado: "advanced", corporativo: "custom" } },

  // Corporativo-only
  { groupKey: "corporativo", key: "api",         values: { esencial: "no",      profesional: "no",     avanzado: "readonly",  corporativo: "full" } },
  { key: "sso",                                  values: { esencial: "no",      profesional: "no",     avanzado: "no",        corporativo: "yes" } },
  { key: "whitelabel",                           values: { esencial: "no",      profesional: "no",     avanzado: "no",        corporativo: "yes" } },
  { key: "multiLocation",                        values: { esencial: "no",      profesional: "no",     avanzado: "limited3",  corporativo: "yes" } },
  { key: "sla",                                  values: { esencial: "email72", profesional: "chat24", avanzado: "chat4",     corporativo: "contractual" } },
];

export const PLAN_ORDER: PlanId[] = ["esencial", "profesional", "avanzado", "corporativo"];
