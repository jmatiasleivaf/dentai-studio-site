import * as React from "react";

/**
 * Reconstrução fiel da interface do WhatsApp, com a Sofía respondendo.
 *
 * Por que reconstruir e não capturar uma conversa real: uma conversa real é de
 * um paciente real, e publicar isso num site expõe conteúdo clínico de alguém
 * que não consentiu. A política do repo proíbe PII na peça. Reconstruir a UI do
 * WhatsApp com dados fictícios dá o mesmo realismo ("é WhatsApp de verdade")
 * sem o risco, e é a técnica que o Centro de Ayuda já usa nos mockups.
 *
 * Ponto de vista: a tela do PACIENTE. As mensagens dele saem à direita, em
 * verde-claro (bolha "enviada" do WhatsApp); as da Sofía à esquerda, em branco.
 * Fiel ao WhatsApp: header verde-petróleo, status "en línea", check duplo azul
 * de leitura, horário em cada balão. Número mascarado.
 *
 * Marca: zero emoji, iconografia em SVG. Theme-aware (o WhatsApp tem claro e
 * escuro; aqui os dois seguem o par light/dark do site).
 */

type Msg = {
  side: "in" | "out"; // in = Sofía, out = paciente
  text: string;
  time: string;
};

function TickDouble() {
  // check duplo de leitura (azul), em SVG. É o sinal iconico do WhatsApp.
  return (
    <svg viewBox="0 0 18 12" className="ml-1 inline-block h-3 w-[18px] align-middle" aria-hidden>
      <path
        d="M1 6.5l2.6 2.6L9 3.5M6.5 9.1L9 6.6m2.5-3.1L6.9 8.1"
        fill="none"
        stroke="#53bdeb"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppMock({
  headerName = "Sofía",
  statusLabel,
  inputPlaceholder,
  numberMasked = "+56 9 •••• ••••",
  messages,
}: {
  headerName?: string;
  statusLabel: string;
  inputPlaceholder: string;
  numberMasked?: string;
  messages: Msg[];
}) {
  return (
    <div className="mx-auto max-w-[360px] overflow-hidden rounded-[26px] border border-ink-200 bg-white shadow-card-hover dark:border-ink-700 dark:bg-ink-900">
      {/* Header do WhatsApp */}
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-2.5 text-white dark:bg-[#1f2c33]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          {/* avatar generico em SVG, sem foto de pessoa */}
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            <circle cx="12" cy="8" r="4" fill="#fff" opacity="0.9" />
            <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" fill="#fff" opacity="0.9" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-sm font-semibold">{headerName}</div>
          <div className="truncate text-[11px] text-white/75">{statusLabel}</div>
        </div>
        <div className="text-[10px] font-medium text-white/60">{numberMasked}</div>
      </div>

      {/* Área do chat, com o wallpaper claro/escuro do WhatsApp */}
      <div className="space-y-2 bg-[#e5ddd5] px-3 py-4 dark:bg-[#0b141a]">
        {messages.map((m, i) => (
          <div key={i} className={m.side === "out" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.side === "out"
                  ? "max-w-[80%] rounded-lg rounded-tr-sm bg-[#dcf8c6] px-3 py-1.5 text-sm text-ink-900 shadow-sm dark:bg-[#005c4b] dark:text-white"
                  : "max-w-[80%] rounded-lg rounded-tl-sm bg-white px-3 py-1.5 text-sm text-ink-900 shadow-sm dark:bg-[#202c33] dark:text-white"
              }
            >
              <span>{m.text}</span>
              <span className="ml-1.5 inline-flex items-center align-bottom text-[10px] text-ink-400 dark:text-white/50">
                {m.time}
                {m.side === "out" ? <TickDouble /> : null}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Barra de input do WhatsApp, decorativa */}
      <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2 dark:bg-[#1f2c33]">
        <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs text-ink-400 dark:bg-[#2a3942] dark:text-white/40">
          {inputPlaceholder}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075e54] dark:bg-[#00a884]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path d="M3 20l18-8L3 4v6l12 2-12 2z" fill="#fff" />
          </svg>
        </div>
      </div>
    </div>
  );
}
