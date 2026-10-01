import { Suspense } from "react";
import ContactForm from "@/components/forms/ContactForm";
import ResultsLoader from "@/components/search/ResultsLoader";
import { Notice } from "@/components/search/SearchResults";
import FilterBar from "@/components/search/FilterBar";
import SearchShell from "@/components/search/SearchShell";
import { getNeighborhoods } from "@/lib/queries/content";
import ListingGridSkeleton from "@/components/ui/ListingGridSkeleton";
import { parseFilters } from "@/lib/filters";

export const metadata = { title: "Properties | SLIIQQUE Real Estate" };

const HEADINGS = {
  buy: "Homes for Sale",
  rent: "Homes for Rent",
  all: "All Homes",
  sell: "Sell Your Home",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parsed = parseFilters(await searchParams);
  const { filters } = parsed;
  const hoods = (await getNeighborhoods()).map((n) => ({
    id: n.id,
    name: n.name,
  }));

  const hrefFor = (page: number) => {
    const q = new URLSearchParams({ mode: filters.mode });
    if (filters.location) q.set("location", filters.location);
    if (filters.type) q.set("type", filters.type);
    if (filters.price) q.set("price", filters.price);
    if (filters.neighborhood)
      q.set("neighborhood", String(filters.neighborhood));
    if (filters.sort !== "newest") q.set("sort", filters.sort);
    if (page > 1) q.set("page", String(page));
    return `/properties?${q}`;
  };

  return (
    <SearchShell heading={HEADINGS[filters.mode]}>
      {filters.mode === "sell" ? (
        <div className="max-w-xl">
          <ContactForm
            type="sell"
            title="Request a valuation"
            subtitle="Tell us about your property and an agent will be in touch"
            placeholder="Address, property type, bedrooms, anything useful…"
            className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#F0E9DE]"
          />
        </div>
      ) : (
        <>
          <FilterBar filters={filters} neighborhoods={hoods} />
          {parsed.ok === false ? (
            <Notice title="Check your search" body={parsed.error} />
          ) : (
            <Suspense
              key={hrefFor(filters.page)}
              fallback={<ListingGridSkeleton count={6} />}
            >
              <ResultsLoader filters={filters} hrefFor={hrefFor} />
            </Suspense>
          )}
        </>
      )}
    </SearchShell>
  );
}
