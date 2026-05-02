"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ContactDialog } from "@/components/home/ContactDialog";
import { LocaleSwitcher } from "./LocaleSwitcher";

const SECTIONS = [
  { href: "/#features", labelKey: "features" },
  { href: "/#ai", labelKey: "ai" },
  { href: "/#whatsapp", labelKey: "whatsapp" },
  { href: "/#pricing", labelKey: "pricing" },
] as const;

/**
 * NavBar com 2 modos:
 * - Padrão: bg-white/80 backdrop blur (todas páginas exceto home topo)
 * - Transparent: aparece transparente no topo da home (Hero com video bg),
 *   ganha bg sólido ao scrollar > 80px.
 *
 * Detecta home via pathname (/{locale} sem path extra).
 */
export function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Home = pathname é apenas /[locale] ou /[locale]/ — sem segmentos extras
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);
  const transparent = isHome && !scrolled;

  React.useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const headerClass = transparent
    ? "sticky top-0 z-50 border-b border-transparent bg-transparent transition-colors duration-300"
    : "sticky top-0 z-50 border-b border-ink-100/60 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-ink-800 dark:bg-ink-950/80";

  const linkClass = transparent
    ? "text-sm font-medium text-white/85 transition-colors hover:text-white"
    : "text-sm font-medium text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400";

  return (
    <header className={headerClass}>
      <Container className="flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="SuperClini">
          <Logo onDark={transparent} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("menuLabel")}>
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className={linkClass}>
              {t(s.labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
          <Button
            asChild
            size="sm"
            variant={transparent ? "outline" : "ghost"}
            className={
              transparent
                ? "hidden border-white/40 text-white hover:border-white hover:text-white md:inline-flex"
                : "hidden md:inline-flex"
            }
          >
            <a href="https://app.superclini.com">{t("login")}</a>
          </Button>
          <ContactDialog
            trigger={({ onClick }) => (
              <Button
                size="sm"
                variant={transparent ? "secondary" : "primary"}
                className="hidden md:inline-flex"
                onClick={onClick}
              >
                {t("demo")}
              </Button>
            )}
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className={
              transparent
                ? "inline-flex h-touch-md w-touch-md items-center justify-center rounded-xl text-white hover:bg-white/10 lg:hidden"
                : "inline-flex h-touch-md w-touch-md items-center justify-center rounded-xl text-ink-700 hover:bg-ink-100 lg:hidden dark:text-ink-200 dark:hover:bg-ink-800"
            }
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open ? (
        <div className="lg:hidden">
          <div className="border-t border-ink-100 bg-white px-5 pb-6 pt-4 dark:border-ink-800 dark:bg-ink-950">
            <nav className="flex flex-col" aria-label={t("menuLabel")}>
              {SECTIONS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink-100 py-4 text-base font-medium text-ink-800 dark:border-ink-800 dark:text-ink-200"
                >
                  {t(s.labelKey)}
                </a>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="outline" size="lg">
                  <a href="https://app.superclini.com">{t("login")}</a>
                </Button>
                <ContactDialog
                  trigger={({ onClick }) => (
                    <Button
                      size="lg"
                      onClick={() => {
                        onClick();
                        setOpen(false);
                      }}
                    >
                      {t("demo")}
                    </Button>
                  )}
                />
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
