import {} from "@/components/ui/icons";
import Bar from "./Bar";

/** Mirrors ListingCard's markup and dimensions exactly. */
export default function ListingCardSkeleton() {
  return (
    <div
      className="bg-white rounded-[24px] overflow-hidden border border-[#F0E9DE]"
      aria-hidden
    >
      <div className="relative h-[260px] overflow-hidden bg-[#EFE7DB] animate-pulse">
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/70 text-[11px] text-transparent">
            Featured
          </span>
          <span className="px-3 py-1 rounded-full bg-white/50 text-[11px] text-transparent">
            For Sale
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="px-3 py-1 rounded-full bg-white/50 text-[11px] text-transparent">
            4 Beds • 4 Baths • 4,520 sqft
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="serif text-[19px] leading-tight">
              <Bar>Palmview Residences</Bar>
            </div>
            <div className="text-[12px] mt-1 flex items-center gap-1">
              <Bar>Los Angeles, CA</Bar>
            </div>
          </div>
          <div className="serif text-[18px] font-semibold">
            <Bar>$2,450,000</Bar>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px]">
          {["4 Beds", "4 Baths", "4,520 sqft"].map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 rounded-full bg-[#FDF6EF] border border-[#F0E9DE]"
            >
              <Bar className="rounded-full">{chip}</Bar>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
