import { SearchNormal1 } from "@/components/ui/icons";
import Link from "next/link";
import {
  ARTICLE_CATEGORIES,
  type ArticleFilters as Filters,
} from "@/lib/articleFilters";

/** Search box and category pills; plain GET form, works without JavaScript. */
export default function ArticleFilters({ filters }: { filters: Filters }) {
  const href = (category?: string) => {
    const q = new URLSearchParams();
    if (category) q.set("category", category);
    if (filters.q) q.set("q", filters.q);
    const s = q.toString();
    return s ? `/insights?${s}` : "/insights";
  };
  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full text-[12px] border transition ${active ? "bg-[#102E26] text-white border-[#102E26]" : "border-[#E8DDD0] text-[#6B6B6B] hover:border-[#102E26] hover:text-[#102E26]"}`;

  return (
    <div className="mb-8 grid gap-4">
      <form
        action="/insights"
        className="flex max-w-[460px] items-center gap-2 rounded-full border border-[#E8DDD0] bg-white pl-4 pr-1.5 py-1.5"
      >
        <SearchNormal1 size={16} color="#9A9A9A" />
        {filters.category && (
          <input type="hidden" name="category" value={filters.category} />
        )}
        <input
          id="article-search"
          name="q"
          defaultValue={filters.q}
          maxLength={60}
          aria-label="Search articles"
          placeholder="Search articles"
          className="min-w-0 flex-1 bg-transparent outline-none text-[13px]"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-[#102E26] text-white text-[12px] font-medium hover:bg-[#14352E]"
        >
          Search
        </button>
      </form>
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        <Link href={href()} className={pill(!filters.category)}>
          All
        </Link>
        {ARTICLE_CATEGORIES.map((c) => (
          <Link key={c} href={href(c)} className={pill(filters.category === c)}>
            {c}
          </Link>
        ))}
      </nav>
    </div>
  );
}
