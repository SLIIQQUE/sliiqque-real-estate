import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import BrandLogo from "@/components/ui/BrandLogo";

export default function NotFound() {
  return (
    <PageShell>
      <section className="px-6 lg:px-14 pt-24 lg:pt-20 pb-20 min-h-[70vh]">
        <BrandLogo variant="icon" tone="dark" width={72} />
        <div className="mt-8 text-[11px] tracking-[0.2em] uppercase text-[#C26A4A]">
          Error 404
        </div>
        <h1 className="serif text-[36px] lg:text-[52px] leading-[0.95] tracking-tight mt-3">
          This page can’t be found
        </h1>
        <p className="mt-4 text-[14px] text-[#6B6B6B] max-w-[420px]">
          The link may be out of date, or the listing may have been removed.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#102E26] text-white text-[13px] font-medium hover:bg-[#14352E] transition"
          >
            Back home
          </Link>
          <Link
            href="/properties"
            className="px-6 py-3 rounded-full border border-[#E8DDD0] text-[13px] font-medium hover:bg-[#102E26] hover:text-white transition"
          >
            Browse properties
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
