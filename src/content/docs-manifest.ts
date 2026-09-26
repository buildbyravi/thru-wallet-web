// ---------------------------------------------------------------------------
// Docs index. To add a new doc page:
//   1. Create src/content/docs/<slug>.md
//   2. Add one entry below with a matching `slug` and `file`
// The docs list page, each doc's route, and /llms.txt + /llms-full.txt are
// all generated from this array — nothing else needs to be touched.
// ---------------------------------------------------------------------------

export type DocCategory = "Start here" | "Under the hood" | "For builders & agents";

export interface DocMeta {
  slug: string;
  file: string;
  title: string;
  description: string;
  category: DocCategory;
}

export const docsManifest: DocMeta[] = [
  {
    slug: "overview",
    file: "overview.md",
    title: "Overview",
    description: "What Thru Wallet is, who it's for, and what \"alphanet only\" means.",
    category: "Start here",
  },
  {
    slug: "installation",
    file: "installation.md",
    title: "Installation & setup",
    description: "Load the extension unpacked, build it from source, and create your first wallet.",
    category: "Start here",
  },
  {
    slug: "features",
    file: "features.md",
    title: "Feature reference",
    description: "Every shipped flow, what's verified vs. trusted, and what's intentionally out of scope.",
    category: "Start here",
  },
  {
    slug: "security-model",
    file: "security-model.md",
    title: "Security model",
    description: "Vault encryption, session storage, auto-lock, and what this project does not claim.",
    category: "Under the hood",
  },
  {
    slug: "architecture",
    file: "architecture.md",
    title: "Architecture",
    description: "Popup/side panel, background service worker, API router, services, and the SDK boundary.",
    category: "Under the hood",
  },
  {
    slug: "roadmap",
    file: "roadmap.md",
    title: "Status & roadmap",
    description: "What's shipped, what's known-incomplete, and what's next.",
    category: "Under the hood",
  },
  {
    slug: "ai-and-mcp",
    file: "ai-and-mcp.md",
    title: "AI agents, MCP & llms.txt",
    description: "How AI tools and Model Context Protocol clients should read this project — and how to extend it.",
    category: "For builders & agents",
  },
  {
    slug: "contributing",
    file: "contributing.md",
    title: "Contributing to this site",
    description: "How this website's content is structured, and the minimal-edit way to add docs, changelog entries, or features.",
    category: "For builders & agents",
  },
];
