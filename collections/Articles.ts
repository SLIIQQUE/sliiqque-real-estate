import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";
import { revalidateSite } from "./hooks";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    description: "Insights shown on the homepage.",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt"],
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
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        "Market Trends",
        "Buying Guide",
        "Selling Tips",
        "Renting",
        "Investment",
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 300,
      admin: { description: "Short summary for cards and search results" },
    },
    { name: "author", type: "relationship", relationTo: "agents" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "readingMinutes",
      type: "number",
      min: 1,
      admin: { description: "Shown as “N min read”" },
    },
    { name: "body", type: "richText" },
  ],
};
