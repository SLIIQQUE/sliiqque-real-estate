import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard, { articleDate } from "@/components/insights/ArticleCard";
import ShareButtons from "@/components/insights/ShareButtons";
import InnerPage from "@/components/layout/InnerPage";
import RichBody from "@/components/ui/RichBody";
import { mediaUrl } from "@/lib/format";
import { readingMinutes } from "@/lib/readingTime";
import { getArticleBySlug, getRelatedArticles } from "@/lib/queries/articles";
import type { Agent } from "@/payload-types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticleBySlug((await params).slug);
  if (!a) return { title: "Article not found" };
  return {
    title: `${a.title} | SLIIQQUE Real Estate`,
    description: a.excerpt ?? undefined,
    openGraph: {
      title: a.title,
      description: a.excerpt ?? undefined,
      type: "article",
      images: [mediaUrl(a.coverImage, "hero") ?? "/brand/og.png"],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug((await params).slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.id, article.category);
  const cover = mediaUrl(article.coverImage, "hero");
  const author =
    typeof article.author === "object" ? (article.author as Agent) : null;

  return (
    <InnerPage>
      <Link
        href="/insights"
        className="text-[13px] underline underline-offset-4"
      >
        ← All insights
      </Link>
      <article className="mt-6 max-w-[760px] mx-auto">
        <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A]">
          {article.category}
        </div>
        <h1 className="serif text-[34px] lg:text-[50px] leading-[1.02] tracking-tight mt-3">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-[17px] leading-[1.6] text-[#6B6B6B]">
            {article.excerpt}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#9A9A9A]">
          {author && (
            <>
              <Link
                href={`/agents/${author.slug}`}
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                {author.name}
              </Link>
              <span>•</span>
            </>
          )}
          <time dateTime={article.publishedAt}>
            {articleDate.format(new Date(article.publishedAt))}
          </time>
          {readingMinutes(article) && (
            <>
              <span>•</span>
              <span>{readingMinutes(article)} min read</span>
            </>
          )}
        </div>
        {cover && (
          <div className="relative mt-8 aspect-[16/9] rounded-[24px] overflow-hidden bg-[#EFE7DB]">
            <Image
              src={cover}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="mt-10">
          {article.body && <RichBody data={article.body} />}
        </div>
        <div className="mt-10 pt-6 border-t border-[#F0E9DE] flex flex-wrap items-center justify-between gap-4">
          <span className="text-[12px] uppercase tracking-wide text-[#9A9A9A]">
            Share
          </span>
          <ShareButtons title={article.title} />
        </div>
        {author && (
          <Link
            href={`/agents/${author.slug}`}
            className="mt-8 block rounded-[20px] bg-[#FDF8F1] border border-[#F0E9DE] p-5 hover:border-[#102E26] transition"
          >
            <div className="text-[11px] uppercase tracking-wide text-[#9A9A9A]">
              Written by
            </div>
            <div className="serif text-[20px] mt-1">{author.name}</div>
            <div className="text-[13px] text-[#6B6B6B]">{author.role}</div>
          </Link>
        )}
      </article>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="serif text-[30px] mb-6">Keep reading</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </InnerPage>
  );
}
