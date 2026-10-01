import type { Payload } from "payload";
import { BRAND } from "@/lib/brand";

async function loadStats(payload: Payload) {
  const [active, featured, newInquiries, agents] = await Promise.all([
    payload.count({
      collection: "properties",
      where: { status: { equals: "active" } },
    }),
    payload.count({
      collection: "properties",
      where: {
        and: [{ status: { equals: "active" } }, { featured: { equals: true } }],
      },
    }),
    payload.count({
      collection: "inquiries",
      where: { status: { equals: "new" } },
    }),
    payload.count({ collection: "agents" }),
  ]);
  return [
    { num: active.totalDocs, label: "Active listings" },
    { num: featured.totalDocs, label: "Featured" },
    { num: newInquiries.totalDocs, label: "New inquiries" },
    { num: agents.totalDocs, label: "Agents" },
  ];
}

/** Dashboard header: live counts and the three things editors do most. */
export default async function Welcome({ payload }: { payload: Payload }) {
  const stats = await loadStats(payload);
  return (
    <section className="sq-welcome" aria-label="Overview">
      <div>
        <div className="sq-welcome__eyebrow">{BRAND.name} · Content studio</div>
        <h2 className="sq-welcome__title">
          What would you like to update today?
        </h2>
      </div>
      <div className="sq-welcome__stats">
        {stats.map((s) => (
          <div className="sq-welcome__stat" key={s.label}>
            <div className="sq-welcome__num">{s.num}</div>
            <div className="sq-welcome__label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="sq-welcome__actions">
        <a
          className="sq-welcome__link sq-welcome__link--primary"
          href="/admin/collections/properties/create"
        >
          + Add a property
        </a>
        <a className="sq-welcome__link" href="/admin/collections/inquiries">
          Review inquiries
        </a>
        <a
          className="sq-welcome__link"
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          View live site ↗
        </a>
      </div>
    </section>
  );
}
