import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";
import { revalidateSite } from "./hooks";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: {
    description: "Client stories shown in Real Stories. Real Results.",
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "authorRole", "rating"],
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
    { name: "quote", type: "textarea", required: true },
    { name: "authorName", type: "text", required: true },
    {
      name: "authorRole",
      type: "text",
      admin: { description: 'e.g. "Home Buyer • Los Angeles, CA"' },
    },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
  ],
};
