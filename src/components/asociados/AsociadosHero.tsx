import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";

/**
 * Hero da landing de asociados.
 *
 * O CTA é uma âncora para o formulário na mesma página, não um link para outra
 * rota: quem abre isto recebeu o link no WhatsApp e está em pé numa clínica.
 * Cada navegação a mais é uma chance de perder a pessoa.
 */
export function AsociadosHero() {
  const t = useTranslations("asociadosPage.hero");
  const chips = [t("chips.noEntry"), t("chips.noExclusivity"), t("chips.noStock")];

  return (
    <section className="relative w-full overflow-hidden bg-ink-950 bg-ink-radial pb-16 pt-28 text-white sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.15]" aria-hidden />
      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-300">
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 font-display text-display-1 font-bold leading-[1.05] text-balance">
            {t("title")}
          </h1>

          <p className="mt-6 text-lead text-ink-300">{t("subtitle")}</p>

          <div className="mt-9 flex justify-center">
            <a
              href="#postular"
              className="inline-flex min-h-touch-lg items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 text-base font-semibold text-white shadow-brand transition-opacity hover:opacity-95 active:scale-[0.98]"
            >
              {t("cta")}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
            {chips.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-ink-200"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
