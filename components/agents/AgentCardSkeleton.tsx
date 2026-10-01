import Bar from "@/components/ui/Bar";

/** Mirrors AgentCard's structure so the grid does not shift when data arrives. */
export default function AgentCardSkeleton() {
  return (
    <div
      className="bg-white rounded-[24px] border border-[#F0E9DE] overflow-hidden p-3"
      aria-hidden
    >
      <div className="rounded-[16px] aspect-[4/3] bg-[#EFE7DB] animate-pulse" />
      <div className="px-2 pt-4 pb-2">
        <div className="serif text-[17px] font-medium">
          <Bar>Sophie Carter</Bar>
        </div>
        <div className="text-[12px] mt-0.5">
          <Bar>Luxury Specialist</Bar>
        </div>
        <div className="mt-3 flex gap-1.5">
          {["Luxury homes", "Relocation"].map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full bg-[#FDF6EF] border border-[#F0E9DE] text-[10px]"
            >
              <Bar className="rounded-full">{t}</Bar>
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex-1 h-[32px] rounded-full bg-[#EFE7DB] animate-pulse" />
          <span className="w-8 h-8 rounded-full bg-[#EFE7DB] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
