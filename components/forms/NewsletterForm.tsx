"use client";

import { ArrowRight } from "@/components/ui/icons";
import type { FormEvent } from "react";
import { useInquiry } from "@/hooks/useInquiry";

/** Footer signup; stored as an Inquiry of type "subscribe". */
export default function NewsletterForm() {
  const { status, error, submit } = useInquiry();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const ok = await submit({
      name: "Newsletter subscriber",
      email: String(f.get("email") ?? ""),
      message: "Newsletter signup",
      type: "subscribe",
      website: String(f.get("website") ?? ""),
    });
    if (ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div className="flex">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          aria-label="Your email"
          placeholder="Your email"
          className="min-w-0 flex-1 bg-white/10 rounded-l-full px-4 py-2 text-[12px] outline-none placeholder:text-white/40"
        />
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
          aria-label="Subscribe"
          className="px-4 py-2 rounded-r-full bg-white text-[#102E26] text-[12px] font-medium disabled:opacity-60"
        >
          <ArrowRight size={14} />
        </button>
      </div>
      {status === "sent" && (
        <p role="status" className="mt-2 text-[11px] text-[#9AD9BE]">
          Thanks, you're subscribed.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-[11px] text-[#F0A08F]">
          {error}
        </p>
      )}
    </form>
  );
}
