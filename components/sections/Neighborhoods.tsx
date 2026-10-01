import { Star1, ArrowRight, Add, ArrowUp3 } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/format";
import { getNeighborhoods } from "@/lib/queries/content";

export default async function Neighborhoods() {
  const hoods = await getNeighborhoods();
  const spotlight = hoods[0];
  return (
    <section className="bg-[#102E26] text-white px-6 lg:px-14 py-14 lg:py-24">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center max-w-[1280px] mx-auto">
        <div className="relative">
          <div className="rounded-[28px] overflow-hidden aspect-[4/3] lg:aspect-[16/11] bg-[#1B3D34]">
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop"
              alt="City skyline"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div className="absolute -right-6 -bottom-10 lg:-right-10 lg:-bottom-10 w-[200px] lg:w-[280px] rounded-[20px] overflow-hidden shadow-2xl border-[6px] border-[#102E26] aspect-[4/3]">
            {mediaUrl(spotlight?.image) && (
              <Image
                src={mediaUrl(spotlight?.image)!}
                alt={spotlight?.name ?? "Neighborhood"}
                fill
                sizes="280px"
                className="object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <div className="text-[11px] text-white/80">
                {spotlight?.name}
                {" • "}
                {spotlight?.listings}
                {" listings"}
              </div>
              <div className="text-[13px] font-medium text-white">
                Modern family homes
              </div>
            </div>
          </div>
          <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white text-[#102E26] text-[11px] font-medium">
            <Star1 size={12} variant="Bold" className="inline -mt-0.5" /> 4.9
            Neighborhood Rating
          </div>
        </div>
        <div className="lg:pl-12 pt-12 lg:pt-0">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#7A9A92] mb-4">
            Neighborhoods
          </div>
          <h3 className="serif text-[36px] lg:text-[52px] leading-[0.9] tracking-tight">
            Explore the Best Places to Live
          </h3>
          <p className="mt-4 text-[14px] leading-[1.6] text-[#9AB0AA] max-w-[420px]">
            From vibrant downtown lofts to peaceful lakeside villas, find the
            community that matches your lifestyle.
          </p>
          <Link
            href="/properties"
            className="inline-block mt-8 px-6 py-3 rounded-full border border-white/20 text-white text-[13px] hover:bg-white hover:text-[#102E26] transition"
          >
            Explore Neighborhoods <ArrowRight size={14} className="inline" />
          </Link>
          <div className="mt-10 space-y-0 border-t border-white/10">
            {hoods.map((d) => (
              <Link
                href={`/properties?mode=buy&neighborhood=${d.id}`}
                className="flex items-center justify-between py-5 border-b border-white/10 group hover:bg-white/[0.03] px-2 -mx-2 transition"
                key={d.id}
              >
                <div className="flex items-center gap-4">
                  <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[12px] group-hover:border-white/30">
                    <Add size={14} />
                  </span>
                  <div>
                    <div className="serif text-[18px]">{d.name}</div>
                    <div className="text-[11px] text-[#7A9A92]">
                      {d.tagline}
                      {" • "}
                      {d.listings}
                      {" listings"}
                    </div>
                  </div>
                </div>
                <ArrowUp3
                  size={16}
                  className="rotate-45 text-white/30 group-hover:text-white"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
