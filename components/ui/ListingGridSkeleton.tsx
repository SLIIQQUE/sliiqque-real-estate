import ListingCardSkeleton from "./ListingCardSkeleton";

export default function ListingGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading listings"
      className="grid lg:grid-cols-3 gap-5"
    >
      {Array.from({ length: count }, (_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
