import Link from "next/link";
import ArticleCard from "@/components/insights/ArticleCard";
import ArticleFilters from "@/components/insights/ArticleFilters";
import InnerPage from "@/components/layout/InnerPage";
import NewsletterForm from "@/components/forms/NewsletterForm";
import PageHeader from "@/components/ui/PageHeader";
import { parseArticleFilters } from "@/lib/articleFilters";
import { searchArticles } from "@/lib/queries/articles";

export const metadata = {
  title: "Insights | SLIIQQUE Real Estate",
  description:
    "Market trends, buying and selling guides, and investment advice from our agents.",
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = parseArticleFilters(await searchParams);
  const { docs, totalDocs, hasNextPage, hasPrevPage } =
    await searchArticles(filters);

  const pageHref = (page: number) => {
    const q = new URLSearchParams();
    if (filters.category) q.set("category", filters.category);
    if (filters.q) q.set("q", filters.q);
    if (page > 1) q.set("page", String(page));
    const s = q.toString();
    return s ? `/insights?${s}` : "/insights";
  };

  return (
    <InnerPage>
      <PageHeader
        eyebrow="Insights"
        title="Trends, data and advice"
        intro="Practical guides and market notes written by our agents, for people buying, selling, renting and investing."
      />
      <ArticleFilters filters={filters} />
      {docs.length === 0 ? (
        <div className="rounded-[24px] border border-[#F0E9DE] bg-white p-10 text-center">
          <div className="serif text-[24px]">No articles found</div>
          <p className="mt-2 text-[14px] text-[#6B6B6B]">
            Try another search or{" "}
            <Link
              href="/insights"
              className="underline underline-offset-4 text-[#1A1A1A]"
            >
              clear the filters
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mb-5 text-[12px] text-[#9A9A9A]">
            {totalDocs} {totalDocs === 1 ? "article" : "articles"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {docs.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          {(hasPrevPage || hasNextPage) && (
            <div className="mt-10 flex justify-center gap-6 text-[13px] font-medium">
              {hasPrevPage && (
                <Link
                  href={pageHref(filters.page - 1)}
                  className="underline underline-offset-4"
                >
                  ← Newer
                </Link>
              )}
              {hasNextPage && (
                <Link
                  href={pageHref(filters.page + 1)}
                  className="underline underline-offset-4"
                >
                  Older →
                </Link>
              )}
            </div>
          )}
        </>
      )}
      <div className="mt-16 rounded-[24px] bg-[#102E26] text-white px-6 lg:px-10 py-8 grid lg:grid-cols-2 gap-6 items-center">
        <div>
          <div className="serif text-[26px] leading-tight">
            Get new articles by email
          </div>
          <p className="mt-1 text-[13px] text-[#9AB0AA]">
            One short note when we publish. Unsubscribe any time.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </InnerPage>
  );
}
