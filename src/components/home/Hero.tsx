"use client";

import { Check, ArrowRight, Bot, Sparkles, Scan } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] bg-ink-radial"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] mix-blend-overlay bg-noise dark:opacity-[0.04]"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-20 xl:gap-24">
          {/* ─── Left: copy ─── */}
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <Badge tone="brand">
                <Sparkles className="h-3 w-3" aria-hidden />
                {t("badge")}
              </Badge>
            </div>

            <h1 className="mt-6 font-display text-fluid-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50">
              <span className="block">{t("h1Line1")}</span>
              <span className="block bg-brand-gradient bg-clip-text text-transparent">
                {t("h1Line2")}
              </span>
              <span className="block">{t("h1Line3")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-fluid-base leading-relaxed text-ink-600 lg:mx-0 dark:text-ink-400">
              {t("sub")}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <a href="https://app.superclini.com">
                  {t("ctaPrimary")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#ai">{t("ctaSecondary")}</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500 lg:justify-start dark:text-ink-400">
              {(["noCard", "setup", "cancel"] as const).map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" aria-hidden />
                  {t(`trustItems.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Right: proof cards ─── */}
          <HeroProofCards />
        </div>
      </Container>
    </section>
  );
}

function HeroProofCards() {
  const t = useTranslations("ai.cards");

  return (
    <div className="relative mx-auto w-full max-w-full sm:max-w-[520px] lg:max-w-none">
      {/* Chat card (primary) */}
      <div className="relative z-20 overflow-hidden rounded-3xl border border-ink-100 bg-white p-5 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-6">
        <div className="flex items-center gap-3 border-b border-ink-100 pb-4 dark:border-ink-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient">
            <Bot className="h-5 w-5 text-white" aria-hidden />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 dark:text-ink-50">
              Sofía
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" aria-label="online" />
            </div>
            <div className="text-xs text-ink-500 dark:text-ink-400">
              {t("whatsapp.proofLabel")}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <ChatBubble side="user">{t("whatsapp.examples.user1")}</ChatBubble>
          <ChatBubble side="bot">{t("whatsapp.examples.bot1")}</ChatBubble>
          <ChatBubble side="user">{t("whatsapp.examples.user2")}</ChatBubble>
          <ChatBubble side="bot">{t("whatsapp.examples.bot2")}</ChatBubble>
        </div>
      </div>

      {/* Smile card (floating) — somente ≥2xl (1536px+) onde há espaço real */}
      <div className="absolute -right-8 -top-10 z-10 hidden w-56 -rotate-6 rounded-2xl border border-ink-100 bg-white p-4 shadow-lg 2xl:block animate-float dark:border-ink-800 dark:bg-ink-900">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
          <Sparkles className="h-3 w-3" aria-hidden /> AI Smile
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-gradient-to-br from-ink-200 to-ink-300" aria-hidden>
            <div className="flex h-24 items-end justify-center rounded-xl pb-2 text-xs font-bold text-ink-700">
              {t("smile.before")}
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-brand-200 to-accent-500" aria-hidden>
            <div className="flex h-24 items-end justify-center rounded-xl pb-2 text-xs font-bold text-white">
              {t("smile.after")}
            </div>
          </div>
        </div>
      </div>

      {/* Radiograph card (floating) — somente ≥2xl */}
      <div className="absolute -bottom-12 -left-8 z-10 hidden w-52 rotate-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-lg 2xl:block dark:border-ink-800 dark:bg-ink-900">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Scan className="h-3 w-3" aria-hidden /> AI Radio
        </div>
        <div className="mt-2 flex h-24 items-center justify-center rounded-xl bg-ink-900">
          <svg viewBox="0 0 100 40" className="h-16 w-full" aria-hidden>
            <defs>
              <linearGradient id="rx-g" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#rx-g)" strokeWidth="1.5">
              <circle cx="25" cy="15" r="4" />
              <circle cx="50" cy="20" r="5" />
              <circle cx="75" cy="14" r="3" />
            </g>
            <g fill="#94a3b8" opacity="0.6">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
                <rect key={x} x={x - 3} y={26} width={6} height={10} rx={1} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, children }: { side: "bot" | "user"; children: React.ReactNode }) {
  return (
    <div
      className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}
    >
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
