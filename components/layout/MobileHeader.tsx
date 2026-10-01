"use client";

import { HambergerMenu, CloseCircle } from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isActive, NAV } from "@/lib/nav";
import BrandLogo from "@/components/ui/BrandLogo";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#102E26] px-5 py-4 flex items-center justify-between"
      style={{
        top: "var(--safe-area-inset-top)",
      }}
    >
      <Link href="/" aria-label="SLIIQQUE home">
        <BrandLogo variant="icon" tone="light" width={46} priority />
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-9 h-9 rounded-full bg-[#1B3D34] text-white flex items-center justify-center"
      >
        {menuOpen ? <CloseCircle size={20} /> : <HambergerMenu size={20} />}
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#102E26] border-t border-white/10 px-5 py-6 space-y-1 shadow-2xl">
          {NAV.map((d) => (
            <Link
              href={d.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(pathname, d.href) ? "page" : undefined}
              className={`block py-3 text-[15px] border-b border-white/5 last:border-0 ${isActive(pathname, d.href) ? "text-white font-medium" : "text-white/80 hover:text-white"}`}
              key={d.href}
            >
              {d.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
