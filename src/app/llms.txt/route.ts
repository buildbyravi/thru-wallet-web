import { docsManifest, type DocCategory } from "@/content/docs-manifest";
import { site } from "@/content/site";

// Machine-readable index following the https://llmstxt.org convention.
// Generated from src/content/site.ts and src/content/docs-manifest.ts —
// add a doc there and it appears here automatically.

export const dynamic = "force-dynamic";

function section(origin: string, category: DocCategory) {
  const docs = docsManifest.filter((d) => d.category === category);
  const lines = docs.map((d) => `- [${d.title}](${origin}/docs/${d.slug}): ${d.description}`);
  return `## ${category}\n${lines.join("\n")}`;
}

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const categories = Array.from(new Set(docsManifest.map((d) => d.category)));

  const body = `# ${site.name} (${site.tagline})

> ${site.summary}

${site.status === "ALPHA" ? "Not production-ready and not security-reviewed. Alphanet/devnet funds only." : ""}

${categories.map((c) => section(origin, c)).join("\n\n")}

## Changelog
- [Full changelog](${origin}/changelog): dated history of every shipped change.

## Full text
- [llms-full.txt](${origin}/llms-full.txt): every doc page and the full changelog in one file.

## Source
- [thru-wallet-ext](${site.repos.extension}): the browser extension source.
- [thru-wallet-web](${site.repos.website}): this website's source.

## Related protocol docs
- [Thru protocol llm.txt](${site.links.thruLlmTxt}): official Thru Layer 1 context, not specific to this extension.
- [Thru Explorer MCP](${site.links.explorerMcp}): official, read-only MCP for live chain queries.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
