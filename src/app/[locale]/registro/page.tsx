import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SignupForm } from "@/components/forms/SignupForm";
import { SUPERCLINI_FACTS } from "@/lib/superclini.facts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "signup" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    // Página de conversão: não faz sentido indexar variações com UTM, e o
    // conteúdo canônico é o mesmo em qualquer campanha.
    alternates: { canonical: `/${locale}/registro` },
  };
}

export default async function RegistroPage() {
  const t = await getTranslations("signup");

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
