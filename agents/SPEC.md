# SPEC — v1 technical components

What exists from the first implementation onward. Product baseline is in `DECISIONS.md`. Change this file when the architecture changes; log that commit in `DECISIONS.md`.

## Shape

- **MV3** extension, **Chrome + Firefox**, sideloaded.
- Stack: **WXT + TypeScript**, no UI framework unless a screen clearly needs one.
- **No app server.** No official Cardmarket API. No Scryfall (or other) name resolver in v1.
- UI: **toolbar popup on click** (EN + FR). Browsers will not auto-open the popup on navigation. No injected purchases UI.

## Milestone: order URL gate (current)

| Piece | Role |
| --- | --- |
| **Popup** | Title `CM-MTG-Companion V1`. If the relevant tab is a Magic order **detail** URL, placeholder copy; else “open an order page”. |
| **URL matcher** | `lib/order-url.ts`: `https?://www.cardmarket.com/{locale}/Magic/Orders/{digits}` only. |
| **Tab pick** | `tabs.query({ currentWindow: true })`, ignore non-http(s) (so `chrome-extension://` popup-as-tab does not win). Prefer active http(s) tab, else first http(s) tab. |
| **i18n** | `public/_locales/{en,fr}/messages.json`. |
| **Unit tests** | Vitest on the matcher. |
| **E2e** | Playwright 1.48 (macOS 12), Chromium, load unpacked `.output/chrome-mv3`. Mock `https://www.cardmarket.com/**` with local HTML. Empty background SW so tests can read the extension id. No live Cardmarket. No CI. |

Permissions now: **`tabs`**. No host permissions, no content script, no `storage` yet.

## Later pieces (not started)

| Piece | Role |
| --- | --- |
| **Content script** | Isolated world on Cardmarket purchases/order URLs (any locale path, Magic). Reads **DOM + the page’s own XHR/JSON**. Does not click. |
| **Messaging** | Popup ↔ content script: “give me parsed purchases on this tab”. |
| **Purchases parser** | `{ cardName, qty, orderState, … }`. Visible tab only. |
| **List parser** | Plain names; Moxfield pasted text; Moxfield URL after v1. |
| **Name normalizer** | Case-fold, trim, punctuation, `//` DFC split. No oracle API. |
| **Diff** | Join on normalized name; qty cap. |
| **storage.local** | Imported list (and last diff if cheap). |

## Out of v1 (do not add “while you’re there”)

Cart/checkout automation, seller ranking, landed-cost optimizer, price watch, sales history, full purchase-history crawl, store listing, Safari, GitHub Actions e2e, live Cardmarket in tests.
