import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import Link from "next/link";
import ListingCard from "@/components/ui/ListingCard";
import type { PropertyCard } from "@/lib/format";

export function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[24px] border border-[#F0E9DE] bg-white p-10 text-center">
      <div className="serif text-[24px]">{title}</div>
      <p className="mt-2 text-[14px] text-[#6B6B6B]">{body}</p>
    </div>
  );
}

export default function SearchResults({
  listings,
  total,
  prevHref,
  nextHref,
}: {
  listings: PropertyCard[];
  total?: number;
  prevHref?: string;
  nextHref?: string;
}) {
  if (listings.length === 0) {
    return (
      <Notice
        title="No listings match"
        body="Try a wider price range, a different property type, or another location."
      />
    );
  }
  return (
    <>
      {total != null && (
        <p className="mb-5 text-[12px] text-[#9A9A9A]">
          {total} {total === 1 ? "property" : "properties"} found
        </p>
      )}
      <div className="grid lg:grid-cols-3 gap-5">
        {listings.map((property) => (
          <ListingCard key={property.id} property={property} />
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-6 text-[13px] font-medium">
        {prevHref && (
          <Link href={prevHref} className="underline underline-offset-4">
            <ArrowLeft size={14} className="inline -mt-0.5" /> Previous
          </Link>
        )}
        {nextHref && (
          <Link href={nextHref} className="underline underline-offset-4">
            Next <ArrowRight size={14} className="inline -mt-0.5" />
          </Link>
        )}
      </div>
    </>
  );
}
