export const INQUIRY_TYPES = [
  "contact",
  "sell",
  "viewing",
  "subscribe",
] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: InquiryType;
  property?: number;
  agent?: number;
  /** Honeypot: real visitors never fill this. */
  website?: string;
}

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export type InquiryCheck =
  { ok: true; value: InquiryInput } | { ok: false; error: string };

export function validateInquiry(body: unknown): InquiryCheck {
  if (!body || typeof body !== "object")
    return { ok: false, error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const name = str(b.name, 120);
  const email = str(b.email, 320);
  const message = str(b.message, 4000);
  const phone = str(b.phone, 40);
  const type = INQUIRY_TYPES.find((t) => t === b.type) ?? "contact";

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!EMAIL.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5)
    return { ok: false, error: "Please enter a short message." };

  const property =
    typeof b.property === "number" && Number.isInteger(b.property)
      ? b.property
      : undefined;
  return {
    ok: true,
    value: {
      name,
      email,
      phone: phone || undefined,
      message,
      type,
      property,
      website: str(b.website, 200),
    },
  };
}
