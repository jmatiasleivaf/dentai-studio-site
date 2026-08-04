import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { SignupForm } from "@/components/forms/SignupForm";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";
import { resolveCountryServer } from "@/lib/country-server";
import { isNoTrialCountry } from "@/lib/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "signup" });
  const noTrial = isNoTrialCountry(await resolveCountryServer(locale));
  return {
    title: noTrial ? t("metaTitleCL") : t("metaTitle"),
    description: noTrial ? t("metaDescriptionCL") : t("metaDescription"),
    // Página de conversão: não faz sentido indexar variações com UTM, e o
    // conteúdo canônico é o mesmo em qualquer campanha.
    alternates: { canonical: `/${locale}/registro` },
  };
}

export default async function RegistroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("signup");

  // Chile não tem conta grátis. A URL continua viva (matar rota indexada é pior
  // que a incoerência), mas em vez do formulário de trial ela explica o modelo
  // e leva à membresía. Sem isso, um chileno que caia aqui por link antigo lê
  // uma promessa de 14 dias que o mercado dele não honra.
  if (isNoTrialCountry(await resolveCountryServer(locale))) {
    return <ChileMembership />;
  }

  const beneficios = [
    t("benefits.trial"),
    t("benefits.noCard"),
    t("benefits.fullAccess"),
    t("benefits.support"),
  ];

  return (
    <Section tone="default" className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Coluna de valor. Em mobile fica ACIMA do formulário: quem chega de
              anúncio precisa entender o que está criando antes de digitar. */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-fluid-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-50">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-300">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-sm text-ink-700 dark:text-ink-300">{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-ink-500 dark:text-ink-400">
              {t("countriesNote", { count: SUPERCLINI_FACTS.countriesCount })}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-xl dark:border-ink-700 dark:bg-ink-900 sm:p-8">
            <SignupForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Variante do mercado de membresía: sem formulário de trial, com saída para /precios. */
async function ChileMembership() {
  const t = await getTranslations("signup.chile");

  return (
    <Section tone="default" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-fluid-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-50">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/precios">
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <ContactCTAButton defaultInteresse="avaliar" variant="outline">
              <MessageSquare className="h-4 w-4" aria-hidden />
              {t("ctaSecondary")}
            </ContactCTAButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
