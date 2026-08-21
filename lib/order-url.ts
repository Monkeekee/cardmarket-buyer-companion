const ORDER_PATH = /^\/[a-zA-Z]{2,}\/Magic\/Orders\/\d+\/?$/;

/** Cardmarket Magic order *detail* URL (not the /Orders list). */
export function isMagicOrderDetailUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "www.cardmarket.com") return false;
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    return ORDER_PATH.test(parsed.pathname);
  } catch {
    return false;
  }
}
