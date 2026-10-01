import type { Where } from "payload";
import { PROPERTY_TYPES } from "./propertyTypes";
import { bandsFor } from "./priceBands";

/** `all` shows homes for sale and for rent together (used by neighborhood links). */
export type Mode = "buy" | "rent" | "sell" | "all";
export const PAGE_SIZE = 12;
export const SORTS = {
  newest: "-createdAt",
  "price-asc": "price",
  "price-desc": "-price",
} as const;
export type SortKey = keyof typeof SORTS;

export interface SearchFilters {
  mode: Mode;
  location?: string;
  type?: (typeof PROPERTY_TYPES)[number];
  price?: string;
  neighborhood?: number;
  sort: SortKey;
  page: number;
}

type Raw = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

/** Only letters, digits, spaces and basic punctuation: no raw input reaches `where` otherwise. */
const SAFE_LOCATION = /^[\p{L}\p{N} .,'-]{1,60}$/u;

export type ParsedFilters =
  | { ok: true; filters: SearchFilters }
  | { ok: false; error: string; filters: SearchFilters };

export function parseFilters(raw: Raw): ParsedFilters {
  const m = first(raw.mode);
  const mode: Mode = m === "rent" || m === "sell" || m === "all" ? m : "buy";
  const filters: SearchFilters = {
    mode,
    sort: "newest",
    page: Math.min(500, Math.max(1, parseInt(first(raw.page) ?? "1", 10) || 1)),
  };

  const sort = first(raw.sort);
  if (sort && sort in SORTS) filters.sort = sort as SortKey;

  const hood = parseInt(first(raw.neighborhood) ?? "", 10);
  if (Number.isInteger(hood) && hood > 0) filters.neighborhood = hood;

  const location = first(raw.location)?.trim();
  if (location) {
    if (!SAFE_LOCATION.test(location)) {
      return {
        ok: false,
        error: "Enter a city or region, for example “Austin, TX”.",
        filters,
      };
    }
    filters.location = location;
  }

  const type = first(raw.type);
  if (type) {
    if (!(PROPERTY_TYPES as readonly string[]).includes(type)) {
      return { ok: false, error: "Unknown property type.", filters };
    }
    filters.type = type as SearchFilters["type"];
  }

  const price = first(raw.price);
  // Price bands differ between sale and rent, so they only apply to a single mode.
  if (price && mode !== "all") {
    if (!bandsFor(mode).some((b) => b.key === price)) {
      return { ok: false, error: "Unknown price range.", filters };
    }
    filters.price = price;
  }
  return { ok: true, filters };
}

export function buildWhere(f: SearchFilters): Where {
  const and: Where[] = [{ status: { equals: "active" } }];
  if (f.mode !== "all") {
    and.push({ listingType: { equals: f.mode === "rent" ? "rent" : "sale" } });
  }
  if (f.type) and.push({ propertyType: { equals: f.type } });
  if (f.neighborhood) and.push({ neighborhood: { equals: f.neighborhood } });

  if (f.location) {
    const [place, region] = f.location.split(",").map((s) => s.trim());
    if (region) {
      and.push({ city: { like: place } }, { region: { like: region } });
    } else {
      and.push({
        or: [{ city: { like: place } }, { region: { like: place } }],
      });
    }
  }

  const band = bandsFor(f.mode).find((b) => b.key === f.price);
  if (band) {
    and.push({ currency: { equals: "USD" } });
    if (band.min != null) and.push({ price: { greater_than_equal: band.min } });
    if (band.max != null) and.push({ price: { less_than_equal: band.max } });
  }
  return { and };
}
