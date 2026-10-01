import type { Article } from "../../payload-types";

export const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const agents = [
  {
    name: "Sophie Carter",
    role: "Luxury Specialist",
    rating: 4.9,
    reviewCount: 127,
    photo: U("photo-1494790108377-be9c29b29330", 400),
  },
  {
    name: "James Wilson",
    role: "Senior Agent",
    rating: 5.0,
    reviewCount: 203,
    photo: U("photo-1507003211169-0a1dd7228f2d", 400),
  },
  {
    name: "Olivia Bennett",
    role: "Investment Advisor",
    rating: 4.9,
    reviewCount: 98,
    photo: U("photo-1438761681033-6461ffad8d80", 400),
  },
  {
    name: "Daniel Brooks",
    role: "Commercial Lead",
    rating: 4.8,
    reviewCount: 156,
    photo: U("photo-1500648767791-00dcc994a43e", 400),
  },
];

export const neighborhoods = [
  {
    name: "Riverside",
    tagline: "Modern & trendy",
    photo: U("photo-1600596542815-ffad4c1539a9", 400),
  },
  {
    name: "Westwood",
    tagline: "Family friendly",
    photo: U("photo-1600585154340-be6161a56a0c", 400),
  },
  {
    name: "Lakeside",
    tagline: "Peaceful & green",
    photo: U("photo-1600607687939-ce8a6c25118c", 400),
  },
  {
    name: "Downtown",
    tagline: "Work & play",
    photo: U("photo-1449824913935-59a10b8d2000", 400),
  },
];

export const testimonials = [
  {
    authorName: "Emily Johnson",
    authorRole: "Home Buyer • Los Angeles, CA",
    quote:
      "SLIIQQUE made buying my first home seamless. Sophie was incredibly knowledgeable and patient. She found me the perfect place in Riverside within my budget. I couldn't be happier!",
    photo: U("photo-1494790108377-be9c29b29330", 200),
  },
  {
    authorName: "Michael Roberts",
    authorRole: "Property Seller • Austin, TX",
    quote:
      "Selling my villa was faster than I imagined. The team handled everything from staging to closing. Their market insights helped us get 12% above asking. Truly professionals.",
    photo: U("photo-1507003211169-0a1dd7228f2d", 200),
  },
];

export const articles: {
  title: string;
  slug: string;
  category: Article["category"];
  publishedAt: string;
  readingMinutes: number;
  cover: string;
}[] = [
  {
    title: "Home Prices Are Climbing in Key Cities",
    slug: "home-prices-climbing-key-cities",
    category: "Market Trends",
    publishedAt: "2026-04-12",
    readingMinutes: 5,
    cover: U("photo-1560518883-ce09059eeffa", 600),
  },
  {
    title: "5 Things to Know Before Buying a Home",
    slug: "five-things-before-buying-a-home",
    category: "Buying Guide",
    publishedAt: "2026-04-08",
    readingMinutes: 4,
    cover: U("photo-1600585154340-be6161a56a0c", 600),
  },
  {
    title: "Why Real Estate Remains a Strong Investment",
    slug: "why-real-estate-remains-strong-investment",
    category: "Investment",
    publishedAt: "2026-04-03",
    readingMinutes: 6,
    cover: U("photo-1600607687939-ce8a6c25118c", 600),
  },
];
