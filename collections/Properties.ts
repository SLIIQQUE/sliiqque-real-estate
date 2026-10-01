import type { CollectionConfig } from "payload";
import { isLoggedIn, publicActiveOnly } from "./access";
import { PROPERTY_TYPES } from "../lib/propertyTypes";
import { revalidateSite } from "./hooks";

export const Properties: CollectionConfig = {
  slug: "properties",
  labels: { singular: "Property", plural: "Properties" },
  admin: {
    description:
      "Homes for sale and rent. Only Active listings appear on the site.",
    useAsTitle: "title",
    defaultColumns: ["title", "city", "price", "status", "featured"],
    listSearchableFields: ["title", "city", "address"],
    group: "Listings",
  },
  access: {
    read: publicActiveOnly,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: { afterChange: [revalidateSite], afterDelete: [revalidateSite] },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      type: "row",
      fields: [
        {
          name: "listingType",
          type: "select",
          required: true,
          index: true,
          defaultValue: "sale",
          options: [
            { label: "For Sale", value: "sale" },
            { label: "For Rent", value: "rent" },
          ],
        },
        {
          name: "status",
          type: "select",
          required: true,
          index: true,
          defaultValue: "active",
          options: [
            { label: "Active", value: "active" },
            { label: "Pending", value: "pending" },
            { label: "Sold", value: "sold" },
          ],
        },
        {
          name: "propertyType",
          type: "select",
          required: true,
          index: true,
          options: PROPERTY_TYPES.map((value) => ({ label: value, value })),
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "number",
          required: true,
          min: 0,
          index: true,
          admin: { description: "Sale price, or monthly rent for rentals" },
        },
        {
          name: "currency",
          type: "select",
          required: true,
          defaultValue: "USD",
          options: [
            { label: "USD ($)", value: "USD" },
            { label: "NGN (₦)", value: "NGN" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "bedrooms", type: "number", min: 0 },
        { name: "bathrooms", type: "number", min: 0 },
        { name: "squareFootage", type: "number", min: 0 },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "city", type: "text", required: true, index: true },
        {
          name: "region",
          type: "text",
          index: true,
          admin: { description: "State or province" },
        },
      ],
    },
    { name: "address", type: "text" },
    { name: "neighborhood", type: "relationship", relationTo: "neighborhoods" },
    { name: "agent", type: "relationship", relationTo: "agents" },
    { name: "featured", type: "checkbox", defaultValue: false, index: true },
    {
      name: "photos",
      type: "array",
      admin: { description: "The first photo is used on listing cards" },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
      ],
    },
    { name: "description", type: "richText" },
    {
      type: "row",
      fields: [
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
      ],
    },
  ],
};
