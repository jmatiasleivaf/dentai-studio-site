import type { Locale } from "@/i18n/routing";
import { HELP_CATEGORIES } from "./categories";
import { HELP_ARTICLES } from "./articles";
import { normalize, slugify } from "./normalize";
import type { Article, Block, Category, Localized } from "./types";

export type { Article, Block, Category, Localized } from "./types";
export { HELP_CATEGORIES } from "./categories";
export { normalize, slugify } from "./normalize";

export function getCategories(): Category[] {
  return [...HELP_CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return HELP_CATEGORIES.find((c) => c.id === id);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return HELP_ARTICLES.filter((a) => a.categoryId === categoryId);
}

export function countArticles(categoryId: string): number {
  return getArticlesByCategory(categoryId).length;
}

/** Localiza um artigo pela dupla (slug da categoria, slug do artigo). */
export function getArticle(categorySlug: string, articleSlug: string): { category: Category; article: Article } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const article = HELP_ARTICLES.find((a) => a.categoryId === category.id && a.slug === articleSlug);
  if (!article) return undefined;
  return { category, article };
}

export function getFeaturedArticles(): Array<{ article: Article; category: Category }> {
  return HELP_ARTICLES.filter((a) => a.featured)
    .map((article) => ({ article, category: getCategoryById(article.categoryId)! }))
    .filter((x) => x.category);
}

export function getRelatedArticles(article: Article): Array<{ article: Article; category: Category }> {
  const slugs = article.related ?? [];
  return slugs
    .map((slug) => HELP_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a))
    .map((a) => ({ article: a, category: getCategoryById(a.categoryId)! }))
    .filter((x) => x.category);
}

/** Todos os pares (categoria, artigo), usado por generateStaticParams e sitemap. */
export function getAllArticlePaths(): Array<{ categorySlug: string; articleSlug: string }> {
  return HELP_ARTICLES.map((a) => ({
    categorySlug: getCategoryById(a.categoryId)!.slug,
    articleSlug: a.slug,
  }));
}

/** Extrai texto corrido de um artigo (para haystack de busca). */
function articleText(article: Article, locale: Locale): string {
  const parts: string[] = [article.title[locale], article.excerpt[locale], ...(article.keywords ?? [])];
  for (const block of article.body) {
    switch (block.type) {
      case "p":
        parts.push(block.text[locale]);
        break;
      case "h2":
        parts.push(block.text[locale]);
        break;
      case "steps":
      case "list":
        parts.push(...block.items.map((i) => i[locale]));
        break;
      case "callout":
        if (block.title) parts.push(block.title[locale]);
        parts.push(block.text[locale]);
        break;
      case "faq":
        for (const item of block.items) parts.push(item.q[locale], item.a[locale]);
        break;
    }
  }
  return parts.join(" ");
}

export type SearchEntry = {
  kind: "category" | "article";
  title: string;
  excerpt: string;
  categorySlug: string;
  articleSlug?: string;
  categoryName: string;
  /** Texto normalizado para casar a query (não exibido). */
  haystack: string;
};

/** Índice de busca client-side para um idioma. Gerado no server e serializado. */
export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const category of getCategories()) {
    entries.push({
      kind: "category",
      title: category.name[locale],
      excerpt: category.description[locale],
      categorySlug: category.slug,
      categoryName: category.name[locale],
      haystack: normalize(`${category.name[locale]} ${category.description[locale]} ${category.id}`),
    });
  }

  for (const article of HELP_ARTICLES) {
    const category = getCategoryById(article.categoryId)!;
    entries.push({
      kind: "article",
      title: article.title[locale],
      excerpt: article.excerpt[locale],
      categorySlug: category.slug,
      articleSlug: article.slug,
      categoryName: category.name[locale],
      haystack: normalize(articleText(article, locale) + " " + category.name[locale]),
    });
  }

  return entries;
}

/** Headings h2 de um artigo, com id de âncora, alimenta o TOC. */
export function getHeadings(article: Article, locale: Locale): Array<{ id: string; text: string }> {
  return article.body
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugify(b.text[locale]), text: b.text[locale] }));
}

export function pick(text: Localized, locale: Locale): string {
  return text[locale] ?? text.es;
}
