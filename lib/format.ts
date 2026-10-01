import type { Media, Property as PropertyDoc } from "@/payload-types";

export interface PropertyCard {
  id: number;
  slug: string;
  image: string | null;
  title: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  badge: "For Sale" | "For Rent";
  featured: boolean;
}

const CURRENCY_LOCALE = { USD: "en-US", NGN: "en-NG" } as const;

export function formatPrice(
  price: number,
  currency: "USD" | "NGN",
  listing: "sale" | "rent",
) {
  const text = new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
  return listing === "rent" ? `${text}/mo` : text;
}

const count = (n: number | null | undefined, unit: string) =>
  n == null ? "—" : `${n} ${unit}${n === 1 ? "" : "s"}`;

/** Resolve a populated upload relation to a URL (preferring a resized variant). */
export function mediaUrl(
  m: number | Media | null | undefined,
  size: "card" | "hero" | "avatar" = "card",
) {
  if (!m || typeof m === "number") return null;
  return m.sizes?.[size]?.url ?? m.url ?? null;
}

export function toCard(p: PropertyDoc): PropertyCard {
  return {
    id: p.id,
    slug: p.slug,
    image: mediaUrl(p.photos?.[0]?.image),
    title: p.title,
    location: [p.city, p.region].filter(Boolean).join(", "),
    price: formatPrice(p.price, p.currency, p.listingType),
    beds: count(p.bedrooms, "Bed"),
    baths: count(p.bathrooms, "Bath"),
    sqft:
      p.squareFootage == null
        ? "—"
        : `${p.squareFootage.toLocaleString("en-US")} sqft`,
    badge: p.listingType === "rent" ? "For Rent" : "For Sale",
    featured: Boolean(p.featured),
  };
}
