import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: `${t("metaTitle")} — SuperClini`,
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  return (
    <Section tone="default" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <ContactIntro />
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card-hover dark:border-ink-800 dark:bg-ink-900 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}

async function ContactIntro() {
  const t = await getTranslations("contact");
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 font-display text-fluid-4xl font-extrabold leading-tight text-ink-900 dark:text-ink-50">
        {t("pageTitle")}
      </h1>
      <p className="mt-5 text-fluid-base text-ink-600 dark:text-ink-400">{t("pageBody")}</p>

      <ul className="mt-8 space-y-4 text-sm text-ink-700 dark:text-ink-300">
        {(["trial", "demo", "enterprise"] as const).map((k) => (
          <li key={k} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" aria-hidden />
            <div>
              <p className="font-semibold text-ink-900 dark:text-ink-50">{t(`benefits.${k}.title`)}</p>
              <p className="mt-0.5 text-xs text-ink-600 dark:text-ink-400">
                {t(`benefits.${k}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
