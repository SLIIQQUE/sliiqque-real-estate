import type { GlobalConfig } from "payload";
import { isLoggedIn } from "../collections/access";
import { revalidateGlobal } from "../collections/hooks";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Site",
    description:
      "Contact details, opening hours, social links and FAQs shown across the site.",
  },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
      defaultValue: "SLIIQQUE Real Estate",
    },
    { name: "tagline", type: "text" },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text", required: true },
        {
          name: "whatsapp",
          type: "text",
          admin: {
            description:
              "International format, digits only, e.g. 2348012345678",
          },
        },
      ],
    },
    { name: "address", type: "text", required: true },
    {
      name: "hours",
      type: "array",
      labels: { singular: "Opening hours row", plural: "Opening hours" },
      fields: [
        {
          name: "days",
          type: "text",
          required: true,
          admin: { description: "e.g. Monday – Friday" },
        },
        {
          name: "hours",
          type: "text",
          required: true,
          admin: { description: "e.g. 9:00 – 18:00" },
        },
      ],
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "faqs",
      type: "array",
      labels: { singular: "FAQ", plural: "FAQs" },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
