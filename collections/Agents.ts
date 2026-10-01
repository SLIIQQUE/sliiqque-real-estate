import type { CollectionConfig } from "payload";
import { isLoggedIn } from "./access";
import { slugify } from "../lib/slug";
import { revalidateSite } from "./hooks";

export const Agents: CollectionConfig = {
  slug: "agents",
  labels: { singular: "Agent", plural: "Agents" },
  admin: {
    description:
      "People shown on the Meet Our Expert Team section and listing pages.",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "rating", "reviewCount"],
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
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Generated from the name when left empty",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) =>
            value || slugify(String(siblingData?.name ?? "")),
        ],
      },
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: { description: 'e.g. "Luxury Specialist"' },
    },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "bio", type: "textarea" },
    {
      name: "yearsExperience",
      type: "number",
      min: 0,
      admin: { description: "Shown on the profile page" },
    },
    {
      name: "specialties",
      type: "array",
      labels: { singular: "Specialty", plural: "Specialties" },
      fields: [{ name: "label", type: "text", required: true }],
    },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    {
      name: "rating",
      type: "number",
      min: 0,
      max: 5,
      admin: { step: 0.1, description: "Entered manually" },
    },
    { name: "reviewCount", type: "number", min: 0 },
  ],
};
