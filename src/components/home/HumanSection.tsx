import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check, RefreshCw, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Slider } from "@/components/ui/slider";
import { Link } from "@/i18n/navigation";

/**
 * O beat humano da home (Direção B): carrossel de 3 cenas reais (recepção, caixa,
 * tratamentos), cada uma pareando o trabalho que o agente assume com o trabalho
 * humano que volta para o time. Fotos de banco, licença comercial, SEM marca de
 * terceiro (public/showcase/home/CREDITS.md), casting diverso, cena não-clínica.
 *
 * Sobre cada foto, uma ILUSTRAÇÃO de produto do agente (dado fictício, sem PII),
 * na mesma linguagem do hero: Sofía confirma no WhatsApp, IAndra fecha a caixa,
 * AlicIA reativa um plano. As ilustrações ficam DENTRO do marco (não são
 * recortadas pelo carrossel, ao contrário do badge pendurado anterior).
 *
 * Slides renderizados no servidor e passados ao <Slider> client (o controlador
 * não carrega imagem no bundle). Autoplay 5s com barra de progresso.
 */
type Ill = {
  role: string;
  time: string;
  // variante "chat" (Sofía)
  bubble?: string;
  stat?: string;
  // variante "metric" (IAndra, AlicIA)
  title?: string;
  metricLabel?: string;
  metricValue?: string;
  state?: string;
};

type Slide = {
  kicker: string;
  title: string;
  body: string;
  p1: string;
  p2: string;
  photoAlt: string;
  ill: Ill;
};

const PHOTOS = ["human-recepcion.webp", "human-caja.webp", "human-tratamientos.webp"] as const;

type Tone = "emerald" | "brand" | "violet";
const ILL_META: { variant: "chat" | "metric"; agent: string; tone: Tone }[] = [
  { variant: "chat", agent: "Sofía", tone: "emerald" },
  { variant: "metric", agent: "IAndra", tone: "brand" },
  { variant: "metric", agent: "AlicIA", tone: "violet" },
];

const TONE: Record<Tone, { dot: string; av: string; chip: string; chipBg: string; ico: string }> = {
  emerald: {
    dot: "bg-emerald-500",
    av: "bg-emerald-500",
    chip: "text-emerald-700 dark:text-emerald-300",
    chipBg: "bg-emerald-500/15",
    ico: "text-emerald-600 dark:text-emerald-400",
  },
  brand: {
    dot: "bg-brand-500",
    av: "bg-brand-500",
    chip: "text-brand-700 dark:text-brand-300",
    chipBg: "bg-brand-500/15",
    ico: "text-brand-600 dark:text-brand-400",
  },
  violet: {
    dot: "bg-violet-500",
    av: "bg-violet-500",
    chip: "text-violet-700 dark:text-violet-300",
    chipBg: "bg-violet-500/15",
    ico: "text-violet-600 dark:text-violet-400",
  },
};

function Illustration({
  meta,
  ill,
}: {
  meta: (typeof ILL_META)[number];
  ill: Ill;
}) {
  const tone = TONE[meta.tone];
  return (
    <>
      {/* chip de identidade do agente */}
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-xl border border-ink-100 bg-white/85 px-2.5 py-1.5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-ink-900/85">
        <span aria-hidden className={`h-2 w-2 rounded-full ${tone.dot}`} />
        <span className="text-[11px] font-bold text-ink-950 dark:text-white">{meta.agent}</span>
        <span className="text-[10px] text-ink-400">· {ill.role}</span>
      </div>

      {/* cartão de produto (dado fictício, sem PII) */}
      <div className="absolute inset-x-3.5 bottom-3.5 rounded-2xl border border-ink-100 bg-white/90 p-3 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-ink-900/90">
        {meta.variant === "chat" ? (
          <>
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white ${tone.av}`}>
                {meta.agent.charAt(0)}
              </span>
              <span className="text-xs font-bold text-ink-950 dark:text-white">{meta.agent}</span>
              <span className="ml-auto text-[10px] text-ink-400">{ill.time}</span>
            </div>
            <p className="flex items-start gap-1.5 rounded-lg rounded-tl-sm bg-ink-100 px-2.5 py-2 text-xs leading-snug text-ink-700 dark:bg-ink-800 dark:text-ink-200">
              <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tone.ico}`} aria-hidden />
              <span>{ill.bubble}</span>
            </p>
            <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${tone.chip} ${tone.chipBg}`}>
              {ill.stat}
            </span>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white ${tone.av}`}>
                {meta.agent.charAt(0)}
              </span>
              <span className="text-xs font-bold text-ink-950 dark:text-white">{ill.title}</span>
              <span className="ml-auto text-[10px] text-ink-400">{ill.time}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-ink-500 dark:text-ink-400">{ill.metricLabel}</span>
              <span className="font-display text-sm font-bold tabular-nums text-ink-950 dark:text-white">
                {ill.metricValue}
              </span>
            </div>
            <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone.chip} ${tone.chipBg}`}>
              {meta.tone === "violet" ? (
                <RefreshCw className="h-3 w-3" aria-hidden />
              ) : (
                <Check className="h-3 w-3" aria-hidden />
              )}
              {ill.state}
            </span>
          </>
        )}
      </div>
    </>
  );
}

export function HumanSection() {
  const t = useTranslations("human");
  const slides = t.raw("slides") as Slide[];

  return (
    <Section tone="muted">
      <Container>
        <Slider label={t("carouselLabel")} autoMs={5000} progress>
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 items-center gap-12 px-1 lg:grid-cols-2 lg:gap-16"
            >
              <div className="relative mx-auto w-full max-w-[430px] lg:mx-0">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-brand-400/15 blur-3xl"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-200 shadow-2xl dark:border-white/10">
                  <Image
                    src={`/showcase/home/${PHOTOS[idx] ?? PHOTOS[0]}`}
                    alt={s.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 430px, (min-width: 640px) 60vw, 90vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent"
                  />
                  <Illustration meta={ILL_META[idx] ?? ILL_META[0]} ill={s.ill} />
                </div>
              </div>

              <div className="max-w-xl">
                <span className="text-fluid-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                  {s.kicker}
                </span>
                <h2 className="mt-3 font-display text-display-2 font-bold text-ink-950 text-balance dark:text-white">
                  {s.title}
                </h2>
                <p className="mt-5 text-lead text-ink-600 dark:text-ink-300">{s.body}</p>
                <ul className="mt-6 space-y-3">
                  {[s.p1, s.p2].map((p) => (
                    <li key={p} className="flex gap-3 text-ink-700 dark:text-ink-300">
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      <span className="text-fluid-base">{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sofia"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  {t("link")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </Section>
  );
}
