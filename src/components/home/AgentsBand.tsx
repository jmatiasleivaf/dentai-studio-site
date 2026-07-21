import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WhatsAppMock } from "@/components/home/WhatsAppMock";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

/**
 * A faixa dos três agentes: o diferencial competitivo da SuperClini.
 *
 * REGRA ESTRUTURAL: peso visual idêntico. Mesma altura de card, mesmo número de
 * pontos, mesma densidade de argumento. Não existe agente principal e dois
 * coadjuvantes. Se um card ganhar um elemento, os três ganham.
 *
 * Cor por agente vem do app (dentai-studio/src/lib/agents/types.ts:26), para que
 * quem entra depois do login reconheça a mesma linguagem: Sofía esmeralda,
 * IAndra sky, AlicIA violeta.
 *
 * Prova visual: IAndra e AlicIA são capturas REAIS do produto em staging
 * (2026-07-20). Sofía usa uma reconstrução fiel da interface do WhatsApp
 * (WhatsAppMock) com conversa fictícia, porque conversa real é de paciente real
 * e a política do repo proíbe PII. É o canal onde a Sofía vive, não uma tela
 * inventada do sistema.
 */

type AgentKey = "sofia" | "iandra" | "alicia";

const ACCENT: Record<AgentKey, { dot: string; ring: string; text: string }> = {
  sofia: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  iandra: {
    dot: "bg-brand-500",
    ring: "ring-brand-500/20",
    text: "text-brand-600 dark:text-brand-400",
  },
  alicia: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
  },
};

/** O "IA" acende no gradiente da marca. É tratamento de logotipo, não de texto. */
function Wordmark({ agent }: { agent: AgentKey }) {
  const parts: Record<AgentKey, [string, string, string]> = {
    sofia: ["Sof", "IA", ""],
    iandra: ["", "IA", "ndra"],
    alicia: ["Alic", "IA", ""],
  };
  const [pre, ia, post] = parts[agent];
  return (
    <span className="font-display text-2xl font-semibold tracking-tight text-ink-950 dark:text-white">
      {pre}
      <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
        {ia}
      </span>
      {post}
    </span>
  );
}

export function AgentsBand() {
  const t = useTranslations("agents");

  const visuals: Record<AgentKey, React.ReactNode> = {
    sofia: (
      <WhatsAppMock
        statusLabel={t("sofia.chatOnline")}
        inputPlaceholder={t("sofia.chatInput")}
        messages={[
          { side: "out", text: t("sofia.chat1"), time: "21:04" },
          { side: "in", text: t("sofia.chat2"), time: "21:04" },
          { side: "out", text: t("sofia.chat3"), time: "21:05" },
          { side: "in", text: t("sofia.chat4"), time: "21:05" },
        ]}
      />
    ),
    iandra: (
      <Image
        src="/showcase/agentes/iandra.webp"
        alt={t("iandraAlt")}
        width={762}
        height={1280}
        sizes="(max-width: 1024px) 90vw, 380px"
        className="mx-auto w-full max-w-[340px] rounded-3xl border border-ink-100 shadow-card-hover dark:border-ink-800"
      />
    ),
    alicia: (
      <Image
        src="/showcase/agentes/alicia.webp"
        alt={t("aliciaAlt")}
        width={762}
        height={1280}
        sizes="(max-width: 1024px) 90vw, 380px"
        className="mx-auto w-full max-w-[340px] rounded-3xl border border-ink-100 shadow-card-hover dark:border-ink-800"
      />
    ),
  };

  const values: Record<AgentKey, Record<string, number>> = {
    sofia: { tools: SUPERCLINI_FACTS.sofiaToolsCount },
    iandra: { actions: SUPERCLINI_FACTS.iandraActionsCount },
    alicia: {
      morno: SUPERCLINI_FACTS.aliciaThresholds.morno,
      frio: SUPERCLINI_FACTS.aliciaThresholds.frio,
    },
  };

  const agents: AgentKey[] = ["sofia", "iandra", "alicia"];

  return (
    <Section id="agentes" tone="default">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
            {t("eyebrow")}
          </span>
          <h2 className="mt-6 font-display text-fluid-3xl font-extrabold leading-[1.02] tracking-tight text-ink-950 dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-ink-600 dark:text-ink-400">
            {t("sub")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {agents.map((a) => (
            <article
              key={a}
              className="flex flex-col rounded-3xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900 sm:p-7"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={`inline-block h-2.5 w-2.5 rounded-full ring-4 ${ACCENT[a].dot} ${ACCENT[a].ring}`}
                />
                <Wordmark agent={a} />
              </div>
              <p
                className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${ACCENT[a].text}`}
              >
                {t(`${a}.axis`)}
              </p>

              <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-ink-950 dark:text-white">
                {t(`${a}.headline`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`${a}.body`, values[a])}
              </p>

              <ul className="mt-5 space-y-2.5">
                {(["p1", "p2", "p3"] as const).map((p) => (
                  <li
                    key={p}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-700 dark:text-ink-300"
                  >
                    <span
                      aria-hidden
                      className={`mt-2 inline-block h-1 w-1 shrink-0 rounded-full ${ACCENT[a].dot}`}
                    />
                    {t(`${a}.${p}`, values[a])}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex-1 overflow-hidden rounded-2xl bg-ink-50 p-4 dark:bg-ink-950">
                {visuals[a]}
              </div>
            </article>
          ))}
        </div>

        {/* Un solo sistema: os três num painel só. É o território que a
            concorrência não ocupa, porque lá as automações são anônimas. */}
        <div className="mt-14 grid items-center gap-10 rounded-3xl border border-ink-200 bg-ink-50 p-8 dark:border-ink-800 dark:bg-ink-900 lg:grid-cols-2 lg:p-12">
          <div>
            <h3 className="font-display text-fluid-2xl font-extrabold leading-tight tracking-tight text-ink-950 dark:text-white">
              {t("systemTitle")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-400">
              {t("systemBody")}
            </p>
          </div>
          <Image
            src="/showcase/agentes/dock.webp"
            alt={t("dockAlt")}
            width={848}
            height={780}
            sizes="(max-width: 1024px) 90vw, 460px"
            className="mx-auto w-full max-w-[460px] rounded-2xl"
          />
        </div>
      </Container>
    </Section>
  );
}
