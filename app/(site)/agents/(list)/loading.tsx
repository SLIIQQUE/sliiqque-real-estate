import AgentCardSkeleton from "@/components/agents/AgentCardSkeleton";
import InnerPage from "@/components/layout/InnerPage";
import PageHeader from "@/components/ui/PageHeader";

export default function Loading() {
  return (
    <InnerPage>
      <PageHeader
        eyebrow="Our Agents"
        title="Meet the people behind every move"
        intro="Our agents live and work in the areas they cover. Choose a specialist, read their profile and message them directly."
      />
      <div
        role="status"
        aria-label="Loading agents"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Array.from({ length: 4 }, (_, i) => (
          <AgentCardSkeleton key={i} />
        ))}
      </div>
    </InnerPage>
  );
}
