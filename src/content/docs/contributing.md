This website is intentionally data-driven so that adding content never means touching layout or component code. Everything below is a complete list of the content files — there is nothing else to learn.

## File map

```txt
src/content/site.ts             site name, links, nav — edit for global facts
src/content/features.ts         homepage feature grid
src/content/changelog.ts        changelog entries (newest first)
src/content/docs-manifest.ts    docs list: slug, file, title, description, category
src/content/docs/*.md           the body of each doc page
```

## Add a changelog entry

Open `src/content/changelog.ts` and add a new object to the **top** of the `changelog` array:

```ts
{
  version: "v13",
  date: "2026-10-01",
  tag: "ALPHA", // ALPHA | SECURITY | DOCS | DESIGN
  title: "Short summary of the release",
  changes: [
    "One bullet per notable change.",
  ],
},
```

That's it. The [changelog page](/changelog), the homepage "Latest updates" panel, and `/llms-full.txt` all pick it up automatically.

## Add a doc page

1. Create `src/content/docs/<slug>.md` and write plain Markdown (GitHub-flavored tables, code fences, and lists all render).
2. Add one entry to `docsManifest` in `src/content/docs-manifest.ts`:

```ts
{
  slug: "my-new-doc",
  file: "my-new-doc.md",
  title: "My new doc",
  description: "One sentence describing it for the docs index.",
  category: "Start here", // or "Under the hood" / "For builders & agents"
},
```

The page is now live at `/docs/my-new-doc`, listed on `/docs`, and included in `/llms.txt` and `/llms-full.txt` — no route or template changes needed.

## Add or update a homepage feature

Open `src/content/features.ts` and add/edit an entry:

```ts
{
  title: "Feature name",
  body: "One or two sentences describing it.",
  status: "STABLE", // STABLE | ALPHA | PLANNED
},
```

## Update global facts (name, links, repo URLs)

Edit `src/content/site.ts`. Everything else — header, footer, hero, `/llms.txt` — reads from that one object.

## Design system notes

- Fonts: `Newsreader` (serif, for headings and body copy) and `JetBrains Mono` (for labels, code, and anything a reader might copy — addresses, commands, version strings).
- Color tokens live in `src/app/globals.css` under the `@theme` block (`--color-paper`, `--color-ink`, `--color-accent`, etc.). Change a token there and it updates everywhere.
- Status badges (`STABLE` / `ALPHA` / `PLANNED` / `SECURITY` / `DOCS` / `DESIGN`) are rendered by `src/components/Badge.tsx`.

## Principles for keeping this easy to maintain

- **No comparisons to other wallets.** This site documents Thru Wallet on its own terms. If a UX reference to another wallet's convention is ever necessary, keep it to a single neutral sentence, never a table or scorecard.
- **Every claim should be traceable** to the extension's own README, docs, or changelog — if you're not sure whether something is shipped, mark it `PLANNED` rather than `STABLE`.
- **Prefer editing data files over components.** If you find yourself editing a `.tsx` file just to add a sentence, there's probably a content file that should have owned it instead.
