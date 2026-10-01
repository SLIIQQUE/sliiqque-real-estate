"use client";

import { ArrowRight } from "@/components/ui/icons";
import type { FormEvent } from "react";
import { useInquiry } from "@/hooks/useInquiry";
import type { InquiryType } from "@/lib/inquiry";

const FIELD =
  "mt-1.5 w-full px-4 py-3 rounded-full bg-[#FDF8F1] border border-[#F0E9DE] outline-none text-[13px] focus:border-[#C26A4A]/40 focus:bg-white transition";
const LABEL = "text-[11px] uppercase tracking-wide text-[#9A9A9A]";

const INTERESTS: { label: string; type: InquiryType }[] = [
  { label: "Buying a home", type: "contact" },
  { label: "Selling a property", type: "sell" },
  { label: "Investment", type: "contact" },
];

interface Props {
  title?: string;
  subtitle?: string;
  /** Fixed inquiry type; hides the interest dropdown. */
  type?: InquiryType;
  propertyId?: number;
  agentId?: number;
  placeholder?: string;
  submitLabel?: string;
  className?: string;
}

export default function ContactForm({
  title = "Send us a message",
  subtitle = "We’ll respond within 24 hours",
  type,
  propertyId,
  agentId,
  placeholder = "Tell us what you're looking for...",
  submitLabel = "Send Message ",
  className = "bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.4)]",
}: Props) {
  const { status, error, submit } = useInquiry();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const interest = INTERESTS.find((i) => i.label === f.get("interest"));
    const ok = await submit({
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      message: `${interest ? `[${interest.label}] ` : ""}${f.get("message") ?? ""}`,
      type: type ?? interest?.type ?? "contact",
      property: propertyId,
      agent: agentId,
      website: String(f.get("website") ?? ""),
    });
    if (ok) form.reset();
  }

  return (
    <div className={className}>
      <h4 className="serif text-[20px]">{title}</h4>
      <p className="text-[12px] text-[#8A8A8A] mt-1">{subtitle}</p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL}>Your Name</label>
            <input
              name="name"
              required
              maxLength={120}
              placeholder="John Doe"
              className={FIELD}
            />
          </div>
          <div>
            <label className={LABEL}>Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className={FIELD}
            />
          </div>
        </div>
        {!type && (
          <div>
            <label className={LABEL}>Property Interest</label>
            <select name="interest" className={FIELD}>
              {INTERESTS.map((i) => (
                <option key={i.label}>{i.label}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={LABEL}>Message</label>
          <textarea
            name="message"
            required
            minLength={5}
            maxLength={4000}
            placeholder={placeholder}
            rows={4}
            className="mt-1.5 w-full px-4 py-3 rounded-[16px] bg-[#FDF8F1] border border-[#F0E9DE] outline-none text-[13px] resize-none focus:border-[#C26A4A]/40 focus:bg-white transition"
          />
        </div>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3.5 rounded-full bg-[#102E26] text-white text-[13px] font-medium hover:bg-[#14352E] transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : submitLabel}
          {status !== "sending" && <ArrowRight size={14} />}
        </button>
        {status === "sent" && (
          <div role="status" className="text-[12px] text-center text-[#1B6B4A]">
            Thank you — we’ve received your message and will reply soon.
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="text-[12px] text-center text-[#B3412A]">
            {error}
          </div>
        )}
        <div className="text-[10px] text-center text-[#9A9A9A]">
          By sending, you agree to our Terms & Privacy Policy
        </div>
      </form>
    </div>
  );
}
