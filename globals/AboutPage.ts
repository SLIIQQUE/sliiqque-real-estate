import type { GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { revalidateGlobal } from "../collections/hooks";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About page",
  admin: { group: "Site", description: "Content of the About page." },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "story", type: "richText" },
    {
      name: "stats",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "values",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
    { name: "closingTitle", type: "text" },
    { name: "closingText", type: "textarea" },
  ],
};
