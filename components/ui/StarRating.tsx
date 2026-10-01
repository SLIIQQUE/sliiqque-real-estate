import { Star1 } from "@/components/ui/icons";

export default function StarRating({
  value,
  count,
}: {
  value?: number | null;
  count?: number | null;
}) {
  if (value == null) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-medium">
      <Star1 size={14} variant="Bold" color="#C26A4A" />
      {value.toFixed(1)}
      {count != null && (
        <span className="text-[#9A9A9A] font-normal">({count})</span>
      )}
    </span>
  );
}
