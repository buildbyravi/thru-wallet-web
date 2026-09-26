import { getAllDocs } from "@/lib/docs";
import { changelog } from "@/content/changelog";
import { site } from "@/content/site";

// Full-corpus companion to /llms.txt: every doc page and the full changelog
// concatenated into a single file, for agents that want it all in one fetch.
// Regenerated from src/content/docs/*.md and src/content/changelog.ts.

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const docs = getAllDocs();

  const docSections = docs
    .map((d) => `## ${d.title}\n\nSource: ${origin}/docs/${d.slug}\n\n${d.body.trim()}`)
    .join("\n\n---\n\n");

  const changelogSection = changelog
    .map(
      (entry) =>
        `### ${entry.version} \u2014 ${entry.title} (${entry.date}, ${entry.tag})\n` +
        entry.changes.map((c) => `- ${c}`).join("\n"),
    )
    .join("\n\n");

  const body = `# ${site.name} (${site.tagline}) \u2014 full context

> ${site.summary}
> Not production-ready and not security-reviewed. ${site.network}.

This file concatenates every maintained doc page plus the full changelog for
${site.name}. For a short index instead, see ${origin}/llms.txt.

---

${docSections}

---

## Changelog

${changelogSection}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
