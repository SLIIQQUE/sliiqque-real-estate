import { QuoteUp, Star1 } from "@/components/ui/icons";
import Image from "next/image";
import { mediaUrl } from "@/lib/format";
import { getTestimonials } from "@/lib/queries/content";

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <span
      className="flex gap-0.5 text-[#C26A4A]"
      aria-label={`${value} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star1 key={i} size={14} variant={i < filled ? "Bold" : "Linear"} />
      ))}
    </span>
  );
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  const rated = testimonials.filter((t) => t.rating != null);
  const average = rated.length
    ? rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length
    : null;
  return (
    <section className="px-6 lg:px-14 py-14 lg:py-20 bg-[#FFFBF6]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-start justify-between mb-10">
          <h3 className="serif text-[32px] lg:text-[44px] leading-[0.9]">
            Real Stories.
            <br />
            Real Results.
          </h3>
          {average != null && (
            <div className="hidden lg:flex items-center gap-2 text-[12px] text-[#9A9A9A]">
              <span>
                {average.toFixed(1)}/5 average rating from {rated.length}{" "}
                {rated.length === 1 ? "review" : "reviews"}
              </span>
              <Stars value={average} />
            </div>
          )}
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          {testimonials.map((d) => (
            <div
              className="bg-white rounded-[24px] border border-[#F0E9DE] p-6 lg:p-8"
              key={d.id}
            >
              <div className="mb-4">
                <Stars value={d.rating ?? 5} />
              </div>
              <p className="serif text-[18px] lg:text-[20px] leading-[1.4]">
                "{d.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  {mediaUrl(d.photo, "avatar") && (
                    <Image
                      src={mediaUrl(d.photo, "avatar")!}
                      alt={d.authorName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="text-[13px] font-medium">{d.authorName}</div>
                  <div className="text-[11px] text-[#8A8A8A]">
                    {d.authorRole}
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-[#FDF6EF] flex items-center justify-center text-[#C26A4A]">
                  <QuoteUp size={16} variant="Bold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
