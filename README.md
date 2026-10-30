# Thru Wallet — website

The public dossier for [Thru Wallet](https://github.com/buildbyravi/thru-wallet-ext), a
self-custody Chrome extension for Thru's native Layer 1 betanet.

The site exists for one reason: the extension ships as **three artifacts that move on different
days**, and prose elsewhere keeps collapsing them into one. This repository publishes each one
separately, with the date and the evidence it was read from.

- **Live:** [thruwallet.vercel.app](https://thruwallet.vercel.app)
- **Extension (the product):** [buildbyravi/thru-wallet-ext](https://github.com/buildbyravi/thru-wallet-ext)
- **Listing:** [Chrome Web Store](https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok) · id `ocahgpmgfeapjnceaknkikanjikhjgok`

> Not affiliated with or endorsed by Unto Labs. Betanet testnet funds only. Neither the extension
> nor this site has been security-audited.

## The three tracks

| Track | Value | Evidence |
| --- | --- | --- |
| Chrome Web Store | 1.4.1 · contract **v15** · 83 methods · 14 routes · @thru 0.4.1 | live listing, re-read 2026-10-27 |
| Source `main` | **v28** · 144 methods (101 core + 43 gated DeFi) · 15 routes · @thru 0.4.2 | extension repo at `1b9d096`, 2026-10-27 |
| Audited status doc | claims **v18** · 124 methods · baseline 2026-10-03 | `docs/STATUS_AND_ROADMAP.md` |

The package number never moved past **1.4.1** and no tag was cut after **v1.4.1**, so a build from
`main` and an install from the store answer to the same version string while speaking v28 and v15.
Contract v16–v28 exist only in source. Verification is a fourth thing: **1 of 100** manual smoke
cells is ticked, from a popup-only partial run on 2026-10-04.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss`, tokens in `src/app/globals.css` |
| Type | Newsreader (serif) + JetBrains Mono, self-hosted via `@fontsource-variable` |
| Data | Drizzle ORM + `pg` against Postgres — **optional**, see below |
| Deploy | Vercel (`vercel.json`), security headers in `next.config.ts` |

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are required. Without `DATABASE_URL`, every page renders from the
checked-in seed data in `src/content/seeds.ts` and `src/content/smoke.ts`, and `/desk` stays
read-only.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | no | Postgres connection for the desk (field notes, smoke marks, sessions). |
| `DESK_PASSWORD` | no | Gate for `/desk` writes. No default — absent means read-only. |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin for metadata. Defaults to `https://thruwallet.vercel.app`. |
| `GOOGLE_SITE_VERIFICATION` | no | Search Console token. Emits the verification meta tag **and** answers `/google<token>.html`. See [SEO.md](SEO.md). |
| `BING_SITE_VERIFICATION` | no | Bing Webmaster Tools token, emitted as `msvalidate.01`. |

The desk needs **both** `DATABASE_URL` and `DESK_PASSWORD` to accept writes. Sessions live in a
`thru_desk` cookie; the password is compared as SHA-256 digests with `timingSafeEqual`. The gate
protects an editor, not a wallet — and desk notes are public on `/changelog`, so never put secrets
in them.

Schema lives in `src/db/schema.ts` (`field_notes`, `smoke_checks`, `desk_sessions`). Point
`drizzle.config.json` at a real database before running `drizzle-kit push`.

## Scripts

```bash
npm run dev        # next dev
npm run build      # next build
npm run start      # next start
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Overview: hero, store plate, the three tracks, what 1.4.1 lacks, feature grid, security |
| `/install` | Store path vs unpacked path, and which contract each one gets |
| `/features` | Feature index with status that matches the source, not the listing |
| `/architecture` | Layered flow, boundaries, every documented contract change v5 → v28 |
| `/security` | Custody, signing, DOM ratchet, gated DeFi, open gaps |
| `/status` | The three tracks, the 23-day timeline, the smoke checklist, roadmap |
| `/changelog` | Authored release history + desk ledger from Postgres |
| `/privacy` | The privacy policy, published here (replaces the GitHub link) |
| `/docs` | Docs hub, 11 pages under `/docs/[slug]` |
| `/agents` | MCP policy for AI agents |
| `/desk` | Password-gated editor for notes and smoke marks |

`/extension` and `/chrome` redirect to `/install`.

### Machine-readable surfaces

| Route | Returns |
| --- | --- |
| `/llms.txt` | Short context: store link, three tracks, hard "do not" rules |
| `/llms-full.txt` | Everything above plus routes, features, gaps, roadmap, policy, changelog, docs |
| `/api/catalog` | Listing, `storeBuild`, `contract`, `source`, `drift`, `domains`, `auditedDoc`, `unverified`, desk counts |
| `/api/doc?slug=` | One document as JSON; no slug lists the index |
| `/api/changelog` | Authored history |
| `/api/field` | `GET` notes; `POST` requires an authenticated desk session |
| `/api/health` | Database reachability |
| `/api/smoke` | Smoke-check rows |

## Search

Every crawler-facing value comes from one file, [`src/content/seo.ts`](src/content/seo.ts): the
title, the description, the canonical path, the sitemap priority, and the JSON-LD that describes
the page. `src/lib/seo.ts` turns an entry into Next metadata; the pages call
`pageMetadata("/install")` and nothing else.

| Surface | Route | Source |
| --- | --- | --- |
| Sitemap | `/sitemap.xml` | `src/app/sitemap.ts` — 21 indexable routes, `lastModified` from the newest changelog entry |
| Crawl policy | `/robots.txt` | `src/app/robots.ts` — allows crawlers and AI agents, disallows `/api/` and `/desk` |
| Structured data | in every page | `src/components/JsonLd.tsx` — `Organization`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`, `TechArticle`, `CollectionPage` |
| Social card | `/opengraph-image` | `src/app/opengraph-image.tsx` |
| Verification | meta + `/google<token>.html` | `GOOGLE_SITE_VERIFICATION`, rewritten in `next.config.ts` |

`/desk`, `/api/*` and the 404s are `noindex`. `/extension` and `/chrome` are 308 redirects to
`/install`. Setting up Google Search Console — property, verification, sitemap, first crawl — is
written out step by step in **[SEO.md](SEO.md)**.

## Content map

Product copy is TypeScript, so every fact is reviewable in a diff.

| File | Feeds |
| --- | --- |
| `src/content/site.ts` | Name, warning, store link, listing facts, store/source/doc blocks, `domains`, nav |
| `src/content/drift.ts` | Store-vs-main gap: version numbers, v16 → v28 timeline, capability list |
| `src/content/features.ts` | Feature groups and status badges |
| `src/content/routes.ts` | The extension's 15-route table |
| `src/content/architecture.ts` | Layer flow, boundaries, contract breaks |
| `src/content/security.ts` | Principles, gaps, signing notes, network preconditions |
| `src/content/roadmap.ts` | Numbered open and blocked steps, recorded done |
| `src/content/changelog.ts` | Authored release history |
| `src/content/docs.ts` | Docs hub markdown (11 pages) |
| `src/content/privacy.ts` | The policy rendered at `/privacy` |
| `src/content/smoke.ts` | Smoke checklist seed, open doc slots |
| `src/content/seeds.ts` | Field notes used when Postgres is absent |
| `src/content/ai.ts` | MCP policy tables, pasteable agent context |
| `src/content/seo.ts` | Title, description, keywords, canonical path, sitemap priority and crawl directives for every route |

## Updating the facts

The site is only worth reading because the numbers are current. When the extension moves:

1. Re-read the live **Chrome Web Store** page. Only a changed page may edit `site.listing` — record
   the date in `verifiedOn`.
2. Re-read `src/shared/contract/manifest.js`, `package.json`, `src/ui/app/boot.js` and
   `docs/STATUS_AND_ROADMAP.md` in the extension repo. Update `drift.ts`, `site.source` and
   `site.auditedDoc`.
3. Re-count `docs/MANUAL_SMOKE_CHECKLIST.md` for `unverified` — quote the unit (lines vs cells).
4. Add a changelog entry saying **which artifact moved**, then update the docs pages that repeat it.
5. `npm run typecheck && npm run lint && npm run build`. The sitemap's `lastModified`
   follows the newest changelog entry, so a content change without an entry is a stale date.

Rules the content layer is built around:

- A submission, a merge, or a GitHub release may never write to `site.listing`.
- Never average two tracks into one "current version". The gap is the finding.
- Never display base units in UI copy or the demo mock — amounts are THRU at nine decimals.
- Link the privacy policy at `/privacy`, not at a file on GitHub.
- A Node test does not verify a browser, and a backend probe does not verify a screen.

## Design tokens

Defined once in `src/app/globals.css`: paper `#f3f0e9`, ink `#16150f`, accent `#5c6bf5`,
plate `#12120c`, alert `#9a2e18`. Serif for headings, mono for identifiers and hashes. Reusable
pieces live in `src/components/` (`Section`, `PageHeader`, `Badge`, `StoreButton`, `ArchDiagram`,
`RouteTable`, `MarkdownContent`, `WalletMock`).

## Deployment

Vercel builds `main` with `next build`. `next.config.ts` sets a CSP (`default-src 'self'`, no frame
ancestors), `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options` and `Permissions-Policy`
on every route. Set `DATABASE_URL` and `DESK_PASSWORD` in the project environment to enable the desk;
the public pages work without either.

## Links

- Extension source: <https://github.com/buildbyravi/thru-wallet-ext>
- Chrome Web Store listing: <https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok>
- Thru docs: <https://thru.org/docs> · LLM entry: <https://thru.org/docs/llm.txt>
- Explorer: <https://scan.thru.org> · MCP: <https://scan.thru.org/api/mcp>
- Telegram: [channel](https://t.me/walletext) · [group](https://t.me/+dA8TwsOECcIxZWZl)

## License

Website code is part of this repository; the extension is MIT licensed
([LICENSE](https://github.com/buildbyravi/thru-wallet-ext/blob/main/LICENSE)). Copy describing the
extension is published for accuracy, not as a grant of trademark rights.
