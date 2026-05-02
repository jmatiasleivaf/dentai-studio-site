import * as React from "react";
import { Bot } from "lucide-react";

export type ChatMessage = { side: "user" | "bot"; text: string };

/**
 * Mockup de conversa de WhatsApp com a Sofía. Usado no hero da landing /sofia
 * e em qualquer outra seção que precise demonstrar a interação.
 *
 * - `agentName` defaulta para "Sofía"
 * - `proofLabel` é o subtitle pequeno ("Conversa real", etc.)
 */
export function ChatMockup({
  messages,
  agentName = "Sofía",
  proofLabel,
  onlineLabel = "Sofía está online",
}: {
  messages: ChatMessage[];
  agentName?: string;
  proofLabel: string;
  onlineLabel?: string;
}) {
  return (
    <div className="relative z-20 mx-auto max-w-[520px] overflow-hidden rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
      <div className="flex items-center gap-3 border-b border-ink-100 pb-4 dark:border-ink-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
          <Bot className="h-5 w-5 text-white" aria-hidden />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 dark:text-ink-50">
            {agentName}
            <span
              className="flex h-2 w-2 rounded-full bg-emerald-500"
              role="img"
              aria-label={onlineLabel}
            />
            <span className="sr-only">{onlineLabel}</span>
          </div>
          <div className="text-xs text-ink-500 dark:text-ink-400">{proofLabel}</div>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} side={m.side}>
            {m.text}
          </ChatBubble>
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ side, children }: { side: "user" | "bot"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={
          side === "user"
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-2.5 text-sm text-white"
            : "max-w-[80%] rounded-2xl rounded-bl-sm bg-ink-100 px-4 py-2.5 text-sm text-ink-800 dark:bg-ink-800 dark:text-ink-100"
        }
      >
        {children}
      </div>
    </div>
  );
}
