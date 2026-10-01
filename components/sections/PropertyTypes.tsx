import { createElement } from "react";
import {
  Home2,
  Building,
  House,
  Buildings2,
  Building3,
  Map1,
  ArrowUp3,
} from "@/components/ui/icons";
import { PROPERTY_TYPES } from "@/lib/propertyTypes";
import { getPropertyTypeCounts } from "@/lib/queries/properties";

const ICONS = {
  House: Home2,
  Apartment: Building,
  Villa: House,
  Townhouse: Buildings2,
  Condo: Building3,
  Land: Map1,
} as const;

export default async function PropertyTypes() {
  const counts = await getPropertyTypeCounts();
  return (
    <section className="px-6 lg:px-14 py-14 bg-[#FDF8F1] border-y border-[#F0E9DE]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="serif text-[28px] lg:text-[36px]">
          Explore by Property Type
        </h3>
        <a
          href="/properties"
          className="hidden lg:block text-[13px] underline underline-offset-4"
        >
          View all types
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {PROPERTY_TYPES.map((label) => (
          <a
            href={`/properties?mode=buy&type=${label}`}
            className="block group bg-white border border-[#F0E9DE] rounded-[20px] p-5 hover:bg-[#102E26] hover:border-[#102E26] hover:text-white transition-all duration-300 cursor-pointer"
            key={label}
          >
            <div className="w-10 h-10 rounded-full bg-[#FDF6EF] group-hover:bg-white/10 flex items-center justify-center text-[18px] mb-6 transition-colors">
              {createElement(ICONS[label], { size: 20 })}
            </div>
            <div className="serif text-[18px]">{label}</div>
            <div className="text-[12px] mt-1 opacity-60">
              {counts[label]}
              {" Properties"}
            </div>
            <div className="mt-4 w-6 h-6 rounded-full border border-[#E8DDD0] group-hover:border-white/20 flex items-center justify-center text-[10px]">
              <ArrowUp3 size={12} className="rotate-45" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
