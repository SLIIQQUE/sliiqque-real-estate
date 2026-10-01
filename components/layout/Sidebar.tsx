import { ArrowRight } from "@/components/ui/icons";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-30 h-screen w-[300px] bg-[#102E26] flex-col justify-between px-8 py-10">
      <div>
        <Link
          href="/"
          aria-label="SLIIQQUE home"
          className="flex justify-center mb-14"
        >
          <BrandLogo variant="icon" tone="light" width={76} priority />
        </Link>
        <SidebarNav />
      </div>
      <div className="space-y-6">
        <div className="rounded-[20px] bg-[#142E26] border border-white/10 p-5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#1E453B] opacity-60" />
          <p className="serif text-white text-[18px] leading-[1.2] relative z-10">
            Better Homes
            <br />
            Bigger Futures
          </p>
          <p className="text-[11px] text-[#9AB0AA] mt-3 leading-[1.5] relative z-10">
            Find your dream property with our expert guidance.
          </p>
          <Link
            href="/contact"
            className="relative z-10 mt-4 inline-block text-[12px] tracking-wide text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-[#102E26] transition-colors"
          >
            Get Started <ArrowRight size={12} className="inline" />
          </Link>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#7A9A92]">
          <span>© 2026</span>
          <span className="w-1 h-1 rounded-full bg-[#7A9A92]" />
          <Link href="/contact#faq" className="hover:text-white">
            Help
          </Link>
        </div>
      </div>
    </aside>
  );
}
