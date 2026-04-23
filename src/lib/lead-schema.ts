import { z } from "zod";

// Espelha leadCreateSchema em dentai-studio/src/lib/lead-validation.ts.
// Mantido em sync manual — qualquer mudança nas regras deve ser replicada lá.

export const LEAD_PAISES = ["CL", "BR", "CO", "AR", "MX", "PE", "US", "ES", "PT"] as const;
export const LEAD_TAMANHOS = ["1", "2-5", "6-10", "11-20", "20+"] as const;
export const LEAD_INTERESSES = [
  "avaliar",
  "demo",
  "trial_profesional",
  "cotizacion_enterprise",
  "suporte",
  "outro",
] as const;

// Telefone E.164: "+" seguido de 8-15 dígitos. Espaços internos são removidos antes de validar.
const E164_REGEX = /^\+[1-9]\d{7,14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const contactFormSchema = z.object({
  nome: z.string().trim().min(2, { message: "min2" }).max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(EMAIL_REGEX, { message: "email" })
    .max(200),
  telefone: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().regex(E164_REGEX, { message: "tel" }).max(20)),
  clinica: z.string().trim().max(200).optional().or(z.literal("")),
  pais: z.enum(LEAD_PAISES, { message: "pais" }),
  tamanho: z.enum(LEAD_TAMANHOS).optional().or(z.literal("")),
  interesse: z.enum(LEAD_INTERESSES).optional().or(z.literal("")),
  mensagem: z.string().trim().max(1000).optional().or(z.literal("")),
  // LGPD / Ley 19.628 / GDPR
  consentimento: z.literal(true, { message: "consent" }),
  // Honeypot — invisible CSS field. Bots preenchem, humanos não.
  website: z.string().max(500).optional().or(z.literal("")),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;

// Resposta do endpoint POST /api/leads (bem-sucedida)
export type LeadCreateResponse = {
  id: string;
  status: "received";
};

export type LeadCreateErrorResponse = {
  error: string;
  issues?: Array<{ field: string; message: string }>;
};
