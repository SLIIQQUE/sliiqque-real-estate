import { getPayload } from "payload";
import config from "../payload.config";
import { agents, articles, neighborhoods, testimonials } from "./seed/data";
import { properties } from "./seed/properties";
import { richText, uploadImage } from "./seed/helpers";

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.count({
    collection: "properties",
    overrideAccess: true,
  });
  if (existing.totalDocs > 0 && !process.argv.includes("--force")) {
    console.log(
      "Properties already exist; skipping seed (use --force to add anyway).",
    );
    process.exit(0);
  }

  const agentIds = new Map<string, number>();
  for (const a of agents) {
    const photo = await uploadImage(payload, a.photo, a.name);
    const doc = await payload.create({
      collection: "agents",
      data: { ...a, photo },
    });
    agentIds.set(a.name, doc.id as number);
  }

  const hoodIds = new Map<string, number>();
  for (const n of neighborhoods) {
    const image = await uploadImage(payload, n.photo, n.name);
    const doc = await payload.create({
      collection: "neighborhoods",
      data: { name: n.name, tagline: n.tagline, image },
    });
    hoodIds.set(n.name, doc.id as number);
  }

  for (const p of properties) {
    const photos = [];
    for (const [i, url] of p.photos.entries()) {
      photos.push({
        image: await uploadImage(payload, url, `${p.title} ${i + 1}`),
      });
    }
    const { neighborhood, agent, description, photos: _unused, ...rest } = p;
    await payload.create({
      collection: "properties",
      data: {
        ...rest,
        status: "active",
        currency: "USD",
        neighborhood: hoodIds.get(neighborhood),
        agent: agentIds.get(agent),
        photos,
        description: richText(description),
      },
    });
  }

  for (const t of testimonials) {
    const photo = await uploadImage(payload, t.photo, t.authorName);
    await payload.create({
      collection: "testimonials",
      data: { ...t, photo, rating: 5 },
    });
  }

  for (const a of articles) {
    const coverImage = await uploadImage(payload, a.cover, a.title);
    const { cover: _cover, ...rest } = a;
    await payload.create({
      collection: "articles",
      data: {
        ...rest,
        coverImage,
        publishedAt: new Date(a.publishedAt).toISOString(),
        body: richText(a.title),
      },
    });
  }

  console.log("Seed complete.");
  process.exit(0);
}

// Top-level await: `payload run` exits as soon as the import resolves.
await seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
