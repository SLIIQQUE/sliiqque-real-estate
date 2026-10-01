import { ArrowRight } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/format";
import { readingMinutes } from "@/lib/readingTime";
import { getArticles } from "@/lib/queries/content";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default async function Insights() {
  const articles = await getArticles();
  return (
    <section
      id="insights"
      className="px-6 lg:px-14 py-14 lg:py-20 bg-white border-y border-[#F0E9DE]"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h3 className="serif text-[32px] lg:text-[42px] leading-[0.95]">
            Insights
          </h3>
          <p className="text-[13px] text-[#8A8A8A] mt-2">
            Trends, Data & Opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#9A9A9A] hidden lg:block">
            Latest articles & market reports
          </span>
          <Link
            href="/insights"
            className="ml-3 text-[13px] underline underline-offset-4"
          >
            View all insights
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {articles.map((d) => (
          <article className="group relative" key={d.id}>
            <div className="rounded-[20px] overflow-hidden aspect-[16/10] relative">
              {mediaUrl(d.coverImage) && (
                <Image
                  src={mediaUrl(d.coverImage)!}
                  alt={d.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition duration-700"
                />
              )}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white text-[10px] tracking-wide uppercase font-medium">
                {d.category}
              </div>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 text-[11px] text-[#9A9A9A]">
                <span>{dateFmt.format(new Date(d.publishedAt))}</span>
                <span>•</span>
                <span>{readingMinutes(d)} min read</span>
              </div>
              <h4 className="serif text-[18px] leading-[1.2] mt-2 group-hover:text-[#C26A4A] transition">
                <Link
                  href={`/insights/${d.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {d.title}
                </Link>
              </h4>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium">
                {"Read article "}
                <ArrowRight size={14} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
