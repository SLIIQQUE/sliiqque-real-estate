import { Suspense } from "react";
import ListingCard from "@/components/ui/ListingCard";
import ListingGridSkeleton from "@/components/ui/ListingGridSkeleton";
import { getFeaturedProperties } from "@/lib/queries/properties";

async function FeaturedCards() {
  const listings = await getFeaturedProperties();
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {listings.map((property) => (
        <ListingCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default function FeaturedListings() {
  return (
    <section
      id="properties"
      className="px-6 lg:px-14 py-14 lg:py-20 bg-[#FFFBF6]"
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
            Featured Listings
          </div>
          <h2 className="serif text-[32px] lg:text-[44px] leading-[0.95] tracking-tight">
            Handpicked for You
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="/properties"
            className="text-[13px] font-medium underline underline-offset-4"
          >
            View All Properties
          </a>
        </div>
      </div>
      <Suspense fallback={<ListingGridSkeleton count={3} />}>
        <FeaturedCards />
      </Suspense>
    </section>
  );
}
