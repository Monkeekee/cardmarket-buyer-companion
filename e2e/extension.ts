import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  test as base,
  chromium,
  type BrowserContext,
} from "@playwright/test";

const dir = path.dirname(fileURLToPath(import.meta.url));
const extensionPath = path.resolve(dir, "../.output/chrome-mv3");
const orderHtml = fs.readFileSync(
  path.join(dir, "fixtures/order.html"),
  "utf8",
);

export const ORDER_URL =
  "https://www.cardmarket.com/fr/Magic/Orders/1283626044";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    if (!fs.existsSync(extensionPath)) {
      throw new Error(`Build first (missing ${extensionPath})`);
    }
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cm-mtg-pw-"));
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    await context.route("https://www.cardmarket.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html; charset=utf-8",
        body: orderHtml,
      }),
    );
    await use(context);
    await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  },
  extensionId: async ({ context }, use) => {
    let worker = context.serviceWorkers()[0];
    if (!worker) worker = await context.waitForEvent("serviceworker");
    await use(new URL(worker.url()).hostname);
  },
});

export { expect } from "@playwright/test";
