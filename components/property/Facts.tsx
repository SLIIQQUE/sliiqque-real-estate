import type { Property } from "@/payload-types";

export default function Facts({ property: p }: { property: Property }) {
  const facts = [
    { label: "Bedrooms", value: p.bedrooms },
    { label: "Bathrooms", value: p.bathrooms },
    {
      label: "Area",
      value:
        p.squareFootage == null
          ? null
          : `${p.squareFootage.toLocaleString("en-US")} sqft`,
    },
    { label: "Type", value: p.propertyType },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {facts.map((f) => (
        <div
          key={f.label}
          className="rounded-[16px] bg-[#FDF8F1] border border-[#F0E9DE] px-4 py-3"
        >
          <div className="text-[11px] uppercase tracking-wide text-[#9A9A9A]">
            {f.label}
          </div>
          <div className="serif text-[20px] mt-1">{f.value ?? "—"}</div>
        </div>
      ))}
    </div>
  );
}
