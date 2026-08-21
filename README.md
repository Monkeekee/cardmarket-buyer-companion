# Cardmarket Buyer Companion

A browser extension for **you**: import a Magic list, open your Cardmarket **purchases**, and see which names you already have (and how many you still need).

Not affiliated with Cardmarket. Read-only: it does not add to cart or place orders.

## What it does now

Click the toolbar icon. If a tab in that window is a Magic **order detail** page (`/{locale}/Magic/Orders/{id}`), the popup title is **CM-MTG-Companion V1** and the body is the placeholder for cards. Otherwise it asks you to open such a page.

List import and purchase diffs are not built yet.

**Games:** Magic: The Gathering. **UI language:** English and French. Cardmarket itself can be in any locale.

## Install (sideload)

Needs Node.js. Stores are a later maybe.

```bash
npm install
npm run build
```

- **Chrome / Edge:** `chrome://extensions` → Developer mode → Load unpacked → `.output/chrome-mv3`
- **Firefox:** `npm run build:firefox`, then `about:debugging` → This Firefox → Load Temporary Add-on → `.output/firefox-mv3/manifest.json`

`npm run dev` rebuilds while you iterate (Chrome).

You must be logged into Cardmarket for real orders. The extension does not place orders.

## Tests

```bash
npm test          # unit (URL matcher)
npm run test:e2e  # Playwright + unpacked Chrome extension; local HTML mock, not live Cardmarket
```

E2e is Chromium-only and is not run in CI. First run may need `npx playwright install chromium`. Playwright is pinned to **1.48** so it still installs Chromium on macOS 12 (Monterey).

## Privacy

- No backend, no telemetry in v1.
- No Cardmarket fetch from the popup yet (URL of open tabs only).
- Later: list + last diff in `storage.local` on your machine.

## Contributing

This is a personal tool. **Issues are welcome**; there is no promise they will be triaged or that PRs will merge.

If you do send a PR: stay in scope (read-only, MTG, purchases vs imported list). License is [MPL-2.0](LICENSE).

## Agents / docs

- [`agents/SPEC.md`](agents/SPEC.md) — technical pieces for v1.
- [`agents/DECISIONS.md`](agents/DECISIONS.md) — behavior/architecture log, one entry per relevant commit.
