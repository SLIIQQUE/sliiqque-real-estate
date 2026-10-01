import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Settings",
    description: "People who can sign in to this admin.",
  },
  auth: true,
  fields: [],
};
