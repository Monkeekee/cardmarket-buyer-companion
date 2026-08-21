# Cardmarket Buyer Companion

A browser extension for **you**: import a Magic list, open your Cardmarket **purchases**, and see which names you already have (and how many you still need).

Not affiliated with Cardmarket. Read-only: it does not add to cart or place orders.

## What it does

1. Import a list (plain card names, or a pasted Moxfield decklist; a Moxfield URL is optional later).
2. With a Cardmarket **purchases** tab open, read the orders **already loaded on that page**.
3. Diff by **card name** (printings are interchangeable). Quantities: you need N, extras past N just count as “have enough”.
4. Show a **per-card** summary: have vs still need.
5. Keep the imported list on **this machine only**.

Purchase **state** (paid, shipped, cancelled, …) is labeled, not ignored. v1 does not walk pagination, fetch orders in the background, or optimize carts.

**Games:** Magic: The Gathering. **UI language:** English and French. Cardmarket itself can be in any locale; the extension must not assume English page copy.

## Install (sideload)

Stores are a later maybe. For now:

- **Chrome / Edge:** clone this repo, build, then Load unpacked on the output folder.
- **Firefox:** clone, build, then Load Temporary Add-on (`about:debugging`) on the manifest.

Exact build commands live with the extension once the first code lands (see `agents/SPEC.md`).

You must be logged into Cardmarket in that browser. The purchases tab has to contain the rows you care about.

## Privacy

- No backend, no telemetry in v1.
- List + last diff: `storage.local` on your machine.
- Cardmarket data is read from the open purchases tab (page + the site’s own XHR). The extension does not call Cardmarket APIs with stored passwords.

## Contributing

This is a personal tool. **Issues are welcome**; there is no promise they will be triaged or that PRs will merge.

If you do send a PR: stay in scope (read-only, purchases vs imported list, MTG). License is [MPL-2.0](LICENSE).

## Agents / docs

- [`agents/SPEC.md`](agents/SPEC.md) — technical pieces for v1.
- [`agents/DECISIONS.md`](agents/DECISIONS.md) — behavior/architecture log, one entry per relevant commit.
