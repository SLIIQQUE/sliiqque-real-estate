import type { CollectionConfig } from "payload";
import { isLoggedIn, isLoggedInField } from "./access";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: { singular: "Inquiry", plural: "Inquiries" },
  admin: {
    description: "Messages from the contact, sell and viewing forms.",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "type", "status", "createdAt"],
    group: "Leads",
  },
  // Visitors may submit; only logged-in staff can read or manage.
  access: {
    create: () => true,
    read: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", maxLength: 40 },
    { name: "message", type: "textarea", required: true, maxLength: 4000 },
    { name: "property", type: "relationship", relationTo: "properties" },
    { name: "agent", type: "relationship", relationTo: "agents" },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "contact",
      options: [
        { label: "Contact", value: "contact" },
        { label: "Sell enquiry", value: "sell" },
        { label: "Viewing request", value: "viewing" },
        { label: "Newsletter signup", value: "subscribe" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "contacted", "closed"],
      access: { create: isLoggedInField, update: isLoggedInField },
    },
  ],
};
