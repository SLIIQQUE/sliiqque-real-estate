import Link from "next/link";
import AgentCard from "@/components/agents/AgentCard";
import InnerPage from "@/components/layout/InnerPage";
import PageHeader from "@/components/ui/PageHeader";
import { getAllAgents } from "@/lib/queries/agents";

export const metadata = {
  title: "Our Agents | SLIIQQUE Real Estate",
  description: "Meet the specialists who help you buy, sell, rent and invest.",
};

type Params = Record<string, string | string[] | undefined>;

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const sp = await searchParams;
  const agents = await getAllAgents();

  const specialties = [
    ...new Set(agents.flatMap((a) => a.specialties?.map((s) => s.label) ?? [])),
  ].sort();
  const raw = Array.isArray(sp.specialty) ? sp.specialty[0] : sp.specialty;
  const active = specialties.find((s) => s === raw);
  const shown = active
    ? agents.filter((a) => a.specialties?.some((s) => s.label === active))
    : agents;

  const pill = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-[12px] border transition ${isActive ? "bg-[#102E26] text-white border-[#102E26]" : "border-[#E8DDD0] text-[#6B6B6B] hover:border-[#102E26] hover:text-[#102E26]"}`;

  return (
    <InnerPage>
      <PageHeader
        eyebrow="Our Agents"
        title="Meet the people behind every move"
        intro="Our agents live and work in the areas they cover. Choose a specialist, read their profile and message them directly."
      />
      {specialties.length > 0 && (
        <nav
          aria-label="Filter by specialty"
          className="mb-8 flex flex-wrap gap-2"
        >
          <Link href="/agents" className={pill(!active)}>
            All agents
          </Link>
          {specialties.map((s) => (
            <Link
              key={s}
              href={`/agents?specialty=${encodeURIComponent(s)}`}
              className={pill(s === active)}
            >
              {s}
            </Link>
          ))}
        </nav>
      )}
      {shown.length === 0 ? (
        <div className="rounded-[24px] border border-[#F0E9DE] bg-white p-10 text-center">
          <div className="serif text-[24px]">No agents match</div>
          <p className="mt-2 text-[14px] text-[#6B6B6B]">
            Try another specialty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {shown.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      )}
      <div className="mt-12 rounded-[24px] bg-[#FDF8F1] border border-[#F0E9DE] px-6 lg:px-10 py-8 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div>
          <div className="serif text-[22px]">Not sure who to talk to?</div>
          <p className="text-[13px] text-[#8A8A8A] mt-1">
            Tell us what you need and we will match you with the right agent.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[#C26A4A] text-white text-[13px] font-medium hover:bg-[#B35E3E] transition"
        >
          Contact us
        </Link>
      </div>
    </InnerPage>
  );
}
