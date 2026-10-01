import Image from "next/image";
import Link from "next/link";
import AgentCard from "@/components/agents/AgentCard";
import InnerPage from "@/components/layout/InnerPage";
import PageHeader from "@/components/ui/PageHeader";
import RichBody from "@/components/ui/RichBody";
import { mediaUrl } from "@/lib/format";
import { getAllAgents } from "@/lib/queries/agents";
import { getAbout } from "@/lib/queries/globals";
import { getListingStats } from "@/lib/queries/properties";

export const metadata = {
  title: "About | SLIIQQUE Real Estate",
  description: "Who we are, how we work and the people you will deal with.",
};

export default async function AboutPage() {
  const [about, agents, listing] = await Promise.all([
    getAbout(),
    getAllAgents(),
    getListingStats(),
  ]);
  const hero = mediaUrl(
    typeof about.heroImage === "object" ? about.heroImage : null,
    "hero",
  );

  const stats = [
    { value: String(listing.listed), label: "Active listings" },
    { value: String(agents.length), label: "Specialist agents" },
    { value: String(listing.cities), label: "Cities covered" },
    ...(about.stats ?? []).map((s) => ({ value: s.value, label: s.label })),
  ];

  return (
    <InnerPage>
      <PageHeader
        eyebrow="About us"
        title={about.headline}
        intro={about.intro}
      />

      {hero && (
        <div className="relative aspect-[16/8] rounded-[28px] overflow-hidden bg-[#EFE7DB]">
          <Image
            src={hero}
            alt="Inside a SLIIQQUE listing"
            fill
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.slice(0, 4).map((s) => (
          <div
            key={s.label}
            className="rounded-[20px] bg-[#102E26] text-white px-5 py-5"
          >
            <div className="serif text-[34px] leading-none">{s.value}</div>
            <div className="mt-2 text-[11px] tracking-wide uppercase text-[#7A9A92]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {about.story && (
        <section className="mt-16 max-w-[720px]">
          <RichBody data={about.story} />
        </section>
      )}

      {about.values && about.values.length > 0 && (
        <section className="mt-16">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
            What we stand for
          </div>
          <h2 className="serif text-[30px] lg:text-[42px] leading-[1] mb-8">
            Our values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.values.map((v) => (
              <div
                key={v.id ?? v.title}
                className="rounded-[20px] bg-white border border-[#F0E9DE] p-6"
              >
                <div className="serif text-[20px]">{v.title}</div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#6B6B6B]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {agents.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="serif text-[30px] lg:text-[42px] leading-[1]">
              The team
            </h2>
            <Link
              href="/agents"
              className="text-[13px] underline underline-offset-4"
            >
              View all agents
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.slice(0, 4).map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-[28px] bg-[#102E26] text-white px-6 lg:px-12 py-10 lg:py-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center">
        <div>
          <h2 className="serif text-[30px] lg:text-[44px] leading-[1]">
            {about.closingTitle ?? "Ready to make your next move?"}
          </h2>
          {about.closingText && (
            <p className="mt-3 text-[14px] leading-[1.7] text-[#9AB0AA] max-w-[480px]">
              {about.closingText}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link
            href="/properties"
            className="px-6 py-3 rounded-full bg-white text-[#102E26] text-[13px] font-medium hover:bg-[#FFFBF6] transition"
          >
            Browse properties
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-white/25 text-[13px] hover:bg-white hover:text-[#102E26] transition"
          >
            Contact us
          </Link>
        </div>
      </section>
    </InnerPage>
  );
}
