import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/** Typography for CMS rich text (headings, lists, quotes) in the site's style. */
export default function RichBody({ data }: { data: SerializedEditorState }) {
  return (
    <div
      className={[
        "text-[16px] leading-[1.8] text-[#3C3C3C]",
        "[&_p]:mb-5",
        "[&_h2]:serif [&_h2]:text-[28px] [&_h2]:leading-[1.15] [&_h2]:text-[#1A1A1A] [&_h2]:mt-10 [&_h2]:mb-4",
        "[&_h3]:serif [&_h3]:text-[22px] [&_h3]:text-[#1A1A1A] [&_h3]:mt-8 [&_h3]:mb-3",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-[#C26A4A] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6",
        "[&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-[#1A1A1A]",
      ].join(" ")}
    >
      <RichText data={data} />
    </div>
  );
}
