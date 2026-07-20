import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Fecho de categoria.
 *
 * A linha "Tu clínica ya no se opera. Se delega." é a assinatura da marca, e
 * vive aqui em vez do hero por um motivo: sozinha ela é abstrata, e o dono de
 * clínica não sabe o que comprou. Depois da faixa dos três agentes e da prova
 * de produto, a abstração já está ancorada e a frase fecha em vez de abrir.
 *
 * A leitura de investidor ("disputa orçamento de folha") NÃO entra nesta página:
 * no corte cliente ela se lê como "demita sua equipe", que é exatamente o
 * mecanismo que derrubou a campanha da Artisan. A tradução é o subtítulo: o que
 * os agentes assumem é a perseguição, não o posto de ninguém.
 */
export function Closing() {
  const t = useTranslations("closing");

  return (
    <Section tone="dark" className="py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[130px]"
      />
      <Container className="max-w-4xl text-center">
        <h2 className="font-display text-fluid-3xl font-extrabold leading-[1.02] tracking-tighter text-white sm:text-fluid-5xl">
          <span className="block">{t("title")}</span>
          <span className="block bg-gradient-to-r from-brand-300 via-accent-500 to-brand-400 bg-clip-text text-transparent">
            {t("highlight")}
          </span>
        </h2>
        <p className="mt-7 text-balance text-base leading-relaxed text-white/70 md:text-lg">
          {t("sub")}
        </p>
      </Container>
    </Section>
  );
}
