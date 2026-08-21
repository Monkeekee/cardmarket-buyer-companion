import { describe, expect, it } from "vitest";
import { isMagicOrderDetailUrl } from "./order-url";

describe("isMagicOrderDetailUrl", () => {
  it("accepts the example French order detail URL", () => {
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/fr/Magic/Orders/1283626044",
      ),
    ).toBe(true);
  });

  it("accepts other locales, http, trailing slash, and query", () => {
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/en/Magic/Orders/1",
      ),
    ).toBe(true);
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/de/Magic/Orders/99/",
      ),
    ).toBe(true);
    expect(
      isMagicOrderDetailUrl("http://www.cardmarket.com/fr/Magic/Orders/1"),
    ).toBe(true);
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/fr/Magic/Orders/1283626044?foo=1",
      ),
    ).toBe(true);
  });

  it("rejects list, other games, products, and other hosts", () => {
    expect(isMagicOrderDetailUrl("https://www.cardmarket.com/fr/Magic/Orders")).toBe(
      false,
    );
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/fr/Pokemon/Orders/1283626044",
      ),
    ).toBe(false);
    expect(
      isMagicOrderDetailUrl(
        "https://www.cardmarket.com/en/Magic/Products/Singles/Something",
      ),
    ).toBe(false);
    expect(isMagicOrderDetailUrl("https://example.com/fr/Magic/Orders/1")).toBe(
      false,
    );
    expect(isMagicOrderDetailUrl(undefined)).toBe(false);
  });
});
