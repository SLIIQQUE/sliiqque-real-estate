"use client";

import { useState } from "react";
import type { InquiryInput } from "@/lib/inquiry";

type Status = "idle" | "sending" | "sent" | "error";

/** Posts an inquiry to /api/contact and tracks the request state. */
export function useInquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(
    input: Omit<InquiryInput, "website"> & { website?: string },
  ) {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
      return false;
    }
  }

  return { status, error, submit };
}
