import type { PropertyType } from "./propertyTypes";

export type TypeCounts = Record<PropertyType, { sale: number; rent: number }>;

/**
 * Link and label for a property-type tile. The number is all active listings of that type
 * (for sale and for rent), the same basis the neighborhood counts use, and the link opens
 * the search in "all" mode, so the figure always equals the number of results.
 */
export function typeTarget(type: PropertyType, counts: TypeCounts) {
  const count = counts[type].sale + counts[type].rent;
  return {
    href: `/properties?mode=all&type=${type}`,
    count,
    label: `${count} ${count === 1 ? "listing" : "listings"}`,
  };
}
