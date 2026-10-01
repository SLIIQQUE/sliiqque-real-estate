import { Location, Sms, Call } from "@/components/ui/icons";
import ContactForm from "@/components/forms/ContactForm";
import { getSettings } from "@/lib/queries/globals";

export default async function Contact() {
  const settings = await getSettings();
  return (
    <section id="contact" className="px-3 lg:px-6 pb-6">
      <div className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[680px] lg:min-h-[720px] bg-[#1A1A1A]">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury living room"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 h-full min-h-[680px] lg:min-h-[720px] px-6 lg:px-14 py-10 lg:py-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 text-[10px] tracking-[0.18em] uppercase">
              Get In Touch
            </div>
            <h3 className="serif text-[38px] lg:text-[56px] leading-[0.9] mt-6 tracking-tight">
              Let's Find Your
              <br />
              Perfect Property
            </h3>
            <p className="mt-4 text-white/70 text-[14px] max-w-[380px] leading-[1.6]">
              Whether you're buying, selling, or investing, our expert team is
              here to guide you every step of the way.
            </p>
            <div className="mt-8 space-y-3 text-[13px] text-white/80">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Location size={16} />
                </span>
                {` ${settings.address}`}
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Sms size={16} />
                </span>
                {` ${settings.email}`}
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Call size={16} />
                </span>
                {` ${settings.phone}`}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
