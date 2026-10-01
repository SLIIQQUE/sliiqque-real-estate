import { Home2, Heart, People, Location } from "@/components/ui/icons";
import { getListingStats } from "@/lib/queries/properties";

export default async function Stats() {
  const { listed, cities } = await getListingStats();
  return (
    <section className="bg-[#102E26] text-white px-6 lg:px-14 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {[
          {
            value: listed.toLocaleString("en-US"),
            label: "Properties Listed",
            icon: Home2,
          },
          {
            value: "98%",
            label: "Client Satisfaction",
            icon: Heart,
          },
          {
            value: "4,200+",
            label: "Happy Clients",
            icon: People,
          },
          {
            value: String(cities),
            label: "Cities & Regions",
            icon: Location,
          },
        ].map((d) => (
          <div
            className="flex items-center gap-4 py-4 lg:py-2 lg:px-8 first:pl-0"
            key={d.label}
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[16px]">
              <d.icon size={20} />
            </div>
            <div>
              <div className="serif text-[28px] leading-none">{d.value}</div>
              <div className="text-[11px] tracking-wide uppercase text-[#7A9A92] mt-1">
                {d.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
