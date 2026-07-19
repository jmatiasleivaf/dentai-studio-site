import { z } from "zod";
import { LEAD_PAISES } from "./lead-schema";

/**
 * Schema do cadastro self-service.
 *
 * Espelha `src/lib/signup-validation.ts` do app (dentai-studio). Os dois
 * precisam concordar: o servidor rejeita o que este schema deixar passar, e
 * divergência vira erro 422 que o visitante não entende. Mantidos em sync a
 * mão, como já acontece com `lead-schema` e `lead-validation`.
 */

export const SIGNUP_PAISES = LEAD_PAISES;

export const signupSchema = z.object({
  nomeClinica: z.string().trim().min(2, "tooShort").max(120, "tooLong"),
  nomeAdmin: z.string().trim().min(2, "tooShort").max(120, "tooLong"),
  email: z.string().trim().min(1, "required").email("invalidEmail").max(160, "tooLong"),
  telefone: z.string().trim().max(40, "tooLong").optional().or(z.literal("")),
  pais: z.enum(SIGNUP_PAISES),
  // Consentimento explícito: sem cartão, é a única barreira formal antes de
  // criar um tenant real com dado de pessoa dentro.
  consentimento: z.literal(true),
  // Honeypot. Invisível ao humano; bot preenche.
  website: z.string().max(200).optional(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
