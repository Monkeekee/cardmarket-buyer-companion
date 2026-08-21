# DECISIONS

Append **one entry per commit** that changes behavior, workflow, or architecture (not chore-only: typos, lockfile, comment nits).

Newest first. Do not rewrite old entries; add a new one if a decision flips.

## Template

```
## YYYY-MM-DD — <short title> (`<commit hash or TBD>`)

- **Context:**
- **Decision:**
- **Consequences:** (what we will not do, or what the next commit must respect)
```

---

## 2026-08-21 — Order-page toolbar popup + local e2e (`TBD`)

- **Context:** First code. Chrome cannot open the action popup on navigation. E2e must not hit live Cardmarket. Opening `popup.html` as a tab (Playwright) would steal “active tab” if we only looked at `active: true`.
- **Decision:** Toolbar popup on click. Match `/{locale}/Magic/Orders/{id}` only. Tab pick skips non-http(s), then active else first http(s) in the window. Playwright + local HTML via `context.route` on `www.cardmarket.com`. Chromium e2e only, no CI. WXT + TS, `tabs` permission, no content script yet.
- **Consequences:** No auto-open overlay. Firefox is buildable but not e2e’d. Fill this hash when the feature is committed.

## Baseline (pre-code, 2026-08-21)

Kickoff interview. Treat as Decision 0 until the first feature commit.

- **Audience:** personal tool (maybe friends). Issues welcome; no merge promise.
- **Form:** browser extension, **popup only**, **read-only**.
- **Browsers:** Chrome (Edge) + Firefox. Sideload now; stores later.
- **Game:** MTG. **CM locale:** any. **Extension UI:** EN + FR.
- **Job:** import list vs **purchases already loaded on the open tab**; per-card have/still-need; all purchase states labeled.
- **Import:** plain names + Moxfield paste; Moxfield URL after v1.
- **Match:** card name only; light normalize; qty cap (extras are “enough”, not a bucket).
- **Data:** DOM + Cardmarket’s own XHR on that tab. No background CM fetch. `storage.local` only.
- **License:** MPL-2.0 (already in repo).
