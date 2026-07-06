import type { Locale } from "@/i18n/routing";

/** Texto localizado nos 3 idiomas do site. Seed é tri-língue (ES/PT/EN obrigatórios). */
export type Localized = Record<Locale, string>;

/** Chave de ilustração customizada (procedural SVG) — ver components/help/illustrations.tsx. */
export type IllustrationKey =
  | "primeros-pasos"
  | "agenda"
  | "sofia"
  | "clinico"
  | "finanzas"
  | "fiscal"
  | "totem"
  | "cuenta"
  | "imagenes"
  | "flujo-sofia"
  | "flujo-migracion"
  | "pantalla-caja";

export type Accent = "brand" | "green" | "violet";

/**
 * Blocos de conteúdo tipados — o corpo de cada artigo é um Block[].
 * Zero dependências novas: renderizado por components/help/ArticleBody.tsx.
 * Cada bloco carrega seu texto localizado, então um artigo serve os 3 idiomas.
 */
export type Block =
  | { type: "p"; text: Localized }
  | { type: "h2"; text: Localized }
  | { type: "steps"; items: Localized[] }
  | { type: "list"; items: Localized[] }
  | {
      type: "callout";
      tone?: "info" | "success" | "warn";
      title?: Localized;
      text: Localized;
    }
  | { type: "illustration"; illustration: IllustrationKey; caption?: Localized }
  | { type: "faq"; items: Array<{ q: Localized; a: Localized }> };

export type Category = {
  id: string;
  /** Slug estável (mesmo nos 3 idiomas). Compõe /ayuda/[category]. */
  slug: string;
  name: Localized;
  description: Localized;
  accent: Accent;
  illustration: IllustrationKey;
  /** Ordem de exibição na home. */
  order: number;
};

export type Article = {
  /** Slug estável dentro da coleção. Compõe /ayuda/[category]/[slug]. */
  slug: string;
  categoryId: string;
  title: Localized;
  excerpt: Localized;
  /** Palavras-chave extras pra busca (nomes de país, sinônimos, termos técnicos). */
  keywords?: string[];
  /** ISO date (YYYY-MM-DD) — data absoluta, nunca relativa. */
  updated: string;
  readingMinutes: number;
  body: Block[];
  /** Slugs de artigos relacionados (mesma ou outra coleção). */
  related?: string[];
  /** Destaque na home ("los más leídos"). */
  featured?: boolean;
};
