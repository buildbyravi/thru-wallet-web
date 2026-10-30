# Code audit — 2026-10-30

Full read of `src/` (6,361 lines, 43 files), plus `next.config.ts`, `package.json`, `vercel.json`,
`drizzle.config.json`, `tsconfig.json`, `eslint.config.mjs`. Findings were verified against running
code — a production build served on `next start` — not by reading alone.

**Result:** 10 defects fixed, 8 pieces of dead or duplicated code removed, 4 facts that could drift
silently now derive from the content layer, 7 items flagged for a decision. `tsc --noEmit`,
`eslint .`, and `next build` are clean; all 28 internal links and 9 machine endpoints return 200.

---

## 1. Defects fixed

| # | Where | Defect | Fix |
| --- | --- | --- | --- |
| 1 | `src/lib/llms.ts:117` | `/llms-full.txt` rendered every document as `## Doc: Features (/features)`. All 11 of those paths are 404s; the real route is `/docs/<slug>`. A machine-readable file whose purpose is to be quoted was publishing broken URLs. | `/docs/${doc.slug}` |
| 2 | `src/content/changelog.ts` | The array was not newest-first: `v20 → v22` (2026-10-10) sat *after* `v17 → v19` (2026-10-08). `/changelog`, `/llms-full.txt` and the `TechArticle` dates all take order from this array, so a dated ledger was out of order. | entries reordered; assertion added to the audit script |
| 3 | `src/db/index.ts` | The `pg` Pool had no `error` listener. An idle client disconnecting — a database restart, a proxy timeout, a network blip — emits `'error'`, and Node treats an unhandled `'error'` event as fatal, so one dropped idle connection took the server down. | `createPool()` attaches a listener that logs and lets the pool replace the client |
| 4 | `src/lib/desk.ts` | The desk session cookie set `httpOnly`, `sameSite` and `expires` but not `secure`, so it was also sent over plain HTTP. | `secure: process.env.NODE_ENV === "production"` |
| 5 | `src/lib/desk.ts` | Expired session rows were never deleted; `desk_sessions` grew without bound. | expired rows cleared on each login |
| 6 | `src/lib/catalog.ts` `saveSmoke()` | The desk submits **one** form containing all 19 smoke rows, and the loop rewrote every row. Ticking one checkbox bumped `updatedAt` on all 19 — falsifying the "last updated" the status page prints — and issued 19 UPDATEs for one edit. | reads current rows, writes only what changed |
| 7 | `src/app/desk/actions.ts`, `src/app/api/smoke/route.ts` | `deleteNote` and `updateSmoke` had no error handling: a database failure surfaced the full-page error boundary instead of a message next to the form, and `POST /api/smoke` returned a bare 500 with no body. | redirect `?error=write` with a message; 503 JSON |
| 8 | `src/app/error.tsx` | The boundary asserted "This page could not read the database" for **every** route error, including render bugs and bad imports. It also dropped `error.digest`, the only handle a production build gives you. | generic copy, digest shown, link to `/status` |
| 9 | `src/components/MarkdownContent.tsx` | `parseTable()` assumed row 2 was the `\|---\|` alignment separator and always discarded it. A table written without one silently lost its first data row. | separator detected by pattern; data rows kept |
| 10 | `src/components/CopyButton.tsx` | Clipboard failure was swallowed. Outside a secure context, or with permission refused, the button stayed "Copy" and gave no feedback. | explicit `copied` / `failed` states |

## 2. Facts that could drift silently

The site's central claim is that its numbers are dated and traceable. These were literals that
bypassed the content layer — the exact failure mode the repository documents against.

| Where | Hardcoded | Now |
| --- | --- | --- |
| `llms.ts:47` | `72 callable … 51 unlocked, 12 password-gated, 9 signing-gated` | `site.contract.*` |
| `llms.ts:53` | `43-method DeFi surface` | `drift.sourceDefi` |
| `llms.ts:87` | `PBKDF2-SHA256 600,000 then AES-256-GCM` | `site.contract.kdf` / `.cipher` |
| `llms.ts:88` | the RPC host, written out longhand | `source.rpc` |
| `WalletMock.tsx:68` | `store v15 · main v28` | `drift.storeContract` / `drift.sourceContract` |
| `status/page.tsx:26` | `23 days and 13 contract versions` | `drift.days` / `drift.contractVersions` |
| `install/page.tsx:120` | `36 suites` | `source.tests` |

`assertMethodSplit()` in `src/content/site.ts` throws at build time if the four-part split stops
summing to `drift.sourceMethods`. Verified by changing one value: the build fails with a message
naming the file. Drift now breaks the build instead of the copy.

## 3. Dead and duplicated code removed

| Item | Why it was dead |
| --- | --- |
| `StoreButton` variants `"ink"` and `"line"` | Never passed by any call site — the pages that want those tones use `className="btn btn-ink"` directly |
| `site.tagline`, `site.baselineDate` | Never read: not rendered, not in `/api/catalog` |
| `searchIntents`, `siteUpdatedOn` | Added in the SEO work, never imported |
| `release` import in `app/page.tsx` | Unused import |
| WalletMock's inline `<svg>` | A second copy of `Mark`; `Mark` now takes `barFill` and both sites share it |
| MarkdownContent's code-block markup | A third copy of the `CodeBlock` figure, already diverged (language label vs caption). Now reuses `CodeBlock` |
| `export` on `parseMarkdown` | Only used inside its own module |
| `0{index + 1}` in `ArchDiagram` | Broke at ten layers; `String(n).padStart(2, "0")` |

## 4. Flagged, deliberately not changed

These need a content or product decision, or the change is riskier than the smell.

1. **Two documents answer one question.** `/docs/ai-and-mcp` ("AI agents and MCP") and
   `/docs/mcp-and-ai` ("MCP and AI policy") — near-identical titles, 0.13 word overlap. They
   compete for the same query. Recommend merging into one and 301-ing the other, but that changes
   the "eleven documents" count repeated in `seo.ts`, the docs hub, `/llms.txt` and this repo's
   README, so it should be one deliberate edit rather than a drive-by.
2. **`ensureCatalog()` runs on every read.** Two SELECTs — and a possible insert — before each
   `listNotes` / `listSmoke` call, i.e. on every ISR revalidation and every `/api/*` hit. It is a
   cheap query today. A module-level "already seeded" flag would remove it, but that assumes a
   long-lived process and is wrong under several instances with a cold cache.
3. **The sitemap guard is unreachable.** `sitemap.ts` throws if a `noindex` route appears in the
   list, but `indexableRoutes` is already filtered by `noindex`, so it cannot fire. Kept as
   defence in depth; delete it if the indirection is more confusing than the insurance is worth.
4. **Two navigation lists.** `SiteFooter` hardcodes 5 of the 9 `site.nav` entries again. Adding a
   page means editing both.
5. **Install commands appear twice** — `/` and `/install`, differing by one `npm audit` line.
6. **Docs prose repeats content-layer facts.** `docs.ts` states "contract v28, 144 methods" in
   sentences. Correct today and dated in prose, but it will drift. Rendering those numbers from
   `site.contract` inside the markdown would mean templating the docs.
7. **Template residue.** `src/db/index.ts` caches its pool on
   `globalThis.__arenaNextJsPostgresqlPool`, a name from the starter template.

## 5. Verified clean — no action

- **Links.** All 28 distinct internal `href` targets across 12 pages return 200, as do
  `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`,
  `/opengraph-image`, `/api/catalog`, `/api/doc?slug=overview`, `/api/health`.
- **Markdown.** All 11 documents parse with no ragged tables, no missing separator rows, no
  duplicate bullets or duplicate table headers (which would have produced React key collisions).
- **Seeds.** 28 notes with unique titles and valid dates; 19 smoke keys, unique and in sort order;
  no duplicate changelog `version+date` pairs; no entry with an empty `changes` array.
- **Features.** 31 features, 6 groups, no duplicate titles, no unknown group, no empty group.
- **Numbers agree.** `routeCount` = `drift.sourceRoutes` = `site.routesCount` = 15; the four-way
  method split sums to `site.contract.methods` = 144; `unverified` reports 1 of 100 cells, matching
  `heroMetrics`.
- **Imports and exports.** No unused import and no unused export beyond what Next resolves by
  convention (`GET`, `POST`, `generateMetadata`, `generateStaticParams`, `viewport`,
  `contentType`).
- **Unsafe rendering.** The only `dangerouslySetInnerHTML` is the JSON-LD graph, with `<` escaped.
  Markdown links pass through `safeHref`, which drops anything that is not `http(s)` or a
  single-slash internal path — `javascript:` cannot survive.
- **Authorization.** `createNote`, `deleteNote`, `updateSmoke` and both `POST` handlers check
  `isDeskAuthed()` before touching data; `/desk` is `noindex` and `X-Robots-Tag: noindex`.
- **Secrets.** No credential in the client bundle; the only committed token is the Search Console
  verification string, which is public by design.

### Security note, not fixed

Session tokens are stored in `desk_sessions` in plaintext. Anyone with read access to the database
can replay a live desk session. Hashing the token before storing it would remove that, and is worth
doing if the database is ever shared with another tenant. The gate protects an editor, not a
wallet, so this is a hardening item rather than a defect.

## 6. Reproducing the checks

```bash
npm run typecheck && npm run lint && npm run build
npx next start -p 3000

# links and endpoints
curl -s localhost:3000/sitemap.xml | grep -c '<url>'     # 21
curl -s localhost:3000/llms-full.txt | grep '^## Doc:'   # 11 paths, all /docs/<slug>
```

The audits that need the TypeScript graph were run with `npx tsx` against the content layer
directly: route and doc counts, feature grouping, seed uniqueness, and the changelog ordering
assertion.
