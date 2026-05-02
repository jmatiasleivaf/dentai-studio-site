/**
 * Estrutura da navegação do site. SSoT para NavBar (desktop dropdown + mobile)
 * e Footer. Adicionar nova landing? Adicionar aqui + i18n nav.resourcesItems
 * + sitemap.ts.
 */

export type NavResource = {
  /** Path relativo. Ignorado se available=false (renderiza como "em breve" sem link). */
  href: string;
  /** Chave i18n: nav.resourcesItems.{labelKey} para label e .{labelKey}_desc para descrição opcional */
  labelKey: string;
  /** Se false, item aparece como "em breve" desabilitado (cinza, sem hover, sem href). */
  available: boolean;
};

export const NAV_RESOURCES: ReadonlyArray<NavResource> = [
  { href: "/sofia", labelKey: "sofia", available: true },
  { href: "/ia-clinica", labelKey: "iaClinica", available: true },
  { href: "/clinico", labelKey: "clinico", available: true },
  { href: "/totem", labelKey: "totem", available: true },
  { href: "/automatizacoes", labelKey: "automatizacoes", available: false },
] as const;
