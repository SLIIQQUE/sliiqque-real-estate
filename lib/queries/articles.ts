import "server-only";
import type { Where } from "payload";
import { ARTICLES_PER_PAGE, type ArticleFilters } from "@/lib/articleFilters";
import { getPayloadClient } from "@/lib/payload";

export async function searchArticles(f: ArticleFilters) {
  const payload = await getPayloadClient();
  const and: Where[] = [];
  if (f.category) and.push({ category: { equals: f.category } });
  if (f.q)
    and.push({ or: [{ title: { like: f.q } }, { excerpt: { like: f.q } }] });
  return payload.find({
    collection: "articles",
    where: and.length ? { and } : undefined,
    sort: "-publishedAt",
    limit: ARTICLES_PER_PAGE,
    page: f.page,
    depth: 1,
  });
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return res.docs[0] ?? null;
}

/** Other articles, preferring the same category. */
export async function getRelatedArticles(
  id: number,
  category: string,
  limit = 3,
) {
  const payload = await getPayloadClient();
  const same = await payload.find({
    collection: "articles",
    where: {
      and: [{ id: { not_equals: id } }, { category: { equals: category } }],
    },
    sort: "-publishedAt",
    limit,
    depth: 1,
  });
  if (same.docs.length >= limit) return same.docs;
  const more = await payload.find({
    collection: "articles",
    where: { id: { not_in: [id, ...same.docs.map((d) => d.id)] } },
    sort: "-publishedAt",
    limit: limit - same.docs.length,
    depth: 1,
  });
  return [...same.docs, ...more.docs];
}
