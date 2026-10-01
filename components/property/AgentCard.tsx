import Image from "next/image";
import { mediaUrl } from "@/lib/format";
import type { Agent } from "@/payload-types";

export default function AgentCard({ agent }: { agent: Agent }) {
  const photo = mediaUrl(agent.photo, "avatar");
  return (
    <div className="rounded-[24px] border border-[#F0E9DE] bg-white p-5 flex items-center gap-4">
      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#EFE7DB] shrink-0">
        {photo && (
          <Image
            src={photo}
            alt={agent.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <div className="serif text-[18px] leading-tight">{agent.name}</div>
        <div className="text-[12px] text-[#8A8A8A] mt-0.5">{agent.role}</div>
        {agent.phone && (
          <div className="text-[12px] text-[#6B6B6B] mt-1">{agent.phone}</div>
        )}
      </div>
    </div>
  );
}
