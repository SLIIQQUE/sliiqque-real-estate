import type { Mode } from "./filters";

export interface PriceBand {
  key: string;
  label: string;
  min?: number;
  max?: number;
}

/** Sale bands (USD). The first option in the form is the unfiltered default. */
export const SALE_BANDS: PriceBand[] = [
  { key: "p1", label: "$500k - $1M", min: 500_000, max: 1_000_000 },
  { key: "p2", label: "$1M - $3M", min: 1_000_000, max: 3_000_000 },
  { key: "p3", label: "$3M+", min: 3_000_000 },
];

/** Monthly rent bands (USD). */
export const RENT_BANDS: PriceBand[] = [
  { key: "p1", label: "Under $2k /mo", max: 2_000 },
  { key: "p2", label: "$2k - $5k /mo", min: 2_000, max: 5_000 },
  { key: "p3", label: "$5k+ /mo", min: 5_000 },
];

export const bandsFor = (mode: Mode) =>
  mode === "rent" ? RENT_BANDS : SALE_BANDS;
