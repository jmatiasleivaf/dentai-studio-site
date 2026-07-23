import Image from "next/image";
import type { Locale } from "@/i18n/routing";

/**
 * Palco visual do hero: retrato humano real + prova de produto flutuante.
 *
 * O retrato (foto de banco, licença comercial, ver public/showcase/home/CREDITS.md)
 * dá o calor humano que faltava acima da dobra. Sobre ele, dois cartões de vidro:
 * a agenda em grade e um trecho da Sofía no WhatsApp. O dado dentro é do PRODUTO
 * (fictício, sem PII, nenhum resultado atribuído a cliente), na mesma técnica dos
 * 46 mockups do Centro de Ayuda. Tri-língue por dict inline (não i18n JSON), igual
 * aos mockups: locale entra por prop.
 */

type Dict = Record<Locale, string>;
const t = (d: Dict, l: Locale) => d[l] ?? d.es;

const TXT = {
  portraitAlt: {
    es: "Recepcionista dental sonriendo en la recepción de la clínica",
    pt: "Recepcionista de clínica odontológica sorrindo na recepção",
    en: "Smiling dental receptionist at the clinic front desk",
  },
  agendaTitle: { es: "Agenda de hoy", pt: "Agenda de hoje", en: "Today’s schedule" },
  live: { es: "En vivo", pt: "Ao vivo", en: "Live" },
  d1: { es: "Dra. Rojas", pt: "Dra. Rojas", en: "Dr. Rojas" },
  d2: { es: "Dr. Fuentes", pt: "Dr. Fuentes", en: "Dr. Fuentes" },
  control: { es: "Control", pt: "Retorno", en: "Check-up" },
  limpieza: { es: "Limpieza", pt: "Limpeza", en: "Cleaning" },
  ortodoncia: { es: "Ortodoncia", pt: "Ortodontia", en: "Orthodontics" },
  libre: { es: "Libre", pt: "Livre", en: "Open" },
  urgencia: { es: "Urgencia", pt: "Urgência", en: "Urgent" },
  confirmedBy: {
    es: "Confirmadas por Sofía",
    pt: "Confirmadas pela Sofía",
    en: "Confirmed by Sofía",
  },
  citas: { es: "27 citas", pt: "27 consultas", en: "27 appts" },
  online: { es: "en línea", pt: "online", en: "online" },
  bubbleIn: {
    es: "Hola, necesito una hora para limpieza",
    pt: "Oi, preciso de um horário para limpeza",
    en: "Hi, I need an appointment for a cleaning",
  },
  bubbleOut: {
    es: "Tengo mañana a las 10:00. ¿Te acomoda?",
    pt: "Tenho amanhã às 10:00. Fica bom?",
    en: "I have tomorrow at 10:00. Works for you?",
  },
  respondsOn: {
    es: "Responde en WhatsApp",
    pt: "Responde no WhatsApp",
    en: "Answers on WhatsApp",
  },
} satisfies Record<string, Dict>;

function Chip({ label, tone }: { label: string; tone: "sky" | "teal" | "violet" | "amber" | "free" }) {
  const map: Record<string, string> = {
    sky: "bg-sky-100 text-sky-700",
    teal: "bg-teal-100 text-teal-700",
    violet: "bg-violet-100 text-violet-700",
    amber: "bg-amber-100 text-amber-700",
    free: "border border-dashed border-ink-200 text-ink-400",
  };
  return (
    <span className={`rounded-md px-1.5 py-1 text-center text-[10px] font-semibold leading-tight ${map[tone]}`}>
      {label}
    </span>
  );
}

export function HeroStage({ locale }: { locale: Locale }) {
  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
      {/* brilho da marca atrás do retrato */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand-500/25 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/12 shadow-2xl">
        <Image
          src="/showcase/home/recepcion.webp"
          alt={t(TXT.portraitAlt, locale)}
          width={1000}
          height={1250}
          priority
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 88vw"
          className="aspect-[4/5] w-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent"
        />
      </div>

      {/* cartão de agenda flutuante */}
      <div className="absolute -bottom-6 -left-4 w-[70%] max-w-[290px] rounded-2xl border border-ink-100 bg-white p-3.5 shadow-2xl dark:border-white/10 dark:bg-ink-900">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-display text-sm font-bold tracking-tight text-ink-950 dark:text-white">
            {t(TXT.agendaTitle, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink-400">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t(TXT.live, locale)}
          </span>
        </div>
        <div className="grid grid-cols-[26px_1fr_1fr] gap-1">
          <span />
          <span className="text-center text-[9px] font-semibold text-ink-400">{t(TXT.d1, locale)}</span>
          <span className="text-center text-[9px] font-semibold text-ink-400">{t(TXT.d2, locale)}</span>

          <span className="flex items-center text-[9px] tabular-nums text-ink-400">09:00</span>
          <Chip label={t(TXT.control, locale)} tone="sky" />
          <Chip label={t(TXT.limpieza, locale)} tone="teal" />

          <span className="flex items-center text-[9px] tabular-nums text-ink-400">10:00</span>
          <Chip label={t(TXT.ortodoncia, locale)} tone="violet" />
          <Chip label={t(TXT.libre, locale)} tone="free" />

          <span className="flex items-center text-[9px] tabular-nums text-ink-400">11:00</span>
          <Chip label={t(TXT.urgencia, locale)} tone="amber" />
          <Chip label={t(TXT.control, locale)} tone="sky" />
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-ink-100 pt-2 text-[10px] text-ink-400 dark:border-white/10">
          <span>{t(TXT.confirmedBy, locale)}</span>
          <span className="font-semibold tabular-nums text-ink-900 dark:text-white">{t(TXT.citas, locale)}</span>
        </div>
      </div>

      {/* chip da Sofía no WhatsApp */}
      <div className="absolute -right-3 top-6 w-[58%] max-w-[210px] rounded-2xl border border-ink-100 bg-white p-2.5 shadow-2xl dark:border-white/10 dark:bg-ink-900">
        <div className="mb-1.5 flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white"
          >
            S
          </span>
          <span className="leading-none">
            <span className="block font-display text-[13px] font-bold text-ink-950 dark:text-white">Sofía</span>
            <span className="text-[9px] text-emerald-600">{t(TXT.online, locale)}</span>
          </span>
        </div>
        <p className="mt-1 max-w-[92%] rounded-lg rounded-tl-sm bg-ink-100 px-2 py-1.5 text-[10px] leading-snug text-ink-600 dark:bg-ink-800 dark:text-ink-300">
          {t(TXT.bubbleIn, locale)}
        </p>
        <p className="ml-auto mt-1.5 max-w-[92%] rounded-lg rounded-tr-sm bg-brand-50 px-2 py-1.5 text-[10px] leading-snug text-ink-800 dark:bg-brand-500/15 dark:text-ink-100">
          {t(TXT.bubbleOut, locale)}
        </p>
        <p className="mt-2 text-[8px] font-semibold uppercase tracking-wider text-ink-400">
          {t(TXT.respondsOn, locale)}
        </p>
      </div>
    </div>
  );
}
