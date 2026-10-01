/** Pure constant shared by collections, filters and client components. */
export const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Villa",
  "Townhouse",
  "Condo",
  "Land",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];
