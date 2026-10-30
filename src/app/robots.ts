import type { MetadataRoute } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/seo";

// AI crawlers are allowed on purpose: this site publishes /llms.txt and /llms-full.txt and would
// like them quoted with the right numbers. The gated desk and the JSON handlers are not content.
const disallow = ["/api/", "/desk", "/desk/"];

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
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteOrigin(),
  };
}
