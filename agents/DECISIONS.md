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
