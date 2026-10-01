import "server-only";

// In-memory, per-instance limiter. Use Redis (e.g. Upstash) for multi-instance deployments.
const hits = new Map<string, number[]>();

export function allowRequest(
  key: string,
  limit: number,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
