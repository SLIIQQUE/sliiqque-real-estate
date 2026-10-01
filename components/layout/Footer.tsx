import Link from "next/link";
import NewsletterForm from "@/components/forms/NewsletterForm";
import BrandLogo from "@/components/ui/BrandLogo";
import { NAV } from "@/lib/nav";
import { PROPERTY_TYPES } from "@/lib/propertyTypes";
import { getSettings } from "@/lib/queries/globals";
import { getPropertyTypeCounts } from "@/lib/queries/properties";

const SOCIAL_SHORT: Record<string, string> = {
  x: "𝕏",
  linkedin: "in",
  instagram: "ig",
  facebook: "fb",
};
const HEADING = "text-[11px] tracking-[0.2em] uppercase text-[#7A9A92] mb-5";
const LINK = "hover:text-white";

export default async function Footer() {
  const [settings, counts] = await Promise.all([
    getSettings(),
    getPropertyTypeCounts(),
  ]);
  const quickLinks = NAV.filter((n) => n.href !== "/contact");

  return (
    <footer className="bg-[#102E26] text-white px-6 lg:px-14 pt-14 pb-8">
      <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">
        <div>
          <BrandLogo variant="icon" tone="light" width={76} />
          <p className="mt-5 text-[13px] leading-[1.6] text-[#9AB0AA] max-w-[280px]">
            Premium real estate solutions for dream homes and smart investments.
            Find the right property, in the right place, at the right time.
          </p>
          <div className="mt-6 flex gap-2">
            {(settings.socials ?? []).map((s) => (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[12px] hover:bg-white hover:text-[#102E26] transition"
                key={s.label}
              >
                {SOCIAL_SHORT[s.label.toLowerCase()] ??
                  s.label.slice(0, 2).toLowerCase()}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className={HEADING}>Quick Links</div>
          <ul className="space-y-3 text-[13px] text-[#C8D5D1]">
            {quickLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={LINK}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={HEADING}>Property Types</div>
          <ul className="space-y-3 text-[13px] text-[#C8D5D1]">
            {PROPERTY_TYPES.filter((t) => t !== "Land").map((t) => (
              <li key={t}>
                <Link href={`/properties?mode=buy&type=${t}`} className={LINK}>
                  {t}s • {counts[t]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={HEADING}>Support</div>
          <ul className="space-y-3 text-[13px] text-[#C8D5D1]">
            <li>
              <Link href="/contact" className={LINK}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/contact#faq" className={LINK}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/properties?mode=sell" className={LINK}>
                Sell Your Home
              </Link>
            </li>
            <li>
              <Link href="/agents" className={LINK}>
                Talk to an Agent
              </Link>
            </li>
          </ul>
          <div className="mt-8 p-4 rounded-[16px] bg-[#14352E] border border-white/10">
            <div className="text-[12px]">Subscribe to newsletter</div>
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-3 text-[11px] text-[#7A9A92]">
        <div>
          © {new Date().getFullYear()} {settings.companyName}. All rights
          reserved.
        </div>
        <div>{settings.address}</div>
      </div>
    </footer>
  );
}
