import type { MetadataRoute } from "next";
import { indexableRoutes, lastReviewed, privatePaths } from "@/content/seo";
import { absoluteUrl } from "@/lib/seo";

// One entry per indexable route, all of them generated from src/content/seo.ts, so a page cannot
// exist without a sitemap line and the sitemap cannot list a page that 404s.
export default function sitemap(): MetadataRoute.Sitemap {
  const listed = new Set(indexableRoutes.map((entry) => entry.path));
  for (const path of privatePaths) {
    if (listed.has(path)) throw new Error(`${path} is marked noindex but appears in the sitemap.`);
  }

  return indexableRoutes.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: lastReviewed,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
