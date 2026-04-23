import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: `${t("metaTitle")} — SuperClini`,
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  const lastUpdated = "2026-04-22";

  return (
    <Section tone="default" className="py-20 sm:py-24">
      <Container>
        <article className="prose prose-ink mx-auto max-w-3xl dark:prose-invert">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-fluid-4xl font-extrabold text-ink-900 dark:text-ink-50">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t("lastUpdated", { date: lastUpdated })}
          </p>

          <p className="mt-8 text-ink-700 dark:text-ink-300">{t("intro")}</p>

          <Section2 title={t("sections.who.title")} body={t("sections.who.body")} />
          <Section2 title={t("sections.what.title")} body={t("sections.what.body")} />
          <Section2 title={t("sections.why.title")} body={t("sections.why.body")} />
          <Section2 title={t("sections.legal.title")} body={t("sections.legal.body")} />
          <Section2 title={t("sections.rights.title")} body={t("sections.rights.body")} />
          <Section2 title={t("sections.retention.title")} body={t("sections.retention.body")} />
          <Section2 title={t("sections.security.title")} body={t("sections.security.body")} />
          <Section2 title={t("sections.cookies.title")} body={t("sections.cookies.body")} />
          <Section2 title={t("sections.transfer.title")} body={t("sections.transfer.body")} />
          <Section2 title={t("sections.contact.title")} body={t("sections.contact.body")} />

          <div className="mt-12 rounded-2xl border-l-4 border-brand-400 bg-brand-50 p-6 dark:border-brand-600 dark:bg-brand-950/30">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              {t("dpo.title")}
            </p>
            <p className="mt-2 text-sm text-ink-700 dark:text-ink-300">{t("dpo.body")}</p>
          </div>
        </article>
      </Container>
    </Section>
  );
}

function Section2({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink-900 dark:text-ink-50">{title}</h2>
      <p className="mt-3 text-ink-700 dark:text-ink-300 whitespace-pre-line">{body}</p>
    </section>
  );
}
