import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";
import { revalidateSite } from "./hooks";

export const Neighborhoods: CollectionConfig = {
  slug: "neighborhoods",
  labels: { singular: "Neighborhood", plural: "Neighborhoods" },
  admin: {
    description:
      "Areas highlighted in Explore the Best Places to Live. Listing counts update automatically.",
    useAsTitle: "name",
    defaultColumns: ["name", "tagline"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "tagline",
      type: "text",
      admin: { description: 'e.g. "Modern & trendy"' },
    },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
