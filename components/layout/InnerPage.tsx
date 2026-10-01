import type { ReactNode } from "react";
import PageShell from "./PageShell";

/** Standard padded content area for inner pages (clears the mobile header). */
export default function InnerPage({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <div className="px-6 lg:px-14 pt-24 lg:pt-14 pb-20 min-h-[70vh]">
        {children}
      </div>
    </PageShell>
  );
}
