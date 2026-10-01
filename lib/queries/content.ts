import "server-only";
import { getPayloadClient } from "@/lib/payload";

export async function getAgents() {
  const payload = await getPayloadClient();
  return (
    await payload.find({
      collection: "agents",
      sort: "createdAt",
      limit: 8,
      depth: 1,
    })
  ).docs;
}

export async function getTestimonials() {
  const payload = await getPayloadClient();
  return (
    await payload.find({
      collection: "testimonials",
      sort: "createdAt",
      limit: 6,
      depth: 1,
    })
  ).docs;
}

export async function getArticles(limit = 3) {
  const payload = await getPayloadClient();
  return (
    await payload.find({
      collection: "articles",
      sort: "-publishedAt",
      limit,
      depth: 1,
    })
  ).docs;
}

/** Neighborhoods with a live count of active listings. */
export async function getNeighborhoods() {
  const payload = await getPayloadClient();
  const hoods = (
    await payload.find({
      collection: "neighborhoods",
      sort: "createdAt",
      limit: 8,
      depth: 1,
    })
  ).docs;
  return Promise.all(
    hoods.map(async (n) => {
      const r = await payload.count({
        collection: "properties",
        where: {
          and: [
            { status: { equals: "active" } },
            { neighborhood: { equals: n.id } },
          ],
        },
      });
      return { ...n, listings: r.totalDocs };
    }),
  );
}
