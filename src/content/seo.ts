import { changelog } from "@/content/changelog";
import { docs } from "@/content/docs";

// One table feeds <title>, <meta name="description">, the Open Graph tags, the JSON-LD graph,
// /sitemap.xml, and /robots.txt. Editing search copy in one place is the only way the four stay
// honest with each other, and this site is a site about exactly that problem.
//
// Rules for this file:
// - A title is the page's own phrase. The layout appends "— Thru Wallet"; do not repeat the brand.
// - A description is 120–160 characters, sentence case, and makes a claim the page can support.
// - Keywords are strings a person would type. They are a hint, not a ranking lever.
// - `lastReviewed` is the date a human re-read the page's facts. It is not "the build date".

export type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export interface RouteSeo {
  path: string;
  /** Page phrase, run through the layout template `%s — Thru Wallet` unless `absolute`. */
  title: string;
  /** Use the title verbatim, without the site template. Reserved for the homepage. */
  absolute?: boolean;
  description: string;
  keywords: string[];
  priority: number;
  changeFrequency: ChangeFrequency;
  /** Keep out of the sitemap and out of search results (the desk gate is not a public page). */
  noindex?: boolean;
  /** Older name or common search phrase redirected here. Documented, not rendered. */
  aliases?: string[];
}

// The newest authored fact on the site: the top of the changelog. Sitemap `lastModified` and the
// Article/Collection dateModified values all read from here, so a stale date is a visible bug.
function newestDate(dates: string[]): string {
  return dates.reduce((latest, date) => (date > latest ? date : latest), "1970-01-01");
}

export const lastReviewed = newestDate(changelog.map((entry) => entry.date));
export const siteUpdatedOn = lastReviewed;

export const routes: RouteSeo[] = [
  {
    path: "/",
    title: "Thru Wallet — self-custody Chrome extension for Thru betanet",
    absolute: true,
    description:
      "Unofficial self-custody Chrome extension for Thru's Layer 1 betanet: a local key vault, THRU transfers, and .thru names. Store build 1.4.1; source at v28.",
    keywords: [
      "Thru Wallet",
      "Thru wallet extension",
      "Thru betanet wallet",
      "self-custody wallet",
      "Chrome extension wallet",
      "crypto wallet key manager",
      "Thru L1",
      ".thru domain",
    ],
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/install",
    title: "Install the Chrome extension",
    description:
      "Add Thru Wallet from the Chrome Web Store, or load an unpacked build from source — and see which contract version each of the two install paths actually speaks.",
    keywords: [
      "install Thru Wallet",
      "Thru Wallet Chrome Web Store",
      "load unpacked Chrome extension",
      "Thru extension download",
    ],
    priority: 0.9,
    changeFrequency: "weekly",
    aliases: ["/extension", "/chrome"],
  },
  {
    path: "/features",
    title: "Features",
    description:
      "What Thru Wallet does today: local vault, multiple keyrings, THRU send and receive, token discovery and .thru names — labelled stable, alpha, new or planned.",
    keywords: [
      "Thru Wallet features",
      "Thru betanet wallet features",
      "Thru token transfers",
      "thru name service",
      "self-custody key vault",
    ],
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/docs",
    title: "Documentation",
    description:
      "Eleven documents on Thru Wallet: install, architecture, security model, the name service, agent and MCP policy, and the content guide behind every number.",
    keywords: [
      "Thru Wallet docs",
      "Thru Wallet documentation",
      "Thru betanet wallet guide",
      "Thru MCP",
    ],
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/security",
    title: "Security model",
    description:
      "How the vault works: PBKDF2-SHA256 at 600,000 rounds then AES-256-GCM, signing only in the background, a DOM ratchet, gated DeFi flags, and the gaps still open.",
    keywords: [
      "Thru Wallet security",
      "self-custody wallet security",
      "PBKDF2 AES-GCM wallet",
      "Chrome extension wallet security",
    ],
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/architecture",
    title: "Architecture",
    description:
      "Five layers and one direction of trust: UI routes, the bridge, the API router, services, and sacred adapters, behind contract v28's 144 methods and 15 routes.",
    keywords: [
      "Thru Wallet architecture",
      "Chrome extension architecture",
      "wallet contract methods",
    ],
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/status",
    title: "Status: three artifacts, one version string",
    description:
      "The Chrome Web Store build, the source tree and the repository's own status document, side by side: contract v15 against v28, and 1 of 100 smoke cells ticked.",
    keywords: ["Thru Wallet status", "Thru Wallet version", "Thru contract v28"],
    priority: 0.6,
    changeFrequency: "daily",
  },
  {
    path: "/changelog",
    title: "Changelog",
    description:
      "Dated Thru Wallet releases: which artifact moved, which contract version it carried, what was verified in a browser, and what the desk recorded afterwards.",
    keywords: ["Thru Wallet changelog", "Thru Wallet release notes"],
    priority: 0.6,
    changeFrequency: "daily",
  },
  {
    path: "/agents",
    title: "Agents and MCP policy",
    description:
      "Machine-readable context for AI agents: llms.txt, llms-full.txt, the JSON catalog, and the MCP policy — what may be read, prepared, and refused outright.",
    keywords: [
      "Thru MCP",
      "wallet MCP server",
      "llms.txt wallet",
      "AI agent wallet policy",
    ],
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    path: "/privacy",
    title: "Privacy policy",
    description:
      "What Thru Wallet keeps on your device, what leaves it inside a signed transaction, and what is never collected. Published here, not in a repository file.",
    keywords: ["Thru Wallet privacy", "Chrome extension privacy policy", "wallet data collection"],
    priority: 0.4,
    changeFrequency: "yearly",
  },
  {
    path: "/desk",
    title: "Desk",
    description: "A password-gated editor for field notes and smoke marks. Not a wallet, not public.",
    keywords: [],
    priority: 0,
    changeFrequency: "yearly",
    noindex: true,
  },
];

// Per-document pages inherit the document's own title and description, which were written to be
// read on their own. Deduplicating would mean two copies of every string.
export const docRoutes: RouteSeo[] = docs.map((doc) => ({
  path: `/docs/${doc.slug}`,
  title: doc.title,
  description: doc.description,
  keywords: [`Thru Wallet ${doc.title.toLowerCase()}`, "Thru Wallet docs"],
  priority: 0.7,
  changeFrequency: "monthly",
}));

const byPath = new Map([...routes, ...docRoutes].map((entry) => [entry.path, entry]));

export function getRouteSeo(path: string): RouteSeo {
  const entry = byPath.get(path);
  if (!entry) {
    throw new Error(
      `No SEO entry for "${path}". Add it to src/content/seo.ts so the canonical URL, sitemap and metadata stay in one place.`,
    );
  }
  return entry;
}

/** Every route a crawler should index. `/desk` and the `/api/*` handlers are excluded by design. */
export const indexableRoutes: RouteSeo[] = [...routes, ...docRoutes].filter((entry) => !entry.noindex);

/** Paths that must never appear in the sitemap or in a canonical tag. */
export const privatePaths = [...routes, ...docRoutes]
  .filter((entry) => entry.noindex)
  .map((entry) => entry.path);

export const organization = {
  name: "buildbyravi",
  role: "community developer",
  repo: "https://github.com/buildbyravi",
  sameAs: [
    "https://github.com/buildbyravi",
    "https://github.com/buildbyravi/thru-wallet-ext",
    "https://github.com/buildbyravi/thru-wallet-web",
    "https://t.me/walletext",
  ],
} as const;

/** The phrases the site is actually trying to answer, used in the docs and in this file alike. */
export const searchIntents = [
  "thru wallet chrome extension",
  "thru betanet wallet",
  "how to install thru wallet",
  "thru wallet contract version",
  "thru name service .thru",
  "thru wallet privacy policy",
] as const;
