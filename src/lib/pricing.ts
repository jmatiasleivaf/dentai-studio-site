import type { CountryCode } from "./countries";

export type PlanId = "starter" | "professional" | "enterprise";

/**
 * Preços PPP por país em moeda local.
 * Valores PRELIMINARES — substituir pelos oficiais confirmados.
 * Paridade de poder de compra (PPP) LATAM vs US: Starter ~USD 29, Pro ~USD 79, Enterprise ~USD 149.
 */
export const PRICING: Record<CountryCode, Record<PlanId, number>> = {
  CL: { starter: 29990, professional: 69990, enterprise: 119990 },
  BR: { starter: 149, professional: 389, enterprise: 749 },
  CO: { starter: 119000, professional: 299000, enterprise: 579000 },
  AR: { starter: 29900, professional: 79900, enterprise: 149900 },
  MX: { starter: 499, professional: 1299, enterprise: 2499 },
  PE: { starter: 109, professional: 279, enterprise: 539 },
  US: { starter: 29, professional: 79, enterprise: 149 },
  ES: { starter: 29, professional: 79, enterprise: 149 },
  PT: { starter: 29, professional: 79, enterprise: 149 },
};

export const TRIAL_DAYS = 14;

export type PlanFeature = {
  key: string;
  highlight?: "ai" | "new" | "auto";
};

export const PLANS: Record<PlanId, { features: PlanFeature[] }> = {
  starter: {
    features: [
      { key: "maxProfessionals2" },
      { key: "agenda" },
      { key: "prontuario" },
      { key: "financeiroBasico" },
      { key: "reportsBasic" },
      { key: "rolesBasic" },
    ],
  },
  professional: {
    features: [
      { key: "maxProfessionals8" },
      { key: "allStarter" },
      { key: "aiAnalysis", highlight: "ai" },
      { key: "smileSimulation", highlight: "ai" },
      { key: "autoSettlements", highlight: "auto" },
      { key: "whatsappAi", highlight: "ai" },
      { key: "dicom3d", highlight: "new" },
      { key: "reportsAdvanced" },
      { key: "laboratoryPortal" },
      { key: "memberships" },
    ],
  },
  enterprise: {
    features: [
      { key: "unlimitedProfessionals" },
      { key: "allProfessional" },
      { key: "totem", highlight: "new" },
      { key: "digitalSignature" },
      { key: "queueSystem" },
      { key: "multiWhatsapp" },
      { key: "apiAccess" },
      { key: "prioritySupport" },
      { key: "superAdmin" },
    ],
  },
};
