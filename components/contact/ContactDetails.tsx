import { Call, Clock, Location, Sms } from "@/components/ui/icons";
import type { SiteSetting } from "@/payload-types";

const ICON =
  "w-10 h-10 rounded-full bg-[#FDF6EF] border border-[#F0E9DE] flex items-center justify-center text-[#C26A4A] shrink-0";

/** Address, email, phone, WhatsApp, opening hours and social links from Site settings. */
export default function ContactDetails({
  settings,
}: {
  settings: SiteSetting;
}) {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] bg-white border border-[#F0E9DE] p-6 space-y-5">
        <div className="flex gap-4">
          <span className={ICON}>
            <Location size={18} />
          </span>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-[#9A9A9A]">
              Visit us
            </div>
            <div className="text-[14px] mt-0.5">{settings.address}</div>
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] underline underline-offset-4"
            >
              Open in maps
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <span className={ICON}>
            <Sms size={18} />
          </span>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-[#9A9A9A]">
              Email
            </div>
            <a
              href={`mailto:${settings.email}`}
              className="text-[14px] mt-0.5 block hover:underline"
            >
              {settings.email}
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <span className={ICON}>
            <Call size={18} />
          </span>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-[#9A9A9A]">
              Phone
            </div>
            <a
              href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
              className="text-[14px] mt-0.5 block hover:underline"
            >
              {settings.phone}
            </a>
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] underline underline-offset-4"
              >
                Message on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {settings.hours && settings.hours.length > 0 && (
        <div className="rounded-[24px] bg-white border border-[#F0E9DE] p-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#9A9A9A] mb-3">
            <Clock size={14} /> Opening hours
          </div>
          <dl className="space-y-2 text-[14px]">
            {settings.hours.map((h) => (
              <div key={h.id ?? h.days} className="flex justify-between gap-4">
                <dt className="text-[#6B6B6B]">{h.days}</dt>
                <dd className="font-medium text-right">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {settings.socials && settings.socials.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {settings.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-[#E8DDD0] text-[12px] hover:bg-[#102E26] hover:text-white hover:border-[#102E26] transition"
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
