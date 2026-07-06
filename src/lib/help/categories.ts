import type { Category } from "./types";

/**
 * As 8 coleções do Centro de Ayuda. SSoT da arquitetura de informação.
 * Adicionar coleção nova? Adicionar aqui + ilustração em components/help/illustrations.tsx.
 */
export const HELP_CATEGORIES: readonly Category[] = [
  {
    id: "primeros-pasos",
    slug: "primeros-pasos",
    order: 1,
    accent: "brand",
    illustration: "primeros-pasos",
    name: {
      es: "Primeros pasos",
      pt: "Primeiros passos",
      en: "Getting started",
    },
    description: {
      es: "Configura tu clínica, importa pacientes y migra desde Dentalink sin perder nada.",
      pt: "Configure sua clínica, importe pacientes e migre do Dentalink sem perder nada.",
      en: "Set up your clinic, import patients and migrate from Dentalink without losing a thing.",
    },
  },
  {
    id: "agenda",
    slug: "agenda-y-citas",
    order: 2,
    accent: "brand",
    illustration: "agenda",
    name: {
      es: "Agenda y citas",
      pt: "Agenda e consultas",
      en: "Scheduling",
    },
    description: {
      es: "Turnos, bloqueos, recordatorios automáticos y la agenda pública para que se llene sola.",
      pt: "Horários, bloqueios, lembretes automáticos e a agenda pública para encher sozinha.",
      en: "Slots, blocks, automatic reminders and the public agenda that fills itself.",
    },
  },
  {
    id: "sofia",
    slug: "sofia-y-whatsapp",
    order: 3,
    accent: "green",
    illustration: "sofia",
    name: {
      es: "Sofía y WhatsApp",
      pt: "Sofía e WhatsApp",
      en: "Sofía & WhatsApp",
    },
    description: {
      es: "Configura tu agente de IA, allowlist, respuestas y la integración con WhatsApp 24/7.",
      pt: "Configure seu agente de IA, allowlist, respostas e a integração com o WhatsApp 24/7.",
      en: "Configure your AI agent, allowlist, replies and the 24/7 WhatsApp integration.",
    },
  },
  {
    id: "clinico",
    slug: "ficha-clinica",
    order: 4,
    accent: "brand",
    illustration: "clinico",
    name: {
      es: "Ficha clínica y odontograma",
      pt: "Ficha clínica e odontograma",
      en: "Clinical chart & odontogram",
    },
    description: {
      es: "Historia del paciente, odontograma, visor DICOM 3D, exámenes y la IA que asiste el diagnóstico.",
      pt: "Histórico do paciente, odontograma, visor DICOM 3D, exames e a IA que assiste o diagnóstico.",
      en: "Patient history, odontogram, 3D DICOM viewer, exams and AI-assisted diagnosis.",
    },
  },
  {
    id: "finanzas",
    slug: "caja-y-cobros",
    order: 5,
    accent: "brand",
    illustration: "finanzas",
    name: {
      es: "Caja, cobros y finanzas",
      pt: "Caixa, cobranças e finanças",
      en: "Cash, billing & finances",
    },
    description: {
      es: "Caja por usuario, cobros con split, liquidaciones a profesionales y control de membresías.",
      pt: "Caixa por usuário, cobranças com split, repasses a profissionais e controle de mensalidades.",
      en: "Per-user cash drawer, split payments, professional payouts and membership control.",
    },
  },
  {
    id: "fiscal",
    slug: "facturacion-fiscal",
    order: 6,
    accent: "violet",
    illustration: "fiscal",
    name: {
      es: "Facturación y fiscal por país",
      pt: "Faturamento e fiscal por país",
      en: "Invoicing & tax by country",
    },
    description: {
      es: "Documentos tributarios de cada mercado: SII, AFIP, NF-e y más. Configura una vez, factura tranquilo.",
      pt: "Documentos fiscais de cada mercado: SII, AFIP, NF-e e mais. Configure uma vez, fature tranquilo.",
      en: "Tax documents for each market: SII, AFIP, NF-e and more. Set it up once, invoice with peace of mind.",
    },
  },
  {
    id: "totem",
    slug: "totem-y-recepcion",
    order: 7,
    accent: "brand",
    illustration: "totem",
    name: {
      es: "Tótem y recepción",
      pt: "Totem e recepção",
      en: "Kiosk & front desk",
    },
    description: {
      es: "Autoatención en sala de espera: check-in por documento, confirmación de citas y menos filas.",
      pt: "Autoatendimento na sala de espera: check-in por documento, confirmação de consultas e menos filas.",
      en: "Waiting-room self-service: document check-in, appointment confirmation and shorter queues.",
    },
  },
  {
    id: "cuenta",
    slug: "cuenta-y-seguridad",
    order: 8,
    accent: "brand",
    illustration: "cuenta",
    name: {
      es: "Cuenta, planes y seguridad",
      pt: "Conta, planos e segurança",
      en: "Account, plans & security",
    },
    description: {
      es: "Usuarios y permisos, tu plan y suscripción, respaldos y cómo cuidamos los datos.",
      pt: "Usuários e permissões, seu plano e assinatura, backups e como cuidamos dos dados.",
      en: "Users and permissions, your plan and subscription, backups and how we protect your data.",
    },
  },
] as const;
