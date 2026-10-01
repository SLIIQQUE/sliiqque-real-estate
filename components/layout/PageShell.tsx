import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";

/** Site chrome shared by every page: sidebar, mobile header, footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFBF6] text-[#1A1A1A] antialiased selection:bg-[#C26A4A]/20">
      <Sidebar />
      <MobileHeader />
      <main className="lg:ml-[300px]">
        {children}
        <Footer />
      </main>
    </div>
  );
}
