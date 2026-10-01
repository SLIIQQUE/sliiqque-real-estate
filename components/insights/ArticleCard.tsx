import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { mediaUrl } from "@/lib/format";
import { readingMinutes } from "@/lib/readingTime";
import type { Article } from "@/payload-types";

export const articleDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function ArticleCard({ article: d }: { article: Article }) {
  const cover = mediaUrl(d.coverImage);
  return (
    <article className="group relative">
      <div className="rounded-[20px] overflow-hidden aspect-[16/10] relative bg-[#EFE7DB]">
        {cover && (
          <Image
            src={cover}
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
          <span>{articleDate.format(new Date(d.publishedAt))}</span>
          {readingMinutes(d) && (
            <>
              <span>•</span>
              <span>{readingMinutes(d)} min read</span>
            </>
          )}
        </div>
        <h2 className="serif text-[19px] leading-[1.2] mt-2 group-hover:text-[#C26A4A] transition">
          <Link
            href={`/insights/${d.slug}`}
            className="after:absolute after:inset-0"
          >
            {d.title}
          </Link>
        </h2>
        {d.excerpt && (
          <p className="mt-2 text-[13px] leading-[1.6] text-[#6B6B6B] line-clamp-3">
            {d.excerpt}
          </p>
        )}
        <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium">
          Read article <ArrowRight size={14} />
        </div>
      </div>
    </article>
  );
}
