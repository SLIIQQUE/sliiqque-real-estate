export const ARTICLE_CATEGORIES = [
  "Market Trends",
  "Buying Guide",
  "Selling Tips",
  "Renting",
  "Investment",
] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];
export const ARTICLES_PER_PAGE = 9;

export interface ArticleFilters {
  category?: ArticleCategory;
  q?: string;
  page: number;
}

type Raw = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;
const SAFE_QUERY = /^[\p{L}\p{N} .,'&-]{1,60}$/u;

/** Unknown categories and unsafe search text are dropped, never forwarded to a query. */
export function parseArticleFilters(raw: Raw): ArticleFilters {
  const category = ARTICLE_CATEGORIES.find((c) => c === first(raw.category));
  const q = first(raw.q)?.trim();
  return {
    category,
    q: q && SAFE_QUERY.test(q) ? q : undefined,
    page: Math.min(200, Math.max(1, parseInt(first(raw.page) ?? "1", 10) || 1)),
  };
}
