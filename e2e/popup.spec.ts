import { expect, ORDER_URL, test } from "./extension";

const TITLE = "CM-MTG-Companion V1";
const PLACEHOLDER = "Cards from orders shall appear here";
const FALLBACK = "Open a Magic order page on Cardmarket.";

test("popup shows placeholder on a Magic order detail tab", async ({
  context,
  extensionId,
}) => {
  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(ORDER_URL);
  const popup = await context.newPage();
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(popup.locator("#title")).toHaveText(TITLE);
  await expect(popup.locator("#body")).toHaveText(PLACEHOLDER);
});

test("popup asks to open an order page on a non-order tab", async ({
  context,
  extensionId,
}) => {
  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto("https://example.com");
  const popup = await context.newPage();
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  await expect(popup.locator("#title")).toHaveText(TITLE);
  await expect(popup.locator("#body")).toHaveText(FALLBACK);
});
