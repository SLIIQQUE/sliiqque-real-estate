import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiry";
import { getPayloadClient } from "@/lib/payload";
import { allowRequest } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (!allowRequest(`contact:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const check = validateInquiry(body);
  if (!check.ok)
    return NextResponse.json({ error: check.error }, { status: 400 });

  // Honeypot filled: pretend success so bots learn nothing.
  if (check.value.website) return NextResponse.json({ ok: true });

  try {
    const { website: _website, ...data } = check.value;
    const payload = await getPayloadClient();
    await payload.create({
      collection: "inquiries",
      data: { ...data, status: "new" },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to save inquiry", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 500 },
    );
  }
}
