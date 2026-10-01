import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SLIIQQUE Real Estate",
    short_name: "SLIIQQUE",
    description:
      "Premium real estate solutions for dream homes and smart investments.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBF6",
    theme_color: "#102E26",
    icons: [
      { src: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
