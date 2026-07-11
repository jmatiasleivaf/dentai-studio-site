import type { Category } from "./types";

/**
 * As 12 coleções do Centro de Ayuda. SSoT da arquitetura de informação.
 * Ancorada no estado REAL da plataforma (specs + testes + código, jul/2026).
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
      es: "Migración desde Dentalink, configuración de tu clínica, profesionales y horarios.",
      pt: "Migração do Dentalink, configuração da sua clínica, profissionais e horários.",
      en: "Migration from Dentalink, clinic setup, professionals and working hours.",
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
      es: "Citas, arrastrar y soltar, bloqueos, recordatorios y la agenda pública de reservas.",
      pt: "Consultas, arrastar e soltar, bloqueios, lembretes e a agenda pública de reservas.",
      en: "Appointments, drag & drop, blocks, reminders and the public booking agenda.",
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
      es: "Conecta tu WhatsApp por QR, define qué hace Sofía y asume conversaciones cuando quieras.",
      pt: "Conecte seu WhatsApp por QR, defina o que a Sofía faz e assuma conversas quando quiser.",
      en: "Connect your WhatsApp via QR, set what Sofía does and take over chats whenever you want.",
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
      es: "Odontograma por cara, anamnesis, evoluciones inmutables y planes de tratamiento.",
      pt: "Odontograma por face, anamnese, evoluções imutáveis e planos de tratamento.",
      en: "Per-surface odontogram, anamnesis, immutable evolutions and treatment plans.",
    },
  },
  {
    id: "pacientes",
    slug: "la-ficha-del-paciente",
    order: 5,
    accent: "brand",
    illustration: "pacientes",
    name: {
      es: "La ficha del paciente",
      pt: "A ficha do paciente",
      en: "The patient chart",
    },
    description: {
      es: "El recorrido por la ficha, los datos del paciente, la anamnesis, el resumen con IA y los exámenes y citas vinculados.",
      pt: "O passeio pela ficha, os dados do paciente, a anamnese, o resumo com IA e os exames e consultas vinculados.",
      en: "A tour of the chart: patient data, anamnesis, the AI summary and the linked exams and appointments.",
    },
  },
  {
    id: "imagenes",
    slug: "imagenes-ia",
    order: 6,
    accent: "violet",
    illustration: "imagenes",
    name: {
      es: "Imágenes e IA clínica",
      pt: "Imagens e IA clínica",
      en: "Imaging & clinical AI",
    },
    description: {
      es: "Casos con IA y simulación de sonrisa, fotos clínicas, radiografías con informe IA y visor DICOM 3D.",
      pt: "Casos com IA e simulação de sorriso, fotos clínicas, radiografias com laudo IA e visor DICOM 3D.",
      en: "AI cases and smile simulation, clinical photos, AI radiograph reports and the 3D DICOM viewer.",
    },
  },
  {
    id: "finanzas",
    slug: "caja-y-cobros",
    order: 7,
    accent: "brand",
    illustration: "finanzas",
    name: {
      es: "Caja, cobros y finanzas",
      pt: "Caixa, cobranças e finanças",
      en: "Cash, billing & finances",
    },
    description: {
      es: "Caja por operador, cobros con varios medios, estornos, liquidaciones, membresías y saldos.",
      pt: "Caixa por operador, cobranças com vários meios, estornos, repasses, mensalidades e saldos.",
      en: "Per-operator cash drawer, multi-method payments, reversals, payouts, memberships and balances.",
    },
  },
  {
    id: "crm",
    slug: "crm-y-campanas",
    order: 8,
    accent: "violet",
    illustration: "crm",
    name: {
      es: "CRM y campañas",
      pt: "CRM e campanhas",
      en: "CRM & campaigns",
    },
    description: {
      es: "Tareas de seguimiento de pacientes generadas por IA, plantillas y campañas por segmento.",
      pt: "Tarefas de acompanhamento de pacientes geradas por IA, modelos e campanhas por segmento.",
      en: "AI-generated patient follow-up tasks, templates and segmented campaigns.",
    },
  },
  {
    id: "informes",
    slug: "informes-y-metricas",
    order: 9,
    accent: "brand",
    illustration: "informes",
    name: {
      es: "Informes y métricas",
      pt: "Relatórios e métricas",
      en: "Reports & metrics",
    },
    description: {
      es: "El panel inicial, los informes de gestión y el desempeño personal de cada dentista.",
      pt: "O painel inicial, os relatórios de gestão e o desempenho pessoal de cada dentista.",
      en: "The home dashboard, management reports and each dentist's personal performance.",
    },
  },
  {
    id: "inventario",
    slug: "inventario-y-laboratorio",
    order: 10,
    accent: "brand",
    illustration: "inventario",
    name: {
      es: "Inventario y laboratorio",
      pt: "Estoque e laboratório",
      en: "Inventory & lab",
    },
    description: {
      es: "Control de stock con alertas y las órdenes de laboratorio, con portal para el lab externo.",
      pt: "Controle de estoque com alertas e as ordens de laboratório, com portal para o lab externo.",
      en: "Stock control with alerts and lab orders, with a portal for the external lab.",
    },
  },
  {
    id: "totem",
    slug: "totem-y-recepcion",
    order: 11,
    accent: "brand",
    illustration: "totem",
    name: {
      es: "Tótem y recepción",
      pt: "Totem e recepção",
      en: "Kiosk & front desk",
    },
    description: {
      es: "Autoatención en sala de espera: check-in por documento, consentimientos y fila.",
      pt: "Autoatendimento na sala de espera: check-in por documento, consentimentos e fila.",
      en: "Waiting-room self-service: document check-in, consents and queue.",
    },
  },
  {
    id: "cuenta",
    slug: "cuenta-y-seguridad",
    order: 12,
    accent: "brand",
    illustration: "cuenta",
    name: {
      es: "Cuenta, planes y seguridad",
      pt: "Conta, planos e segurança",
      en: "Account, plans & security",
    },
    description: {
      es: "Usuarios y permisos, tu plan y cuotas, visión de red y verificación en dos pasos.",
      pt: "Usuários e permissões, seu plano e cotas, visão de rede e verificação em duas etapas.",
      en: "Users and permissions, your plan and quotas, network view and two-factor authentication.",
    },
  },
] as const;
