type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] };

const text = (t: string) => ({
  type: "text",
  text: t,
  format: 0,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});
const base = {
  format: "" as const,
  indent: 0,
  version: 1,
  direction: "ltr" as const,
};

function node(b: Block) {
  if ("h2" in b)
    return { type: "heading", tag: "h2", ...base, children: [text(b.h2)] };
  if ("h3" in b)
    return { type: "heading", tag: "h3", ...base, children: [text(b.h3)] };
  if ("p" in b) return { type: "paragraph", ...base, children: [text(b.p)] };
  const ordered = "ol" in b;
  const items = ordered ? b.ol : b.ul;
  return {
    type: "list",
    listType: ordered ? "number" : "bullet",
    tag: ordered ? "ol" : "ul",
    start: 1,
    ...base,
    children: items.map((t, i) => ({
      type: "listitem",
      value: i + 1,
      ...base,
      children: [text(t)],
    })),
  };
}

/** Build a Lexical document from simple blocks. */
export function doc(blocks: Block[]) {
  return { root: { type: "root", ...base, children: blocks.map(node) } };
}
