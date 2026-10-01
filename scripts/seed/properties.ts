import type { Property } from "../../payload-types";
import { U } from "./data";

export interface SeedProperty {
  title: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: Property["propertyType"];
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  city: string;
  region: string;
  address: string;
  featured?: boolean;
  neighborhood: string;
  agent: string;
  photos: string[];
  description: string;
}

const photo = (id: string) => U(id, 1200);
const HOUSE = photo("photo-1600585154340-be6161a56a0c");
const TOWER = photo("photo-1545324418-cc1a3fa10c00");
const VILLA = photo("photo-1600607687939-ce8a6c25118c");
const MODERN = photo("photo-1600596542815-ffad4c1539a9");
const CITY = photo("photo-1449824913935-59a10b8d2000");
const LIVING = photo("photo-1600210492486-724fe5c67fb0");

// Demo listings: replace with real ones in /admin before launch.
export const properties: SeedProperty[] = [
  {
    title: "Palmview Residences",
    slug: "palmview-residences",
    listingType: "sale",
    propertyType: "House",
    price: 2450000,
    bedrooms: 4,
    bathrooms: 4,
    squareFootage: 4520,
    city: "Los Angeles",
    region: "CA",
    address: "1200 Palmview Dr",
    featured: true,
    neighborhood: "Westwood",
    agent: "Sophie Carter",
    photos: [HOUSE, LIVING],
    description:
      "A light-filled family residence with a landscaped garden and a private pool.",
  },
  {
    title: "The Meridian Tower",
    slug: "the-meridian-tower",
    listingType: "sale",
    propertyType: "Apartment",
    price: 1280000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 2140,
    city: "New York",
    region: "NY",
    address: "88 Meridian Ave",
    featured: true,
    neighborhood: "Downtown",
    agent: "James Wilson",
    photos: [TOWER, CITY],
    description:
      "High-floor apartment with skyline views and concierge service.",
  },
  {
    title: "Silver Oak Villas",
    slug: "silver-oak-villas",
    listingType: "rent",
    propertyType: "Villa",
    price: 4800,
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 5800,
    city: "Austin",
    region: "TX",
    address: "410 Silver Oak Ln",
    featured: true,
    neighborhood: "Lakeside",
    agent: "Olivia Bennett",
    photos: [VILLA, MODERN],
    description: "Spacious lakeside villa available for long-term rent.",
  },
  {
    title: "Riverside Loft",
    slug: "riverside-loft",
    listingType: "sale",
    propertyType: "Condo",
    price: 640000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1150,
    city: "Los Angeles",
    region: "CA",
    address: "22 River St #5",
    neighborhood: "Riverside",
    agent: "Sophie Carter",
    photos: [TOWER],
    description:
      "Converted warehouse loft with exposed brick and high ceilings.",
  },
  {
    title: "Lakeside Townhouse",
    slug: "lakeside-townhouse",
    listingType: "sale",
    propertyType: "Townhouse",
    price: 890000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1900,
    city: "Austin",
    region: "TX",
    address: "9 Lakeview Ct",
    neighborhood: "Lakeside",
    agent: "Daniel Brooks",
    photos: [VILLA],
    description: "Three-storey townhouse steps from the water.",
  },
  {
    title: "Westwood Family Home",
    slug: "westwood-family-home",
    listingType: "sale",
    propertyType: "House",
    price: 1750000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 3200,
    city: "Los Angeles",
    region: "CA",
    address: "310 Westwood Blvd",
    neighborhood: "Westwood",
    agent: "James Wilson",
    photos: [MODERN, HOUSE],
    description: "Quiet street, big yard, excellent schools nearby.",
  },
  {
    title: "Downtown Studio",
    slug: "downtown-studio",
    listingType: "rent",
    propertyType: "Apartment",
    price: 1900,
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 640,
    city: "New York",
    region: "NY",
    address: "14 Broad St #12",
    neighborhood: "Downtown",
    agent: "Olivia Bennett",
    photos: [CITY],
    description: "Compact studio in the heart of the financial district.",
  },
  {
    title: "Riverside Garden Flat",
    slug: "riverside-garden-flat",
    listingType: "rent",
    propertyType: "Apartment",
    price: 2750,
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 980,
    city: "Los Angeles",
    region: "CA",
    address: "51 River St",
    neighborhood: "Riverside",
    agent: "Sophie Carter",
    photos: [LIVING],
    description: "Ground-floor flat with a private garden terrace.",
  },
  {
    title: "Oak Hollow Estate",
    slug: "oak-hollow-estate",
    listingType: "sale",
    propertyType: "Villa",
    price: 3900000,
    bedrooms: 6,
    bathrooms: 6,
    squareFootage: 7400,
    city: "Austin",
    region: "TX",
    address: "1 Oak Hollow Rd",
    neighborhood: "Lakeside",
    agent: "Daniel Brooks",
    photos: [VILLA, MODERN, LIVING],
    description: "Gated estate with guest house, pool and panoramic views.",
  },
  {
    title: "Hillcrest Building Plot",
    slug: "hillcrest-building-plot",
    listingType: "sale",
    propertyType: "Land",
    price: 420000,
    city: "Austin",
    region: "TX",
    address: "Hillcrest Rd, Lot 7",
    neighborhood: "Lakeside",
    agent: "Daniel Brooks",
    photos: [CITY],
    description: "Level half-acre plot, utilities at the road.",
  },
  {
    title: "Skyline Penthouse",
    slug: "skyline-penthouse",
    listingType: "sale",
    propertyType: "Condo",
    price: 5200000,
    bedrooms: 4,
    bathrooms: 4,
    squareFootage: 3600,
    city: "New York",
    region: "NY",
    address: "200 Skyline Ave PH",
    neighborhood: "Downtown",
    agent: "James Wilson",
    photos: [TOWER, CITY],
    description: "Full-floor penthouse with wraparound terrace.",
  },
  {
    title: "Westwood Townhome",
    slug: "westwood-townhome",
    listingType: "rent",
    propertyType: "Townhouse",
    price: 3600,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1700,
    city: "Los Angeles",
    region: "CA",
    address: "77 Westwood Ln",
    neighborhood: "Westwood",
    agent: "Olivia Bennett",
    photos: [HOUSE],
    description: "Bright townhome with a two-car garage.",
  },
];
