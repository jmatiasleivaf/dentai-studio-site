import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/**
 * O beat humano da home (Direção B): entre a faixa dos agentes e a plataforma.
 *
 * Estabelece o ritmo humano/produto que o brief pede: aqui a foto de gente real
 * carrega a promessa emocional (o time volta a atender), com um chip de produto
 * discreto por cima (dado fictício, não atribuído). Foto de banco, licença
 * comercial (public/showcase/home/CREDITS.md), cena não-clínica.
 */
export function HumanSection() {
  const t = useTranslations("human");

  return (
    <Section tone="muted">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-brand-400/15 blur-3xl"
            />
            <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-2xl dark:border-white/10">
              <Image
                src="/showcase/home/equipo.webp"
                alt={t("photoAlt")}
                width={1100}
                height={1100}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 90vw"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-2xl dark:border-white/10 dark:bg-ink-900">
              <p className="font-display text-2xl font-bold tabular-nums text-ink-950 dark:text-white">
                {t("badgeNumber")}
              </p>
              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{t("badgeLabel")}</p>
            </div>
          </div>

          <div className="max-w-xl">
            <span className="text-fluid-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
              {t("kicker")}
            </span>
            <h2 className="mt-3 font-display text-display-2 font-bold text-ink-950 text-balance dark:text-white">
              {t("title")}
            </h2>
            <p className="mt-5 text-lead text-ink-600 dark:text-ink-300">{t("body")}</p>
            <ul className="mt-7 space-y-3">
              {(["p1", "p2", "p3"] as const).map((p) => (
                <li key={p} className="flex gap-3 text-ink-700 dark:text-ink-300">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                  />
                  <span className="text-fluid-base">{t(p)}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sofia"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-200"
            >
              {t("link")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
