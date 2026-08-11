import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { ContactCTAButton } from "@/components/landing/ContactCTAButton";
import { resolveCountryServer } from "@/lib/country-server";
import { isAsociadoCountry } from "@/lib/pricing";
import { isChileSite } from "@/lib/site-host";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "signup" });
  const isChile = await isChileSite();
  return {
    title: isChile ? t("metaTitleCL") : t("metaTitle"),
    description: isChile ? t("metaDescriptionCL") : t("metaDescription"),
    // Página de conversão: não faz sentido indexar variações com UTM, e o
    // conteúdo canônico é o mesmo em qualquer campanha.
    alternates: { canonical: `/${locale}/registro` },
  };
}

/**
 * /registro deixou de ser cadastro self-service em 2026-08-10, quando os 9
 * mercados passaram à membresía anual e o trial de 14 dias acabou.
 *
 * A URL continua viva de propósito: matar rota indexada é pior que a
 * incoerência, e quem chega aqui por link antigo, anúncio ou marcador precisa
 * ler o modelo em vez de um 404. O <SignupForm> segue no repo, sem rota que o
 * renderize, para o caso de o self-service voltar.
 */
export default async function RegistroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("signup.membresia");
  const tCta = await getTranslations("salesCta");
  const asociado = isAsociadoCountry(await resolveCountryServer(locale));

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
              {tCta(asociado ? "asociado" : "ventas")}
            </ContactCTAButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
