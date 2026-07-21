import * as React from "react";
import type { Locale } from "@/i18n/routing";
import type { MockupKey } from "@/lib/help/types";

/**
 * Mockups do Centro de Ayuda, reconstrução HTML/CSS FIEL de telas reais do
 * app DentAI/SuperClini, com dados fictícios e não-reveladores (LGPD-safe),
 * theme-aware (light + dark) e responsiva. NÃO são screenshots: rebuild limpo,
 * zero PII, zero imagem externa, zero dependência nova. Cada tela é validada
 * contra o componente real do app (read-only) antes de reconstruída.
 *
 * Idioma dos rótulos acompanha o locale do artigo (ES/PT/EN).
 */

type Dict = Record<Locale, string>;
function t(d: Dict, locale: Locale): string {
  return d[locale] ?? d.es;
}

/** Moldura estilo janela de app (traffic-lights + título). */
function MockupFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
      <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-3 py-2 dark:border-ink-800 dark:bg-ink-950">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="ml-1.5 truncate text-[11px] font-medium text-ink-400">{title}</span>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

/* ─────────────────────────── AGENDA (vista Día) ─────────────────────────── */

const AGENDA_STATUS = {
  confirmado: {
    card: "bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-900/40 dark:border-emerald-500 dark:text-emerald-100",
    dot: "bg-emerald-500",
  },
  agendado: {
    card: "bg-sky-100 border-sky-400 text-sky-900 dark:bg-sky-900/40 dark:border-sky-500 dark:text-sky-100",
    dot: "bg-sky-500",
  },
  realizado: {
    card: "bg-slate-100 border-slate-300 text-slate-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  faltou: {
    card: "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-900/40 dark:border-amber-500 dark:text-amber-200",
    dot: "bg-amber-400",
  },
} as const;

type ApptStatus = keyof typeof AGENDA_STATUS;

function AgendaMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Agenda", pt: "Agenda", en: "Schedule" },
    date: { es: "lun 7 jul", pt: "seg 7 jul", en: "Mon Jul 7" },
    today: { es: "Hoy", pt: "Hoje", en: "Today" },
    list: { es: "Lista", pt: "Lista", en: "List" },
    day: { es: "Día", pt: "Dia", en: "Day" },
    week: { es: "Semana", pt: "Semana", en: "Week" },
    schedule: { es: "Agendar", pt: "Agendar", en: "New" },
    free: { es: "Disponible · 30min", pt: "Disponível · 30min", en: "Available · 30min" },
    now: { es: "ahora", pt: "agora", en: "now" },
  };
  const appts: Array<{ top: number; h: number; name: string; proc: Dict; time: string; status: ApptStatus }> = [
    {
      top: 0,
      h: 74,
      name: "María González",
      proc: { es: "Limpieza dental", pt: "Limpeza dental", en: "Dental cleaning" },
      time: "08:00-09:00",
      status: "confirmado",
    },
    {
      top: 80,
      h: 74,
      name: "Juan Pérez",
      proc: { es: "Control ortodoncia", pt: "Controle ortodontia", en: "Ortho check-up" },
      time: "09:00-10:00",
      status: "agendado",
    },
    {
      top: 200,
      h: 74,
      name: "Camila Rojas",
      proc: { es: "Endodoncia", pt: "Endodontia", en: "Root canal" },
      time: "10:30-11:30",
      status: "realizado",
    },
    {
      top: 320,
      h: 36,
      name: "Diego Muñoz",
      proc: { es: "Urgencia", pt: "Urgência", en: "Emergency" },
      time: "12:00-12:30",
      status: "faltou",
    },
  ];
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <MockupFrame title="SuperClini · Agenda">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink-100 px-3 py-2.5 dark:border-ink-800">
        <div className="mr-auto">
          <div className="font-display text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <div className="text-[11px] text-ink-400">{t(L.date, locale)}</div>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-ink-100 p-0.5 dark:bg-ink-800">
          <span className="grid h-6 w-6 place-items-center rounded-md text-ink-500 dark:text-ink-400">‹</span>
          <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.today, locale)}</span>
          <span className="grid h-6 w-6 place-items-center rounded-md text-ink-500 dark:text-ink-400">›</span>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-ink-100 p-0.5 dark:bg-ink-800">
          <span className="rounded-md px-2 py-1 text-[11px] text-ink-400">{t(L.list, locale)}</span>
          <span className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-ink-800 shadow-sm dark:bg-ink-700 dark:text-white">
            {t(L.day, locale)}
          </span>
          <span className="rounded-md px-2 py-1 text-[11px] text-ink-400">{t(L.week, locale)}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg bg-brand-gradient px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <span aria-hidden>+</span>
          {t(L.schedule, locale)}
        </span>
      </div>

      {/* grid día */}
      <div className="flex min-w-[320px] px-3 py-3">
        {/* hour ruler */}
        <div className="relative w-12 shrink-0" style={{ height: 356 }}>
          {hours.map((h, i) => (
            <div key={h} className="absolute right-2 -translate-y-1/2 text-[10px] tabular-nums text-ink-400" style={{ top: i * 80 }}>
              {h}
            </div>
          ))}
        </div>
        {/* day track */}
        <div className="relative flex-1 border-l border-ink-100 dark:border-ink-800" style={{ height: 356 }}>
          {/* hour lines */}
          {hours.map((h, i) => (
            <div key={h} className="absolute inset-x-0 border-t border-ink-100 dark:border-ink-800/70" style={{ top: i * 80 }} />
          ))}
          {/* free slot */}
          <div
            className="absolute inset-x-1 flex items-center rounded-md border border-dashed border-emerald-300 bg-emerald-50/70 px-2 text-[10px] font-medium text-emerald-700 dark:border-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
            style={{ top: 280, height: 34 }}
          >
            {t(L.free, locale)}
          </div>
          {/* appointment cards */}
          {appts.map((a) => {
            const s = AGENDA_STATUS[a.status];
            return (
              <div
                key={a.name}
                className={`absolute inset-x-1 overflow-hidden rounded-lg border border-l-[3px] px-2 py-1 ${s.card}`}
                style={{ top: a.top, height: a.h }}
              >
                <div className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <span className="truncate text-[11px] font-bold">{a.name}</span>
                </div>
                {a.h >= 60 && <div className="truncate text-[10px] opacity-80">{t(a.proc, locale)}</div>}
                {a.h >= 60 && <div className="mt-0.5 text-[10px] tabular-nums opacity-60">{a.time}</div>}
              </div>
            );
          })}
          {/* now line */}
          <div className="absolute inset-x-0 flex items-center" style={{ top: 180 }}>
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="h-px flex-1 bg-rose-400" />
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── AGENDA PÚBLICA (paciente) ──────────────────────── */

function AgendaPublicaMock({ locale }: { locale: Locale }) {
  const L = {
    sub: { es: "Agenda tu cita online", pt: "Agende sua consulta online", en: "Book your appointment online" },
    title: { es: "Elige el horario", pt: "Escolha o horário", en: "Choose a time" },
    date: { es: "lunes, 6 de julio", pt: "segunda, 6 de julho", en: "Monday, July 6" },
    back: { es: "Volver", pt: "Voltar", en: "Back" },
    footer: { es: "Tecnología SuperClini", pt: "Tecnologia SuperClini", en: "Powered by SuperClini" },
  };
  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00"];
  const selected = "10:30";

  return (
    <MockupFrame title="SuperClini · Agenda online">
      <div className="bg-gradient-to-b from-sky-50 to-white px-4 py-6 dark:from-ink-950 dark:to-ink-900">
        <div className="mx-auto max-w-[300px]">
          {/* header */}
          <div className="flex flex-col items-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-lg font-extrabold text-white">
              S
            </div>
            <div className="mt-2 font-display text-base font-extrabold text-ink-900 dark:text-white">Clínica Sonrisa</div>
            <div className="text-[11px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          {/* step card */}
          <div className="mt-5">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="mb-3 text-[11px] capitalize text-ink-400">{t(L.date, locale)}</div>
            <div className="grid grid-cols-3 gap-2">
              {times.map((time) => {
                const on = time === selected;
                return (
                  <div
                    key={time}
                    className={`rounded-xl border py-2.5 text-center text-[12px] font-semibold ${
                      on
                        ? "border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500 dark:bg-brand-500/15 dark:text-brand-300"
                        : "border-ink-200 bg-white text-ink-700 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200"
                    }`}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-center text-[11px] font-medium text-ink-400">{t(L.back, locale)}</div>
          </div>
          {/* footer */}
          <div className="mt-6 flex items-center justify-center gap-1 opacity-50">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gradient" />
            <span className="text-[10px] text-ink-400">{t(L.footer, locale)}</span>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ────────────────────────── CHAT SOFÍA (WhatsApp) ───────────────────────── */

function SofiaChatMock({ locale }: { locale: Locale }) {
  const L = {
    convs: { es: "Conversaciones", pt: "Conversas", en: "Conversations" },
    paused: { es: "Equipo a cargo", pt: "Equipe no controle", en: "Team in control" },
    assume: { es: "Tomar", pt: "Assumir", en: "Take over" },
  };
  const list = [
    { name: "Camila Rojas", last: { es: "Sí, gracias!", pt: "Sim, obrigada!", en: "Yes, thanks!" }, active: true, paused: false },
    { name: "Juan Pérez", last: { es: "¿Puedo pagar en la clínica?", pt: "Posso pagar na clínica?", en: "Can I pay at the clinic?" }, active: false, paused: true },
    { name: "María González", last: { es: "Perfecto, nos vemos", pt: "Perfeito, até lá", en: "Great, see you" }, active: false, paused: false },
  ];
  const bubbles: Array<{ from: "in" | "out"; text: Dict; time: string }> = [
    { from: "in", text: { es: "Hola 👋 quiero agendar una limpieza", pt: "Oi 👋 quero agendar uma limpeza", en: "Hi 👋 I'd like to book a cleaning" }, time: "14:02" },
    { from: "out", text: { es: "¡Hola Camila! Con gusto. ¿Esta semana o la próxima?", pt: "Olá Camila! Com prazer. Esta semana ou a próxima?", en: "Hi Camila! Happy to help. This week or next?" }, time: "14:02" },
    { from: "in", text: { es: "Esta semana si se puede", pt: "Esta semana se der", en: "This week if possible" }, time: "14:03" },
    { from: "out", text: { es: "Tengo el jueves 10 a las 15:00 con la Dra. Soto. ¿Te la reservo?", pt: "Tenho quinta 10 às 15:00 com a Dra. Soto. Reservo pra você?", en: "I have Thu 10th at 3:00 PM with Dr. Soto. Shall I book it?" }, time: "14:03" },
    { from: "in", text: { es: "Sí, gracias!", pt: "Sim, obrigada!", en: "Yes, thanks!" }, time: "14:04" },
    { from: "out", text: { es: "Listo ✅ agendada para el jueves 10/07 a las 15:00. Te enviaré un recordatorio.", pt: "Pronto ✅ agendada para quinta 10/07 às 15:00. Enviarei um lembrete.", en: "Done ✅ booked for Thu 07/10 at 3:00 PM. I'll send a reminder." }, time: "14:04" },
  ];

  return (
    <MockupFrame title="SuperClini · WhatsApp">
      <div className="grid min-w-[320px] grid-cols-[7.5rem_1fr] sm:grid-cols-[13rem_1fr]">
        {/* list */}
        <div className="border-r border-ink-100 dark:border-ink-800">
          <div className="border-b border-ink-100 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-ink-400 dark:border-ink-800">
            {t(L.convs, locale)}
          </div>
          {list.map((c) => (
            <div
              key={c.name}
              className={`border-b border-ink-50 px-2.5 py-2 dark:border-ink-800/60 ${
                c.active ? "bg-sky-50 dark:bg-sky-950/40" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[12px] font-semibold text-ink-800 dark:text-ink-100">{c.name}</span>
                {c.paused && (
                  <span className="ml-auto hidden shrink-0 rounded bg-amber-100 px-1 py-px text-[9px] font-semibold text-amber-700 sm:inline dark:bg-amber-900/50 dark:text-amber-200">
                    {t(L.paused, locale)}
                  </span>
                )}
              </div>
              <div className="truncate text-[11px] text-ink-400">{t(c.last, locale)}</div>
            </div>
          ))}
        </div>
        {/* thread */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2 dark:border-ink-800">
            <span className="text-[12px] font-semibold text-ink-800 dark:text-ink-100">Camila Rojas</span>
            <span className="ml-auto rounded-lg border border-ink-200 px-2 py-1 text-[10px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">
              {t(L.assume, locale)}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 bg-ink-50/60 px-3 py-3 dark:bg-ink-950/40">
            {bubbles.map((b, i) => (
              <div key={i} className={`flex ${b.from === "out" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11.5px] leading-snug ${
                    b.from === "out"
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-50"
                      : "bg-white text-ink-700 shadow-sm dark:bg-ink-800 dark:text-ink-200"
                  }`}
                >
                  <span>{t(b.text, locale)}</span>
                  <span className="ml-1.5 align-bottom text-[9px] tabular-nums opacity-50">{b.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────── CAJA · detalle con movimientos ───────────────────── */

function CajaDetalleMock({ locale }: { locale: Locale }) {
  const L = {
    header: { es: "Caja · Valentina Soto", pt: "Caixa · Valentina Soto", en: "Register · Valentina Soto" },
    opened: { es: "Apertura: 07/07/2026 10:16", pt: "Abertura: 07/07/2026 10:16", en: "Opened: 07/07/2026 10:16" },
    newMov: { es: "+ Nuevo movimiento", pt: "+ Novo movimento", en: "+ New movement" },
    close: { es: "Cerrar caja", pt: "Fechar caixa", en: "Close register" },
    initial: { es: "Saldo inicial", pt: "Saldo inicial", en: "Opening" },
    inflow: { es: "Entradas", pt: "Entradas", en: "Cash in" },
    outflow: { es: "Salidas", pt: "Saídas", en: "Cash out" },
    final: { es: "Saldo final", pt: "Saldo final", en: "Balance" },
    movs: { es: "Movimientos", pt: "Movimentos", en: "Movements" },
    in: { es: "Entrada", pt: "Entrada", en: "Cash in" },
    out: { es: "Salida", pt: "Saída", en: "Cash out" },
  };
  const kpis = [
    { label: t(L.initial, locale), value: "$ 30.000", tone: "" },
    { label: t(L.inflow, locale), value: "$ 268.000", tone: "text-emerald-600 dark:text-emerald-400" },
    { label: t(L.outflow, locale), value: "$ 20.000", tone: "text-rose-500 dark:text-rose-400" },
    { label: t(L.final, locale), value: "$ 278.000", tone: "text-brand-600 dark:text-brand-400 font-extrabold" },
  ];
  const method = {
    transfer: { es: "Transferencia", pt: "Transferência", en: "Transfer" },
    debit: { es: "Débito", pt: "Débito", en: "Debit" },
    cash: { es: "Efectivo", pt: "Dinheiro", en: "Cash" },
  };
  const movs: Array<{ kind: "in" | "out"; concept: Dict; time: string; method: Dict; who: string; amount: string }> = [
    {
      kind: "in",
      concept: { es: "Control · Cuota 1", pt: "Controle · Parcela 1", en: "Check-up · Instalment 1" },
      time: "11:26",
      method: method.transfer,
      who: "María González",
      amount: "+ $ 90.000",
    },
    {
      kind: "in",
      concept: { es: "Prótesis · Cuota 1", pt: "Prótese · Parcela 1", en: "Prosthesis · Instalment 1" },
      time: "11:41",
      method: method.debit,
      who: "Juan Pérez",
      amount: "+ $ 128.000",
    },
    {
      kind: "in",
      concept: { es: "Limpieza dental", pt: "Limpeza dental", en: "Dental cleaning" },
      time: "12:25",
      method: method.cash,
      who: "Camila Rojas",
      amount: "+ $ 50.000",
    },
    {
      kind: "out",
      concept: { es: "Compra de insumos", pt: "Compra de insumos", en: "Supplies purchase" },
      time: "13:10",
      method: method.cash,
      who: "Valentina Soto",
      amount: "− $ 20.000",
    },
  ];

  return (
    <MockupFrame title="SuperClini · Caixas">
      <div className="min-w-[320px] px-4 py-4">
        {/* header */}
        <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.header, locale)}</div>
        <div className="text-[11px] text-ink-400">{t(L.opened, locale)}</div>
        {/* toolbar */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-lg border border-ink-200 px-2.5 py-1.5 text-[11px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">
            {t(L.newMov, locale)}
          </span>
          <span className="rounded-lg bg-ink-100 px-2.5 py-1.5 text-[11px] font-semibold text-ink-700 dark:bg-ink-800 dark:text-ink-200">
            {t(L.close, locale)}
          </span>
        </div>
        {/* KPI strip */}
        <div className="mt-3 grid grid-cols-4 rounded-xl bg-ink-50 dark:bg-ink-950/50">
          {kpis.map((k, i) => (
            <div key={k.label} className={`px-2 py-2.5 text-center ${i < 3 ? "border-r border-ink-200 dark:border-ink-800" : ""}`}>
              <div className="text-[9.5px] uppercase tracking-wide text-ink-400">{k.label}</div>
              <div className={`mt-0.5 text-[12.5px] font-bold tabular-nums text-ink-800 dark:text-ink-100 ${k.tone}`}>{k.value}</div>
            </div>
          ))}
        </div>
        {/* movements */}
        <div className="mb-1.5 mt-4 text-[10px] font-bold uppercase tracking-wide text-ink-400">{t(L.movs, locale)}</div>
        <div className="flex flex-col gap-1.5">
          {movs.map((m, i) => {
            const isIn = m.kind === "in";
            return (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-ink-50 px-2.5 py-2 dark:bg-ink-950/40">
                <span
                  className={`shrink-0 rounded-lg px-1.5 py-0.5 text-[9px] font-bold ${
                    isIn
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                  }`}
                >
                  {isIn ? t(L.in, locale) : t(L.out, locale)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium text-brand-600 dark:text-brand-400">
                    {t(m.concept, locale)} <span className="text-[9px] opacity-60">↗</span>
                  </div>
                  <div className="truncate text-[10px] text-ink-400">
                    {m.time} · {t(m.method, locale)} · {m.who}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[12.5px] font-bold tabular-nums ${
                    isIn ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                  }`}
                >
                  {m.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────── CIERRE DE CAJA ─────────────────────────────── */

function CajaCierreMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Cerrar caja", pt: "Fechar caixa", en: "Close register" },
    initial: { es: "Saldo inicial", pt: "Saldo inicial", en: "Opening balance" },
    entradas: { es: "+ Entradas", pt: "+ Entradas", en: "+ Cash in" },
    salidas: { es: "− Salidas", pt: "− Saídas", en: "− Cash out" },
    calc: { es: "Saldo calculado", pt: "Saldo calculado", en: "Calculated balance" },
    counted: { es: "Saldo real contado", pt: "Saldo real contado", en: "Actual counted balance" },
    hint: {
      es: "Deja en blanco para usar el saldo calculado",
      pt: "Deixe em branco para usar o saldo calculado",
      en: "Leave blank to use the calculated balance",
    },
    notes: { es: "Observaciones", pt: "Observações", en: "Notes" },
    notesPh: { es: "Opcional…", pt: "Opcional…", en: "Optional…" },
    cancel: { es: "Cancelar", pt: "Cancelar", en: "Cancel" },
    close: { es: "Cerrar caja", pt: "Fechar caixa", en: "Close register" },
  };

  return (
    <MockupFrame title="SuperClini · Caja">
      <div className="mx-auto max-w-sm px-4 py-4">
        <div className="mb-3 text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
        {/* summary box */}
        <div className="rounded-xl bg-ink-50 p-3 dark:bg-ink-950/50">
          <Row label={t(L.initial, locale)} value="$ 50.000" />
          <Row label={t(L.entradas, locale)} value="$ 198.000" tone="emerald" />
          <Row label={t(L.salidas, locale)} value="$ 0" tone="rose" />
          <div className="my-2 border-t border-ink-200 dark:border-ink-800" />
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-ink-900 dark:text-white">{t(L.calc, locale)}</span>
            <span className="text-[15px] font-extrabold tabular-nums text-brand-600 dark:text-brand-400">$ 248.000</span>
          </div>
        </div>
        {/* counted */}
        <label className="mt-3 block text-[11px] font-semibold text-ink-600 dark:text-ink-300">{t(L.counted, locale)}</label>
        <div className="mt-1 flex items-center rounded-lg border border-ink-200 px-2.5 py-2 dark:border-ink-700">
          <span className="text-[12px] tabular-nums text-ink-300 dark:text-ink-500">248000.00</span>
        </div>
        <p className="mt-1 text-[10.5px] text-ink-400">{t(L.hint, locale)}</p>
        {/* notes */}
        <label className="mt-3 block text-[11px] font-semibold text-ink-600 dark:text-ink-300">{t(L.notes, locale)}</label>
        <div className="mt-1 rounded-lg border border-ink-200 px-2.5 py-2 dark:border-ink-700">
          <span className="text-[12px] text-ink-300 dark:text-ink-500">{t(L.notesPh, locale)}</span>
        </div>
        {/* footer */}
        <div className="mt-4 flex justify-end gap-2">
          <span className="rounded-lg border border-ink-200 px-3 py-1.5 text-[12px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">
            {t(L.cancel, locale)}
          </span>
          <span className="rounded-lg bg-brand-gradient px-3 py-1.5 text-[12px] font-semibold text-white">{t(L.close, locale)}</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "emerald" | "rose" }) {
  const c = tone === "emerald" ? "text-emerald-600 dark:text-emerald-400" : tone === "rose" ? "text-rose-500 dark:text-rose-400" : "text-ink-700 dark:text-ink-300";
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className={`text-[12.5px] ${c}`}>{label}</span>
      <span className={`text-[12.5px] font-semibold tabular-nums ${c}`}>{value}</span>
    </div>
  );
}

/* ───────────────────────── PANEL INICIAL (dashboard) ────────────────────── */

function PanelKpisMock({ locale }: { locale: Locale }) {
  const L = {
    hoy: { es: "Citas hoy", pt: "Consultas hoje", en: "Visits today" },
    hoySub: { es: "3 realizadas", pt: "3 realizadas", en: "3 done" },
    pac: { es: "Pacientes activos", pt: "Pacientes ativos", en: "Active patients" },
    pacSub: { es: "+8 recientes", pt: "+8 recentes", en: "+8 recent" },
    citas: { es: "Citas · 30 días", pt: "Consultas · 30 dias", en: "Visits · 30 days" },
    citasSub: { es: "94% asistencia", pt: "94% comparecimento", en: "94% attendance" },
    ing: { es: "Ingresos del mes", pt: "Faturamento do mês", en: "Revenue this month" },
    ingSub: { es: "Pagos recibidos", pt: "Pagamentos recebidos", en: "Payments received" },
    today: { es: "Citas de hoy", pt: "Consultas de hoje", en: "Today's schedule" },
    attend: { es: "Asistencia · 30 días", pt: "Comparecimento · 30 dias", en: "Attendance · 30 days" },
    rate: { es: "Tasa de asistencia", pt: "Taxa de comparecimento", en: "Attendance rate" },
    done: { es: "Realizadas", pt: "Realizadas", en: "Completed" },
    cancel: { es: "Canceladas", pt: "Canceladas", en: "Cancelled" },
  };
  const kpis = [
    { label: t(L.hoy, locale), value: "12", sub: t(L.hoySub, locale), color: "text-sky-600 dark:text-sky-400", box: "bg-sky-50 dark:bg-sky-500/10" },
    { label: t(L.pac, locale), value: "1.248", sub: t(L.pacSub, locale), color: "text-emerald-600 dark:text-emerald-400", box: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: t(L.citas, locale), value: "312", sub: t(L.citasSub, locale), color: "text-violet-600 dark:text-violet-400", box: "bg-violet-50 dark:bg-violet-500/10" },
    { label: t(L.ing, locale), value: "$ 4.280.000", sub: t(L.ingSub, locale), color: "text-amber-600 dark:text-amber-400", box: "bg-amber-50 dark:bg-amber-500/10" },
  ];
  const today = [
    { time: "09:00", name: "María González", proc: { es: "Limpieza · Dra. Soto", pt: "Limpeza · Dra. Soto", en: "Cleaning · Dr. Soto" }, st: "confirmado" as const },
    { time: "10:00", name: "Juan Pérez", proc: { es: "Ortodoncia · Dr. Rivas", pt: "Ortodontia · Dr. Rivas", en: "Ortho · Dr. Rivas" }, st: "agendado" as const },
    { time: "11:30", name: "Camila Rojas", proc: { es: "Endodoncia · Dra. Soto", pt: "Endodontia · Dra. Soto", en: "Root canal · Dr. Soto" }, st: "realizado" as const },
  ];
  const stPill: Record<string, string> = {
    confirmado: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    agendado: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    realizado: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  };
  const stLabel: Record<string, Dict> = {
    confirmado: { es: "Confirmado", pt: "Confirmado", en: "Confirmed" },
    agendado: { es: "Programado", pt: "Agendado", en: "Booked" },
    realizado: { es: "Realizado", pt: "Realizado", en: "Done" },
  };
  const bars = [
    { label: t(L.rate, locale), val: "94%", w: "94%", c: "bg-sky-500" },
    { label: t(L.done, locale), val: "289", w: "78%", c: "bg-emerald-500" },
    { label: t(L.cancel, locale), val: "18", w: "12%", c: "bg-rose-400" },
  ];

  return (
    <MockupFrame title="SuperClini · Panel">
      <div className="min-w-[320px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
              <div className="flex items-start justify-between">
                <span className="text-[9.5px] font-semibold uppercase tracking-wide text-ink-400">{k.label}</span>
                <span className={`h-5 w-5 rounded-md ${k.box}`} />
              </div>
              <div className={`mt-1 text-lg font-bold tabular-nums ${k.color}`}>{k.value}</div>
              <div className="text-[10px] text-ink-400">{k.sub}</div>
            </div>
          ))}
        </div>
        {/* main grid */}
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-3">
          {/* today list */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 lg:col-span-2 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 text-[11px] font-bold text-ink-800 dark:text-ink-100">{t(L.today, locale)}</div>
            <div className="flex flex-col divide-y divide-ink-100 dark:divide-ink-800">
              {today.map((a) => (
                <div key={a.name} className="flex items-center gap-2 py-2">
                  <span className="w-10 shrink-0 text-[11px] font-bold tabular-nums text-ink-700 dark:text-ink-200">{a.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-semibold text-ink-800 dark:text-ink-100">{a.name}</div>
                    <div className="truncate text-[10px] text-ink-400">{t(a.proc, locale)}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${stPill[a.st]}`}>{t(stLabel[a.st], locale)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* attendance meter */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 text-[11px] font-bold text-ink-800 dark:text-ink-100">{t(L.attend, locale)}</div>
            <div className="flex flex-col gap-2.5">
              {bars.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex justify-between text-[10px] text-ink-500 dark:text-ink-400">
                    <span>{b.label}</span>
                    <span className="font-semibold tabular-nums">{b.val}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800">
                    <div className={`h-full rounded-full ${b.c}`} style={{ width: b.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── COBRO con varios medios (split) ─────────────────── */

function CobroSplitMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Registrar pago", pt: "Registrar pagamento", en: "Record payment" },
    cuota: { es: "Cuota 1", pt: "Parcela 1", en: "Instalment 1" },
    saldo: { es: "Saldo", pt: "Saldo", en: "Balance due" },
    value: { es: "Valor", pt: "Valor", en: "Amount" },
    method: { es: "Método de pago", pt: "Forma de pagamento", en: "Method" },
    add: { es: "+ Agregar método de pago", pt: "+ Adicionar forma de pagamento", en: "+ Add payment method" },
    total: { es: "Total a registrar", pt: "Total a registrar", en: "Total to record" },
    after: { es: "Saldo después del pago", pt: "Saldo após pagamento", en: "Balance after payment" },
    cancel: { es: "Cancelar", pt: "Cancelar", en: "Cancel" },
    confirm: { es: "Confirmar pago", pt: "Confirmar pagamento", en: "Confirm payment" },
    cash: { es: "Efectivo", pt: "Dinheiro", en: "Cash" },
    card: { es: "Tarjeta crédito", pt: "Cartão crédito", en: "Credit card" },
  };
  const rows = [
    { amount: "$ 50.000", method: t(L.cash, locale) },
    { amount: "$ 30.000", method: t(L.card, locale) },
  ];

  return (
    <MockupFrame title="SuperClini · Cobro">
      <div className="mx-auto max-w-md px-4 py-4">
        <div className="mb-3 text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
        {/* cuota / saldo */}
        <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 dark:border-ink-800 dark:bg-ink-950/50">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.cuota, locale)}</div>
            <div className="text-[13px] font-semibold text-ink-800 dark:text-ink-100">$ 80.000</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.saldo, locale)}</div>
            <div className="text-[13px] font-bold text-amber-600 dark:text-amber-300">$ 80.000</div>
          </div>
        </div>
        {/* split rows */}
        <div className="mt-3 flex flex-col gap-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-2 rounded-xl border border-ink-200 p-2 dark:border-ink-700">
              <div>
                <div className="text-[8.5px] uppercase text-ink-400">{t(L.value, locale)}</div>
                <div className="text-[12px] font-semibold tabular-nums text-ink-800 dark:text-ink-100">{r.amount}</div>
              </div>
              <div>
                <div className="text-[8.5px] uppercase text-ink-400">{t(L.method, locale)}</div>
                <div className="flex items-center justify-between rounded-md border border-ink-200 px-2 py-1 text-[11px] text-ink-700 dark:border-ink-700 dark:text-ink-200">
                  {r.method} <span className="text-ink-400">▾</span>
                </div>
              </div>
              <span className="text-ink-300 dark:text-ink-600">🗑</span>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-xl border border-dashed border-ink-300 py-1.5 text-center text-[11px] font-medium text-ink-400 dark:border-ink-700">
          {t(L.add, locale)}
        </div>
        {/* totals */}
        <div className="mt-3 rounded-xl bg-ink-50 px-3 py-2 dark:bg-ink-950/50">
          <div className="flex justify-between py-0.5 text-[12px]">
            <span className="text-ink-600 dark:text-ink-300">{t(L.total, locale)}</span>
            <span className="font-semibold tabular-nums text-ink-800 dark:text-ink-100">$ 80.000</span>
          </div>
          <div className="flex justify-between py-0.5 text-[12px]">
            <span className="text-ink-600 dark:text-ink-300">{t(L.after, locale)}</span>
            <span className="font-bold tabular-nums text-emerald-600 dark:text-emerald-400">$ 0</span>
          </div>
        </div>
        {/* footer */}
        <div className="mt-4 flex justify-end gap-2">
          <span className="rounded-lg border border-ink-200 px-3 py-1.5 text-[12px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">
            {t(L.cancel, locale)}
          </span>
          <span className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[12px] font-semibold text-white">{t(L.confirm, locale)}</span>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────────── SOFÍA · config ───────────────────────────── */

function SofiaConfigMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Agente IA", pt: "Agente IA", en: "AI agent" },
    save: { es: "Guardar", pt: "Guardar", en: "Save" },
    enabled: { es: "Agente activado", pt: "Agente ativado", en: "Agent enabled" },
    enabledSub: {
      es: "Responde automáticamente los mensajes recibidos.",
      pt: "Responde automaticamente as mensagens recebidas.",
      en: "Automatically replies to incoming messages.",
    },
    prompt: { es: "Prompt complementario de la clínica", pt: "Prompt complementar da clínica", en: "Clinic-specific prompt" },
    promptPh: {
      es: "Instrucciones específicas para tu clínica (ej: mencionar promociones, especialidades destacadas…)",
      pt: "Instruções específicas para sua clínica (ex: mencionar promoções, especialidades em destaque…)",
      en: "Clinic-specific instructions (e.g. mention promotions, featured specialties…)",
    },
    takeover: { es: "Control desde recepción (en el chat)", pt: "Controle pela recepção (no chat)", en: "Reception control (in chat)" },
    takeKey: { es: "Palabra para tomar el control", pt: "Palavra para assumir", en: "Keyword to take over" },
    backKey: { es: "Palabra para devolver", pt: "Palavra para devolver", en: "Keyword to hand back" },
  };

  return (
    <MockupFrame title="SuperClini · Agente IA">
      <div className="mx-auto max-w-lg px-4 py-4">
        {/* header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-brand-gradient px-3 py-1.5 text-[11px] font-semibold text-white">{t(L.save, locale)}</span>
        </div>
        {/* enable toggle */}
        <div className="flex items-center justify-between rounded-xl border border-ink-100 px-3 py-2.5 dark:border-ink-800">
          <div className="pr-3">
            <div className="text-[12.5px] font-medium text-ink-800 dark:text-ink-100">{t(L.enabled, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.enabledSub, locale)}</div>
          </div>
          <span className="relative h-5 w-9 shrink-0 rounded-full bg-emerald-500">
            <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
          </span>
        </div>
        {/* prompt */}
        <div className="mt-3">
          <div className="text-[12.5px] font-medium text-ink-700 dark:text-ink-300">{t(L.prompt, locale)}</div>
          <div className="mt-1 min-h-[64px] rounded-lg border border-ink-200 px-2.5 py-2 text-[11px] leading-relaxed text-ink-300 dark:border-ink-700 dark:text-ink-500">
            {t(L.promptPh, locale)}
          </div>
        </div>
        {/* takeover keywords */}
        <div className="mt-3">
          <div className="mb-1.5 text-[12.5px] font-medium text-ink-700 dark:text-ink-300">{t(L.takeover, locale)}</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[10px] text-ink-400">{t(L.takeKey, locale)}</div>
              <div className="mt-1 rounded-lg border border-ink-200 px-2.5 py-1.5 font-mono text-[12px] font-semibold text-ink-700 dark:border-ink-700 dark:text-ink-200">
                #asumir
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-400">{t(L.backKey, locale)}</div>
              <div className="mt-1 rounded-lg border border-ink-200 px-2.5 py-1.5 font-mono text-[12px] font-semibold text-ink-700 dark:border-ink-700 dark:text-ink-200">
                #sofia
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────────── ODONTOGRAMA ──────────────────────────────── */

type ToothCond = "carie" | "restaurado" | "coroa" | "ausente" | null;
const ODONTO_COND: Record<Exclude<ToothCond, null>, { hex: string; whole?: boolean }> = {
  carie: { hex: "#ef4444" },
  restaurado: { hex: "#2563eb" },
  coroa: { hex: "#eab308", whole: true },
  ausente: { hex: "#cbd5e1", whole: true },
};

function Tooth({ fdi, cond }: { fdi: number; cond: ToothCond }) {
  const c = cond ? ODONTO_COND[cond] : null;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border ${
          cond === "ausente" ? "border-dashed border-ink-300 dark:border-ink-600" : "border-ink-300 bg-white dark:border-ink-600 dark:bg-ink-800"
        }`}
      >
        {cond === "ausente" ? (
          <span className="text-[9px] font-bold text-ink-300 dark:text-ink-500">✕</span>
        ) : c?.whole ? (
          <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: c.hex }} />
        ) : c ? (
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.hex }} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-ink-100 dark:bg-ink-700" />
        )}
      </span>
      <span className="text-[7px] tabular-nums text-ink-400">{fdi}</span>
    </div>
  );
}

function OdontoArch({ teeth, marks }: { teeth: number[]; marks: Record<number, ToothCond> }) {
  return (
    <div className="flex justify-center gap-0.5">
      {teeth.map((fdi, i) => (
        <React.Fragment key={fdi}>
          {i === 8 && <span className="mx-0.5 w-px self-stretch bg-ink-200 dark:bg-ink-700" />}
          <Tooth fdi={fdi} cond={marks[fdi] ?? null} />
        </React.Fragment>
      ))}
    </div>
  );
}

function OdontogramaMock({ locale }: { locale: Locale }) {
  const L = {
    active: { es: "Condición activa:", pt: "Condição ativa:", en: "Active condition:" },
    superior: { es: "Superior", pt: "Superior", en: "Upper" },
    inferior: { es: "Inferior", pt: "Inferior", en: "Lower" },
    sano: { es: "Sano", pt: "Saudável", en: "Healthy" },
    carie: { es: "Caries", pt: "Cárie", en: "Caries" },
    rest: { es: "Restaurado", pt: "Restaurado", en: "Restored" },
    coroa: { es: "Corona", pt: "Coroa", en: "Crown" },
    ausente: { es: "Ausente", pt: "Ausente", en: "Missing" },
  };
  const upper = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lower = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const marks: Record<number, ToothCond> = { 16: "carie", 11: "coroa", 26: "ausente", 46: "restaurado" };
  const legend = [
    { c: "#94a3b8", label: t(L.sano, locale) },
    { c: "#ef4444", label: t(L.carie, locale) },
    { c: "#2563eb", label: t(L.rest, locale) },
    { c: "#eab308", label: t(L.coroa, locale) },
    { c: "#cbd5e1", label: t(L.ausente, locale) },
  ];
  return (
    <MockupFrame title="SuperClini · Odontograma">
      <div className="min-w-[340px] px-3 py-3">
        {/* toolbar */}
        <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-ink-100 px-2.5 py-2 dark:border-ink-800">
          <span className="mr-1 text-[10.5px] font-semibold text-ink-500 dark:text-ink-400">{t(L.active, locale)}</span>
          {[
            { c: "#ef4444", label: t(L.carie, locale), on: true },
            { c: "#2563eb", label: t(L.rest, locale), on: false },
            { c: "#eab308", label: t(L.coroa, locale), on: false },
            { c: "#cbd5e1", label: t(L.ausente, locale), on: false },
          ].map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                p.on ? "bg-ink-800 text-white dark:bg-ink-100 dark:text-ink-900" : "border border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-300"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.c }} />
              {p.label}
            </span>
          ))}
        </div>
        {/* arches */}
        <div className="text-center text-[8px] font-semibold uppercase tracking-widest text-ink-300">{t(L.superior, locale)}</div>
        <div className="mt-1 overflow-x-auto">
          <OdontoArch teeth={upper} marks={marks} />
        </div>
        <div className="my-2 border-t border-dashed border-ink-200 dark:border-ink-700" />
        <div className="overflow-x-auto">
          <OdontoArch teeth={lower} marks={marks} />
        </div>
        <div className="mt-1 text-center text-[8px] font-semibold uppercase tracking-widest text-ink-300">{t(L.inferior, locale)}</div>
        {/* legend */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 border-t border-ink-100 pt-2.5 dark:border-ink-800">
          {legend.map((l) => (
            <span key={l.label} className="inline-flex items-center gap-1 text-[10px] text-ink-500 dark:text-ink-400">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.c }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── SOFÍA · conectar (QR) ────────────────────────── */

function QrGlyph() {
  // QR decorativo determinístico (não é um código real).
  const finder = (x: number, y: number) => (
    <>
      <rect x={x} y={y} width="20" height="20" rx="3" fill="#0f172a" />
      <rect x={x + 4} y={y + 4} width="12" height="12" rx="2" fill="#fff" />
      <rect x={x + 7} y={y + 7} width="6" height="6" rx="1" fill="#0f172a" />
    </>
  );
  const mods = [
    [30, 4], [38, 4], [30, 12], [46, 30], [54, 30], [30, 38], [38, 46], [50, 46],
    [30, 54], [46, 54], [54, 54], [38, 30], [62, 38], [62, 54], [30, 62], [46, 62], [62, 62], [54, 62], [38, 62],
  ];
  return (
    <svg viewBox="0 0 74 74" width="150" height="150" role="img" aria-label="QR">
      <rect width="74" height="74" fill="#fff" />
      {finder(4, 4)}
      {finder(50, 4)}
      {finder(4, 50)}
      {mods.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#0f172a" />
      ))}
    </svg>
  );
}

function SofiaQrMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Vincular teléfono", pt: "Vincular telefone", en: "Link your phone" },
    expires: { es: "Caduca en 82s", pt: "Expira em 82s", en: "Expires in 82s" },
    connecting: { es: "Conectando…", pt: "Conectando…", en: "Connecting…" },
    s1: { es: "Abre WhatsApp en tu teléfono", pt: "Abra o WhatsApp no seu telefone", en: "Open WhatsApp on your phone" },
    s2: {
      es: "Menú (⋮) → Dispositivos vinculados → Vincular un dispositivo",
      pt: "Menu (⋮) → Aparelhos conectados → Conectar um aparelho",
      en: "Menu (⋮) → Linked devices → Link a device",
    },
    s3: { es: "Apunta la cámara hacia este código QR", pt: "Aponte a câmera para este QR code", en: "Point the camera at this QR code" },
  };
  const steps = [t(L.s1, locale), t(L.s2, locale), t(L.s3, locale)];

  return (
    <MockupFrame title="SuperClini · WhatsApp">
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            {t(L.expires, locale)}
          </span>
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="mx-auto shrink-0 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-700 sm:mx-0">
            <QrGlyph />
          </div>
          <ol className="flex flex-1 flex-col gap-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-ink-700 dark:text-ink-300">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-100 text-[10px] font-bold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── PLAN DE TRATAMIENTO ──────────────────────────── */

function PlanTratamientoMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Rehabilitación oral", pt: "Reabilitação oral", en: "Full-mouth rehab" },
    accepted: { es: "Aceptado", pt: "Aceito", en: "Accepted" },
    sub: { es: "Juan Pérez · 06/07/2026 · Dra. Silva", pt: "Juan Pérez · 06/07/2026 · Dra. Silva", en: "Juan Pérez · 07/06/2026 · Dr. Silva" },
    progress: { es: "1/4 concluidos (25%)", pt: "1/4 concluídos (25%)", en: "1/4 done (25%)" },
    tProc: { es: "Procedimientos", pt: "Procedimentos", en: "Procedures" },
    tSes: { es: "Sesiones", pt: "Sessões", en: "Sessions" },
    tFin: { es: "Financiero", pt: "Financeiro", en: "Financial" },
    done: { es: "Realizado", pt: "Realizado", en: "Done" },
    evo: { es: "Evolucionar", pt: "Evolucionar", en: "Log visit" },
    cont: { es: "Continuar", pt: "Continuar", en: "Continue" },
    subtotal: { es: "Subtotal", pt: "Subtotal", en: "Subtotal" },
    disc: { es: "Descuento (10%)", pt: "Desconto (10%)", en: "Discount (10%)" },
    total: { es: "Total", pt: "Total", en: "Total" },
  };
  const teeth = { es: "Dientes:", pt: "Dentes:", en: "Teeth:" };
  const items = [
    { name: { es: "Limpieza dental", pt: "Limpeza dental", en: "Cleaning" }, meta: "", price: "$ 50.000", action: "done" },
    { name: { es: "Restauración", pt: "Restauração", en: "Filling" }, meta: `${t(teeth, locale)} 16 · Faces: OD`, price: "$ 80.000", action: "evo" },
    { name: { es: "Corona", pt: "Coroa", en: "Crown" }, meta: `${t(teeth, locale)} 26`, price: "$ 250.000", action: "evo" },
    { name: { es: "Implante", pt: "Implante", en: "Implant" }, meta: `${t(teeth, locale)} 46`, price: "$ 600.000", action: "cont" },
  ];

  return (
    <MockupFrame title="SuperClini · Plan">
      <div className="min-w-[320px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        {/* header */}
        <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {t(L.accepted, locale)}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-ink-400">{t(L.sub, locale)}</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-ink-100 dark:bg-ink-800">
              <div className="h-full w-1/4 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] text-ink-400">{t(L.progress, locale)}</span>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-3">
          {/* items */}
          <div className="rounded-2xl border border-ink-100 bg-white lg:col-span-2 dark:border-ink-800 dark:bg-ink-900">
            <div className="flex gap-3 border-b border-ink-100 px-3 pt-2 text-[11px] font-semibold dark:border-ink-800">
              <span className="border-b-2 border-sky-500 pb-1.5 text-sky-700 dark:text-sky-400">{t(L.tProc, locale)}</span>
              <span className="pb-1.5 text-ink-400">{t(L.tSes, locale)}</span>
              <span className="pb-1.5 text-ink-400">{t(L.tFin, locale)}</span>
            </div>
            <div className="divide-y divide-ink-50 dark:divide-ink-800/60">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium text-ink-800 dark:text-ink-100">{t(it.name, locale)}</div>
                    {it.meta && <div className="text-[10px] text-ink-400">{it.meta}</div>}
                  </div>
                  <span className="shrink-0 text-[12px] font-medium tabular-nums text-ink-700 dark:text-ink-200">{it.price}</span>
                  {it.action === "done" ? (
                    <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                      ✓ {t(L.done, locale)}
                    </span>
                  ) : it.action === "cont" ? (
                    <span className="shrink-0 rounded-md border border-amber-300 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-600 dark:border-amber-500/50 dark:text-amber-300">
                      {t(L.cont, locale)}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9.5px] font-semibold text-white">{t(L.evo, locale)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* summary */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="flex justify-between py-0.5 text-[12px] text-ink-600 dark:text-ink-300">
              <span>{t(L.subtotal, locale)}</span>
              <span className="tabular-nums">$ 980.000</span>
            </div>
            <div className="flex justify-between py-0.5 text-[11px] text-ink-400">
              <span>{t(L.disc, locale)}</span>
              <span className="tabular-nums">− $ 98.000</span>
            </div>
            <div className="my-1.5 border-t border-ink-100 dark:border-ink-800" />
            <div className="flex justify-between text-[13px] font-bold">
              <span className="text-ink-900 dark:text-white">{t(L.total, locale)}</span>
              <span className="tabular-nums text-brand-600 dark:text-brand-400">$ 882.000</span>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── FICHA · evolución clínica ──────────────────────── */

function FichaEvolucionMock({ locale }: { locale: Locale }) {
  const L = {
    age: { es: "34 años", pt: "34 anos", en: "34 y.o." },
    tabClin: { es: "Clínico", pt: "Clínico", en: "Clinical" },
    tabEvo: { es: "Evolución", pt: "Evolução", en: "Evolutions" },
    tabPlan: { es: "Planes", pt: "Planos", en: "Plans" },
    tabDoc: { es: "Documentos", pt: "Documentos", en: "Documents" },
    prestacion: { es: "Prestación 100%", pt: "Prestação 100%", en: "Procedure 100%" },
    control: { es: "Control / seguimiento", pt: "Controle / acompanhamento", en: "Follow-up" },
    e1: {
      es: "Restauración pieza 16, cara oclusal. Anestesia local, aislamiento y resina compuesta. Sin complicaciones.",
      pt: "Restauração dente 16, face oclusal. Anestesia local, isolamento e resina composta. Sem intercorrências.",
      en: "Filling tooth 16, occlusal surface. Local anesthesia, isolation and composite resin. No complications.",
    },
    e2: {
      es: "Control de ortodoncia. Ajuste de arco y revisión de higiene. Próximo control en 4 semanas.",
      pt: "Controle de ortodontia. Ajuste de arco e revisão de higiene. Próximo controle em 4 semanas.",
      en: "Ortho check-up. Archwire adjustment and hygiene review. Next visit in 4 weeks.",
    },
    add: { es: "+ Registrar atención", pt: "+ Registrar atendimento", en: "+ Log a visit" },
    ph: { es: "Describe la atención realizada…", pt: "Descreva o atendimento realizado…", en: "Describe the care provided…" },
  };
  const entries = [
    { who: "Dra. Soto", when: "06 jul 2026, 15:20", badge: t(L.prestacion, locale), badgeCls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", dot: "bg-emerald-500", text: t(L.e1, locale) },
    { who: "Dr. Rivas", when: "28 jun 2026, 10:05", badge: t(L.control, locale), badgeCls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300", dot: "bg-sky-500", text: t(L.e2, locale) },
  ];

  return (
    <MockupFrame title="SuperClini · Historia clínica">
      <div className="min-w-[320px]">
        {/* patient header */}
        <div className="flex items-center gap-2.5 border-b border-ink-100 px-4 py-3 dark:border-ink-800">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-[12px] font-bold text-white">JP</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-semibold text-ink-900 dark:text-white">Juan Pérez</span>
              <span className="rounded-full bg-ink-100 px-1.5 py-px text-[9px] text-ink-500 dark:bg-ink-800 dark:text-ink-300">{t(L.age, locale)}</span>
            </div>
            <div className="text-[10px] text-ink-400">RUT: 12.345.678-9</div>
          </div>
        </div>
        {/* tabs */}
        <div className="flex gap-3 border-b border-ink-100 px-4 pt-2 text-[11px] font-semibold dark:border-ink-800">
          <span className="pb-1.5 text-ink-400">{t(L.tabClin, locale)}</span>
          <span className="border-b-2 border-sky-500 pb-1.5 text-sky-700 dark:text-sky-400">{t(L.tabEvo, locale)}</span>
          <span className="pb-1.5 text-ink-400">{t(L.tabPlan, locale)}</span>
          <span className="pb-1.5 text-ink-400">{t(L.tabDoc, locale)}</span>
        </div>
        {/* timeline */}
        <div className="px-4 py-3">
          <div className="mb-2 rounded-lg border border-dashed border-ink-200 px-2.5 py-1.5 text-[11px] font-medium text-sky-600 dark:border-ink-700 dark:text-sky-400">
            {t(L.add, locale)}
          </div>
          <div className="flex flex-col gap-3">
            {entries.map((e, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="flex flex-col items-center pt-1">
                  <span className={`h-2 w-2 rounded-full ${e.dot}`} />
                  {i < entries.length - 1 && <span className="mt-1 w-px flex-1 bg-ink-200 dark:bg-ink-700" />}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11.5px] font-semibold text-ink-700 dark:text-ink-200">{e.who}</span>
                    <span className="text-[10px] text-ink-400">· {e.when}</span>
                    <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold ${e.badgeCls}`}>{e.badge}</span>
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-ink-600 dark:text-ink-300">{e.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── RADIOGRAFÍA · informe IA ─────────────────────── */

function RadiografiaIaMock({ locale }: { locale: Locale }) {
  const L = {
    findings: { es: "Hallazgos", pt: "Achados", en: "Findings" },
    f1: { es: "Caries interproximal · pieza 36", pt: "Cárie interproximal · dente 36", en: "Interproximal caries · tooth 36" },
    f2: { es: "Lesión periapical · pieza 24", pt: "Lesão periapical · dente 24", en: "Periapical lesion · tooth 24" },
    f3: { es: "Pérdida ósea horizontal leve", pt: "Perda óssea horizontal leve", en: "Mild horizontal bone loss" },
    moderate: { es: "Moderada", pt: "Moderada", en: "Moderate" },
    severe: { es: "Severa", pt: "Severa", en: "Severe" },
    mild: { es: "Leve", pt: "Leve", en: "Mild" },
    disclaimer: {
      es: "Análisis de apoyo generado por IA (Gemini). No constituye un diagnóstico; debe ser validado por el profesional.",
      pt: "Análise de apoio gerada por IA (Gemini). Não constitui diagnóstico; deve ser validada pelo profissional.",
      en: "AI-generated support analysis (Gemini). Not a diagnosis; must be validated by the professional.",
    },
  };
  const rows = [
    { text: t(L.f1, locale), sev: t(L.moderate, locale), cls: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
    { text: t(L.f2, locale), sev: t(L.severe, locale), cls: "bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300" },
    { text: t(L.f3, locale), sev: t(L.mild, locale), cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  ];

  return (
    <MockupFrame title="SuperClini · Radiografía IA">
      <div className="grid min-w-[320px] gap-3 p-3 sm:grid-cols-2">
        {/* X-ray */}
        <div className="overflow-hidden rounded-xl bg-slate-900">
          <svg viewBox="0 0 220 150" width="100%" role="img" aria-label="Radiografía panorámica">
            <rect width="220" height="150" fill="#0f172a" />
            <path d="M20 55 Q110 130 200 55" fill="none" stroke="#475569" strokeWidth="2" />
            {Array.from({ length: 14 }).map((_, i) => {
              const x = 24 + i * 13.5;
              const y = 55 + Math.sin((i / 13) * Math.PI) * 62;
              return <rect key={i} x={x} y={y - 8} width="10" height="16" rx="2" fill="#cbd5e1" opacity={0.85} />;
            })}
            {/* highlighted finding */}
            <circle cx="150" cy="112" r="11" fill="none" stroke="#fb7185" strokeWidth="2" />
            <circle cx="70" cy="112" r="9" fill="none" stroke="#fbbf24" strokeWidth="2" />
          </svg>
        </div>
        {/* findings */}
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
              ✦ IA
            </span>
            <span className="font-mono text-[9px] text-ink-400">gemini-2.5-flash</span>
          </div>
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-400">{t(L.findings, locale)}</div>
          <div className="flex flex-col gap-1.5">
            {rows.map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-ink-100 px-2 py-1.5 dark:border-ink-800">
                <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-700 dark:text-ink-200">{r.text}</span>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${r.cls}`}>{r.sev}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[9.5px] italic leading-snug text-ink-400">{t(L.disclaimer, locale)}</p>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── CASO IA · simulación sonrisa ───────────────────── */

function Teeth({ shade, even }: { shade: string; even: boolean }) {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => {
        const w = 15;
        const x = 12 + i * 17;
        const jitter = even ? 0 : (i % 2 === 0 ? 3 : -2);
        const gap = !even && i === 3 ? 4 : 0;
        return <rect key={i} x={x + gap} y={22 + jitter} width={w} height={30 - jitter} rx="4" fill={shade} stroke="#e2e8f0" strokeWidth="0.5" />;
      })}
    </>
  );
}

function CasoIaMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Simulación de la sonrisa", pt: "Simulação do sorriso", en: "Smile simulation" },
    status: { es: "Plan generado", pt: "Plano gerado", en: "Plan ready" },
    before: { es: "ANTES", pt: "ANTES", en: "BEFORE" },
    after: { es: "DESPUÉS", pt: "DEPOIS", en: "AFTER" },
    score: { es: "Puntuación estética", pt: "Pontuação estética", en: "Aesthetic score" },
    potential: { es: "Potencial alto", pt: "Potencial alto", en: "High potential" },
    color: { es: "Coloración", pt: "Coloração", en: "Color" },
    colorV: { es: "→ Blanqueamiento", pt: "→ Clareamento", en: "→ Whitening" },
    align: { es: "Alineación", pt: "Alinhamento", en: "Alignment" },
    alignV: { es: "→ Ortodoncia", pt: "→ Ortodontia", en: "→ Orthodontics" },
    treat: { es: "Tratamientos", pt: "Tratamentos", en: "Treatments" },
    treatV: { es: "2 prioritarios", pt: "2 prioritários", en: "2 priority" },
  };
  const tiles = [
    { k: t(L.color, locale), v: t(L.colorV, locale) },
    { k: t(L.align, locale), v: t(L.alignV, locale) },
    { k: t(L.treat, locale), v: t(L.treatV, locale) },
  ];

  return (
    <MockupFrame title="SuperClini · Caso IA">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            {t(L.status, locale)}
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          {/* before/after compare */}
          <div className="relative overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700">
            <svg viewBox="0 0 130 74" width="100%" role="img" aria-label="Antes y después">
              <rect width="130" height="74" fill="#fce7d6" />
              <rect x="65" width="65" height="74" fill="#fdeee2" />
              <g>
                <Teeth shade="#e9e0bf" even={false} />
              </g>
              <clipPath id="afterclip">
                <rect x="65" width="65" height="74" />
              </clipPath>
              <g clipPath="url(#afterclip)">
                <Teeth shade="#ffffff" even />
              </g>
              <line x1="65" y1="0" x2="65" y2="74" stroke="#fff" strokeWidth="2" />
              <circle cx="65" cy="37" r="7" fill="#fff" stroke="#0ea5e9" strokeWidth="1.5" />
              <path d="M62 34l-2 3 2 3M68 34l2 3-2 3" stroke="#0ea5e9" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
            <span className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[8.5px] font-bold text-white">{t(L.before, locale)}</span>
            <span className="absolute right-1.5 top-1.5 rounded-full bg-sky-500 px-1.5 py-0.5 text-[8.5px] font-bold text-white">{t(L.after, locale)}</span>
          </div>
          {/* aesthetic score */}
          <div className="flex flex-row items-center gap-3 rounded-xl border border-ink-100 px-3 py-2 dark:border-ink-800 sm:flex-col sm:justify-center">
            <div className="relative grid h-16 w-16 place-items-center">
              <svg viewBox="0 0 40 40" className="h-16 w-16 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" className="text-ink-100 dark:text-ink-800" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="100.5" strokeDashoffset="18" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[13px] font-extrabold text-ink-800 dark:text-ink-100">82</span>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-ink-400">{t(L.score, locale)}</div>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{t(L.potential, locale)}</div>
            </div>
          </div>
        </div>
        {/* info tiles */}
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {tiles.map((tl) => (
            <div key={tl.k} className="rounded-xl border border-ink-100 px-2 py-1.5 dark:border-ink-800">
              <div className="text-[9.5px] text-ink-400">{tl.k}</div>
              <div className="text-[11px] font-semibold text-ink-700 dark:text-ink-200">{tl.v}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ────────────────────────────── LIQUIDACIÓN ─────────────────────────────── */

function LiquidacionMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Detalle de la liquidación", pt: "Detalhe da liquidação", en: "Payout detail" },
    banner: { es: "Dra. López · Comisión 40% · 4 procedimientos", pt: "Dra. López · Comissão 40% · 4 procedimentos", en: "Dr. López · 40% commission · 4 procedures" },
    cDate: { es: "Fecha", pt: "Data", en: "Date" },
    cPac: { es: "Paciente", pt: "Paciente", en: "Patient" },
    cProc: { es: "Procedimiento", pt: "Procedimento", en: "Procedure" },
    cVal: { es: "Valor", pt: "Valor", en: "Value" },
    cCom: { es: "Comisión", pt: "Comissão", en: "Commission" },
    totalProd: { es: "Total producción", pt: "Total produção", en: "Total production" },
    pay: { es: "Líquido a pagar", pt: "Líquido a pagar", en: "Net to pay" },
  };
  const rows = [
    { d: "03/07", p: "Juan Pérez", proc: { es: "Limpieza dental", pt: "Limpeza dental", en: "Cleaning" }, v: "$ 50.000", c: "$ 20.000" },
    { d: "10/07", p: "Ana Gómez", proc: { es: "Endodoncia molar", pt: "Endodontia molar", en: "Molar root canal" }, v: "$ 180.000", c: "$ 72.000" },
    { d: "18/07", p: "Luis Rojas", proc: { es: "Corona porcelana", pt: "Coroa porcelana", en: "Porcelain crown" }, v: "$ 250.000", c: "$ 100.000" },
    { d: "25/07", p: "Sofía Díaz", proc: { es: "Extracción simple", pt: "Extração simples", en: "Simple extraction" }, v: "$ 40.000", c: "$ 16.000" },
  ];

  return (
    <MockupFrame title="SuperClini · Liquidaciones">
      <div className="min-w-[340px] px-4 py-4">
        <div className="mb-2 text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 dark:bg-sky-950/40">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-500 text-[11px] font-bold text-white">ML</span>
          <span className="text-[11.5px] font-medium text-sky-800 dark:text-sky-200">{t(L.banner, locale)}</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink-100 dark:border-ink-800">
          <div className="grid grid-cols-[0.6fr_1fr_1.2fr_0.8fr_0.8fr] gap-1 border-b border-ink-100 bg-ink-50 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-ink-400 dark:border-ink-800 dark:bg-ink-950/50">
            <span>{t(L.cDate, locale)}</span>
            <span>{t(L.cPac, locale)}</span>
            <span>{t(L.cProc, locale)}</span>
            <span className="text-right">{t(L.cVal, locale)}</span>
            <span className="text-right">{t(L.cCom, locale)}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[0.6fr_1fr_1.2fr_0.8fr_0.8fr] gap-1 border-b border-ink-50 px-2.5 py-1.5 text-[11px] last:border-0 dark:border-ink-800/60">
              <span className="tabular-nums text-ink-400">{r.d}</span>
              <span className="truncate text-ink-800 dark:text-ink-100">{r.p}</span>
              <span className="truncate text-ink-500 dark:text-ink-400">{t(r.proc, locale)}</span>
              <span className="text-right tabular-nums text-ink-700 dark:text-ink-200">{r.v}</span>
              <span className="text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{r.c}</span>
            </div>
          ))}
          <div className="grid grid-cols-[0.6fr_1fr_1.2fr_0.8fr_0.8fr] gap-1 bg-ink-50 px-2.5 py-1.5 text-[11px] font-bold dark:bg-ink-950/50">
            <span className="col-span-3 uppercase text-ink-500 dark:text-ink-300">{t(L.totalProd, locale)}</span>
            <span className="text-right tabular-nums text-ink-800 dark:text-ink-100">$ 520.000</span>
            <span className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">$ 208.000</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 dark:border-emerald-500/30 dark:bg-emerald-950/40">
          <span className="text-[12px] font-bold text-emerald-800 dark:text-emerald-200">{t(L.pay, locale)}</span>
          <span className="text-[15px] font-extrabold tabular-nums text-emerald-700 dark:text-emerald-300">$ 208.000</span>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────── TOTEM · check-in ───────────────────────────── */

function TotemMock({ locale }: { locale: Locale }) {
  const L = {
    done: { es: "¡Check-in realizado!", pt: "Check-in realizado!", en: "Check-in complete!" },
    confirmed: { es: "María González, tu llegada ha sido confirmada.", pt: "María González, sua chegada foi confirmada.", en: "María González, your arrival is confirmed." },
    queue: { es: "Posición en la fila", pt: "Posição na fila", en: "Queue position" },
    wait: { es: "Aguarda ser llamado. Te avisaremos en pantalla.", pt: "Aguarde ser chamado. Avisaremos na tela.", en: "Please wait to be called. We'll notify you on screen." },
    back: { es: "Volver al inicio", pt: "Voltar ao início", en: "Back to start" },
  };
  return (
    <MockupFrame title="SuperClini · Tótem">
      <div className="bg-gradient-to-b from-sky-50 to-white px-4 py-8 text-center dark:from-ink-950 dark:to-ink-900">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div className="mt-4 font-display text-xl font-extrabold text-ink-800 dark:text-white">{t(L.done, locale)}</div>
        <div className="mt-1 text-[13px] text-ink-500 dark:text-ink-300">{t(L.confirmed, locale)}</div>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-2 dark:bg-sky-950/40">
          <span className="text-[12px] text-ink-500 dark:text-ink-300">{t(L.queue, locale)}:</span>
          <span className="text-lg font-extrabold text-sky-600 dark:text-sky-400">3</span>
        </div>
        <div className="mt-3 text-[11px] text-ink-400">{t(L.wait, locale)}</div>
        <div className="mx-auto mt-5 max-w-[280px] rounded-xl border border-ink-200 py-2.5 text-[13px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">
          {t(L.back, locale)}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────────── CRM inbox ──────────────────────────────── */

function CrmInboxMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Inbox CRM", pt: "Inbox CRM", en: "CRM Inbox" },
    newTask: { es: "✨ Nueva tarea", pt: "✨ Nova tarefa", en: "✨ New task" },
    total: { es: "Total", pt: "Total", en: "Total" },
    pend: { es: "Pendientes", pt: "Pendentes", en: "Pending" },
    sched: { es: "Agendadas", pt: "Agendadas", en: "Scheduled" },
    sent: { es: "Enviadas", pt: "Enviadas", en: "Sent" },
    answ: { es: "Respondidas", pt: "Respondidas", en: "Answered" },
    stPend: { es: "Pendiente", pt: "Pendente", en: "Pending" },
    stSched: { es: "Agendada", pt: "Agendada", en: "Scheduled" },
    stSent: { es: "Enviada", pt: "Enviada", en: "Sent" },
    stAnsw: { es: "Respondida", pt: "Respondida", en: "Answered" },
  };
  const chips = [
    { l: t(L.total, locale), n: "18", c: "text-violet-700 dark:text-violet-300" },
    { l: t(L.pend, locale), n: "5", c: "text-amber-700 dark:text-amber-300" },
    { l: t(L.sched, locale), n: "4", c: "text-sky-700 dark:text-sky-300" },
    { l: t(L.sent, locale), n: "6", c: "text-violet-700 dark:text-violet-300" },
    { l: t(L.answ, locale), n: "3", c: "text-emerald-700 dark:text-emerald-300" },
  ];
  const tasks = [
    { name: "Ana Pérez", ia: true, subj: { es: "Retorno de revisión pendiente", pt: "Retorno de revisão pendente", en: "Pending review follow-up" }, ch: "💬", st: t(L.stPend, locale), stc: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300", bar: "bg-rose-500", time: "hace 10min" },
    { name: "João Silva", ia: false, subj: { es: "Plan de tratamiento por aprobar", pt: "Plano de tratamento a aprovar", en: "Treatment plan to approve" }, ch: "✉️", st: t(L.stSched, locale), stc: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300", bar: "bg-ink-300 dark:bg-ink-600", time: "hace 3h" },
    { name: "María López", ia: true, subj: { es: "Renovación de membresía", pt: "Renovação de membership", en: "Membership renewal" }, ch: "📞", st: t(L.stSent, locale), stc: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300", bar: "bg-ink-200 dark:bg-ink-700", time: "hace 1d" },
    { name: "Carlos Rojas", ia: false, subj: { es: "Cobranza · cuota vencida", pt: "Cobrança · parcela vencida", en: "Collection · overdue" }, ch: "📱", st: t(L.stAnsw, locale), stc: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", bar: "bg-ink-200 dark:bg-ink-700", time: "hace 2d" },
  ];

  return (
    <MockupFrame title="SuperClini · CRM">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-violet-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.newTask, locale)}</span>
        </div>
        <div className="mb-2.5 grid grid-cols-5 gap-1.5">
          {chips.map((ch) => (
            <div key={ch.l} className="rounded-xl bg-ink-50 px-1 py-1.5 text-center dark:bg-ink-950/50">
              <div className={`text-base font-bold ${ch.c}`}>{ch.n}</div>
              <div className="text-[8.5px] text-ink-400">{ch.l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {tasks.map((tk, i) => (
            <div key={i} className="flex gap-2 rounded-2xl border border-ink-100 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
              <span className={`w-1 shrink-0 rounded-full ${tk.bar}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12px] font-semibold text-ink-800 dark:text-ink-100">{tk.name}</span>
                  {tk.ia && <span className="rounded-full bg-violet-100 px-1 py-px text-[8.5px] font-bold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">✨ IA</span>}
                  <span className="ml-auto text-[9px] text-ink-400">{tk.time}</span>
                </div>
                <div className="truncate text-[11px] text-ink-500 dark:text-ink-400">{t(tk.subj, locale)}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[11px]">{tk.ch}</span>
                  <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold ${tk.stc}`}>{tk.st}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────── PLAN Y CUOTAS ──────────────────────────────── */

function PlanCuotasMock({ locale }: { locale: Locale }) {
  const L = {
    plan: { es: "Profesional", pt: "Profissional", en: "Professional" },
    active: { es: "Activa", pt: "Ativa", en: "Active" },
    monthly: { es: "Facturación mensual", pt: "Faturamento mensal", en: "Monthly billing" },
    next: { es: "Próxima facturación", pt: "Próxima cobrança", en: "Next billing" },
    limits: { es: "Límites", pt: "Limites", en: "Limits" },
    upgrade: { es: "Hacer upgrade", pt: "Fazer upgrade", en: "Upgrade" },
    usage: { es: "Uso de IA este mes", pt: "Uso de IA este mês", en: "AI usage this month" },
    sim: { es: "Simulaciones de sonrisa", pt: "Simulações de sorriso", en: "Smile simulations" },
    radio: { es: "Análisis radiográficos", pt: "Análises radiográficas", en: "Radiograph analyses" },
    wa: { es: "Conversaciones Sofía", pt: "Conversas Sofía", en: "Sofía conversations" },
    of: { es: "usados", pt: "usados", en: "used" },
    unlimited: { es: "∞ Ilimitado", pt: "∞ Ilimitado", en: "∞ Unlimited" },
  };
  const quotas = [
    { label: t(L.sim, locale), used: 32, total: 50, w: "64%", c: "bg-emerald-500" },
    { label: t(L.radio, locale), used: 18, total: 20, w: "90%", c: "bg-amber-500" },
    { label: t(L.wa, locale), unlimited: true },
  ];

  return (
    <MockupFrame title="SuperClini · Mi plan">
      <div className="min-w-[320px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        {/* plan card */}
        <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-ink-900 dark:text-white">{t(L.plan, locale)}</span>
                <span className="rounded-full bg-emerald-100 px-1.5 py-px text-[9px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{t(L.active, locale)}</span>
              </div>
            </div>
            <span className="rounded-lg bg-brand-gradient px-2.5 py-1 text-[10.5px] font-semibold text-white">{t(L.upgrade, locale)}</span>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <div>
              <div className="text-[9px] uppercase text-ink-400">{t(L.monthly, locale)}</div>
              <div className="text-[15px] font-bold text-ink-900 dark:text-white">$ 79.900</div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-ink-400">{t(L.next, locale)}</div>
              <div className="text-[12px] font-medium text-ink-700 dark:text-ink-200">01/08/2026</div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-ink-400">{t(L.limits, locale)}</div>
              <div className="text-[11px] font-medium text-ink-700 dark:text-ink-200">5 · 20 GB</div>
            </div>
          </div>
        </div>
        {/* quotas */}
        <div className="mt-2.5 rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
          <div className="mb-2 text-[11px] font-bold text-ink-800 dark:text-ink-100">{t(L.usage, locale)}</div>
          <div className="flex flex-col gap-2.5">
            {quotas.map((q) => (
              <div key={q.label}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="font-medium text-ink-700 dark:text-ink-200">{q.label}</span>
                  <span className="text-[10px] text-ink-400">
                    {q.unlimited ? t(L.unlimited, locale) : `${q.used} / ${q.total} ${t(L.of, locale)}`}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-800">
                  <div className={`h-full rounded-full ${q.unlimited ? "w-full bg-emerald-500" : q.c}`} style={q.unlimited ? undefined : { width: q.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ──────────────────────── ÓRDENES DE LABORATORIO ────────────────────────── */

function OrdenLabMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Laboratorio", pt: "Laboratório", en: "Laboratory" },
    sub: { es: "Órdenes para laboratorio protésico", pt: "Ordens para laboratório protético", en: "Orders for the prosthetics lab" },
    newOrder: { es: "+ Nueva orden", pt: "+ Nova ordem", en: "+ New order" },
    sent: { es: "Enviado", pt: "Enviado", en: "Sent" },
    prod: { es: "En producción", pt: "Em produção", en: "In production" },
    ready: { es: "Listo", pt: "Pronto", en: "Ready" },
    delivered: { es: "Entregado", pt: "Entregue", en: "Delivered" },
    due: { es: "Plazo", pt: "Prazo", en: "Due" },
  };
  const st = {
    sent: { label: t(L.sent, locale), cls: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-500/30" },
    prod: { label: t(L.prod, locale), cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-500/30" },
    ready: { label: t(L.ready, locale), cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-500/30" },
    delivered: { label: t(L.delivered, locale), cls: "bg-ink-100 text-ink-500 border-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:border-ink-700" },
  };
  const orders = [
    { name: "María González", st: st.sent, lab: { es: "Lab Premium · Corona", pt: "Lab Premium · Coroa", en: "Lab Premium · Crown" }, desc: { es: "Corona de porcelana pieza 26", pt: "Coroa de porcelana dente 26", en: "Porcelain crown tooth 26" }, price: "$ 180.000", due: "12/07" },
    { name: "Juan Pérez", st: st.prod, lab: { es: "ProtLab · Prótesis", pt: "ProtLab · Prótese", en: "ProtLab · Prosthesis" }, desc: { es: "Prótesis parcial removible", pt: "Prótese parcial removível", en: "Removable partial denture" }, price: "$ 320.000", due: "15/07" },
    { name: "Ana Silva", st: st.ready, lab: { es: "Cerámica Andes · Carilla", pt: "Cerâmica Andes · Faceta", en: "Andes Ceramic · Veneer" }, desc: { es: "2 carillas anteriores, color A2", pt: "2 facetas anteriores, cor A2", en: "2 front veneers, shade A2" }, price: "$ 240.000", due: "06/07" },
  ];

  return (
    <MockupFrame title="SuperClini · Laboratorio">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.newOrder, locale)}</span>
        </div>
        <div className="flex flex-col gap-2">
          {orders.map((o, i) => (
            <div key={i} className="flex items-start gap-2 rounded-2xl border border-ink-100 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12px] font-semibold text-ink-800 dark:text-ink-100">{o.name}</span>
                  <span className={`shrink-0 rounded-full border px-1.5 py-px text-[9px] font-semibold ${o.st.cls}`}>{o.st.label}</span>
                </div>
                <div className="truncate text-[10.5px] text-ink-500 dark:text-ink-400">{t(o.lab, locale)}</div>
                <div className="truncate text-[10px] text-ink-400">{t(o.desc, locale)}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[12px] font-semibold tabular-nums text-ink-800 dark:text-ink-100">{o.price}</div>
                <div className="text-[9.5px] text-ink-400">{t(L.due, locale)}: {o.due}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── CONFIGURAR TU CLÍNICA ────────────────────────── */

function ConfigClinicaMock({ locale }: { locale: Locale }) {
  const L = {
    tabClin: { es: "Clínica", pt: "Clínica", en: "Clinic" },
    tabAgenda: { es: "Agenda", pt: "Agenda", en: "Schedule" },
    tabNotif: { es: "Notificaciones", pt: "Notificações", en: "Notifications" },
    tabRegion: { es: "Idioma & Región", pt: "Idioma & Região", en: "Language & Region" },
    save: { es: "Guardar", pt: "Guardar", en: "Save" },
    logoTitle: { es: "Logotipo de la clínica", pt: "Logotipo da clínica", en: "Clinic logo" },
    drop: { es: "Arrastra tu logo aquí", pt: "Arraste seu logo aqui", en: "Drag your logo here" },
    dropHint: { es: "PNG, JPG, SVG · máx. 2MB", pt: "PNG, JPG, SVG · máx. 2MB", en: "PNG, JPG, SVG · max 2MB" },
    dataTitle: { es: "Datos de la clínica", pt: "Dados da clínica", en: "Clinic details" },
    name: { es: "Nombre comercial", pt: "Nome comercial", en: "Business name" },
    rut: { es: "RUT de la clínica", pt: "CNPJ da clínica", en: "Clinic tax ID" },
    phone: { es: "Teléfono", pt: "Telefone", en: "Phone" },
    email: { es: "E-mail de contacto", pt: "E-mail de contato", en: "Contact e-mail" },
  };
  const tabs = [
    { l: t(L.tabClin, locale), on: true },
    { l: t(L.tabAgenda, locale), on: false },
    { l: t(L.tabNotif, locale), on: false },
    { l: t(L.tabRegion, locale), on: false },
  ];
  const fields = [
    { label: t(L.name, locale), value: "Clínica Sonrisa" },
    { label: t(L.rut, locale), value: "76.123.456-7" },
    { label: t(L.phone, locale), value: "+56 2 2345 6789" },
    { label: t(L.email, locale), value: "contacto@clinicasonrisa.cl" },
  ];

  return (
    <MockupFrame title="SuperClini · Configuración">
      <div className="min-w-[320px]">
        <div className="flex items-center justify-end border-b border-ink-100 px-3 py-2 dark:border-ink-800">
          <span className="rounded-lg bg-brand-gradient px-3 py-1 text-[11px] font-semibold text-white">✓ {t(L.save, locale)}</span>
        </div>
        <div className="flex">
          {/* tab rail */}
          <div className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-ink-100 p-2 sm:flex dark:border-ink-800">
            {tabs.map((tb) => (
              <span
                key={tb.l}
                className={`rounded-lg px-2 py-1.5 text-[11px] font-medium ${
                  tb.on ? "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" : "text-ink-400"
                }`}
              >
                {tb.l}
              </span>
            ))}
          </div>
          {/* content */}
          <div className="flex-1 space-y-3 p-3">
            {/* logo card */}
            <div className="rounded-xl border border-ink-100 p-3 dark:border-ink-800">
              <div className="mb-2 text-[11px] font-semibold text-ink-800 dark:text-ink-100">{t(L.logoTitle, locale)}</div>
              <div className="flex items-center gap-3">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border-2 border-dashed border-ink-200 bg-ink-50 dark:border-ink-700 dark:bg-ink-950/50">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-[13px] font-bold text-white">S</div>
                </div>
                <div className="flex-1 rounded-xl border-2 border-dashed border-ink-200 py-4 text-center dark:border-ink-700">
                  <div className="text-[11.5px] font-medium text-ink-600 dark:text-ink-300">{t(L.drop, locale)}</div>
                  <div className="text-[9.5px] text-ink-400">{t(L.dropHint, locale)}</div>
                </div>
              </div>
            </div>
            {/* data card */}
            <div className="rounded-xl border border-ink-100 p-3 dark:border-ink-800">
              <div className="mb-2 text-[11px] font-semibold text-ink-800 dark:text-ink-100">{t(L.dataTitle, locale)}</div>
              <div className="grid grid-cols-2 gap-2">
                {fields.map((f) => (
                  <div key={f.label}>
                    <div className="text-[9px] text-ink-400">{f.label}</div>
                    <div className="mt-0.5 truncate rounded-md border border-ink-200 px-2 py-1.5 text-[11px] text-ink-700 dark:border-ink-700 dark:text-ink-200">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ────────────────────────── CONTROL DE STOCK ────────────────────────────── */

function StockMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Inventario", pt: "Estoque", en: "Inventory" },
    sub: { es: "Materiales, medicamentos e instrumentos", pt: "Materiais, medicamentos e instrumentos", en: "Materials, medicines and instruments" },
    below: { es: "Bajo el mínimo", pt: "Abaixo do mínimo", en: "Below minimum" },
    newItem: { es: "+ Nuevo ítem", pt: "+ Novo item", en: "+ New item" },
    alert: { es: "1 ítem por debajo del stock mínimo", pt: "1 item abaixo do estoque mínimo", en: "1 item below minimum stock" },
    cItem: { es: "Ítem", pt: "Item", en: "Item" },
    cCat: { es: "Categoría", pt: "Categoria", en: "Category" },
    cQty: { es: "Cantidad", pt: "Quantidade", en: "Quantity" },
    cMin: { es: "Mínimo", pt: "Mínimo", en: "Minimum" },
    move: { es: "Mover", pt: "Movimentar", en: "Move" },
  };
  const cat = {
    material: { label: { es: "Material", pt: "Material", en: "Material" }, cls: "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" },
    med: { label: { es: "Medicamento", pt: "Medicamento", en: "Medicine" }, cls: "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" },
    instr: { label: { es: "Instrumento", pt: "Instrumento", en: "Instrument" }, cls: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
    epi: { label: { es: "EPP", pt: "EPI", en: "PPE" }, cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  };
  const rows = [
    { name: { es: "Guantes de nitrilo", pt: "Luvas de nitrila", en: "Nitrile gloves" }, cat: cat.material, qty: "12 cx", min: "5 cx", low: false },
    { name: { es: "Anestésico lidocaína", pt: "Anestésico lidocaína", en: "Lidocaine anesthetic" }, cat: cat.med, qty: "2 cx", min: "6 cx", low: true },
    { name: { es: "Fresa diamantada", pt: "Broca diamantada", en: "Diamond bur" }, cat: cat.instr, qty: "20 un", min: "8 un", low: false },
    { name: { es: "Mascarilla N95", pt: "Máscara N95", en: "N95 mask" }, cat: cat.epi, qty: "45 un", min: "20 un", low: false },
  ];

  return (
    <MockupFrame title="SuperClini · Inventario">
      <div className="min-w-[340px] px-3 py-3">
        {/* header */}
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <div className="mr-auto">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10.5px] text-ink-500 dark:text-ink-400">
            <span className="h-3 w-3 rounded border border-ink-300 dark:border-ink-600" /> {t(L.below, locale)}
          </span>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.newItem, locale)}</span>
        </div>
        {/* alert */}
        <div className="mb-2.5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-900/20 dark:text-rose-300">
          <span>⚠</span> {t(L.alert, locale)}
        </div>
        {/* table */}
        <div className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800">
          <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.8fr_auto] gap-2 border-b border-ink-100 bg-ink-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-ink-400 dark:border-ink-800 dark:bg-ink-950/50">
            <span>{t(L.cItem, locale)}</span>
            <span>{t(L.cCat, locale)}</span>
            <span className="text-center">{t(L.cQty, locale)}</span>
            <span className="text-center">{t(L.cMin, locale)}</span>
            <span />
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1.6fr_1fr_0.8fr_0.8fr_auto] items-center gap-2 border-b border-ink-50 px-3 py-2 text-[11.5px] last:border-0 dark:border-ink-800/60 ${
                r.low ? "bg-rose-50/50 dark:bg-rose-900/10" : ""
              }`}
            >
              <span className="font-medium text-ink-800 dark:text-ink-100">{t(r.name, locale)}</span>
              <span>
                <span className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${r.cat.cls}`}>{t(r.cat.label, locale)}</span>
              </span>
              <span className={`text-center font-semibold tabular-nums ${r.low ? "text-rose-600 dark:text-rose-400" : "text-ink-800 dark:text-ink-100"}`}>{r.qty}</span>
              <span className="text-center tabular-nums text-ink-500 dark:text-ink-400">{r.min}</span>
              <span className="text-right text-[10.5px] font-medium text-sky-600 dark:text-sky-400">{t(L.move, locale)}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ────────────────────────── USUARIOS Y ROLES ────────────────────────────── */

function UsuariosRolesMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Profesionales", pt: "Profissionais", en: "Team members" },
    sub: { es: "Dentistas y recepcionistas de la clínica", pt: "Dentistas e recepcionistas da clínica", en: "Dentists and front-desk staff" },
    add: { es: "+ Nuevo profesional", pt: "+ Novo profissional", en: "+ New member" },
    blocked: { es: "Bloqueado", pt: "Bloqueado", en: "Blocked" },
    edit: { es: "Editar", pt: "Editar", en: "Edit" },
    rDent: { es: "Dentista", pt: "Dentista", en: "Dentist" },
    rAdmin: { es: "Administrador", pt: "Administrador", en: "Admin" },
    rSec: { es: "Recepción", pt: "Recepção", en: "Reception" },
    rAsi: { es: "Asistente dental", pt: "Assistente dental", en: "Dental assistant" },
  };
  const users = [
    { ini: "AG", grad: "from-sky-500 to-blue-500", name: "Ana García", role: t(L.rDent, locale), cro: "CRO 45231", email: "ana@clinica.cl", blocked: false },
    { ini: "CM", grad: "from-violet-500 to-purple-500", name: "Carlos Méndez", role: t(L.rAdmin, locale), cro: null, email: "carlos@clinica.cl", blocked: false },
    { ini: "LR", grad: "from-emerald-500 to-teal-500", name: "Lucía Rojas", role: t(L.rSec, locale), cro: null, email: "lucia@clinica.cl", blocked: false },
    { ini: "PS", grad: "from-rose-500 to-pink-500", name: "Pedro Soto", role: t(L.rAsi, locale), cro: null, email: "pedro@clinica.cl", blocked: true },
  ];

  return (
    <MockupFrame title="SuperClini · Administración">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="flex flex-col gap-2">
          {users.map((u) => (
            <div
              key={u.ini}
              className={`flex items-center gap-2.5 rounded-2xl border p-2.5 ${
                u.blocked ? "border-rose-200 bg-rose-50/40 dark:border-rose-500/30 dark:bg-rose-950/20" : "border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900"
              }`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${u.grad} text-[12px] font-bold text-white`}>{u.ini}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[12.5px] font-semibold text-ink-800 dark:text-ink-100">{u.name}</span>
                  <span className="rounded-full bg-ink-100 px-1.5 py-px text-[9px] font-medium text-ink-600 dark:bg-ink-800 dark:text-ink-300">{u.role}</span>
                  {u.cro && <span className="rounded-full border border-sky-200 bg-sky-50 px-1.5 py-px text-[9px] font-medium text-sky-700 dark:border-sky-500/30 dark:bg-sky-900/30 dark:text-sky-300">{u.cro}</span>}
                  {u.blocked && <span className="rounded-full border border-rose-300 bg-rose-100 px-1.5 py-px text-[9px] font-semibold text-rose-700 dark:border-rose-500/40 dark:bg-rose-900/40 dark:text-rose-300">🔒 {t(L.blocked, locale)}</span>}
                </div>
                <div className="truncate text-[10px] text-ink-400">{u.email}</div>
              </div>
              <span className="shrink-0 rounded-lg border border-ink-200 px-2 py-1 text-[10px] font-medium text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.edit, locale)}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── INFORMES DE GESTIÓN ────────────────────────────── */

function InformeGestionMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Informes", pt: "Relatórios", en: "Reports" },
    period: { es: "Últimos 30 días", pt: "Últimos 30 dias", en: "Last 30 days" },
    kPac: { es: "Pacientes activos", pt: "Pacientes ativos", en: "Active patients" },
    kIng: { es: "Ingresos del período", pt: "Faturamento do período", en: "Revenue this period" },
    kAsi: { es: "Tasa de asistencia", pt: "Taxa de comparecimento", en: "Attendance rate" },
    chart: { es: "Ingresos por mes", pt: "Faturamento por mês", en: "Revenue by month" },
    ranking: { es: "Ranking de profesionales", pt: "Ranking de profissionais", en: "Professional ranking" },
    att: { es: "asistencia", pt: "comparecimento", en: "attendance" },
  };
  const kpis = [
    { l: t(L.kPac, locale), v: "1.248", c: "text-sky-700 dark:text-sky-300", bg: "from-sky-50 to-white dark:from-sky-950/40 dark:to-ink-900" },
    { l: t(L.kIng, locale), v: "$ 12,4M", c: "text-amber-700 dark:text-amber-300", bg: "from-amber-50 to-white dark:from-amber-950/40 dark:to-ink-900" },
    { l: t(L.kAsi, locale), v: "94%", c: "text-emerald-700 dark:text-emerald-300", bg: "from-emerald-50 to-white dark:from-emerald-950/40 dark:to-ink-900" },
  ];
  const bars = [
    { m: "Abr", w: "62%", v: "$ 9,1M" },
    { m: "May", w: "78%", v: "$ 11,4M" },
    { m: "Jun", w: "85%", v: "$ 12,4M" },
    { m: "Jul", w: "70%", v: "$ 10,2M" },
  ];
  const rank = [
    { n: 1, name: "Dra. García", att: "96%", c: "#0ea5e9" },
    { n: 2, name: "Dr. Méndez", att: "92%", c: "#10b981" },
    { n: 3, name: "Dra. Rojas", att: "89%", c: "#8b5cf6" },
  ];

  return (
    <MockupFrame title="SuperClini · Informes">
      <div className="min-w-[340px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg border border-ink-200 px-2 py-1 text-[10px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.period, locale)} ▾</span>
        </div>
        {/* KPIs */}
        <div className="mb-2.5 grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <div key={k.l} className={`rounded-2xl bg-gradient-to-br p-2.5 ${k.bg}`}>
              <div className="text-[9px] text-ink-500 dark:text-ink-400">{k.l}</div>
              <div className={`text-base font-bold tabular-nums ${k.c}`}>{k.v}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
          {/* bar chart */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 text-[11px] font-semibold text-ink-700 dark:text-ink-200">{t(L.chart, locale)}</div>
            <div className="flex flex-col gap-1.5">
              {bars.map((b) => (
                <div key={b.m} className="flex items-center gap-2">
                  <span className="w-7 shrink-0 text-[10px] text-ink-500 dark:text-ink-400">{b.m}</span>
                  <div className="h-2 flex-1 rounded-full bg-ink-100 dark:bg-ink-800">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: b.w }} />
                  </div>
                  <span className="w-12 shrink-0 text-right text-[9.5px] font-semibold tabular-nums text-ink-600 dark:text-ink-300">{b.v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* ranking */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 text-[11px] font-semibold text-ink-700 dark:text-ink-200">{t(L.ranking, locale)}</div>
            <div className="flex flex-col gap-1.5">
              {rank.map((r) => (
                <div key={r.n} className="flex items-center gap-2 rounded-xl bg-ink-50 px-2 py-1.5 dark:bg-ink-950/50">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: r.c }}>{r.n}</span>
                  <span className="flex-1 text-[11.5px] font-medium text-ink-800 dark:text-ink-100">{r.name}</span>
                  <span className="text-right">
                    <span className="text-[12px] font-bold text-ink-800 dark:text-ink-100">{r.att}</span>
                    <span className="ml-1 text-[9px] text-ink-400">{t(L.att, locale)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── BUSCAR Y CREAR PACIENTE ────────────────────────── */

function PacienteBuscarMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Pacientes", pt: "Pacientes", en: "Patients" },
    add: { es: "+ Nuevo paciente", pt: "+ Novo paciente", en: "+ New patient" },
    search: { es: "Buscar por nombre, email o teléfono…", pt: "Buscar por nome, email ou telefone…", en: "Search by name, email or phone…" },
    fToday: { es: "Hoy", pt: "Hoje", en: "Today" },
    fLate: { es: "Atrasado", pt: "Atrasado", en: "Overdue" },
    fPlan: { es: "Plan pendiente", pt: "Plano pendente", en: "Plan pending" },
    planGen: { es: "Plan generado", pt: "Plano gerado", en: "Plan ready" },
    analiz: { es: "En análisis", pt: "Em análise", en: "In analysis" },
    noCase: { es: "Sin casos", pt: "Sem casos", en: "No cases" },
    accepted: { es: "Aceptado", pt: "Aceito", en: "Accepted" },
    ago3: { es: "hace 3 días", pt: "há 3 dias", en: "3 days ago" },
    ago1w: { es: "hace 1 sem.", pt: "há 1 sem.", en: "1 wk ago" },
    ago2m: { es: "hace 2 meses", pt: "há 2 meses", en: "2 mo ago" },
    ago1d: { es: "ayer", pt: "ontem", en: "yesterday" },
  };
  const rows = [
    { ini: "MG", grad: "from-sky-500 to-blue-500", name: "María González", badge: { l: t(L.fToday, locale), c: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" }, phone: "+56 9 8765 4321", cases: 2, st: { l: t(L.planGen, locale), c: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" }, when: t(L.ago3, locale) },
    { ini: "JP", grad: "from-violet-500 to-purple-500", name: "Juan Pérez", badge: { l: t(L.fLate, locale), c: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" }, phone: "+56 9 1234 5678", cases: 1, st: { l: t(L.analiz, locale), c: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" }, when: t(L.ago1w, locale) },
    { ini: "CR", grad: "from-emerald-500 to-teal-500", name: "Camila Rojas", badge: null, phone: "+56 9 5555 2020", cases: 0, st: { l: t(L.noCase, locale), c: "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400" }, when: t(L.ago2m, locale) },
    { ini: "LS", grad: "from-amber-500 to-orange-500", name: "Luis Soto", badge: { l: t(L.fPlan, locale), c: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" }, phone: "+56 9 7070 3030", cases: 3, st: { l: t(L.accepted, locale), c: "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400" }, when: t(L.ago1d, locale) },
  ];

  return (
    <MockupFrame title="SuperClini · Pacientes">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        {/* search */}
        <div className="mb-2 flex items-center gap-2 rounded-lg border border-ink-200 px-2.5 py-1.5 dark:border-ink-700">
          <span className="text-ink-400">⌕</span>
          <span className="text-[11px] text-ink-400">{t(L.search, locale)}</span>
        </div>
        {/* filter chips */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9.5px] font-semibold text-white">{t(L.fLate, locale)}</span>
          <span className="rounded-full border border-ink-200 px-2 py-0.5 text-[9.5px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.fToday, locale)}</span>
          <span className="rounded-full border border-ink-200 px-2 py-0.5 text-[9.5px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.fPlan, locale)}</span>
        </div>
        {/* list */}
        <div className="flex flex-col divide-y divide-ink-100 dark:divide-ink-800">
          {rows.map((r) => (
            <div key={r.ini} className="flex items-center gap-2.5 py-2">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${r.grad} text-[12px] font-bold text-white`}>{r.ini}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12.5px] font-semibold text-ink-800 dark:text-ink-100">{r.name}</span>
                  {r.badge && <span className={`shrink-0 rounded-full px-1.5 py-px text-[9px] font-semibold ${r.badge.c}`}>{r.badge.l}</span>}
                </div>
                <div className="truncate text-[10px] text-ink-400">{r.phone}</div>
              </div>
              <div className="hidden shrink-0 text-center sm:block">
                <div className="text-[12px] font-bold text-ink-700 dark:text-ink-200">{r.cases}</div>
                <div className="text-[8px] uppercase text-ink-400">casos</div>
              </div>
              <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${r.st.c}`}>{r.st.l}</span>
              <span className="hidden w-14 shrink-0 text-right text-[9.5px] text-ink-400 sm:block">{r.when}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── TOTEM · teclado por país ───────────────────────── */

function TotemTecladoMock({ locale }: { locale: Locale }) {
  const L = {
    enter: { es: "Ingresa tu RUT", pt: "Digite seu CPF", en: "Enter your ID" },
    hint: { es: "Para confirmar tu llegada", pt: "Para confirmar sua chegada", en: "To confirm your arrival" },
    clear: { es: "Borrar", pt: "Apagar", en: "Clear" },
    confirm: { es: "Confirmar", pt: "Confirmar", en: "Confirm" },
  };
  const value = { es: "12.345.678-9", pt: "123.456.789-0", en: "12.345.678-9" };
  // Chile (RUT) tiene tecla K; los países con documento numérico (CPF, DNI…) no.
  const kKey = locale === "es" ? "K" : "";
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", kKey, "0", "⌫"];

  return (
    <MockupFrame title="SuperClini · Tótem">
      <div className="bg-gradient-to-b from-sky-50 to-white px-4 py-6 text-center dark:from-ink-950 dark:to-ink-900">
        <div className="mx-auto max-w-[280px]">
          <div className="font-display text-lg font-extrabold text-ink-800 dark:text-white">{t(L.enter, locale)}</div>
          <div className="mb-3 text-[11px] text-ink-400">{t(L.hint, locale)}</div>
          <div className="mb-3 rounded-2xl border-2 border-emerald-300 bg-white py-3 text-center text-xl font-bold tracking-widest tabular-nums text-ink-800 dark:border-emerald-500/50 dark:bg-ink-800 dark:text-white">
            {t(value, locale)}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {keys.map((k) => (
              <div
                key={k}
                className={`grid h-11 place-items-center rounded-xl border text-[15px] font-semibold ${
                  k === "K" || k === "⌫"
                    ? "border-ink-200 bg-ink-100 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
                    : "border-ink-200 bg-white text-ink-800 dark:border-ink-700 dark:bg-ink-800 dark:text-white"
                }`}
              >
                {k}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-xl bg-ink-100 py-2.5 text-[12px] font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">{t(L.clear, locale)}</div>
            <div className="flex-[2] rounded-xl bg-sky-500 py-2.5 text-[12px] font-semibold text-white">{t(L.confirm, locale)}</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── RECORDATORIO de cita (WhatsApp) ─────────────────── */

function RecordatorioMock({ locale }: { locale: Locale }) {
  const L = {
    auto: { es: "Enviado automáticamente 24 h antes", pt: "Enviado automaticamente 24 h antes", en: "Sent automatically 24 h before" },
    msg: {
      es: "Hola María 👋 Te recordamos tu cita: jueves 10/07 a las 15:00 con la Dra. Soto. Responde CONFIRMAR o CANCELAR.",
      pt: "Olá María 👋 Lembrete da sua consulta: quinta 10/07 às 15:00 com a Dra. Soto. Responda CONFIRMAR ou CANCELAR.",
      en: "Hi María 👋 Reminder of your appointment: Thu 07/10 at 3:00 PM with Dr. Soto. Reply CONFIRM or CANCEL.",
    },
    reply: { es: "CONFIRMAR", pt: "CONFIRMAR", en: "CONFIRM" },
  };
  return (
    <MockupFrame title="SuperClini · WhatsApp">
      <div className="bg-ink-50/60 px-4 py-5 dark:bg-ink-950/40">
        <div className="mx-auto flex max-w-[420px] flex-col gap-2">
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-lg bg-emerald-100 px-3 py-2 text-[12px] leading-snug text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-50">
              {t(L.msg, locale)}
              <span className="ml-1.5 align-bottom text-[9px] tabular-nums opacity-50">14:00</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="rounded-lg bg-white px-3 py-2 text-[12px] font-semibold text-ink-700 shadow-sm dark:bg-ink-800 dark:text-ink-100">
              {t(L.reply, locale)}
              <span className="ml-1.5 align-bottom text-[9px] tabular-nums opacity-50">14:06</span>
            </div>
          </div>
          <div className="mt-1 text-center text-[10px] text-ink-400">🕐 {t(L.auto, locale)}</div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────── VERIFICACIÓN EN DOS PASOS (2FA) ─────────────────────── */

function DosPasosMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Verificación en dos pasos", pt: "Verificação em duas etapas", en: "Two-step verification" },
    scan: { es: "Escanea el código con tu app de autenticación", pt: "Escaneie o código com seu app de autenticação", en: "Scan the code with your authenticator app" },
    code: { es: "Ingresa el código de 6 dígitos", pt: "Digite o código de 6 dígitos", en: "Enter the 6-digit code" },
    activate: { es: "Activar", pt: "Ativar", en: "Enable" },
  };
  const digits = ["4", "8", "2", "1", "9", "7"];
  return (
    <MockupFrame title="SuperClini · Seguridad">
      <div className="mx-auto max-w-md px-4 py-4 text-center">
        <div className="mb-3 text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
        <div className="mx-auto mb-2 w-fit rounded-xl border border-ink-200 bg-white p-2.5 dark:border-ink-700">
          <QrGlyph />
        </div>
        <div className="mb-3 text-[11px] text-ink-400">{t(L.scan, locale)}</div>
        <div className="mb-2 text-[11px] font-medium text-ink-600 dark:text-ink-300">{t(L.code, locale)}</div>
        <div className="mb-3 flex justify-center gap-1.5">
          {digits.map((d, i) => (
            <span key={i} className="grid h-9 w-8 place-items-center rounded-lg border border-ink-200 text-[15px] font-bold tabular-nums text-ink-800 dark:border-ink-700 dark:text-white">
              {d}
            </span>
          ))}
        </div>
        <div className="mx-auto w-fit rounded-lg bg-brand-gradient px-6 py-1.5 text-[12px] font-semibold text-white">{t(L.activate, locale)}</div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── VISIÓN DE RED (multi-clínica) ─────────────────── */

function RedMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Red", pt: "Rede", en: "Network" },
    sub: { es: "Vista consolidada de tus sucursales", pt: "Visão consolidada das suas unidades", en: "Consolidated view of your branches" },
    current: { es: "Actual", pt: "Atual", en: "Current" },
    today: { es: "Citas hoy", pt: "Consultas hoje", en: "Visits today" },
    income: { es: "Ingresos mes", pt: "Faturamento mês", en: "Revenue month" },
  };
  const branches = [
    { name: { es: "Sucursal Centro", pt: "Unidade Centro", en: "Downtown branch" }, today: "18", income: "$ 4,2M", current: true },
    { name: { es: "Sucursal Norte", pt: "Unidade Norte", en: "North branch" }, today: "11", income: "$ 2,8M", current: false },
    { name: { es: "Sucursal Oriente", pt: "Unidade Leste", en: "East branch" }, today: "9", income: "$ 2,1M", current: false },
  ];
  return (
    <MockupFrame title="SuperClini · Red">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2.5">
          <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
        </div>
        <div className="flex flex-col gap-2">
          {branches.map((b, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-2xl border p-3 ${
                b.current ? "border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-950/40" : "border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900"
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">🏥</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12.5px] font-semibold text-ink-800 dark:text-ink-100">{t(b.name, locale)}</span>
                  {b.current && <span className="rounded-full bg-sky-600 px-1.5 py-px text-[9px] font-semibold text-white">{t(L.current, locale)}</span>}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[11px] text-ink-400">{t(L.today, locale)} <span className="font-bold text-ink-700 dark:text-ink-200">{b.today}</span></div>
                <div className="text-[11px] text-ink-400">{t(L.income, locale)} <span className="font-bold text-emerald-600 dark:text-emerald-400">{b.income}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────── EMPRESAS Y CONVENIOS B2B ────────────────────────────── */

function ConvenioB2bMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Empresas y convenios", pt: "Empresas e convênios", en: "Companies & agreements" },
    add: { es: "+ Nueva empresa", pt: "+ Nova empresa", en: "+ New company" },
    cCompany: { es: "Empresa", pt: "Empresa", en: "Company" },
    cAgree: { es: "Convenio", pt: "Convênio", en: "Agreement" },
    cPac: { es: "Pacientes", pt: "Pacientes", en: "Patients" },
    cBal: { es: "Por cobrar", pt: "A receber", en: "Receivable" },
  };
  const rows = [
    { name: "Constructora Andes", agree: { es: "20% descuento", pt: "20% desconto", en: "20% discount" }, pac: "34", bal: "$ 1,8M" },
    { name: "Colegio San Pablo", agree: { es: "Planilla mensual", pt: "Folha mensal", en: "Monthly payroll" }, pac: "58", bal: "$ 3,2M" },
    { name: "Minera del Sur", agree: { es: "Cobertura 80%", pt: "Cobertura 80%", en: "80% coverage" }, pac: "21", bal: "$ 0" },
  ];
  return (
    <MockupFrame title="SuperClini · Convenios">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800">
          <div className="grid grid-cols-[1.6fr_1.4fr_0.7fr_0.9fr] gap-2 border-b border-ink-100 bg-ink-50 px-3 py-1.5 text-[9px] font-semibold uppercase text-ink-400 dark:border-ink-800 dark:bg-ink-950/50">
            <span>{t(L.cCompany, locale)}</span>
            <span>{t(L.cAgree, locale)}</span>
            <span className="text-center">{t(L.cPac, locale)}</span>
            <span className="text-right">{t(L.cBal, locale)}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1.6fr_1.4fr_0.7fr_0.9fr] items-center gap-2 border-b border-ink-50 px-3 py-2 text-[11.5px] last:border-0 dark:border-ink-800/60">
              <span className="truncate font-medium text-ink-800 dark:text-ink-100">{r.name}</span>
              <span className="truncate text-ink-500 dark:text-ink-400">{t(r.agree, locale)}</span>
              <span className="text-center font-semibold tabular-nums text-ink-700 dark:text-ink-200">{r.pac}</span>
              <span className={`text-right font-semibold tabular-nums ${r.bal === "$ 0" ? "text-ink-400" : "text-amber-600 dark:text-amber-400"}`}>{r.bal}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────────── VISOR DICOM ──────────────────────────────── */

function DicomMock({ locale }: { locale: Locale }) {
  const L = {
    slices: { es: "24 cortes", pt: "24 cortes", en: "24 slices" },
    slice: { es: "Corte", pt: "Corte", en: "Slice" },
    controls: { es: "Scroll: navegar cortes · Clic: herramienta", pt: "Scroll: navegar cortes · Clique: ferramenta", en: "Scroll: navigate slices · Click: tool" },
  };
  const tools = ["W/L", "Pan", "Zoom", "Regla", "HU"];
  const presets = [
    { es: "Estándar", pt: "Padrão", en: "Standard" },
    { es: "Hueso", pt: "Osso", en: "Bone" },
    { es: "Implante", pt: "Implante", en: "Implant" },
  ];

  return (
    <MockupFrame title="SuperClini · DICOM 3D">
      <div className="min-w-[340px] bg-slate-900">
        {/* header */}
        <div className="flex items-center gap-2 border-b border-slate-700 px-3 py-2">
          <span className="text-slate-400">‹</span>
          <span className="rounded-full bg-sky-900 px-1.5 py-px text-[9px] font-bold text-sky-300">CT</span>
          <span className="text-[12px] font-semibold text-white">Tomografía · Juan Pérez</span>
          <span className="ml-auto text-[9.5px] text-slate-500">🎞 {t(L.slices, locale)} · 24.3 MB</span>
        </div>
        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-700 px-3 py-1.5">
          {tools.map((tool, i) => (
            <span key={tool} className={`rounded-lg px-1.5 py-0.5 text-[10px] font-bold ${i === 0 ? "bg-sky-600 text-white" : "bg-slate-700 text-slate-300"}`}>{tool}</span>
          ))}
          <span className="mx-1 h-4 w-px bg-slate-700" />
          {presets.map((p, i) => (
            <span key={i} className={`rounded-lg px-1.5 py-0.5 text-[10px] font-medium ${i === 0 ? "bg-sky-600 text-white" : "bg-slate-700 text-slate-300"}`}>{t(p, locale)}</span>
          ))}
        </div>
        {/* body */}
        <div className="flex">
          {/* canvas */}
          <div className="relative flex-1 bg-black" style={{ minHeight: 190 }}>
            <svg viewBox="0 0 260 190" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="dcm-skull" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#64748b" stopOpacity="0.6" />
                  <stop offset="80%" stopColor="#1e293b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="260" height="190" fill="#000" />
              <ellipse cx="130" cy="92" rx="78" ry="70" fill="url(#dcm-skull)" />
              <path d="M92 118 Q130 150 168 118" fill="none" stroke="#cbd5e1" strokeWidth="2" opacity="0.6" />
              {Array.from({ length: 10 }).map((_, i) => (
                <rect key={i} x={96 + i * 14} y={112 + Math.sin((i / 9) * Math.PI) * 18} width="8" height="12" rx="2" fill="#e2e8f0" opacity="0.75" />
              ))}
            </svg>
            <span className="absolute bottom-1.5 left-2 text-[9px] tabular-nums text-slate-400">{t(L.slice, locale)} 12/24 · 512×512</span>
          </div>
          {/* info panel */}
          <div className="hidden w-32 shrink-0 border-l border-slate-700 p-2 sm:block">
            <div className="text-[9px] text-slate-500">{t(L.slice, locale)}</div>
            <div className="mb-2 text-[11px] font-semibold tabular-nums text-slate-300">12 / 24</div>
            <div className="text-[9px] text-slate-500">Render</div>
            <div className="mb-2 text-[11px] font-bold text-emerald-400">GPU · WebGL</div>
            <div className="text-[8.5px] leading-snug text-slate-500">{t(L.controls, locale)}</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── CATÁLOGO DE PROCEDIMIENTOS ──────────────────────── */

function ProcedimientosMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Tabla de procedimientos", pt: "Tabela de procedimentos", en: "Procedures table" },
    sub: { es: "Arancel de precios y duración", pt: "Tabela de preços e duração", en: "Price and duration list" },
    add: { es: "+ Nuevo", pt: "+ Novo", en: "+ New" },
    cName: { es: "Nombre", pt: "Nome", en: "Name" },
    cCat: { es: "Categoría", pt: "Categoria", en: "Category" },
    cDur: { es: "Duración", pt: "Duração", en: "Duration" },
    cPrice: { es: "Precio", pt: "Preço", en: "Price" },
    active: { es: "Activo", pt: "Ativo", en: "Active" },
    inactive: { es: "Inactivo", pt: "Inativo", en: "Inactive" },
    catalog: { es: "catálogo", pt: "catálogo", en: "catalog" },
    custom: { es: "Personalizado", pt: "Personalizado", en: "Custom" },
    pack: { es: "Paquete", pt: "Pacote", en: "Package" },
  };
  const rows = [
    { code: "DT001", name: { es: "Consulta inicial", pt: "Consulta inicial", en: "Initial visit" }, tag: t(L.catalog, locale), tagC: "bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300", cat: { es: "General", pt: "Geral", en: "General" }, dur: "30 min", price: "$ 120.000", on: true },
    { code: "DT014", name: { es: "Limpieza (profilaxis)", pt: "Limpeza (profilaxia)", en: "Cleaning" }, tag: t(L.catalog, locale), tagC: "bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300", cat: { es: "Prevención", pt: "Prevenção", en: "Prevention" }, dur: "40 min", price: "$ 180.000", on: true },
    { code: "DT032", name: { es: "Endodoncia", pt: "Endodontia", en: "Root canal" }, tag: t(L.catalog, locale), tagC: "bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300", cat: { es: "Endodoncia", pt: "Endodontia", en: "Endodontics" }, dur: "60 min", price: "$ 650.000", on: true },
    { code: ", ", name: { es: "Blanqueamiento LED", pt: "Clareamento LED", en: "LED whitening" }, tag: t(L.custom, locale), tagC: "bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300", cat: { es: "Estética", pt: "Estética", en: "Aesthetics" }, dur: "50 min", price: "$ 900.000", on: false },
    { code: "📦", name: { es: "Plan Ortodoncia 12m", pt: "Plano Ortodontia 12m", en: "Ortho plan 12m" }, tag: t(L.pack, locale), tagC: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300", cat: { es: "Paquete", pt: "Pacote", en: "Package" }, dur: ", ", price: "$ 4.800.000", on: true, pack: true },
  ];

  return (
    <MockupFrame title="SuperClini · Procedimientos">
      <div className="min-w-[360px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800">
          <div className="grid grid-cols-[0.5fr_1.7fr_1fr_0.7fr_0.9fr_0.6fr] gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-1.5 text-[9px] font-semibold uppercase text-ink-400 dark:border-ink-800 dark:bg-ink-950/50">
            <span>Cód.</span>
            <span>{t(L.cName, locale)}</span>
            <span>{t(L.cCat, locale)}</span>
            <span className="text-right">{t(L.cDur, locale)}</span>
            <span className="text-right">{t(L.cPrice, locale)}</span>
            <span className="text-center">St.</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-[0.5fr_1.7fr_1fr_0.7fr_0.9fr_0.6fr] items-center gap-1.5 border-b border-ink-50 px-3 py-2 text-[11px] last:border-0 dark:border-ink-800/60 ${r.pack ? "bg-violet-50/40 dark:bg-violet-900/10" : ""}`}>
              <span className="font-mono text-[9.5px] text-ink-400">{r.code}</span>
              <span className="flex min-w-0 items-center gap-1">
                <span className="truncate font-medium text-ink-800 dark:text-ink-100">{t(r.name, locale)}</span>
                <span className={`shrink-0 rounded-full px-1 py-px text-[8px] font-semibold ${r.tagC}`}>{r.tag}</span>
              </span>
              <span className="truncate text-ink-500 dark:text-ink-400">{t(r.cat, locale)}</span>
              <span className="text-right tabular-nums text-ink-500 dark:text-ink-400">{r.dur}</span>
              <span className="text-right font-semibold tabular-nums text-ink-800 dark:text-ink-100">{r.price}</span>
              <span className="text-center">
                <span className={`rounded-full px-1 py-px text-[8px] font-semibold ${r.on ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400"}`}>
                  {r.on ? t(L.active, locale) : t(L.inactive, locale)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── ASISTENTE DE SOPORTE (Ayuda) ────────────────────── */

function SoporteChatMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Asistente de soporte", pt: "Assistente de suporte", en: "Support assistant" },
    sub: { es: "Dudas, bugs, incidencias y sugerencias", pt: "Dúvidas, bugs, incidências e sugestões", en: "Questions, bugs, incidents and ideas" },
    greet: {
      es: "¡Hola! Soy el asistente de SuperClini. Puedo ayudarte a agendar, registrar pacientes y resolver dudas.",
      pt: "Olá! Sou o assistente do SuperClini. Posso ajudar a agendar, cadastrar pacientes e tirar dúvidas.",
      en: "Hi! I'm the SuperClini assistant. I can help you book, register patients and answer questions.",
    },
    q: { es: "¿Cómo agrego un feriado en la agenda?", pt: "Como adiciono um feriado na agenda?", en: "How do I add a holiday to the schedule?" },
    a: { es: "Ve a Agenda → Bloquear horario y marca el día completo. Aquí:", pt: "Vá em Agenda → Bloquear horário e marque o dia inteiro. Aqui:", en: "Go to Schedule → Block time and mark the whole day. Here:" },
    link: { es: "Ir a la Agenda", pt: "Ir para a Agenda", en: "Go to Schedule" },
    ph: { es: "Escribe tu mensaje…", pt: "Escreva sua mensagem…", en: "Type your message…" },
    footer: { es: "Asistido por IA", pt: "Assistido por IA", en: "AI-assisted" },
  };
  return (
    <MockupFrame title="SuperClini · Ayuda">
      <div className="mx-auto max-w-sm">
        {/* header */}
        <div className="border-b border-ink-100 px-3 py-2 dark:border-ink-800">
          <div className="text-[12.5px] font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <div className="text-[10px] text-ink-400">{t(L.sub, locale)}</div>
        </div>
        {/* messages */}
        <div className="flex flex-col gap-2 bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-ink-100 px-2.5 py-1.5 text-[11.5px] leading-snug text-ink-700 dark:bg-ink-800 dark:text-ink-200">{t(L.greet, locale)}</div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-sky-600 px-2.5 py-1.5 text-[11.5px] text-white">{t(L.q, locale)}</div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-ink-100 px-2.5 py-1.5 text-[11.5px] leading-snug text-ink-700 dark:bg-ink-800 dark:text-ink-200">
              {t(L.a, locale)} <span className="font-semibold text-sky-600 underline dark:text-sky-400">{t(L.link, locale)}</span>
            </div>
          </div>
        </div>
        {/* composer */}
        <div className="flex items-center gap-1.5 border-t border-ink-100 px-2.5 py-2 dark:border-ink-800">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-400 dark:border-ink-700">🖼</span>
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-ink-200 text-ink-400 dark:border-ink-700">🎙</span>
          <span className="flex-1 rounded-lg border border-ink-200 px-2 py-1.5 text-[11px] text-ink-400 dark:border-ink-700">{t(L.ph, locale)}</span>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky-600 text-white">➤</span>
        </div>
        <div className="pb-2 text-center text-[9px] text-ink-400">✨ {t(L.footer, locale)}</div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── DOCUMENTOS CLÍNICOS ─────────────────────────────── */

function DocumentoClinicoMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Documentos emitidos", pt: "Documentos emitidos", en: "Issued documents" },
    emit: { es: "Emitir documento", pt: "Emitir documento", en: "Issue document" },
    emitted: { es: "Emitido", pt: "Emitido", en: "Issued" },
    by: { es: "Emitido por", pt: "Emitido por", en: "Issued by" },
    print: { es: "Imprimir", pt: "Imprimir", en: "Print" },
  };
  const docs = [
    { type: { es: "Receta", pt: "Receita", en: "Prescription" }, tc: "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300", folio: "DOC-2026-0007", title: { es: "Amoxicilina 500 mg · 7 días", pt: "Amoxicilina 500 mg · 7 dias", en: "Amoxicillin 500 mg · 7 days" } },
    { type: { es: "Presupuesto", pt: "Orçamento", en: "Quote" }, tc: "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300", folio: "DOC-2026-0006", title: { es: "Rehabilitación oral", pt: "Reabilitação oral", en: "Full-mouth rehab" } },
    { type: { es: "Certificado", pt: "Atestado", en: "Certificate" }, tc: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", folio: "DOC-2026-0005", title: { es: "Reposo 24 horas", pt: "Repouso 24 horas", en: "24-hour rest" } },
  ];
  return (
    <MockupFrame title="SuperClini · Documentos">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.emit, locale)}</span>
        </div>
        <div className="flex flex-col gap-2">
          {docs.map((d, i) => (
            <div key={i} className="rounded-2xl border border-ink-100 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
              <div className="mb-1 flex items-center gap-1.5">
                <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold ${d.tc}`}>{t(d.type, locale)}</span>
                <span className="rounded-full bg-emerald-50 px-1.5 py-px text-[9px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{t(L.emitted, locale)}</span>
                <span className="ml-auto font-mono text-[9.5px] text-ink-400">{d.folio}</span>
              </div>
              <div className="text-[12px] font-semibold text-ink-800 dark:text-ink-100">{t(d.title, locale)}</div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-[9.5px] text-ink-400">{t(L.by, locale)} Dra. Soto · CRO 45231</span>
                <span className="ml-auto text-[10px] font-medium text-sky-600 dark:text-sky-400">🖨 {t(L.print, locale)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── PROTOCOLO · checklist ───────────────────────────── */

function ProtocoloMock({ locale }: { locale: Locale }) {
  const L = {
    name: { es: "Protocolo · Endodoncia", pt: "Protocolo · Endodontia", en: "Protocol · Root canal" },
    completed: { es: "ítems completados", pt: "itens completados", en: "items completed" },
    finalize: { es: "Finalizar protocolo", pt: "Finalizar protocolo", en: "Finish protocol" },
  };
  const steps = [
    { t: { es: "Anestesia y aislamiento", pt: "Anestesia e isolamento", en: "Anesthesia and isolation" }, done: true },
    { t: { es: "Apertura y conductometría", pt: "Abertura e conductometria", en: "Access and length" }, done: true },
    { t: { es: "Instrumentación", pt: "Instrumentação", en: "Instrumentation" }, done: true },
    { t: { es: "Obturación", pt: "Obturação", en: "Obturation" }, done: false },
    { t: { es: "Control radiográfico", pt: "Controle radiográfico", en: "Radiographic control" }, done: false },
  ];
  return (
    <MockupFrame title="SuperClini · Protocolo">
      <div className="mx-auto max-w-md px-4 py-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <div className="text-[13px] font-bold text-ink-900 dark:text-white">{t(L.name, locale)}</div>
            <div className="text-[10px] text-ink-400">3 / 5 {t(L.completed, locale)}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-violet-600 dark:text-violet-400">60%</div>
            <div className="text-[10px] font-medium text-sky-600 dark:text-sky-400">{t(L.finalize, locale)}</div>
          </div>
        </div>
        <div className="mb-3 h-1.5 rounded-full bg-ink-100 dark:bg-ink-800">
          <div className="h-full rounded-full bg-violet-500" style={{ width: "60%" }} />
        </div>
        <div className="flex flex-col gap-1">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${s.done ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border-2 ${s.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-ink-300 dark:border-ink-600"}`}>
                {s.done && <span className="text-[9px] font-bold">✓</span>}
              </span>
              <span className={`text-[11.5px] ${s.done ? "text-emerald-800 line-through dark:text-emerald-300" : "text-ink-700 dark:text-ink-200"}`}>{t(s.t, locale)}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── SESIÓN DE FOTOS (9 tomas) ───────────────────────── */

function SesionFotosMock({ locale }: { locale: Locale }) {
  const L = {
    count: { es: "6/9 fotos", pt: "6/9 fotos", en: "6/9 photos" },
    newS: { es: "Nueva sesión", pt: "Nova sessão", en: "New session" },
  };
  const slots = [
    { l: { es: "Perfil derecho", pt: "Perfil direito", en: "Right profile" }, filled: true, ia: false },
    { l: { es: "Labios cerrados", pt: "Lábios fechados", en: "Lips closed" }, filled: true, ia: false },
    { l: { es: "Sonrisa", pt: "Sorriso", en: "Smile" }, filled: true, ia: true },
    { l: { es: "Oclusal superior", pt: "Oclusal superior", en: "Upper occlusal" }, filled: true, ia: false },
    { l: { es: "Frontal oclusión", pt: "Frontal oclusão", en: "Frontal occlusion" }, filled: true, ia: false },
    { l: { es: "Oclusal inferior", pt: "Oclusal inferior", en: "Lower occlusal" }, filled: false, ia: false },
    { l: { es: "Lateral derecha", pt: "Lateral direita", en: "Right lateral" }, filled: false, ia: false },
    { l: { es: "Frontal", pt: "Frontal", en: "Frontal" }, filled: true, ia: false },
    { l: { es: "Lateral izquierda", pt: "Lateral esquerda", en: "Left lateral" }, filled: false, ia: false },
  ];
  return (
    <MockupFrame title="SuperClini · Fotos">
      <div className="min-w-[320px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="mr-auto rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">{t(L.count, locale)}</span>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">+ {t(L.newS, locale)}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((s, i) => (
            <div key={i} className={`relative aspect-square overflow-hidden rounded-xl border-2 ${s.filled ? "border-transparent" : "border-dashed border-ink-200 dark:border-ink-700"}`}>
              {s.filled ? (
                <>
                  <div className="h-full w-full bg-gradient-to-br from-rose-200 via-amber-100 to-rose-100 dark:from-rose-900/40 dark:via-amber-900/30 dark:to-rose-950/40" />
                  {s.ia && <span className="absolute left-1 top-1 rounded bg-violet-600/90 px-1 py-px text-[8px] font-bold text-white">✨ IA</span>}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-1.5 py-0.5 text-[8.5px] font-medium text-white">{t(s.l, locale)}</span>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
                  <span className="text-lg text-teal-300">🦷</span>
                  <span className="px-1 text-[8.5px] font-medium text-ink-400">{t(s.l, locale)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── ORTODONCIA / ALINEADORES ───────────────────────── */

function OrtodonciaMock({ locale }: { locale: Locale }) {
  const L = {
    system: { es: "Dra. Soto · Invisalign", pt: "Dra. Soto · Invisalign", en: "Dr. Soto · Invisalign" },
    active: { es: "Activo", pt: "Ativo", en: "Active" },
    aligner: { es: "Alineador 7 de 24", pt: "Alinhador 7 de 24", en: "Aligner 7 of 24" },
    next: { es: "Próxima consulta: 18/07", pt: "Próxima consulta: 18/07", en: "Next visit: 07/18" },
    freq: { es: "cambio cada 14 días", pt: "troca a cada 14 dias", en: "change every 14 days" },
  };
  const total = 14;
  return (
    <MockupFrame title="SuperClini · Ortodoncia">
      <div className="mx-auto max-w-md px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-[12px] font-bold text-violet-600 dark:bg-violet-900/40 dark:text-violet-300">CR</span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-ink-800 dark:text-ink-100">Camila Rojas</div>
            <div className="text-[10px] text-ink-400">{t(L.system, locale)}</div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{t(L.active, locale)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-ink-700 dark:text-ink-200">{t(L.aligner, locale)}</span>
          <span className="text-[13px] font-bold text-sky-600 dark:text-sky-400">29%</span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-ink-100 dark:bg-ink-800">
          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" style={{ width: "29%" }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {Array.from({ length: total }).map((_, i) => {
            const n = i + 1;
            const state = n < 7 ? "past" : n === 7 ? "current" : "future";
            return (
              <span
                key={n}
                className={`grid h-6 w-6 place-items-center rounded-md text-[9px] font-bold ${
                  state === "past"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : state === "current"
                    ? "bg-sky-500 text-white ring-2 ring-sky-200 dark:ring-sky-500/40"
                    : "bg-ink-50 text-ink-400 dark:bg-ink-800"
                }`}
              >
                {n}
              </span>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10.5px]">
          <span className="font-medium text-sky-600 dark:text-sky-400">🗓 {t(L.next, locale)}</span>
          <span className="text-ink-400">· {t(L.freq, locale)}</span>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── MEMBRESÍAS (cobro recurrente) ───────────────────── */

function MembresiasMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Memberships", pt: "Memberships", en: "Memberships" },
    sub: { es: "Cobro recurrente con beneficios", pt: "Cobrança recorrente com benefícios", en: "Recurring billing with perks" },
    add: { es: "+ Nueva suscripción", pt: "+ Nova assinatura", en: "+ New subscription" },
    active: { es: "Activo", pt: "Ativo", en: "Active" },
    suspended: { es: "Suspendido", pt: "Suspenso", en: "Suspended" },
    ok: { es: "Al día", pt: "Em dia", en: "Up to date" },
    due: { es: "Por vencer", pt: "A vencer", en: "Due soon" },
    debt: { es: "En deuda · 12d", pt: "Em débito · 12d", en: "Overdue · 12d" },
    perMonth: { es: "mes", pt: "mês", en: "mo" },
  };
  const rows = [
    { color: "#d4af37", name: "María González", plan: "Gold", dates: "01/03/26 → 01/03/27", value: "$ 25.000", status: { l: t(L.active, locale), c: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" }, health: { l: t(L.ok, locale), d: "bg-emerald-500" } },
    { color: "#9ca3af", name: "Joana Ribeiro", plan: "Silver", dates: "09/01/26 → 09/01/27", value: "$ 15.000", status: { l: t(L.active, locale), c: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" }, health: { l: t(L.due, locale), d: "bg-amber-500" } },
    { color: "#cd7f32", name: "Carlos Méndez", plan: "Bronze", dates: "24/06/25 → 24/06/26", value: "$ 9.000", status: { l: t(L.suspended, locale), c: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" }, health: { l: t(L.debt, locale), d: "bg-rose-500" } },
  ];
  return (
    <MockupFrame title="SuperClini · Memberships">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto">
            <div className="text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
            <div className="text-[10.5px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="flex flex-col gap-2">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-2xl border border-ink-100 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[13px] text-white" style={{ backgroundColor: r.color }}>⭐</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[12.5px] font-semibold text-ink-800 dark:text-ink-100">{r.name}</span>
                  <span className={`shrink-0 rounded-full px-1.5 py-px text-[9px] font-semibold ${r.status.c}`}>{r.status.l}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-ink-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${r.health.d}`} /> {r.plan} · {r.health.l}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[12.5px] font-bold tabular-nums text-ink-800 dark:text-ink-100">{r.value}</div>
                <div className="text-[9px] text-ink-400">/ {t(L.perMonth, locale)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── CRM PLANTILLAS ──────────────────────────────────── */

function CrmPlantillasMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Plantillas", pt: "Templates", en: "Templates" },
    add: { es: "+ Nueva plantilla", pt: "+ Novo template", en: "+ New template" },
    all: { es: "Todos", pt: "Todos", en: "All" },
    global: { es: "Globales", pt: "Globais", en: "Global" },
    clinic: { es: "De la clínica", pt: "Da clínica", en: "Clinic" },
    wa: { es: "WhatsApp", pt: "WhatsApp", en: "WhatsApp" },
    email: { es: "Correo", pt: "E-mail", en: "Email" },
  };
  const cards = [
    { name: { es: "Retorno · Revisión periódica", pt: "Retorno · Revisão periódica", en: "Follow-up · Periodic review" }, scope: { l: t(L.global, locale), c: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" }, lang: "ES", meta: `Retorno · ${t(L.wa, locale)}`, body: "¡Hola {{paciente_primeiro_nome}}! 👋 Vimos que tu última visita fue hace un tiempo…" },
    { name: { es: "Blanqueamiento · Oferta", pt: "Clareamento · Oferta", en: "Whitening · Offer" }, scope: { l: t(L.global, locale), c: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" }, lang: "PT", meta: `Clareamento · ${t(L.wa, locale)}`, body: "Oi {{paciente_primeiro_nome}}! ✨ Temos uma sessão de clareamento disponível…" },
    { name: { es: "Cobranza · Recordatorio", pt: "Inadimplência · Lembrete", en: "Collection · Reminder" }, scope: { l: t(L.clinic, locale), c: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" }, lang: "ES", meta: `Cobranza · ${t(L.email, locale)}`, body: "{{paciente_primeiro_nome}}, tienes una cuota con {{dias_atraso}} días de atraso…" },
  ];
  return (
    <MockupFrame title="SuperClini · CRM">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-violet-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="mb-2.5 flex gap-1.5">
          <span className="rounded-md border border-violet-500 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">{t(L.all, locale)} (30)</span>
          <span className="rounded-md border border-ink-200 px-2 py-0.5 text-[10px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.global, locale)} (30)</span>
          <span className="rounded-md border border-ink-200 px-2 py-0.5 text-[10px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.clinic, locale)} (0)</span>
        </div>
        <div className="flex flex-col gap-2">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl border border-ink-100 bg-white p-2.5 dark:border-ink-800 dark:bg-ink-900">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[12px] font-semibold text-ink-800 dark:text-ink-100">{t(c.name, locale)}</span>
                <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold ${c.scope.c}`}>{c.scope.l}</span>
                <span className="rounded-full bg-ink-100 px-1.5 py-px text-[9px] font-semibold text-ink-500 dark:bg-ink-800 dark:text-ink-300">{c.lang}</span>
              </div>
              <div className="mt-0.5 text-[10px] text-ink-400">{c.meta}</div>
              <div className="mt-1 truncate rounded-md bg-ink-50 px-2 py-1 font-mono text-[10px] text-ink-500 dark:bg-ink-950/50 dark:text-ink-400">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── MI DESEMPEÑO ────────────────────────────────────── */

function MiDesempenoMock({ locale }: { locale: Locale }) {
  const L = {
    closed: { es: "Cerraste", pt: "Você fechou", en: "You closed" },
    closedSub: { es: "de las primeras consultas del período", pt: "das primeiras consultas do período", en: "of first visits this period" },
    vsPrev: { es: "vs. período anterior", pt: "vs. período anterior", en: "vs. previous period" },
    prod: { es: "Producción", pt: "Produção", en: "Production" },
    ticket: { es: "Ticket promedio", pt: "Ticket médio", en: "Avg. ticket" },
    att: { es: "Asistencia", pt: "Comparecimento", en: "Attendance" },
    decision: { es: "Decisión media", pt: "Decisão média", en: "Avg. decision" },
    days: { es: "días", pt: "dias", en: "days" },
  };
  const kpis = [
    { l: t(L.prod, locale), v: "$ 3,2M", c: "text-emerald-700 dark:text-emerald-300", bg: "from-emerald-50 to-emerald-50/40 dark:from-emerald-950/40 dark:to-emerald-950/20" },
    { l: t(L.ticket, locale), v: "$ 210.000", c: "text-sky-700 dark:text-sky-300", bg: "from-sky-50 to-sky-50/40 dark:from-sky-950/40 dark:to-sky-950/20" },
    { l: t(L.att, locale), v: "92%", c: "text-violet-700 dark:text-violet-300", bg: "from-violet-50 to-violet-50/40 dark:from-violet-950/40 dark:to-violet-950/20" },
    { l: t(L.decision, locale), v: `3 ${t(L.days, locale)}`, c: "text-amber-700 dark:text-amber-300", bg: "from-amber-50 to-amber-50/40 dark:from-amber-950/40 dark:to-amber-950/20" },
  ];
  return (
    <MockupFrame title="SuperClini · Mi desempeño">
      <div className="min-w-[320px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        {/* hero */}
        <div className="mb-2.5 flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-4 py-3 text-white">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wide text-emerald-50">{t(L.closed, locale)}</div>
            <div className="text-3xl font-extrabold">78%</div>
            <div className="text-[10px] text-emerald-50">{t(L.closedSub, locale)}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-emerald-100">{t(L.vsPrev, locale)}</div>
            <div className="text-lg font-bold">↑ 6 pp</div>
          </div>
        </div>
        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.l} className={`rounded-2xl border border-ink-100 bg-gradient-to-br p-2.5 dark:border-ink-800 ${k.bg}`}>
              <div className="text-[9.5px] font-medium text-ink-500 dark:text-ink-400">{k.l}</div>
              <div className={`text-base font-bold tabular-nums ${k.c}`}>{k.v}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────── CRM · reportes ─────────────────────────────── */

function CrmReportesMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Reportes del CRM", pt: "Relatórios do CRM", en: "CRM reports" },
    period: { es: "Últimos 30 días", pt: "Últimos 30 dias", en: "Last 30 days" },
    gen: { es: "Generadas", pt: "Geradas", en: "Generated" },
    sent: { es: "Enviadas", pt: "Enviadas", en: "Sent" },
    ans: { es: "Respondidas", pt: "Respondidas", en: "Answered" },
    rate: { es: "Tasa de respuesta", pt: "Taxa de resposta", en: "Response rate" },
    byChannel: { es: "Por canal", pt: "Por canal", en: "By channel" },
  };
  const funnel = [
    { l: t(L.gen, locale), v: "128", w: "100%", c: "bg-violet-500" },
    { l: t(L.sent, locale), v: "96", w: "75%", c: "bg-sky-500" },
    { l: t(L.ans, locale), v: "41", w: "32%", c: "bg-emerald-500" },
  ];
  const channels = [
    { l: "WhatsApp", v: "58%", w: "58%" },
    { l: "Email", v: "34%", w: "34%" },
    { l: "SMS", v: "8%", w: "8%" },
  ];
  return (
    <MockupFrame title="SuperClini · CRM">
      <div className="min-w-[340px] bg-ink-50/50 px-3 py-3 dark:bg-ink-950/40">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg border border-ink-200 px-2 py-1 text-[10px] text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.period, locale)} ▾</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
          {/* funnel */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="flex flex-col gap-2">
              {funnel.map((f) => (
                <div key={f.l}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-ink-600 dark:text-ink-300">{f.l}</span>
                    <span className="font-bold tabular-nums text-ink-800 dark:text-ink-100">{f.v}</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800">
                    <div className={`h-full rounded-full ${f.c}`} style={{ width: f.w }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-emerald-50 px-2.5 py-1.5 dark:bg-emerald-950/40">
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-200">{t(L.rate, locale)}</span>
              <span className="text-[15px] font-extrabold text-emerald-700 dark:text-emerald-300">43%</span>
            </div>
          </div>
          {/* by channel */}
          <div className="rounded-2xl border border-ink-100 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
            <div className="mb-2 text-[11px] font-semibold text-ink-700 dark:text-ink-200">{t(L.byChannel, locale)}</div>
            <div className="flex flex-col gap-2">
              {channels.map((c) => (
                <div key={c.l} className="flex items-center gap-2">
                  <span className="w-16 shrink-0 text-[10.5px] text-ink-500 dark:text-ink-400">{c.l}</span>
                  <div className="h-2 flex-1 rounded-full bg-ink-100 dark:bg-ink-800">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: c.w }} />
                  </div>
                  <span className="w-8 shrink-0 text-right text-[10px] font-semibold tabular-nums text-ink-600 dark:text-ink-300">{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────── CADASTRO DE LABORATORIOS ────────────────────────── */

function CadastroLabsMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Laboratorios", pt: "Laboratórios", en: "Labs" },
    add: { es: "+ Nuevo laboratorio", pt: "+ Novo laboratório", en: "+ New lab" },
    services: { es: "servicios", pt: "serviços", en: "services" },
    service: { es: "Servicio", pt: "Serviço", en: "Service" },
    cost: { es: "Costo lab", pt: "Custo lab", en: "Lab cost" },
    price: { es: "Precio clínica", pt: "Preço clínica", en: "Clinic price" },
    margin: { es: "Margen", pt: "Margem", en: "Margin" },
  };
  const labs = [
    { name: "Lab Dental Premium", n: 8, mail: "contacto@labpremium.cl", open: true },
    { name: "Cerámica Andes", n: 5, mail: "ordenes@ceramicaandes.cl", open: false },
    { name: "ProtLab", n: 6, mail: "info@protlab.cl", open: false },
  ];
  const rows = [
    { s: { es: "Corona porcelana", pt: "Coroa porcelana", en: "Porcelain crown" }, cost: "$ 90.000", price: "$ 180.000", margin: "$ 90.000" },
    { s: { es: "Prótesis removible", pt: "Prótese removível", en: "Removable denture" }, cost: "$ 160.000", price: "$ 320.000", margin: "$ 160.000" },
  ];
  return (
    <MockupFrame title="SuperClini · Laboratorios">
      <div className="min-w-[340px] px-3 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto text-sm font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.add, locale)}</span>
        </div>
        <div className="flex flex-col gap-2">
          {labs.map((lab) => (
            <div key={lab.name} className="rounded-2xl border border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-900">
              <div className="flex items-center gap-2 p-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">🔬</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-semibold text-ink-800 dark:text-ink-100">{lab.name}</div>
                  <div className="truncate text-[10px] text-ink-400">{lab.n} {t(L.services, locale)} · {lab.mail}</div>
                </div>
                <span className="shrink-0 text-ink-300 dark:text-ink-600">{lab.open ? "▾" : "▸"}</span>
              </div>
              {lab.open && (
                <div className="border-t border-ink-100 px-2.5 py-2 dark:border-ink-800">
                  <div className="mb-1 grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr] gap-1 text-[8.5px] font-semibold uppercase text-ink-400">
                    <span>{t(L.service, locale)}</span>
                    <span className="text-right">{t(L.cost, locale)}</span>
                    <span className="text-right">{t(L.price, locale)}</span>
                    <span className="text-right">{t(L.margin, locale)}</span>
                  </div>
                  {rows.map((r, i) => (
                    <div key={i} className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr] gap-1 py-0.5 text-[10.5px]">
                      <span className="truncate text-ink-700 dark:text-ink-200">{t(r.s, locale)}</span>
                      <span className="text-right tabular-nums text-ink-500 dark:text-ink-400">{r.cost}</span>
                      <span className="text-right tabular-nums text-ink-700 dark:text-ink-200">{r.price}</span>
                      <span className="text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{r.margin}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────── FICHA DEL PACIENTE · recorrido (overview) ────────────── */

/** Barra lateral + cabecera de la ficha. Refleja PacienteFichaSidebar + PacienteFichaHeader. */
function FichaOverviewMock({ locale }: { locale: Locale }) {
  const L = {
    age: { es: "34 años", pt: "34 anos", en: "34 y.o." },
    schedule: { es: "Agendar cita", pt: "Agendar consulta", en: "Book appointment" },
    aiSummary: { es: "Resumen con IA", pt: "Resumo com IA", en: "AI summary" },
    iaCases: { es: "Casos IA", pt: "Casos IA", en: "AI cases" },
    clin: { es: "Clínico", pt: "Clínico", en: "Clinical" },
    anam: { es: "Anamnesis", pt: "Anamnese", en: "Anamnesis" },
    prot: { es: "Protocolos", pt: "Protocolos", en: "Protocols" },
    plan: { es: "Planes", pt: "Planos", en: "Plans" },
    evo: { es: "Evolución", pt: "Evolução", en: "Evolutions" },
    doc: { es: "Documentos", pt: "Documentos", en: "Documents" },
    dat: { es: "Datos del Paciente", pt: "Dados do Paciente", en: "Patient Data" },
    fac: { es: "Facturación", pt: "Faturação", en: "Billing" },
    recs: { es: "12 reg. clínicos", pt: "12 reg. clínicos", en: "12 clinical records" },
    evos: { es: "8 evoluciones", pt: "8 evoluções", en: "8 evolutions" },
    exams: { es: "Exámenes", pt: "Exames", en: "Exams" },
    seeAll: { es: "Ver todos", pt: "Ver todos", en: "See all" },
    hint: {
      es: "La sección activa se muestra a la derecha. Aquí, Clínico: odontograma, evoluciones y los exámenes vinculados.",
      pt: "A seção ativa aparece à direita. Aqui, Clínico: odontograma, evoluções e os exames vinculados.",
      en: "The active section shows on the right. Here, Clinical: odontogram, evolutions and the linked exams.",
    },
  };
  const nav = [
    { l: t(L.clin, locale), active: true },
    { l: t(L.anam, locale), active: false },
    { l: t(L.prot, locale), active: false },
    { l: t(L.plan, locale), active: false },
    { l: t(L.evo, locale), active: false },
    { l: t(L.doc, locale), active: false },
    { l: t(L.dat, locale), active: false },
  ];

  return (
    <MockupFrame title="SuperClini · Ficha del paciente">
      <div className="flex min-w-[340px]">
        {/* sidebar */}
        <nav className="hidden w-40 shrink-0 flex-col gap-0.5 border-r border-ink-100 bg-ink-50/60 p-2 sm:flex dark:border-ink-800 dark:bg-ink-950/40">
          {nav.map((s) => (
            <span
              key={s.l}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
                s.active
                  ? "bg-white text-sky-700 shadow-sm dark:bg-ink-800 dark:text-sky-300"
                  : "text-ink-500 dark:text-ink-400"
              }`}
            >
              {s.l}
            </span>
          ))}
          <span className="mt-1 rounded-lg border-t border-ink-100 px-2.5 pt-2 text-[11px] font-medium text-ink-500 dark:border-ink-800 dark:text-ink-400">
            {t(L.fac, locale)}
          </span>
          <div className="mt-1.5 px-2.5 text-[9px] leading-tight text-ink-400">
            {t(L.recs, locale)}
            <br />
            {t(L.evos, locale)}
          </div>
        </nav>
        {/* main */}
        <div className="min-w-0 flex-1">
          {/* patient header */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-ink-100 px-3 py-3 dark:border-ink-800">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient text-[13px] font-bold text-white">MG</span>
            <div className="mr-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-semibold text-ink-900 dark:text-white">María González</span>
                <span className="rounded-full bg-ink-100 px-1.5 py-px text-[9px] text-ink-500 dark:bg-ink-800 dark:text-ink-300">{t(L.age, locale)}</span>
              </div>
              <div className="text-[10px] text-ink-400">RUT: 12.345.678-9 · +56 9 8765 4321</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-lg bg-brand-gradient px-2 py-1 text-[10px] font-semibold text-white">{t(L.schedule, locale)}</span>
              <span className="rounded-lg bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">✦ {t(L.aiSummary, locale)}</span>
              <span className="rounded-lg border border-ink-200 px-2 py-1 text-[10px] font-semibold text-ink-600 dark:border-ink-700 dark:text-ink-300">{t(L.iaCases, locale)} · 2</span>
            </div>
          </div>
          {/* active section teaser */}
          <div className="p-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
                <div className="mb-1.5 grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className={`h-4 rounded-sm ${i === 5 ? "bg-rose-400" : i === 10 ? "bg-sky-400" : "bg-ink-100 dark:bg-ink-800"}`} />
                  ))}
                </div>
                <div className="text-[9px] uppercase tracking-wide text-ink-400">Odontograma</div>
              </div>
              <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10.5px] font-semibold text-ink-700 dark:text-ink-200">{t(L.exams, locale)}</span>
                  <span className="text-[9.5px] font-medium text-sky-600 dark:text-sky-400">{t(L.seeAll, locale)}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-9 w-9 rounded-lg bg-slate-800" />
                  <span className="grid h-9 flex-1 place-items-center rounded-lg bg-ink-100 text-[9px] text-ink-400 dark:bg-ink-800">3 radiografías · 2 fotos</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[10.5px] leading-relaxed text-ink-500 dark:text-ink-400">{t(L.hint, locale)}</p>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────── FICHA · Datos del paciente (pestaña dados) ───────────── */

function FichaDatosMock({ locale }: { locale: Locale }) {
  const L = {
    heading: { es: "Datos del Paciente", pt: "Dados do Paciente", en: "Patient Data" },
    sub: { es: "Información personal y de contacto", pt: "Informação pessoal e de contato", en: "Personal and contact information" },
    save: { es: "Guardar cambios", pt: "Salvar alterações", en: "Save changes" },
    ident: { es: "Identificación", pt: "Identificação", en: "Identification" },
    fullName: { es: "Nombre completo", pt: "Nome completo", en: "Full name" },
    docType: { es: "Tipo de documento", pt: "Tipo de documento", en: "Document type" },
    docNum: { es: "RUT", pt: "RUT", en: "RUT" },
    valid: { es: "✓ válido", pt: "✓ válido", en: "✓ valid" },
    gender: { es: "Género", pt: "Gênero", en: "Gender" },
    female: { es: "Femenino", pt: "Feminino", en: "Female" },
    birth: { es: "Fecha de nacimiento", pt: "Data de nascimento", en: "Date of birth" },
    contact: { es: "Contacto", pt: "Contato", en: "Contact" },
    phone: { es: "Teléfono / WhatsApp", pt: "Telefone / WhatsApp", en: "Phone / WhatsApp" },
    email: { es: "E-mail", pt: "E-mail", en: "Email" },
    prev: { es: "Previsión de salud", pt: "Previdência de saúde", en: "Health insurance" },
    country: { es: "Se adapta a tu país (Chile)", pt: "Adapta-se ao seu país (Chile)", en: "Adapts to your country (Chile)" },
  };
  const previsiones = ["Fonasa", "Isapre", "Particular"];

  return (
    <MockupFrame title="SuperClini · Ficha · Datos">
      <div className="min-w-[320px] p-3">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="mr-auto">
            <div className="text-[13px] font-bold text-ink-900 dark:text-white">{t(L.heading, locale)}</div>
            <div className="text-[10px] text-ink-400">{t(L.sub, locale)}</div>
          </div>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.save, locale)}</span>
        </div>

        {/* Identificación */}
        <div className="mb-2 rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
          <div className="mb-1.5 text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.ident, locale)}</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label={t(L.fullName, locale)} value="María González" />
            <div>
              <div className="mb-0.5 text-[9.5px] text-ink-400">{t(L.docNum, locale)}</div>
              <div className="flex items-center justify-between rounded-lg border border-ink-200 px-2 py-1.5 dark:border-ink-700">
                <span className="text-[11px] text-ink-700 dark:text-ink-200">12.345.678-9</span>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">{t(L.valid, locale)}</span>
              </div>
            </div>
            <Field label={t(L.gender, locale)} value={t(L.female, locale)} />
            <Field label={t(L.birth, locale)} value="12/03/1992 · 34" />
          </div>
        </div>

        {/* Contacto */}
        <div className="mb-2 rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
          <div className="mb-1.5 text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.contact, locale)}</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label={t(L.phone, locale)} value="+56 9 8765 4321" />
            <Field label={t(L.email, locale)} value="maria.g@correo.cl" />
          </div>
        </div>

        {/* Previsión */}
        <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.prev, locale)}</span>
            <span className="text-[9px] text-ink-400">{t(L.country, locale)}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {previsiones.map((p, i) => (
              <span
                key={p}
                className={`rounded-lg px-2.5 py-1 text-[10.5px] font-semibold ${
                  i === 1
                    ? "bg-sky-600 text-white"
                    : "border border-ink-200 text-ink-500 dark:border-ink-700 dark:text-ink-300"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/** Campo de formulario de solo lectura (label + valor en caja). */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-0.5 text-[9.5px] text-ink-400">{label}</div>
      <div className="rounded-lg border border-ink-200 px-2 py-1.5 text-[11px] text-ink-700 dark:border-ink-700 dark:text-ink-200">{value}</div>
    </div>
  );
}

/* ─────────────────────────── FICHA · Anamnesis ─────────────────────────── */

function AnamnesisMock({ locale }: { locale: Locale }) {
  const L = {
    heading: { es: "Anamnesis Médica", pt: "Anamnese Médica", en: "Medical Anamnesis" },
    save: { es: "Guardar", pt: "Salvar", en: "Save" },
    hist: { es: "Historial médico", pt: "Histórico médico", en: "Medical history" },
    histV: {
      es: "Hipertensión controlada con losartán. Sin cirugías recientes.",
      pt: "Hipertensão controlada com losartana. Sem cirurgias recentes.",
      en: "Hypertension controlled with losartan. No recent surgeries.",
    },
    allerg: { es: "Alergias", pt: "Alergias", en: "Allergies" },
    allergV: { es: "Penicilina. Sin alergia a anestésicos.", pt: "Penicilina. Sem alergia a anestésicos.", en: "Penicillin. No anesthetic allergy." },
    meds: { es: "Medicamentos en uso", pt: "Medicamentos em uso", en: "Medications in use" },
    medsV: { es: "Losartán 50mg. Anticonceptivo oral.", pt: "Losartana 50mg. Anticoncepcional oral.", en: "Losartan 50mg. Oral contraceptive." },
    notes: { es: "Observaciones clínicas", pt: "Observações clínicas", en: "Clinical notes" },
    notesV: { es: "Paciente ansiosa ante procedimientos largos.", pt: "Paciente ansiosa em procedimentos longos.", en: "Patient anxious during long procedures." },
  };
  const areas = [
    { l: t(L.hist, locale), v: t(L.histV, locale) },
    { l: t(L.allerg, locale), v: t(L.allergV, locale) },
    { l: t(L.meds, locale), v: t(L.medsV, locale) },
    { l: t(L.notes, locale), v: t(L.notesV, locale) },
  ];

  return (
    <MockupFrame title="SuperClini · Ficha · Anamnesis">
      <div className="min-w-[300px] p-3">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="mr-auto text-[13px] font-bold text-ink-900 dark:text-white">{t(L.heading, locale)}</span>
          <span className="rounded-lg bg-sky-600 px-2.5 py-1 text-[11px] font-semibold text-white">{t(L.save, locale)}</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {areas.map((a) => (
            <div key={a.l}>
              <div className="mb-0.5 text-[10px] font-semibold text-ink-600 dark:text-ink-300">{a.l}</div>
              <div className="rounded-lg border border-ink-200 px-2.5 py-2 text-[11px] leading-relaxed text-ink-600 dark:border-ink-700 dark:text-ink-300">{a.v}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* ───────────────────────── FICHA · Resumen con IA ──────────────────────── */

function ResumenIaMock({ locale }: { locale: Locale }) {
  const L = {
    title: { es: "Resumen con IA", pt: "Resumo com IA", en: "AI summary" },
    quota: { es: "1 de 3 este mes", pt: "1 de 3 este mês", en: "1 of 3 this month" },
    exec: { es: "Resumen ejecutivo", pt: "Resumo executivo", en: "Executive summary" },
    execV: {
      es: "Paciente activa con plan de ortodoncia en curso y buena adherencia. Al día en pagos.",
      pt: "Paciente ativa com plano de ortodontia em curso e boa adesão. Em dia nos pagamentos.",
      en: "Active patient with an ongoing ortho plan and good adherence. Up to date on payments.",
    },
    clin: { es: "Estado clínico", pt: "Estado clínico", en: "Clinical status" },
    alert: { es: "Alerta: control de higiene pendiente", pt: "Alerta: controle de higiene pendente", en: "Alert: hygiene check pending" },
    comm: { es: "Estado comercial", pt: "Estado comercial", en: "Commercial status" },
    ltv: { es: "LTV estimado", pt: "LTV estimado", en: "Estimated LTV" },
    fin: { es: "Al día", pt: "Em dia", en: "Up to date" },
    finL: { es: "Estado financiero", pt: "Estado financeiro", en: "Financial status" },
    tags: { es: "Interés estético", pt: "Interesse estético", en: "Aesthetic interest" },
    tags2: { es: "Paciente VIP", pt: "Paciente VIP", en: "VIP patient" },
    disc: {
      es: "Generado por IA. No sustituye el criterio profesional del odontólogo.",
      pt: "Gerado por IA. Não substitui o critério profissional do dentista.",
      en: "AI-generated. Does not replace the dentist's professional judgment.",
    },
  };

  return (
    <MockupFrame title="SuperClini · Resumen con IA">
      <div className="min-w-[300px] p-3">
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">✦ IA</span>
          <span className="mr-auto text-[13px] font-bold text-ink-900 dark:text-white">{t(L.title, locale)}</span>
          <span className="rounded-full border border-ink-200 px-2 py-0.5 text-[9px] font-medium text-ink-500 dark:border-ink-700 dark:text-ink-300">{t(L.quota, locale)}</span>
        </div>

        <div className="mb-2 rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
          <div className="mb-1 text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.exec, locale)}</div>
          <p className="text-[11px] leading-relaxed text-ink-600 dark:text-ink-300">{t(L.execV, locale)}</p>
        </div>

        <div className="mb-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
            <div className="mb-1 text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.clin, locale)}</div>
            <div className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">{t(L.alert, locale)}</div>
          </div>
          <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
            <div className="mb-1 text-[9px] font-bold uppercase tracking-wide text-ink-400">{t(L.comm, locale)}</div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-ink-500 dark:text-ink-400">{t(L.finL, locale)}</span>
              <span className="rounded-full bg-emerald-100 px-1.5 py-px font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{t(L.fin, locale)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px]">
              <span className="text-ink-500 dark:text-ink-400">{t(L.ltv, locale)}</span>
              <span className="font-bold text-ink-700 dark:text-ink-200">$ 1.8M</span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[9.5px] font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">{t(L.tags, locale)}</span>
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[9.5px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">{t(L.tags2, locale)}</span>
        </div>

        <p className="text-[9.5px] italic leading-relaxed text-ink-400">{t(L.disc, locale)}</p>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────── FICHA · Exámenes y citas vinculados ───────────────── */

function ExamenesCitasMock({ locale }: { locale: Locale }) {
  const L = {
    exams: { es: "Exámenes Clínicos", pt: "Exames Clínicos", en: "Clinical Exams" },
    oneRad: { es: "1 rad.", pt: "1 rad.", en: "1 x-ray" },
    seeAll: { es: "Ver todos", pt: "Ver todos", en: "See all" },
    viewPano: { es: "Ver panorámica", pt: "Ver panorâmica", en: "View panoramic" },
    pano: { es: "Panorámica", pt: "Panorâmica", en: "Panoramic" },
  };
  const types = [
    { es: "Fotografías", pt: "Fotografias", en: "Photos" },
    { es: "Radiografías", pt: "Radiografias", en: "Radiographs" },
    { es: "Modelos 3D", pt: "Modelos 3D", en: "3D models" },
    { es: "Exocad", pt: "Exocad", en: "Exocad" },
    { es: "Documentos", pt: "Documentos", en: "Documents" },
    { es: "CBCT/DICOM", pt: "CBCT/DICOM", en: "CBCT/DICOM" },
  ];
  // radiografía panorámica reconocible: arco dental de dientes sobre fondo de rayos X
  const teeth: React.ReactNode[] = [];
  for (let i = 0; i < 14; i++) {
    const f = i / 13;
    const x = 20 + f * 200;
    const yTop = 34 + Math.pow((x - 120) / 92, 2) * 16;
    const yBot = 70 - Math.pow((x - 120) / 92, 2) * 14;
    const op = (0.5 + 0.35 * (1 - Math.abs(f - 0.5) * 2)).toFixed(2);
    teeth.push(<rect key={`t${i}`} x={x - 3.5} y={yTop - 7} width={7} height={10} rx={2.5} fill="#cbd5e1" opacity={op} />);
    teeth.push(<rect key={`b${i}`} x={x - 3.5} y={yBot - 3} width={7} height={10} rx={2.5} fill="#e2e8f0" opacity={op} />);
  }

  return (
    <MockupFrame title="SuperClini · Exámenes">
      <div className="min-w-[320px] p-3">
        <div className="rounded-xl border border-ink-100 p-2.5 dark:border-ink-800">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="text-[10.5px] font-semibold text-ink-700 dark:text-ink-200">{t(L.exams, locale)}</span>
            <span className="text-[9px] text-ink-400">{t(L.oneRad, locale)}</span>
            <span className="ml-auto text-[9.5px] font-medium text-sky-600 dark:text-sky-400">{t(L.seeAll, locale)} ›</span>
          </div>
          {/* radiografía panorámica */}
          <div className="relative mb-2 overflow-hidden rounded-lg" style={{ background: "radial-gradient(120% 120% at 50% 35%, #26374d 0%, #0e1626 70%)" }}>
            <svg viewBox="0 0 240 104" className="block h-[92px] w-full">
              <path d="M18 36 Q120 6 222 36" fill="none" stroke="#7e93ac" strokeWidth={1.2} opacity={0.5} />
              <path d="M22 66 Q120 92 218 66" fill="none" stroke="#7e93ac" strokeWidth={1.4} opacity={0.55} />
              {teeth}
            </svg>
            <span className="absolute left-1.5 bottom-1.5 rounded bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold text-white">{t(L.pano, locale)}</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-900/70 px-2 py-1 text-[9px] font-semibold text-white">{t(L.viewPano, locale)}</span>
          </div>
          {/* tipos del módulo */}
          <div className="flex flex-wrap gap-1">
            {types.map((ty, i) => (
              <span key={i} className={`rounded-full px-2 py-0.5 text-[8.5px] font-medium ${i === 1 ? "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" : "bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400"}`}>{t(ty, locale)}</span>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* ─────────────────────────────── registry ──────────────────────────────── */

const MOCKUPS: Record<MockupKey, React.FC<{ locale: Locale }>> = {
  "agenda-dia": AgendaMock,
  "agenda-publica": AgendaPublicaMock,
  "chat-sofia": SofiaChatMock,
  "sofia-qr": SofiaQrMock,
  "sofia-config": SofiaConfigMock,
  odontograma: OdontogramaMock,
  "ficha-evolucion": FichaEvolucionMock,
  "plan-tratamiento": PlanTratamientoMock,
  "caso-ia": CasoIaMock,
  "radiografia-ia": RadiografiaIaMock,
  "caja-detalle": CajaDetalleMock,
  "cierre-caja": CajaCierreMock,
  "cobro-split": CobroSplitMock,
  liquidacion: LiquidacionMock,
  "panel-kpis": PanelKpisMock,
  "informe-gestion": InformeGestionMock,
  "crm-inbox": CrmInboxMock,
  stock: StockMock,
  "orden-lab": OrdenLabMock,
  "totem-checkin": TotemMock,
  "usuarios-roles": UsuariosRolesMock,
  "plan-cuotas": PlanCuotasMock,
  "config-clinica": ConfigClinicaMock,
  "paciente-buscar": PacienteBuscarMock,
  procedimientos: ProcedimientosMock,
  "soporte-chat": SoporteChatMock,
  "documento-clinico": DocumentoClinicoMock,
  protocolo: ProtocoloMock,
  "sesion-fotos": SesionFotosMock,
  "dicom-3d": DicomMock,
  ortodoncia: OrtodonciaMock,
  membresias: MembresiasMock,
  "crm-plantillas": CrmPlantillasMock,
  "mi-desempeno": MiDesempenoMock,
  "totem-teclado": TotemTecladoMock,
  recordatorio: RecordatorioMock,
  "dos-pasos": DosPasosMock,
  red: RedMock,
  "convenio-b2b": ConvenioB2bMock,
  "crm-reportes": CrmReportesMock,
  "cadastro-labs": CadastroLabsMock,
  "ficha-overview": FichaOverviewMock,
  "ficha-datos": FichaDatosMock,
  anamnesis: AnamnesisMock,
  "resumen-ia": ResumenIaMock,
  "examenes-citas": ExamenesCitasMock,
};

export function Mockup({ screen, locale }: { screen: MockupKey; locale: Locale }) {
  const Cmp = MOCKUPS[screen];
  return Cmp ? <Cmp locale={locale} /> : null;
}
