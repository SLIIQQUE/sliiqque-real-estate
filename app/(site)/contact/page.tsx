import ContactDetails from "@/components/contact/ContactDetails";
import Faq from "@/components/contact/Faq";
import ContactForm from "@/components/forms/ContactForm";
import InnerPage from "@/components/layout/InnerPage";
import PageHeader from "@/components/ui/PageHeader";
import { getSettings } from "@/lib/queries/globals";

export const metadata = {
  title: "Contact | SLIIQQUE Real Estate",
  description: "Talk to our team about buying, selling, renting or investing.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <InnerPage>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your next move"
        intro="Send us a message and an agent will reply within one working day. Prefer to talk? Call or visit during opening hours."
      />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
        <ContactDetails settings={settings} />
        <ContactForm className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#F0E9DE]" />
      </div>
      <Faq faqs={settings.faqs ?? []} />
    </InnerPage>
  );
}
