import "server-only";
import { getPayloadClient } from "@/lib/payload";

export async function getSettings() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-settings", depth: 0 });
}

export async function getAbout() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "about-page", depth: 1 });
}
