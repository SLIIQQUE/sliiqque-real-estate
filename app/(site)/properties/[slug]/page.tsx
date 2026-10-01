import { ArrowLeft, Location } from "@/components/ui/icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import PageShell from "@/components/layout/PageShell";
import ContactForm from "@/components/forms/ContactForm";
import AgentCard from "@/components/property/AgentCard";
import Facts from "@/components/property/Facts";
import Gallery from "@/components/property/Gallery";
import { formatPrice, mediaUrl } from "@/lib/format";
import { getPropertyBySlug } from "@/lib/queries/properties";
import type { Agent } from "@/payload-types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyBySlug((await params).slug);
  if (!property) return { title: "Property not found" };
  const image = mediaUrl(property.photos?.[0]?.image, "hero");
  const where = [property.city, property.region].filter(Boolean).join(", ");
  return {
    title: `${property.title} | SLIIQQUE Real Estate`,
    description: `${property.propertyType} in ${where}`,
    openGraph: { title: property.title, images: [image ?? "/brand/og.png"] },
  };
}

export default async function PropertyPage({ params }: Props) {
  const property = await getPropertyBySlug((await params).slug);
  if (!property) notFound();

  const agent =
    typeof property.agent === "object" ? (property.agent as Agent) : null;
  const where = [property.address, property.city, property.region]
    .filter(Boolean)
    .join(", ");

  return (
    <PageShell>
      <section className="px-6 lg:px-14 pt-24 lg:pt-14 pb-20">
        <a
          href="/properties"
          className="text-[13px] underline underline-offset-4"
        >
          <ArrowLeft size={14} className="inline -mt-0.5" /> All properties
        </a>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
              {property.listingType === "rent" ? "For Rent" : "For Sale"}
            </div>
            <h1 className="serif text-[32px] lg:text-[48px] leading-[0.95] tracking-tight">
              {property.title}
            </h1>
            <div className="text-[13px] text-[#8A8A8A] mt-2">
              <Location
                size={14}
                className="inline -mt-0.5 mr-1"
                variant="Bold"
              />
              {where}
            </div>
          </div>
          <div className="serif text-[28px] lg:text-[36px] font-semibold">
            {formatPrice(
              property.price,
              property.currency,
              property.listingType,
            )}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div className="space-y-8">
            <Gallery photos={property.photos} title={property.title} />
            <Facts property={property} />
            {property.description && (
              <div className="prose max-w-none text-[15px] leading-[1.7] text-[#4A4A4A]">
                <RichText data={property.description} />
              </div>
            )}
          </div>
          <aside className="space-y-5 lg:sticky lg:top-8">
            {agent && <AgentCard agent={agent} />}
            <ContactForm
              type="viewing"
              propertyId={property.id}
              title="Request a viewing"
              subtitle="An agent will confirm a time with you"
              placeholder={`I'd like to see ${property.title}…`}
              submitLabel="Request Viewing "
              className="bg-white rounded-[24px] p-6 border border-[#F0E9DE]"
            />
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
