import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import PropertyTypes from "@/components/sections/PropertyTypes";
import Neighborhoods from "@/components/sections/Neighborhoods";
import Agents from "@/components/sections/Agents";
import Insights from "@/components/sections/Insights";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

// Content comes from Payload. Edits in /admin revalidate instantly; this is a daily safety net.
export const revalidate = 86400;

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <FeaturedListings />
      <PropertyTypes />
      <Neighborhoods />
      <Agents />
      <Insights />
      <Stats />
      <Testimonials />
      <Contact />
    </PageShell>
  );
}
