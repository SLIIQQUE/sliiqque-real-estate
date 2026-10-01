import type { Metadata, Viewport } from "next";
import "./globals.css";

const DESCRIPTION =
  "Premium real estate solutions for dream homes and smart investments.";

export const metadata: Metadata = {
  title: "SLIIQQUE Real Estate",
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "SLIIQQUE Real Estate",
    description: DESCRIPTION,
    siteName: "SLIIQQUE",
    type: "website",
    images: [
      { url: "/brand/og.png", width: 1200, height: 630, alt: "SLIIQQUE" },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/brand/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102E26",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
