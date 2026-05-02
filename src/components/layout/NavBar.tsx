"use client";

import * as React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ContactDialog } from "@/components/home/ContactDialog";
import { NAV_RESOURCES } from "@/lib/site-nav";
import { LocaleSwitcher } from "./LocaleSwitcher";

const SECTIONS = [
  { href: "/#features", labelKey: "features" },
  { href: "/#pricing", labelKey: "pricing" },
] as const;

/**
 * NavBar com 2 modos visuais (transparent na home topo / sólido em scroll e
 * outras pages) + dropdown "Recursos" vinculando as landings de feature.
 */
export function NavBar() {
  const t = useTranslations("nav");
  const tRes = useTranslations("nav.resourcesItems");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

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
          {/* Dropdown Recursos */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={resourcesOpen}
              className={`inline-flex items-center gap-1 ${linkClass}`}
            >
              {t("resources")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {resourcesOpen ? (
              <div
                role="menu"
                className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
              >
                <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white py-2 shadow-2xl dark:border-ink-800 dark:bg-ink-900">
                  {NAV_RESOURCES.map((r) =>
                    r.available ? (
                      <Link
                        key={r.labelKey}
                        href={r.href as never}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 hover:text-brand-700 dark:text-ink-200 dark:hover:bg-ink-800 dark:hover:text-brand-400"
                        onClick={() => setResourcesOpen(false)}
                      >
                        {tRes(r.labelKey as never)}
                      </Link>
                    ) : (
                      <div
                        key={r.labelKey}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-ink-400 dark:text-ink-600"
                        aria-disabled
                      >
                        <span>{tRes(r.labelKey as never)}</span>
                        <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                          {tRes("comingSoon")}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : null}
          </div>

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
              {/* Recursos: lista expandida no mobile, sem dropdown */}
              <div className="border-b border-ink-100 py-3 dark:border-ink-800">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  {t("resources")}
                </div>
                <ul className="mt-2 space-y-1">
                  {NAV_RESOURCES.map((r) => (
                    <li key={r.labelKey}>
                      {r.available ? (
                        <Link
                          href={r.href as never}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-800 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                        >
                          {tRes(r.labelKey as never)}
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-ink-400 dark:text-ink-600">
                          <span>{tRes(r.labelKey as never)}</span>
                          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                            {tRes("comingSoon")}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

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
