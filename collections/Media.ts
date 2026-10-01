import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description:
      "Photos used across listings, agents and articles. Alt text is required.",
    useAsTitle: "alt",
    group: "Content",
  },
  access: { read: () => true },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 2000, height: undefined, position: "centre" },
      { name: "avatar", width: 400, height: 400, position: "centre" },
    ],
    adminThumbnail: "card",
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
