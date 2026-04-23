"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

const SECTIONS = [
  { href: "/#features", labelKey: "features" },
  { href: "/#ai", labelKey: "ai" },
  { href: "/#whatsapp", labelKey: "whatsapp" },
  { href: "/#pricing", labelKey: "pricing" },
] as const;

export function NavBar() {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/60 bg-white/80 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/80">
      <Container className="flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="SuperClini">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("menuLabel")}>
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
            >
              {t(s.labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
          <Button asChild size="sm" variant="ghost" className="hidden md:inline-flex">
            <a href="https://app.superclini.com">{t("login")}</a>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="https://app.superclini.com">{t("demo")}</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="inline-flex h-touch-md w-touch-md items-center justify-center rounded-xl text-ink-700 hover:bg-ink-100 lg:hidden dark:text-ink-200 dark:hover:bg-ink-800"
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
                <Button asChild size="lg">
                  <a href="https://app.superclini.com">{t("demo")}</a>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
