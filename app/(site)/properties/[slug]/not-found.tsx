import PageShell from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="px-6 lg:px-14 pt-24 lg:pt-14 pb-20 min-h-[60vh]">
        <h1 className="serif text-[36px]">Property not found</h1>
        <p className="mt-3 text-[14px] text-[#6B6B6B]">
          This listing may have been sold or removed.{" "}
          <a
            href="/properties"
            className="underline underline-offset-4 text-[#1A1A1A]"
          >
            Browse all properties
          </a>
        </p>
      </section>
    </PageShell>
  );
}
