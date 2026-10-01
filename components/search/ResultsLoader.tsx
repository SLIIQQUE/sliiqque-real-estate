import { Notice } from "./SearchResults";
import SearchResults from "./SearchResults";
import { searchProperties } from "@/lib/queries/properties";
import type { SearchFilters } from "@/lib/filters";

/** Async boundary: fetches listings so the page shell can stream first. */
export default async function ResultsLoader({
  filters,
  hrefFor,
}: {
  filters: SearchFilters;
  hrefFor: (page: number) => string;
}) {
  try {
    const { listings, total, hasNextPage, hasPrevPage } =
      await searchProperties(filters);
    return (
      <SearchResults
        total={total}
        listings={listings}
        prevHref={hasPrevPage ? hrefFor(filters.page - 1) : undefined}
        nextHref={hasNextPage ? hrefFor(filters.page + 1) : undefined}
      />
    );
  } catch (err) {
    console.error("[search] query failed", err);
    return (
      <Notice
        title="Listings are temporarily unavailable"
        body="Please try again in a moment."
      />
    );
  }
}
