import type { MetadataRoute } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/seo";

// AI crawlers are allowed on purpose: this site publishes /llms.txt and /llms-full.txt and would
// like them quoted with the right numbers. The gated desk and the JSON handlers are not content.
const disallow = ["/api/", "/desk", "/desk/"];

// Disallow and noindex are not interchangeable: a blocked URL can still be indexed as a bare link,
// because the crawler never fetches it and never reads the noindex. The two pages the footer links
// to under this policy — /desk and /api/catalog — both carry a noindex signal (metadata for the
// desk, X-Robots-Tag for the handler), so they have to stay crawlable for that signal to be read.
// `/api/` and `/desk` stay disallowed for everything else; `$` anchors match the one exact path.
const allowNoIndex = ["/desk$", "/api/catalog$"];

const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", ...allowNoIndex], disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt", ...allowNoIndex], disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteOrigin(),
  };
}
