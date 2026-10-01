import "server-only";
import { toCard } from "@/lib/format";
import { getPayloadClient } from "@/lib/payload";

export async function getAllAgents() {
  const payload = await getPayloadClient();
  return (
    await payload.find({
      collection: "agents",
      sort: "createdAt",
      limit: 50,
      depth: 1,
    })
  ).docs;
}

export async function getAgentBySlug(slug: string) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "agents",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return res.docs[0] ?? null;
}

/** Active listings handled by one agent, newest first. */
export async function getAgentListings(agentId: number, limit = 6) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "properties",
    where: {
      and: [{ status: { equals: "active" } }, { agent: { equals: agentId } }],
    },
    sort: "-createdAt",
    limit,
    depth: 1,
  });
  return res.docs.map(toCard);
}
