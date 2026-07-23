"use client";

import * as React from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Brain,
  Stethoscope,
  Tablet,
  Workflow,
  LifeBuoy,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ContactDialog } from "@/components/home/ContactDialog";
import { NAV_RESOURCES } from "@/lib/site-nav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

/**
 * `page: true` = rota de verdade, precisa do Link locale-aware (senão o usuário
 * em /pt cai no idioma padrão). Sem a flag é âncora na home, e âncora é <a>.
 */
const SECTIONS = [
  { href: "/#features", labelKey: "features", page: false },
  { href: "/precios", labelKey: "pricing", page: true },
] as const;

/** Ícone por landing, chaveado pelo labelKey de NAV_RESOURCES (SSoT em site-nav.ts). */
const RESOURCE_ICONS: Record<string, LucideIcon> = {
  sofia: MessageCircle,
  iaClinica: Brain,
  clinico: Stethoscope,
  totem: Tablet,
  automatizacoes: Workflow,
  ayuda: LifeBuoy,
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

/** Sublinhado que varre da esquerda no hover, assinatura visual do header. */
function Underline({ overlay }: { overlay: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100",
        overlay ? "bg-white/80" : "bg-brand-gradient"
      )}
    />
  );
}

/** Link de navegação desktop com sublinhado animado + cor overlay-aware. */
function NavItem({
  href,
  overlay,
  page = false,
  children,
}: {
  href: string;
  overlay: boolean;
  page?: boolean;
  children: React.ReactNode;
}) {
  const className = cn(
    "group relative inline-flex items-center py-1.5 text-sm font-medium transition-colors",
    overlay
      ? "text-white/85 hover:text-white"
      : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
  );

  if (page) {
    return (
      <Link href={href as never} className={className}>
        {children}
        <Underline overlay={overlay} />
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
      <Underline overlay={overlay} />
    </a>
  );
}

/**
 * NavBar com 2 modos: overlay transparente (home no topo, sobre o hero escuro)
 * e sólido em vidro (scrollado, páginas internas, ou com o menu mobile aberto).
 * O overlay real depende do Hero subir por baixo do header via `-mt-nav` (ambos
 * travados no token `nav` do Tailwind). Dropdown "Recursos" rico + drawer mobile
 * com safe-area e cuidado extremo de toque.
 */
export function NavBar() {
  const t = useTranslations("nav");
  const tRes = useTranslations("nav.resourcesItems");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);

  // Hero da home passou a ser CLARO (Direção B, 2026-07-23). A barra fica sólida
  // em vidro em todas as páginas; some o overlay transparente de texto branco que
  // exigia hero escuro. O Hero deixou de usar `-mt-nav` (não sobe mais por baixo).
  const overlay = false;

  // Lock de scroll do body com o drawer aberto.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Fecha tudo ao trocar de rota.
  React.useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  // Escape fecha drawer e dropdown.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setResourcesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        // Hairline inferior via ::after (não afeta a altura do box → -mt-nav casa exato).
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:transition-opacity after:duration-300 after:content-['']",
        overlay
          ? "bg-transparent after:opacity-0"
          : "bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl after:bg-gradient-to-r after:from-transparent after:via-ink-200/70 after:to-transparent after:opacity-100 dark:bg-ink-950/80 dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] dark:after:via-white/10"
      )}
    >
      <Container className="relative z-50 flex h-nav items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="SuperClini"
          className={cn(
            "flex items-center transition-transform hover:scale-[1.02]",
            overlay && "drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
          )}
        >
          <Logo onDark={overlay} />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("menuLabel")}>
          {/* Dropdown Recursos, painel rico com ícone + descrição */}
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
              className={cn(
                "group relative inline-flex items-center gap-1 py-1.5 text-sm font-medium transition-colors",
                overlay
                  ? "text-white/85 hover:text-white"
                  : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
              )}
            >
              {t("resources")}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  resourcesOpen && "rotate-180"
                )}
                aria-hidden
              />
              <Underline overlay={overlay} />
            </button>

            <AnimatePresence>
              {resourcesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: PANEL_EASE }}
                  role="menu"
                  className="absolute left-1/2 top-full w-[24rem] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/95">
                    {NAV_RESOURCES.map((r) => {
                      const Icon = RESOURCE_ICONS[r.labelKey] ?? Sparkles;
                      return r.available ? (
                        <Link
                          key={r.labelKey}
                          href={r.href as never}
                          role="menuitem"
                          onClick={() => setResourcesOpen(false)}
                          className="group/item flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-ink-50 dark:hover:bg-white/5"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover/item:bg-brand-gradient group-hover/item:text-white dark:bg-brand-400/10 dark:text-brand-300">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 text-sm font-semibold text-ink-900 dark:text-white">
                              {tRes(r.labelKey as never)}
                              <ArrowRight
                                className="h-3.5 w-3.5 -translate-x-1 text-brand-500 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                aria-hidden
                              />
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-ink-500 dark:text-ink-400">
                              {tRes(`${r.labelKey}_desc` as never)}
                            </span>
                          </span>
                        </Link>
                      ) : (
                        <div
                          key={r.labelKey}
                          aria-disabled
                          className="flex items-center justify-between gap-3 rounded-2xl p-3 text-sm font-medium text-ink-400 dark:text-ink-600"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-600">
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            {tRes(r.labelKey as never)}
                          </span>
                          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                            {tRes("comingSoon")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {SECTIONS.map((s) => (
            <NavItem key={s.href} href={s.href} overlay={overlay} page={s.page}>
              {t(s.labelKey)}
            </NavItem>
          ))}
        </nav>

        {/* Cluster direito */}
        <div className="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher onDark={overlay} />
          <Button
            asChild
            size="sm"
            variant={overlay ? "outline" : "ghost"}
            className={cn(
              "hidden md:inline-flex",
              overlay &&
                "!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
            )}
          >
            <a href="https://app.superclini.com">{t("login")}</a>
          </Button>
          {/* "Agendar demo" desce para secundário: quem quer falar com vendas
              continua tendo o caminho, mas o CTA primário passa a ser o
              self-service, que converte sem esperar por um humano. */}
          <ContactDialog
            trigger={({ onClick }) => (
              <Button
                size="sm"
                variant={overlay ? "outline" : "ghost"}
                className={cn(
                  "hidden lg:inline-flex",
                  overlay &&
                    "!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
                )}
                onClick={onClick}
              >
                {t("demo")}
              </Button>
            )}
          />
          <Button
            asChild
            size="sm"
            variant={overlay ? "secondary" : "primary"}
            className="hidden md:inline-flex"
          >
            <Link href="/registro">{t("signup")}</Link>
          </Button>
          {/* Hambúrguer mobile (≥44px) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className={cn(
              "inline-flex h-touch-md w-touch-md items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden",
              overlay
                ? "text-white hover:bg-white/10"
                : "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm lg:hidden"
              aria-hidden
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: PANEL_EASE }}
              className="fixed inset-x-0 top-0 z-40 max-h-[100dvh] overflow-y-auto rounded-b-3xl bg-white pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-nav shadow-2xl lg:hidden dark:bg-ink-950"
            >
              <nav className="px-5 pt-2" aria-label={t("menuLabel")}>
                {/* Recursos */}
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  {t("resources")}
                </div>
                <ul className="mt-2 space-y-1">
                  {NAV_RESOURCES.map((r) => {
                    const Icon = RESOURCE_ICONS[r.labelKey] ?? Sparkles;
                    return (
                      <li key={r.labelKey}>
                        {r.available ? (
                          <Link
                            href={r.href as never}
                            onClick={() => setOpen(false)}
                            className="flex min-h-touch-md items-center gap-3 rounded-2xl px-3 py-2.5 text-base font-medium text-ink-800 transition-colors hover:bg-ink-50 active:bg-ink-100 dark:text-ink-100 dark:hover:bg-white/5"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:bg-brand-400/10 dark:text-brand-300">
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            <span className="min-w-0">
                              <span className="block leading-tight">
                                {tRes(r.labelKey as never)}
                              </span>
                              <span className="mt-0.5 block text-xs font-normal leading-snug text-ink-500 dark:text-ink-400">
                                {tRes(`${r.labelKey}_desc` as never)}
                              </span>
                            </span>
                          </Link>
                        ) : (
                          <div className="flex min-h-touch-md items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-base font-medium text-ink-400 dark:text-ink-600">
                            <span className="flex items-center gap-3">
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-600">
                                <Icon className="h-5 w-5" aria-hidden />
                              </span>
                              {tRes(r.labelKey as never)}
                            </span>
                            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                              {tRes("comingSoon")}
                            </span>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Seções */}
                <div className="mt-4 border-t border-ink-100 pt-2 dark:border-white/10">
                  {SECTIONS.map((s) => {
                    const cls =
                      "flex min-h-touch-md items-center rounded-2xl px-3 py-3 text-base font-semibold text-ink-800 transition-colors hover:bg-ink-50 active:bg-ink-100 dark:text-ink-100 dark:hover:bg-white/5";
                    return s.page ? (
                      <Link
                        key={s.href}
                        href={s.href as never}
                        onClick={() => setOpen(false)}
                        className={cls}
                      >
                        {t(s.labelKey)}
                      </Link>
                    ) : (
                      <a
                        key={s.href}
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className={cls}
                      >
                        {t(s.labelKey)}
                      </a>
                    );
                  })}
                </div>

                {/* CTAs */}
                <div className="mt-4 flex flex-col gap-3 border-t border-ink-100 pt-4 dark:border-white/10">
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <a href="https://app.superclini.com">{t("login")}</a>
                  </Button>
                  <ContactDialog
                    trigger={({ onClick }) => (
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          onClick();
                          setOpen(false);
                        }}
                      >
                        {t("demo")}
                      </Button>
                    )}
                  />
                  {/* CTA primário no mobile fica por ÚLTIMO: é o mais perto do
                      polegar em tela alta, e é o que queremos que seja tocado. */}
                  <Button asChild size="lg" className="w-full">
                    <Link href="/registro" onClick={() => setOpen(false)}>
                      {t("signup")}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
