import { Sms } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import { mediaUrl } from "@/lib/format";
import type { Agent } from "@/payload-types";

export default function AgentCard({ agent }: { agent: Agent }) {
  const photo = mediaUrl(agent.photo);
  return (
    <div className="relative bg-white rounded-[24px] border border-[#F0E9DE] overflow-hidden p-3 group hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.15)] transition">
      <div className="rounded-[16px] overflow-hidden aspect-[4/3] relative bg-[#EFE7DB]">
        {photo && (
          <Image
            src={photo}
            alt={agent.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover group-hover:scale-[1.02] transition duration-500"
          />
        )}
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-white">
          <StarRating value={agent.rating} count={agent.reviewCount} />
        </div>
      </div>
      <div className="px-2 pt-4 pb-2">
        <div className="serif text-[17px] font-medium">
          <Link
            href={`/agents/${agent.slug}`}
            className="after:absolute after:inset-0"
          >
            {agent.name}
          </Link>
        </div>
        <div className="text-[12px] text-[#8A8A8A] mt-0.5">{agent.role}</div>
        {agent.specialties && agent.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {agent.specialties.slice(0, 3).map((s) => (
              <span
                key={s.id ?? s.label}
                className="px-2.5 py-1 rounded-full bg-[#FDF6EF] border border-[#F0E9DE] text-[10px] text-[#6B6B6B]"
              >
                {s.label}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center gap-2 relative z-10">
          <span className="flex-1 py-2 rounded-full bg-[#102E26] text-white text-[12px] text-center group-hover:bg-[#14352E]">
            View Profile
          </span>
          <Link
            href={`/agents/${agent.slug}#contact`}
            aria-label={`Message ${agent.name}`}
            className="w-8 h-8 rounded-full border border-[#E8DDD0] flex items-center justify-center hover:bg-[#102E26] hover:text-white"
          >
            <Sms size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
