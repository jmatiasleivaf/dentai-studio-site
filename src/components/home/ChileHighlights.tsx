import {
  CreditCard,
  Coins,
  Fingerprint,
  ShieldCheck,
  ArrowLeftRight,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * Bloco exclusivo da versão Chile (cl.superclini.com). Renderizado no servidor
 * (conteúdo no HTML inicial, indexável) só quando o host é o subdomínio do Chile.
 *
 * Regra de conteúdo: só fatos REAIS. Somos pré-receita, então nada de logos,
 * métricas ou depoimentos que não existam. O diferencial aqui é adequação local
 * (pagos, CLP, RUT, Ley 20.584, migração Dentalink) e os três agentes, que já
 * são a tese do site.
 */
type CardKey = "pagos" | "clp" | "rut" | "ley" | "dentalink" | "agentes";

const CARDS: { key: CardKey; Icon: LucideIcon }[] = [
  { key: "pagos", Icon: CreditCard },
  { key: "clp", Icon: Coins },
  { key: "rut", Icon: Fingerprint },
  { key: "ley", Icon: ShieldCheck },
  { key: "dentalink", Icon: ArrowLeftRight },
  { key: "agentes", Icon: Bot },
];

export function ChileHighlights() {
  const t = useTranslations("chile");

  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, Icon }) => (
            <article
              key={key}
              className="rounded-3xl border border-ink-100 bg-white p-6 transition-colors dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">
                {t(`cards.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {t(`cards.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
