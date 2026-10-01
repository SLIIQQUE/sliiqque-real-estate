import { Star1, Sms, Location, ArrowRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/format";
import { getAgents } from "@/lib/queries/content";

export default async function Agents() {
  const agents = await getAgents();
  return (
    <section id="agents" className="px-6 lg:px-14 py-14 lg:py-20 bg-[#FFFBF6]">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A]">
            Our Agents
          </div>
          <h3 className="serif text-[32px] lg:text-[42px] mt-2 leading-[0.95]">
            Meet Our Expert Team
          </h3>
        </div>
        <a
          href="/agents"
          className="hidden lg:block text-[13px] underline underline-offset-4"
        >
          View all agents
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((d) => (
          <div
            className="bg-white rounded-[24px] border border-[#F0E9DE] overflow-hidden p-3 group hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.15)] transition"
            key={d.id}
          >
            <div className="rounded-[16px] overflow-hidden aspect-[4/3] relative">
              {mediaUrl(d.photo) && (
                <Image
                  src={mediaUrl(d.photo)!}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover group-hover:scale-[1.02] transition duration-500"
                />
              )}
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-white text-[11px] font-medium flex items-center gap-1">
                <Star1 size={12} variant="Bold" className="text-[#C26A4A]" />
                {d.rating?.toFixed(1)}{" "}
                <span className="text-[#9A9A9A]">({d.reviewCount})</span>
              </div>
            </div>
            <div className="px-2 pt-4 pb-2">
              <div className="serif text-[16px] font-medium">{d.name}</div>
              <div className="text-[12px] text-[#8A8A8A] mt-0.5">{d.role}</div>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/agents/${d.slug}`}
                  className="flex-1 py-2 rounded-full bg-[#102E26] text-white text-[12px] text-center hover:bg-[#14352E]"
                >
                  View Profile
                </Link>
                <Link
                  href={`/agents/${d.slug}#contact`}
                  aria-label={`Message ${d.name}`}
                  className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center text-[12px] hover:bg-[#102E26] hover:text-white"
                >
                  <Sms size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[24px] bg-[#FDF8F1] border border-[#F0E9DE] px-6 lg:px-10 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#102E26] text-white flex items-center justify-center">
            <Location size={18} />
          </div>
          <div>
            <div className="serif text-[20px] leading-none">
              Your Next Chapter Starts Here
            </div>
            <div className="text-[12px] text-[#8A8A8A] mt-1">
              Talk to any of our {agents.length}{" "}
              {agents.length === 1 ? "agent" : "agents"} about buying, selling
              or renting.
            </div>
          </div>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[#C26A4A] text-white text-[13px] font-medium hover:bg-[#B35E3E] transition"
        >
          Get in Touch <ArrowRight size={14} className="inline" />
        </Link>
      </div>
    </section>
  );
}
