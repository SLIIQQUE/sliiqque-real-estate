import ArticleCardSkeleton from "@/components/insights/ArticleCardSkeleton";
import InnerPage from "@/components/layout/InnerPage";
import PageHeader from "@/components/ui/PageHeader";

export default function Loading() {
  return (
    <InnerPage>
      <PageHeader
        eyebrow="Insights"
        title="Trends, data and advice"
        intro="Practical guides and market notes written by our agents, for people buying, selling, renting and investing."
      />
      <div
        role="status"
        aria-label="Loading articles"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </InnerPage>
  );
}
