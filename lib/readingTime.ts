type LexicalNode = { text?: string; children?: LexicalNode[] };

const WORDS_PER_MINUTE = 200;

function countWords(node: LexicalNode | undefined): number {
  if (!node) return 0;
  const own = node.text
    ? node.text.trim().split(/\s+/).filter(Boolean).length
    : 0;
  return own + (node.children ?? []).reduce((sum, c) => sum + countWords(c), 0);
}

/**
 * Minutes to read an article, computed from its body (200 words a minute, minimum 1).
 * Falls back to the manually entered value when there is no body text.
 */
export function readingMinutes(article: {
  body?: unknown;
  readingMinutes?: number | null;
}): number | null {
  const root = (article.body as { root?: LexicalNode } | null | undefined)
    ?.root;
  const words = countWords(root);
  if (words > 0) return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return article.readingMinutes ?? null;
}
