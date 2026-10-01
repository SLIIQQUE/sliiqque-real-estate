import { Add } from "@/components/ui/icons";
import type { SiteSetting } from "@/payload-types";

/** Accordion built on <details>, so it works without JavaScript. */
export default function Faq({
  faqs,
}: {
  faqs: NonNullable<SiteSetting["faqs"]>;
}) {
  if (faqs.length === 0) return null;
  return (
    <section id="faq" className="mt-16 scroll-mt-20 max-w-[820px]">
      <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
        FAQs
      </div>
      <h2 className="serif text-[30px] lg:text-[42px] leading-[1] mb-6">
        Common questions
      </h2>
      <div className="rounded-[24px] bg-white border border-[#F0E9DE] divide-y divide-[#F0E9DE] overflow-hidden">
        {faqs.map((f) => (
          <details key={f.id ?? f.question} className="group px-6 py-4">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[15px] font-medium [&::-webkit-details-marker]:hidden">
              {f.question}
              <Add
                size={18}
                className="shrink-0 transition-transform group-open:rotate-45"
              />
            </summary>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#6B6B6B]">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
