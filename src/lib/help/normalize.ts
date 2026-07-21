/**
 * Utilidades de texto puras (sem imports de dados), seguras para o bundle
 * client. A busca (HelpSearch) importa daqui para não arrastar o catálogo
 * de artigos para o JavaScript do cliente.
 */

/** minúsculas, sem acentos, trim, base para casar busca. */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** slug estável para ids de heading (âncoras do TOC). */
export function slugify(s: string): string {
  return normalize(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
