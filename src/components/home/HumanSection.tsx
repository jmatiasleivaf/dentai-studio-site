import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Slider } from "@/components/ui/slider";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/**
 * O beat humano da home (Direção B): carrossel de 3 cenas reais (recepção, caixa,
 * tratamentos), cada uma pareando o trabalho que o agente assume com o trabalho
 * humano que volta para o time. Fotos de banco, licença comercial
 * (public/showcase/home/CREDITS.md), casting diverso, cena não-clínica.
 *
 * Slides renderizados no servidor e passados ao <Slider> client (o controlador
 * não carrega imagem no bundle).
 */
type Slide = {
  kicker: string;
  title: string;
  body: string;
  p1: string;
  p2: string;
  badgeNumber: string;
  badgeLabel: string;
  photoAlt: string;
};

const PHOTOS = ["recepcion.webp", "equipo-mixto.webp", "equipo.webp"] as const;

export function HumanSection() {
  const t = useTranslations("human");
  const slides = t.raw("slides") as Slide[];

  return (
    <Section tone="muted">
      <Container>
        <Slider label={t("carouselLabel")} autoMs={7000}>
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 items-center gap-12 px-1 lg:grid-cols-2 lg:gap-16"
            >
              <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-brand-400/15 blur-3xl"
                />
                <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-2xl dark:border-white/10">
                  <Image
                    src={`/showcase/home/${PHOTOS[idx] ?? PHOTOS[0]}`}
                    alt={s.photoAlt}
                    width={1000}
                    height={1000}
                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-2xl dark:border-white/10 dark:bg-ink-900">
                  <p className="font-display text-xl font-bold tabular-nums text-ink-950 dark:text-white">
                    {s.badgeNumber}
                  </p>
                  <p className="mt-0.5 max-w-[150px] text-xs text-ink-500 dark:text-ink-400">
                    {s.badgeLabel}
                  </p>
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
