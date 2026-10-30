# Search visibility

This site is built to be read, quoted, and found. Everything a crawler needs is generated from one
file — [`src/content/seo.ts`](src/content/seo.ts) — so a page cannot ship an empty description, a
canonical pointing at a preview deployment, or a sitemap entry that 404s.

- **Crawl and index:** [`/robots.txt`](https://thruwallet.vercel.app/robots.txt), [`/sitemap.xml`](https://thruwallet.vercel.app/sitemap.xml)
- **Structured data:** `Organization`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`, `TechArticle`, `CollectionPage`
- **Social card:** `/opengraph-image` (1200 × 630, generated at build time by `next/og`)
- **Verification:** one environment variable, no committed token

---

## 1. Deploy with two variables set

Set these in **Vercel → Project → Settings → Environment Variables** (Production *and* Preview),
then redeploy. Both are optional — the site builds and indexes without them — but the first one
should be set before you verify anything.

| Variable | Example | Why |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://thruwallet.vercel.app` | Canonical tags, `og:url`, sitemap URLs, `robots.txt`, and every JSON-LD `@id`. If this is wrong, you are asking Google to index an address that is not the site. |
| `GOOGLE_SITE_VERIFICATION` | `kZ8…` (43 characters) | Copied from Search Console. Emitted as `<meta name="google-site-verification">` **and** served as the HTML verification file. Public by design. |
| `BING_SITE_VERIFICATION` | `1A2B…` | Optional. Emitted as `<meta name="msvalidate.01">` for Bing Webmaster Tools. |

> A preview deployment must not inherit production's `NEXT_PUBLIC_SITE_URL`. If it does, two hosts
> publish the same canonical URL and the preview can outrank the real one.

## 2. Add the property in Search Console

1. Open <https://search.google.com/search-console>.
2. **Add property → URL prefix**, and enter the origin exactly:

   ```
   https://thruwallet.vercel.app/
   ```

   A **Domain** property needs a DNS TXT record. `*.vercel.app` has no DNS zone you control, so
   use **URL prefix** unless you have moved the site to a domain you own.

## 3. Verify ownership

### Method A — HTML tag (recommended here)

1. Choose **HTML tag** in the verification dialog and copy the value of `content` — the token, not
   the whole `<meta>` tag.
2. In Vercel, add it as `GOOGLE_SITE_VERIFICATION` and redeploy.
3. Confirm the tag is live before clicking **Verify**:

   ```bash
   curl -s https://thruwallet.vercel.app/ | grep -o '<meta name="google-site-verification"[^>]*>'
   ```

4. Back in Search Console, click **Verify**. The tag stays in place for good — it is what keeps the
   property verified after a redeploy or after Google re-checks months later.

### Method B — HTML file

Search Console offers a filename of the shape `google<token>.html` and the contents
`google-site-verification: google<token>.html`.

This repository serves that file without committing it. `next.config.ts` rewrites
`/google<token>.html` to `/api/google-verification/[file]`, which answers **only** when the
filename matches `GOOGLE_SITE_VERIFICATION`:

```bash
# with GOOGLE_SITE_VERIFICATION=kZ8... set, this returns 200 and the exact required body
curl -s https://thruwallet.vercel.app/googlekZ8....html
# → google-site-verification: googlekZ8....html
```

So the same variable satisfies both the meta tag and the file method. If you would rather commit
the file Google downloads, drop it in `public/` — `public/` is served before the rewrite.

### Method C — your own domain

If the site moves to a domain you own, add a **Domain** property (covers `http`, `https`, `www`,
and every subdomain) and verify with a DNS TXT record at your provider. Keep the meta tag as well;
redundant verification is free and survives a DNS edit.

## 4. Submit the sitemap

1. Search Console → **Sitemaps** → enter `sitemap.xml` → **Submit**.
2. It should report *Success* with 21 discovered URLs within a day or two.

```
https://thruwallet.vercel.app/sitemap.xml
```

The sitemap is generated from the same registry as the pages, so it lists every indexable route and
nothing else — `/desk` and `/api/*` are excluded, both in the sitemap and in `robots.txt`.

## 5. Ask for the first crawl

**URL Inspection** → paste each URL → **Request indexing**. There is a daily quota (about ten), so
start with the pages that matter:

| Order | URL | Why first |
| --- | --- | --- |
| 1 | `/` | The brand query and the strongest page. |
| 2 | `/install` | The page a person searching "thru wallet chrome extension" wants. |
| 3 | `/docs` | Hub for eleven documents. |
| 4 | `/features` | Answers "what does it do". |
| 5 | `/docs/name-service` | The one surface no other Thru source documents. |
| 6 | `/security`, `/architecture`, `/status` | Depth for anyone evaluating the extension. |
| 7 | `/changelog`, `/agents`, `/privacy` | Reference. Order them later. |

A new property is usually indexed within a few days; the Sitemaps and Pages reports both confirm it.

## 6. What is already in place

| Signal | Where | Notes |
| --- | --- | --- |
| `<title>` | `src/content/seo.ts` | Page phrase + `— Thru Wallet` template, except the homepage, which is absolute and leads with the brand. |
| `<meta name="description">` | `src/content/seo.ts` | 120–160 characters, one claim per page, never the store blurb twice. |
| `<link rel="canonical">` | `src/lib/seo.ts` → `pageMetadata()` | Absolute, per page, derived from `NEXT_PUBLIC_SITE_URL`. |
| `robots` / `googlebot` meta | `src/lib/seo.ts` | `index, follow`, `max-image-preview:large`, `max-snippet:-1`. `/desk` is `noindex`. |
| `/robots.txt` | `src/app/robots.ts` | Allows crawlers and AI agents; disallows `/api/` and `/desk`. Points at the sitemap. |
| `/sitemap.xml` | `src/app/sitemap.ts` | 21 URLs with `lastModified` from the newest changelog entry. |
| JSON-LD | `src/components/JsonLd.tsx` | `Organization` + `WebSite` sitewide; `SoftwareApplication` on `/`; `BreadcrumbList` on every section; `TechArticle` on documents; `CollectionPage` on `/docs`. |
| Visible breadcrumbs | `src/components/Breadcrumb.tsx` | Rendered wherever `BreadcrumbList` is emitted. Google asks for the markup to describe navigation a person can see. |
| Open Graph + Twitter | `src/lib/seo.ts` | `summary_large_image` card and the generated `/opengraph-image`. |
| `<html lang="en">` | `src/app/layout.tsx` | — |
| Internal links | `src/components/SiteHeader.tsx` | The primary nav is on every page, so every section is one hop from anywhere. |
| 308 redirects | `next.config.ts` | `/extension` and `/chrome` → `/install`, consolidating ranking signal onto one URL. |
| Web manifest | `src/app/manifest.ts` | Resolvable `/manifest.webmanifest`, no 404 in the crawl log. |
| `X-Robots-Tag` | `next.config.ts` | `noindex, nofollow` on `/api/*` and `/desk` for crawlers that ignore robots.txt. |

## 7. Keeping it findable

Search rankings follow content, not tags. This site's advantage is that its numbers are dated and
checkable. Each time the extension moves:

1. Update the facts (`site.ts`, `drift.ts`, `changelog.ts`) as the README describes.
2. Add a changelog entry. `lastReviewed` — and therefore every sitemap `lastModified` — follows the
   newest entry automatically, so the sitemap never claims the site changed when only a version
   number did. If a page's copy changes and no changelog entry is written, the site is lying about
   its own freshness; write the entry.
3. Re-run `npm run typecheck && npm run lint && npm run build`.
4. Optionally re-request indexing for the pages that changed.

## 8. Checks worth running before any submission

```bash
npm run build && npm start

curl -s localhost:3000/robots.txt
curl -s localhost:3000/sitemap.xml | grep -c '<url>'          # 21
curl -s localhost:3000/ | grep -o 'rel="canonical"[^>]*'
curl -s localhost:3000/install | grep -o '<title>[^<]*</title>'
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/desk  # 200, but noindex
curl -s localhost:3000/google-kebab.html                      # 404 unless the token matches
```

Then paste the homepage source into the [Rich Results Test](https://search.google.com/test/rich-results)
and the [Schema Markup Validator](https://validator.schema.org/). The expected graph is
`Organization`, `WebSite`, `SoftwareApplication`, and `BreadcrumbList`.

## 9. Deliberately absent

- **No analytics, no cookies, no third-party scripts.** The CSP in `next.config.ts` would block
  them anyway. Search Console verification does not need any of it.
- **No `aggregateRating`.** The store listing reports "no ratings", so the markup says nothing.
- **No `SearchAction`.** The site has no search endpoint, and claiming one it does not have is a
  structured-data lie.
- **No invented dates.** Documents carry no publication date, so their `TechArticle` node omits
  `datePublished` rather than guess one.
