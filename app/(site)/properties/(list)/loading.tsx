import SearchShell from "@/components/search/SearchShell";
import Bar from "@/components/ui/Bar";
import ListingGridSkeleton from "@/components/ui/ListingGridSkeleton";

export default function Loading() {
  return (
    <SearchShell heading={<Bar>Homes for Sale</Bar>}>
      <ListingGridSkeleton count={6} />
    </SearchShell>
  );
}
