import { Heart, Location } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import type { PropertyCard } from "@/lib/format";

export default function ListingCard({
  property: d,
}: {
  property: PropertyCard;
}) {
  return (
    <div className="relative group bg-white rounded-[24px] overflow-hidden border border-[#F0E9DE] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-300">
      <div className="relative h-[260px] overflow-hidden bg-[#EFE7DB]">
        {d.image && (
          <Image
            src={d.image}
            alt={d.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          {d.featured && (
            <span className="px-3 py-1 rounded-full bg-white text-[11px] font-medium">
              Featured
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-[#102E26] text-white text-[11px]">
            {d.badge}
          </span>
        </div>
        <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition">
          <Heart size={16} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-white text-[11px]">
            {d.beds}
            {" • "}
            {d.baths}
            {" • "}
            {d.sqft}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="serif text-[19px] leading-tight">
              <Link
                href={`/properties/${d.slug}`}
                className="after:absolute after:inset-0"
              >
                {d.title}
              </Link>
            </div>
            <div className="text-[12px] text-[#8A8A8A] mt-1 flex items-center gap-1">
              <Location size={12} variant="Bold" />
              {d.location}
            </div>
          </div>
          <div className="serif text-[18px] font-semibold">{d.price}</div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-[#6B6B6B]">
          {[d.beds, d.baths, d.sqft].map((chip, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full bg-[#FDF6EF] border border-[#F0E9DE]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
