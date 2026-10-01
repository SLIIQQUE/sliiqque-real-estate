import Image from "next/image";
import { mediaUrl } from "@/lib/format";
import type { Property } from "@/payload-types";

/** Hero photo plus a strip of thumbnails; falls back to a placeholder block. */
export default function Gallery({
  photos,
  title,
}: {
  photos: Property["photos"];
  title: string;
}) {
  const urls = (photos ?? [])
    .map((p) => mediaUrl(p.image, "hero"))
    .filter((u): u is string => Boolean(u));

  if (urls.length === 0) {
    return (
      <div
        className="h-[320px] lg:h-[480px] rounded-[28px] bg-[#EFE7DB]"
        aria-label="No photos available"
      />
    );
  }

  return (
    <div className="grid gap-3">
      <div className="relative h-[320px] lg:h-[480px] rounded-[28px] overflow-hidden bg-[#EFE7DB]">
        <Image
          src={urls[0]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
        />
      </div>
      {urls.length > 1 && (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
          {urls.slice(1, 5).map((url, i) => (
            <div
              key={url}
              className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-[#EFE7DB]"
            >
              <Image
                src={url}
                alt={`${title} photo ${i + 2}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
