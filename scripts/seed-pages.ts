import { getPayload } from "payload";
import config from "../payload.config";
import { slugify } from "../lib/slug";
import { articleSeeds } from "./seed/articles-content";
import { aboutSeed, agentSeeds, settingsSeed } from "./seed/pages-content";
import { uploadImage } from "./seed/helpers";

/** Fills the About, Settings, agent profile and article content. Safe to re-run. */
async function seedPages() {
  const payload = await getPayload({ config });

  const agents = await payload.find({
    collection: "agents",
    limit: 50,
    depth: 0,
  });
  const agentIds = new Map<string, number>();
  for (const a of agents.docs) {
    const extra = agentSeeds[a.name];
    await payload.update({
      collection: "agents",
      id: a.id,
      data: {
        slug: a.slug || slugify(a.name),
        ...(extra && {
          bio: extra.bio,
          yearsExperience: extra.yearsExperience,
          email: extra.email,
          phone: extra.phone,
          specialties: extra.specialties.map((label) => ({ label })),
        }),
      },
    });
    agentIds.set(a.name, a.id);
  }

  for (const s of articleSeeds) {
    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: s.slug } },
      limit: 1,
      depth: 0,
    });
    const data = {
      title: s.title,
      slug: s.slug,
      category: s.category,
      excerpt: s.excerpt,
      readingMinutes: s.readingMinutes,
      publishedAt: new Date(s.publishedAt).toISOString(),
      author: agentIds.get(s.author),
      body: s.body,
    };
    if (existing.docs[0]) {
      await payload.update({
        collection: "articles",
        id: existing.docs[0].id,
        data,
      });
    } else {
      const coverImage = await uploadImage(payload, s.cover, s.title);
      await payload.create({
        collection: "articles",
        data: { ...data, coverImage },
      });
    }
  }

  await payload.updateGlobal({ slug: "site-settings", data: settingsSeed });
  const heroImage = await uploadImage(
    payload,
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    "SLIIQQUE office interior",
  );
  await payload.updateGlobal({
    slug: "about-page",
    data: { ...aboutSeed, heroImage },
  });

  console.log("Pages seeded.");
  process.exit(0);
}

await seedPages().catch((e) => {
  console.error(e);
  process.exit(1);
});
