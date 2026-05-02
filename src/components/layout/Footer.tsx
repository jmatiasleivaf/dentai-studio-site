import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { COUNTRY_LIST } from "@/lib/countries";
import { NAV_RESOURCES } from "@/lib/site-nav";

/**
 * Footer com cross-linking SEO para todas as landings de feature. Renderiza
 * sempre no SSR (não depende de hover JS como o NavBar dropdown), garantindo
 * que Google indexe os links e descubra as landings via internal linking.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tRes = useTranslations("nav.resourcesItems");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-400">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              {t("tagline")}
            </p>
          </div>

          <FooterCol title={t("resourcesTitle")}>
            {NAV_RESOURCES.map((r) =>
              r.available ? (
                <FooterLink key={r.labelKey} href={`/${locale}${r.href}`}>
                  {tRes(r.labelKey as never)}
                </FooterLink>
              ) : (
                <li key={r.labelKey}>
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-500">
                    {tRes(r.labelKey as never)}
                    <span className="rounded-full bg-ink-800 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-400">
                      {tRes("comingSoon")}
                    </span>
                  </span>
                </li>
              )
            )}
            <FooterLink href="/#pricing">{t("product.pricing")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("companyTitle")}>
            <FooterLink href={`/${locale}/contato`}>{t("company.contact")}</FooterLink>
            <FooterLink href="#">{t("company.about")}</FooterLink>
            <FooterLink href="#">{t("company.help")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("legalTitle")}>
            <FooterLink href={`/${locale}/privacidade`}>{t("legal.privacy")}</FooterLink>
            <FooterLink href="#">{t("legal.terms")}</FooterLink>
            <FooterLink href="#">{t("legal.security")}</FooterLink>
          </FooterCol>
        </div>

        <div className="border-t border-ink-800 pb-8 pt-6">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-ink-500">
            {t("countriesTitle")}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-400">
            {COUNTRY_LIST.map((c) => (
              <span key={c.code} className="inline-flex items-center gap-1.5">
                <span aria-hidden>{c.flag}</span>
                <span>{c.name.es}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-ink-800 py-6 text-center text-xs text-ink-500">
          © {year} SuperClini — {t("rights")}
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-ink-400 transition-colors hover:text-brand-400"
      >
        {children}
      </a>
    </li>
  );
}
