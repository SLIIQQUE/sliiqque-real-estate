import "server-only";
import type { Where } from "payload";
import { PROPERTY_TYPES } from "@/lib/propertyTypes";
import {
  buildWhere,
  PAGE_SIZE,
  SORTS,
  type SearchFilters,
} from "@/lib/filters";
import { toCard } from "@/lib/format";
import { getPayloadClient } from "@/lib/payload";

const ACTIVE: Where = { status: { equals: "active" } };

export async function getFeaturedProperties(limit = 3) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "properties",
    where: { and: [ACTIVE, { featured: { equals: true } }] },
    sort: "-createdAt",
    limit,
    depth: 1,
  });
  return res.docs.map(toCard);
}

export async function searchProperties(filters: SearchFilters) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "properties",
    where: buildWhere(filters),
    sort: SORTS[filters.sort],
    limit: PAGE_SIZE,
    page: filters.page,
    depth: 1,
  });
  return {
    listings: res.docs.map(toCard),
    total: res.totalDocs,
    hasNextPage: res.hasNextPage,
    hasPrevPage: res.hasPrevPage,
  };
}

export async function getPropertyBySlug(slug: string) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "properties",
    where: { and: [ACTIVE, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  });
  return res.docs[0] ?? null;
}

export async function getPropertyTypeCounts() {
  const payload = await getPayloadClient();
  const entries = await Promise.all(
    PROPERTY_TYPES.map(async (type) => {
      const r = await payload.count({
        collection: "properties",
        where: { and: [ACTIVE, { propertyType: { equals: type } }] },
      });
      return [type, r.totalDocs] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<
    (typeof PROPERTY_TYPES)[number],
    number
  >;
}

/** Active listing totals for the stats strip. */
export async function getListingStats() {
  const payload = await getPayloadClient();
  const all = await payload.find({
    collection: "properties",
    where: ACTIVE,
    limit: 1000,
    depth: 0,
    pagination: false,
    select: { city: true },
  });
  return {
    listed: all.docs.length,
    cities: new Set(all.docs.map((d) => d.city)).size,
  };
}
