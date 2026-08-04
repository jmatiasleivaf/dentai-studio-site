import { z } from "zod";

/**
 * Postulación al Programa de Asociados (Chile).
 *
 * Schema compartilhado entre o formulário (client) e o proxy
 * `/api/postulacion` (server). O server revalida por conta própria: o cliente
 * pode ser contornado, e este payload nasce numa página pública sem sessão.
 *
 * Por que não reusa `lead-schema.ts`: aquele descreve uma clínica avaliando o
 * produto (país, tamanho da clínica, interesse comercial). Aqui o remetente é
 * uma pessoa que vende para clínicas, em um único país, e os campos que
 * qualificam a candidatura (perfil, zona, acesso a clínicas, disponibilidade)
 * não existem lá.
 */

/** Regiões de Chile, códigos ISO 3166-2:CL. Nome próprio geográfico, não se traduz. */
export const REGIONES_CL = [
  { code: "AP", label: "Arica y Parinacota" },
  { code: "TA", label: "Tarapacá" },
  { code: "AN", label: "Antofagasta" },
  { code: "AT", label: "Atacama" },
  { code: "CO", label: "Coquimbo" },
  { code: "VS", label: "Valparaíso" },
  { code: "RM", label: "Región Metropolitana" },
  { code: "LI", label: "Libertador General Bernardo O'Higgins" },
  { code: "ML", label: "Maule" },
  { code: "NB", label: "Ñuble" },
  { code: "BI", label: "Biobío" },
  { code: "AR", label: "La Araucanía" },
  { code: "LR", label: "Los Ríos" },
  { code: "LL", label: "Los Lagos" },
  { code: "AI", label: "Aysén del General Carlos Ibáñez del Campo" },
  { code: "MA", label: "Magallanes y de la Antártica Chilena" },
] as const;

export const REGION_CODES = REGIONES_CL.map((r) => r.code) as unknown as [string, ...string[]];

export const REGION_LABEL: Record<string, string> = Object.fromEntries(
  REGIONES_CL.map((r) => [r.code, r.label])
);

export const PERFILES = [
  "representante_insumos",
  "distribuidor_equipos",
  "laboratorio_dental",
  "contador_asesor",
  "otro",
] as const;

export const CLINICAS_RANGOS = ["ninguna", "1-5", "6-15", "16-30", "31+"] as const;

export const DISPONIBILIDAD = ["menos_5", "5_10", "10_20", "mas_20"] as const;

/**
 * Rótulos em espanhol para o que sai do site e entra no CRM.
 *
 * Ficam aqui, e não no i18n, de propósito: o operador do CRM lê sempre em
 * espanhol, independentemente do idioma em que a pessoa preencheu. Amarrar o
 * texto que vai ao CRM ao locale do visitante criaria fichas em três idiomas
 * na mesma lista.
 */
export const PERFIL_LABEL_ES: Record<(typeof PERFILES)[number], string> = {
  representante_insumos: "Representante de insumos",
  distribuidor_equipos: "Distribuidor de equipos",
  laboratorio_dental: "Laboratorio dental",
  contador_asesor: "Contador o asesor",
  otro: "Otro",
};

export const CLINICAS_LABEL_ES: Record<(typeof CLINICAS_RANGOS)[number], string> = {
  ninguna: "Ninguna todavía",
  "1-5": "Entre 1 y 5",
  "6-15": "Entre 6 y 15",
  "16-30": "Entre 16 y 30",
  "31+": "Más de 30",
};

export const DISPONIBILIDAD_LABEL_ES: Record<(typeof DISPONIBILIDAD)[number], string> = {
  menos_5: "Menos de 5 horas por semana",
  "5_10": "Entre 5 y 10 horas por semana",
  "10_20": "Entre 10 y 20 horas por semana",
  mas_20: "Más de 20 horas por semana",
};

// Mesmas regras do formulário de contato: E.164 com "+" e 8 a 15 dígitos.
const E164_REGEX = /^\+[1-9]\d{7,14}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const postulacionSchema = z.object({
  nombre: z.string().trim().min(2, { message: "min2" }).max(120, { message: "tooLong" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(EMAIL_REGEX, { message: "email" })
    .max(200, { message: "tooLong" }),
  telefono: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().regex(E164_REGEX, { message: "tel" }).max(20)),
  // Opcional: um representante costuma ter empresa, um contador independente não.
  // Quando vazio, o servidor deriva um valor determinístico para o CRM.
  empresa: z.string().trim().max(160, { message: "tooLong" }).optional().or(z.literal("")),
  region: z.enum(REGION_CODES, { message: "required" }),
  comuna: z.string().trim().min(2, { message: "min2" }).max(80, { message: "tooLong" }),
  perfil: z.enum(PERFILES, { message: "required" }),
  clinicas: z.enum(CLINICAS_RANGOS, { message: "required" }),
  disponibilidad: z.enum(DISPONIBILIDAD, { message: "required" }),
  mensaje: z.string().trim().max(1000, { message: "tooLong" }).optional().or(z.literal("")),
  // Ley 19.628 (CL), LGPD e RGPD: consentimento explícito, nunca pré-marcado.
  consentimiento: z.literal(true, { message: "consent" }),
  // Honeypot. Invisível ao humano, tabulável só por bot.
  website: z.string().max(500).optional().or(z.literal("")),
});

export type PostulacionFormValues = z.input<typeof postulacionSchema>;
export type PostulacionParsed = z.output<typeof postulacionSchema>;
