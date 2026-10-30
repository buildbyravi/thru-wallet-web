import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Next injects <link rel="manifest"> automatically. A manifest is not a ranking factor, but a
// resolvable one removes a 404 from the crawl log and gives the installable-page hint.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — betanet dossier`,
    short_name: site.shortName,
    description: site.descriptor,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3f0e9",
    theme_color: "#f3f0e9",
    lang: "en",
    categories: ["finance", "utilities"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
