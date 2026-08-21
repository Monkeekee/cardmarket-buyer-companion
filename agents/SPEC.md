# SPEC — v1 technical components

What exists from the first implementation onward. Product baseline is in `DECISIONS.md`. Change this file when the architecture changes; log that commit in `DECISIONS.md`.

## Shape

- **MV3** extension, **Chrome + Firefox**, sideloaded.
- Stack: **WXT + TypeScript**, no UI framework unless a screen clearly needs one.
- **No app server.** No official Cardmarket API. No Scryfall (or other) name resolver in v1.
- UI: **toolbar popup only** (EN + FR). No injected purchases UI in v1.

## Pieces

| Piece | Role |
| --- | --- |
| **Popup** | Import list, trigger “read this purchases tab”, show per-card have/need, persist list. |
| **Content script** | Isolated world on Cardmarket **purchases** URLs (any locale path, Magic). Reads **DOM + the page’s own XHR/JSON**. Does not click. |
| **Messaging** | Popup ↔ content script: “give me parsed purchases on this tab”. If the tab is missing/wrong, fail visibly. |
| **Purchases parser** | Normalize whatever the purchases page already loaded into `{ cardName, qty, orderState, … }`. Visible tab only — no pagination crawl, no background `fetch` to Cardmarket. |
| **List parser** | Plain names (optional leading qty). Moxfield **pasted text**. Moxfield **URL fetch** is post-v1 (same parsers once you have text). |
| **Name normalizer** | Case-fold, trim, punctuation, `//` DFC split. No oracle API. |
| **Diff** | Join on normalized **name**. Need N from the list; have = sum of matching purchase qtys; stillNeed = max(0, N − have). Extras are not a separate bucket. |
| **storage.local** | Imported list (and last diff if cheap to keep). Nothing in `sync`. |
| **i18n** | Extension strings EN/FR (`chrome.i18n` or WXT equivalent). Scraping must not key off English CM UI strings. |

## Permissions (intent)

- Host access limited to Cardmarket (content script + optional later Moxfield URL).
- `storage`.
- Enough tab access to talk to the **active** (or explicitly chosen) purchases tab — prefer the smallest MV3 permission that works on both browsers.

## Out of v1 (do not add “while you’re there”)

Cart/checkout automation, seller ranking, landed-cost optimizer, price watch, sales history, full purchase-history crawl, store listing, Safari.

## Check

One small runnable check that fails if name normalize + qty cap diff is wrong (pure TS, no browser). Parser fixtures against CM HTML/JSON when we have a real sample.
