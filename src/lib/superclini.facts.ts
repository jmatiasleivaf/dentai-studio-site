/**
 * Single Source of Truth para fatos quantitativos do produto SuperClini.
 *
 * Toda string de UI que mencione um número (testes, módulos, países, cotas)
 * deve consumir daqui via placeholder i18n, NUNCA hardcoded em messages/*.json.
 *
 * Atualização: manual por enquanto. Roadmap: `npm run sync-facts` puxa do
 * monorepo do app SaaS quando endpoint público existir. Toda mudança aqui
 * deve ter entry correspondente em SITE-STATUS.md (timestamp + fonte).
 */

import { COUNTRY_LIST } from "./countries";

export const SUPERCLINI_FACTS = {
  // ─── Produto / Engenharia ─────────────────────────────────────────
  /** Tests passing no app SaaS. Source: memory project_superclini_pricing.md (Fase E, 2026-04-30, commit c1c083e). */
  testsCount: 1925,
  /** Features booleanas do pricing system (BillingPlan.features). Auditoria pendente: i18n diz "módulos operacionais", pode ser narrativa diferente. */
  modulesCount: 22,
  /** Países atendidos. Derivado de lib/countries.ts para nunca dessincronizar. */
  countriesCount: COUNTRY_LIST.length,
  /** Moedas distintas em circulação (CLP, BRL, COP, MXN, ARS, PEN, USD, EUR). */
  currenciesCount: 8,

  // ─── Agentes de IA ────────────────────────────────────────────────
  /** Sofía (paciente), IAndra (equipe), AlicIA (caso clínico). Todos em produção. */
  agentsCount: 3,
  /**
   * Ferramentas registradas da Sofía. Fonte autoritativa:
   * dentai-studio/src/lib/whatsapp-tools.ts → AGENT_TOOLS (:1799-1984).
   * Auditado 2026-07-20: são 13. O site dizia 12 até esta data.
   */
  sofiaToolsCount: 13,
  /**
   * Ações que a IAndra executa, com gate de permissão por usuário.
   * Fonte: dentai-studio/src/lib/support/tools/registry.ts → ALL_TOOLS (:17-25).
   */
  iandraActionsCount: 5,
  /**
   * Dias sem evolução que a AlicIA usa para marcar um plano.
   * Fonte: dentai-studio/src/lib/alicia/seguimento.ts (:25-30).
   */
  aliciaThresholds: { morno: 30, frio: 60 },

  // ─── Pricing ──────────────────────────────────────────────────────
  /** Tiers públicos: Esencial, Profesional, Avanzado, Corporativo (renomeado de Enterprise em 2026-04-29). */
  tiersCount: 4,
  /** Trial gratuito do tier Profesional. */
  trialDays: 14,
  /** Desconto efetivo do ciclo anual (-16.67% real, narrativa -20%). */
  annualDiscountPct: 20,

  // ─── Cotas IA por tier (referência narrativa; valores autoritativos em pricing.ts PLAN_MATRIX) ─
  aiQuotas: {
    // whatsappConv do Profesional passou de 0 para 100 em 2026-07-20: sem Sofía
    // no tier 2, a promessa dos três agentes na home era falsa. COGS ~US$0,015/conv.
    profesional: { simulaciones: 30, radiografia: 30, whatsappConv: 100 },
    avanzado: { simulaciones: 100, radiografia: 100, whatsappConv: 300 },
    // corporativo: cotas personalizadas por contrato
  },

  // ─── Compliance / Regulação ──────────────────────────────────────
  /**
   * ATENÇÃO: só entra aqui regulação com implementação REAL no produto.
   * "HIPAA-ready" foi REMOVIDO em 2026-07-20: a única ocorrência de HIPAA no app
   * é uma string de prompt (dentai-studio/src/lib/ai.ts:28), sem BAA e sem
   * controle mapeado. Era claim que reprova em diligência.
   * "ISO 27001" e "SOC 2" também não entram: são do provedor de hosting.
   */
  compliance: {
    LATAM: ["LGPD", "Ley 20.584", "Lei 19.628"],
    EU: ["GDPR"],
  },

  // ─── Marca / Posicionamento ───────────────────────────────────────
  foundedYear: 2024,
  productLaunchYear: 2026,

  // ─── Tecnologia (trust signals) ───────────────────────────────────
  aiProviders: ["Anthropic Claude", "Google Gemini", "OpenAI"],
  /** Métodos de pagamento globais cobertos via i18n paymentMethods.* */
  paymentMethodsCount: 16,
} as const;

export type SuperCliniFacts = typeof SUPERCLINI_FACTS;
