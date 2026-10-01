"use client";

import { Copy, TickCircle } from "@/components/ui/icons";
import { useState } from "react";

const BTN =
  "px-4 py-2 rounded-full border border-[#E8DDD0] text-[12px] font-medium hover:bg-[#102E26] hover:text-white hover:border-[#102E26] transition inline-flex items-center gap-1.5";

/** Copy-link plus share links for X, LinkedIn and WhatsApp. */
export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = () => (typeof window === "undefined" ? "" : window.location.href);
  const enc = encodeURIComponent;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url());
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Share this article"
    >
      <button type="button" onClick={copy} className={BTN}>
        {copied ? <TickCircle size={14} /> : <Copy size={14} />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <a
        className={BTN}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) =>
          (e.currentTarget.href = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url())}`)
        }
        href="https://twitter.com/intent/tweet"
      >
        X
      </a>
      <a
        className={BTN}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) =>
          (e.currentTarget.href = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url())}`)
        }
        href="https://www.linkedin.com/sharing/share-offsite/"
      >
        LinkedIn
      </a>
      <a
        className={BTN}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) =>
          (e.currentTarget.href = `https://wa.me/?text=${enc(`${title} ${url()}`)}`)
        }
        href="https://wa.me/"
      >
        WhatsApp
      </a>
    </div>
  );
}
