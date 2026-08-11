import type { CountryCode, CurrencyCode } from "./countries";

// ─── Tiers (FORA DA VITRINE desde 2026-08-10) ───────────────────────────────
// PRICING, PLANS, PLAN_MATRIX e PLAN_ORDER descrevem o modelo de 3 planos
// mensais, que deixou de ser exibido quando os 9 mercados passaram à membresía
// anual (ver MEMBRESIA abaixo). Ficam no código, sem consumidor de tela, pelo
// mesmo motivo que o Corporativo ficou em 23/07: voltar atrás custa uma linha
// em isMembresiaCountry, e apagar a tabela custaria reconstruí-la.
//
// Alinhado com "Estrategia de Pricing v1.1 / abril 2026" (decisões com sócios).
// 4 tiers com features progressivas e paridade por mercado (PPP).
// Display names: Esencial | Profesional | Avanzado | Corporativo (renomeado de Enterprise).
// Cotas IA atualizadas: T2 30/30, T3 100/100, WhatsApp em conversaciones únicas.

export type PlanId = "esencial" | "profesional" | "avanzado" | "corporativo";

/**
 * Preços mensais em moeda local, com terminação .990 / .90 (varejo).
 * Corporativo é "cotización" em todos os países, valor 0 sinaliza "consultar"
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

// ─── Membresía anual única, os 9 mercados ───────────────────────────────────
// Modelo nascido no Programa de Asociados de Chile (2026-08-04) e estendido a
// todos os mercados em 2026-08-10, por decisão do Matias.
// Fonte de verdade do Chile: SuperClini/partners/CLAUDE.md + membresia-superclini-cl.pdf.
//
// Moeda por decisão comercial, não por país de origem: Chile em CLP, Brasil em
// BRL, os outros 7 em USD como moeda de referência. A tabela USD é o espelho
// exato da chilena na paridade de 1 USD por 1.000 CLP.
//
// REGRA INVIOLÁVEL: todos os valores aqui são NETOS e a UI publica sempre o
// rótulo de imposto ao lado, nunca o preço nu. No Chile o rótulo é "+ IVA",
// decisão de 04/08 que está no deck, no PDF e no discurso do asociado; nos
// demais mercados é o genérico "+ impostos", porque o tributo muda de nome
// (IGV no Peru, VAT na Europa) e prometer "IVA" a um peruano é errar o nome.

export type TaxLabel = "iva" | "taxes";

export interface MembresiaConfig {
  currency: CurrencyCode;
  /** Casas decimais na exibição. CLP e USD são inteiros; BRL tem centavos. */
  currencyDecimals: 0 | 2;
  /** Campanha de lançamento. Quem entra conserva o preço na renovação. */
  promo: number;
  /** Preço de lista, aplicado a quem entra depois da campanha. */
  list: number;
  /**
   * Fim da campanha. Usado no `priceValidUntil` do JSON-LD, que exige data ISO.
   */
  campaignEndsAt: string;
  /** Paquetes de crédito. O que se compra SOMA ao incluído, nunca substitui. */
  packs: {
    aiPatient: number;
    aiPatientPack20: number;
    conversations500: number;
    conversations1500: number;
  };
  /** Rede de clínicas: uma bolsa de créditos para toda a rede. */
  network: {
    firstBranch: number;
    additionalBranch: number;
    /** A partir deste número de sucursais, condições corporativas sob medida. */
    corporateFrom: number;
  };
  /** Migração de outra plataforma: preço fixo, sem importar o tamanho da base. */
  migration: number;
  /**
   * Cuotas máximas no cartão. Nunca prometemos "sin interés". Zero significa
   * não prometer parcelamento: só a LATAM tem MercadoPago integrado, e em US,
   * ES e PT o Stripe nunca foi ligado.
   */
  maxInstallments: number;
  /** Qual rótulo de imposto acompanha todo preço deste mercado. */
  taxLabel: TaxLabel;
}

/** Campanha de lançamento: agosto de 2026 mais 6 meses. */
const CAMPAIGN_ENDS_AT = "2027-01-31";

/**
 * Os 7 mercados que cobram em USD. Só o parcelamento varia entre eles, porque
 * o MercadoPago opera na LATAM e não na Europa nem nos Estados Unidos.
 */
function usdMembresia(maxInstallments: number): MembresiaConfig {
  return {
    currency: "USD",
    currencyDecimals: 0,
    promo: 199,
    list: 299,
    campaignEndsAt: CAMPAIGN_ENDS_AT,
    packs: {
      aiPatient: 5,
      aiPatientPack20: 59,
      conversations500: 39,
      conversations1500: 99,
    },
    network: { firstBranch: 199, additionalBranch: 149, corporateFrom: 10 },
    migration: 149,
    maxInstallments,
    taxLabel: "taxes",
  };
}

export const MEMBRESIA: Record<CountryCode, MembresiaConfig> = {
  CL: {
    currency: "CLP",
    currencyDecimals: 0,
    promo: 199990,
    list: 299990,
    campaignEndsAt: CAMPAIGN_ENDS_AT,
    packs: {
      aiPatient: 4990,
      aiPatientPack20: 59990,
      conversations500: 39990,
      conversations1500: 99990,
    },
    network: { firstBranch: 199990, additionalBranch: 149990, corporateFrom: 10 },
    migration: 149990,
    maxInstallments: 12,
    taxLabel: "iva",
  },
  BR: {
    currency: "BRL",
    currencyDecimals: 2,
    promo: 999.9,
    list: 1499.9,
    campaignEndsAt: CAMPAIGN_ENDS_AT,
    packs: {
      aiPatient: 24.9,
      aiPatientPack20: 299.9,
      conversations500: 199.9,
      conversations1500: 499.9,
    },
    network: { firstBranch: 999.9, additionalBranch: 749.9, corporateFrom: 10 },
    migration: 749.9,
    maxInstallments: 12,
    taxLabel: "taxes",
  },
  // MercadoPago opera em CL, BR, AR, MX, CO e PE.
  CO: usdMembresia(12),
  AR: usdMembresia(12),
  MX: usdMembresia(12),
  PE: usdMembresia(12),
  // Sem gateway com parcelamento: não prometer cuotas.
  US: usdMembresia(0),
  ES: usdMembresia(0),
  PT: usdMembresia(0),
};

export function getMembresia(country: CountryCode): MembresiaConfig {
  return MEMBRESIA[country];
}

/**
 * Mercados que rodam a membresía anual única em vez dos 3 tiers. Desde
 * 2026-08-10 são todos. A função continua existindo, em vez de sumir junto com
 * a bifurcação, porque é o interruptor de um único ponto: se um mercado voltar
 * aos planos mensais, muda aqui e os 18 consumidores acompanham.
 */
export function isMembresiaCountry(_country: CountryCode): boolean {
  return true;
}

/**
 * Mercados sem conta grátis. Passou a valer para todos em 2026-08-10, junto com
 * a membresía. Função separada de propósito, porque um mercado pode um dia ter
 * membresía COM trial, ou trial sem membresía.
 */
export function isNoTrialCountry(_country: CountryCode): boolean {
  return true;
}

/**
 * Mercados com Programa de Asociados. Só o Chile: é lá que existe canal
 * recrutado, e "hablar con un asociado" fora dele manda o cliente a um
 * interlocutor que não existe. Nos demais o CTA fala com ventas.
 */
export function isAsociadoCountry(country: CountryCode): boolean {
  return country === "CL";
}

/** Desconto anual: pagar 10 meses, receber 2, -16.67% efetivo, arredondamos a -20%. */
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
      { key: "whatsappConv100", highlight: "ai" },
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
  { key: "whatsappIa",                           values: { esencial: "no", profesional: "100conv", avanzado: "300conv", corporativo: "custom" } },

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

// Corporativo saiu da vitrine em 2026-07-23 (simplificar para 3 planos). Os dados
// de corporativo seguem em PRICING/PLANS/PLAN_MATRIX (reversível), só não é exibido.
export const PLAN_ORDER: PlanId[] = ["esencial", "profesional", "avanzado"];
