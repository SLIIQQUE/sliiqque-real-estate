"use client";

import { SearchNormal1 } from "@/components/ui/icons";
import Link from "next/link";
import { useState } from "react";
import { SORTS, type SearchFilters } from "@/lib/filters";
import { bandsFor } from "@/lib/priceBands";
import { PROPERTY_TYPES } from "@/lib/propertyTypes";

const FIELD =
  "mt-1 w-full rounded-full bg-[#FDF8F1] border border-[#F0E9DE] px-4 py-2.5 text-[13px] outline-none focus:border-[#C26A4A]/40 focus:bg-white transition";
const LABEL = "text-[11px] uppercase tracking-wide text-[#9A9A9A]";
const SORT_LABELS: Record<keyof typeof SORTS, string> = {
  newest: "Newest first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

/** Search filters as a plain GET form: shareable URLs, works without JavaScript. */
export default function FilterBar({
  filters,
  neighborhoods,
}: {
  filters: SearchFilters;
  neighborhoods: { id: number; name: string }[];
}) {
  const [mode, setMode] = useState<"buy" | "rent" | "all">(
    filters.mode === "rent" || filters.mode === "all" ? filters.mode : "buy",
  );

  return (
    <form
      action="/properties"
      className="mb-8 rounded-[24px] bg-white border border-[#F0E9DE] p-4 lg:p-5"
    >
      <input type="hidden" name="mode" value={mode} />
      <div className="flex flex-wrap items-center gap-1 mb-4">
        {(["buy", "rent", "all"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`px-5 py-2 rounded-full text-[13px] font-medium transition ${mode === m ? "bg-[#C26A4A] text-white shadow" : "text-[#6B6B6B] hover:bg-[#F5F1EB]"}`}
          >
            {m === "buy" ? "Buy" : m === "rent" ? "Rent" : "All"}
          </button>
        ))}
        <Link
          href="/properties?mode=sell"
          className="px-5 py-2 rounded-full text-[13px] font-medium text-[#6B6B6B] hover:bg-[#F5F1EB] transition"
        >
          Sell
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <label className="block lg:col-span-1">
          <span className={LABEL}>Location</span>
          <input
            name="location"
            defaultValue={filters.location}
            maxLength={60}
            placeholder="City or state"
            className={FIELD}
          />
        </label>
        <label className="block">
          <span className={LABEL}>Property type</span>
          <select
            name="type"
            defaultValue={filters.type ?? ""}
            className={FIELD}
          >
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={LABEL}>
            {mode === "rent" ? "Monthly rent" : "Price"}
          </span>
          <select
            name="price"
            key={mode}
            disabled={mode === "all"}
            defaultValue={filters.mode === mode ? (filters.price ?? "") : ""}
            className={FIELD}
          >
            <option value="">
              {mode === "all" ? "Choose Buy or Rent" : "Any price"}
            </option>
            {bandsFor(mode).map((b) => (
              <option key={b.key} value={b.key}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={LABEL}>Neighborhood</span>
          <select
            name="neighborhood"
            defaultValue={filters.neighborhood ?? ""}
            className={FIELD}
          >
            <option value="">Anywhere</option>
            {neighborhoods.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={LABEL}>Sort by</span>
          <select name="sort" defaultValue={filters.sort} className={FIELD}>
            {(Object.keys(SORTS) as (keyof typeof SORTS)[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#102E26] text-white text-[13px] font-medium hover:bg-[#14352E] transition"
        >
          <SearchNormal1 size={16} /> Search properties
        </button>
        <Link
          href="/properties"
          className="text-[13px] underline underline-offset-4 text-[#6B6B6B]"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
