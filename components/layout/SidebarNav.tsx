"use client";

import { ArrowUp3 } from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, NAV } from "@/lib/nav";

/** Desktop navigation; highlights the section for the current URL. */
export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1" aria-label="Primary">
      {NAV.map((d) => {
        const active = isActive(pathname, d.href);
        return (
          <Link
            href={d.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center justify-between group px-4 py-[14px] rounded-full text-[14px] transition-all ${active ? "bg-[#1B3D34] text-white font-medium" : "text-[#9AB0AA] hover:text-white hover:bg-[#1B3D34]/60"}`}
            key={d.href}
          >
            <span>{d.label}</span>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-colors ${active ? "border-white/30" : "border-white/15 group-hover:border-white/30"}`}
            >
              <ArrowUp3 size={12} className="rotate-45" />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
