import type { ReactNode } from "react";
import PageShell from "@/components/layout/PageShell";

/** Page frame shared by the search page and its loading state. */
export default function SearchShell({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <section className="px-6 lg:px-14 pt-24 lg:pt-14 pb-20 min-h-[70vh]">
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
          Search Results
        </div>
        <h1 className="serif text-[32px] lg:text-[44px] leading-[0.95] tracking-tight mb-8">
          {heading}
        </h1>
        {children}
      </section>
    </PageShell>
  );
}
