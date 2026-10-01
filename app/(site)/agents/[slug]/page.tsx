import { Call, Sms } from "@/components/ui/icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/forms/ContactForm";
import InnerPage from "@/components/layout/InnerPage";
import ListingCard from "@/components/ui/ListingCard";
import StarRating from "@/components/ui/StarRating";
import { mediaUrl } from "@/lib/format";
import { getAgentBySlug, getAgentListings } from "@/lib/queries/agents";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = await getAgentBySlug((await params).slug);
  if (!agent) return { title: "Agent not found" };
  const photo = mediaUrl(agent.photo);
  return {
    title: `${agent.name}, ${agent.role} | SLIIQQUE Real Estate`,
    description:
      agent.bio ??
      `${agent.name} is a ${agent.role.toLowerCase()} at SLIIQQUE Real Estate.`,
    openGraph: { title: agent.name, images: [photo ?? "/brand/og.png"] },
  };
}

export default async function AgentPage({ params }: Props) {
  const agent = await getAgentBySlug((await params).slug);
  if (!agent) notFound();

  const listings = await getAgentListings(agent.id);
  const photo = mediaUrl(agent.photo, "hero");
  const facts = [
    { label: "Active listings", value: listings.length },
    {
      label: "Experience",
      value:
        agent.yearsExperience != null ? `${agent.yearsExperience} yrs` : "—",
    },
    { label: "Reviews", value: agent.reviewCount ?? "—" },
  ];

  return (
    <InnerPage>
      <Link href="/agents" className="text-[13px] underline underline-offset-4">
        ← All agents
      </Link>
      <div className="mt-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
        <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#EFE7DB]">
          {photo && (
            <Image
              src={photo}
              alt={agent.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
            {agent.role}
          </div>
          <h1 className="serif text-[36px] lg:text-[56px] leading-[0.98] tracking-tight">
            {agent.name}
          </h1>
          <div className="mt-3">
            <StarRating value={agent.rating} count={agent.reviewCount} />
          </div>
          {agent.bio && (
            <p className="mt-5 text-[16px] leading-[1.75] text-[#4A4A4A] max-w-[560px]">
              {agent.bio}
            </p>
          )}
          {agent.specialties && agent.specialties.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {agent.specialties.map((s) => (
                <Link
                  key={s.id ?? s.label}
                  href={`/agents?specialty=${encodeURIComponent(s.label)}`}
                  className="px-3 py-1.5 rounded-full bg-[#FDF6EF] border border-[#F0E9DE] text-[12px] text-[#6B6B6B] hover:border-[#102E26]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-[520px]">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-[16px] bg-[#FDF8F1] border border-[#F0E9DE] px-4 py-3"
              >
                <div className="serif text-[24px] leading-none">{f.value}</div>
                <div className="mt-1.5 text-[10px] uppercase tracking-wide text-[#9A9A9A]">
                  {f.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-[14px]">
            {agent.phone && (
              <div className="flex items-center gap-3">
                <Call size={18} color="#C26A4A" />
                <a
                  href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:underline"
                >
                  {agent.phone}
                </a>
              </div>
            )}
            {agent.email && (
              <div className="flex items-center gap-3">
                <Sms size={18} color="#C26A4A" />
                <a href={`mailto:${agent.email}`} className="hover:underline">
                  {agent.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="serif text-[30px] lg:text-[38px] leading-[1] mb-6">
          Listings with {agent.name.split(" ")[0]}
        </h2>
        {listings.length === 0 ? (
          <p className="text-[14px] text-[#6B6B6B]">
            No active listings right now. Send a message to hear about upcoming
            homes.
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5">
            {listings.map((p) => (
              <ListingCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="mt-16 scroll-mt-20 max-w-[640px]">
        <ContactForm
          type="contact"
          agentId={agent.id}
          title={`Message ${agent.name.split(" ")[0]}`}
          subtitle="They will reply within one working day"
          placeholder={`Hi ${agent.name.split(" ")[0]}, I'm interested in…`}
          className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#F0E9DE]"
        />
      </section>
    </InnerPage>
  );
}
