import Bar from "@/components/ui/Bar";

export default function ArticleCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="rounded-[20px] aspect-[16/10] bg-[#EFE7DB] animate-pulse" />
      <div className="pt-4">
        <div className="text-[11px]">
          <Bar>Apr 12, 2026 • 5 min read</Bar>
        </div>
        <div className="serif text-[19px] leading-[1.2] mt-2">
          <Bar>Home Prices Are Climbing in Key Cities</Bar>
        </div>
        <div className="mt-2 text-[13px] leading-[1.6]">
          <Bar className="w-full">
            Short summary of the article that spans two lines of the card.
          </Bar>
        </div>
      </div>
    </div>
  );
}
