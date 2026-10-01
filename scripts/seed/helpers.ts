import type { Payload } from "payload";

const cache = new Map<string, number>();

/** Download a remote image once and store it in the Media collection. */
export async function uploadImage(
  payload: Payload,
  url: string,
  alt: string,
): Promise<number> {
  const hit = cache.get(url);
  if (hit) return hit;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const data = Buffer.from(await res.arrayBuffer());
  const name = `${alt.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${cache.size}.jpg`;
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: { data, mimetype: "image/jpeg", name, size: data.length },
  });
  cache.set(url, doc.id as number);
  return doc.id as number;
}

/** Minimal Lexical document containing a single paragraph. */
export function richText(text: string) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr" as const,
          children: [
            {
              type: "text",
              text,
              format: 0,
              detail: 0,
              mode: "normal",
              style: "",
              version: 1,
            },
          ],
        },
      ],
    },
  };
}
