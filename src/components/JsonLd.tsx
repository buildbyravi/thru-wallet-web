import { features } from "@/content/features";
import { docs } from "@/content/docs";
import { changelog } from "@/content/changelog";
import { site } from "@/content/site";
import {
  articleNode,
  breadcrumbNode,
  collectionNode,
  graph,
  organizationNode,
  softwareNode,
  websiteNode,
} from "@/lib/seo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Structured data is inert JSON. It is emitted as a plain script tag because Next has no
  // dedicated API for it, and wrapping every string would make the graph harder to read in a diff.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Organization + WebSite. Emitted once in the root layout so every page shares the same @ids. */
export function SiteJsonLd() {
  return <JsonLd data={graph([organizationNode(), websiteNode()])} />;
}

/** The extension itself. Homepage only — it describes the product, not every page. */
export function SoftwareJsonLd() {
  const featureList = features
    .filter((feature) => feature.status !== "PLANNED")
    .slice(0, 12)
    .map((feature) => feature.title);

  return <JsonLd data={graph([softwareNode(featureList)])} />;
}

export function BreadcrumbsJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  return <JsonLd data={graph([breadcrumbNode(items)])} />;
}

export function ArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return <JsonLd data={graph([articleNode({ headline, description, path, datePublished, dateModified })])} />;
}

/** Docs hub and the indices: a CollectionPage that lists what it contains. */
export function DocsCollectionJsonLd() {
  return (
    <JsonLd
      data={graph([
        collectionNode({
          name: `${site.name} documentation`,
          description: "Eleven documents describing the extension and this website.",
          path: "/docs",
          items: docs.map((doc) => ({ name: doc.title, path: `/docs/${doc.slug}` })),
        }),
      ])}
    />
  );
}

/** The changelog is a dated list; the newest entry sets the Article's modified date. */
export function ChangelogJsonLd() {
  const newest = changelog[0];
  const oldest = changelog[changelog.length - 1];
  return (
    <JsonLd
      data={graph([
        articleNode({
          headline: "Thru Wallet changelog",
          description:
            "Dated entries recording which artifact moved — the Chrome Web Store package, the source tree, or the status document.",
          path: "/changelog",
          datePublished: oldest?.date ?? "2026-10-04",
          dateModified: newest?.date ?? "2026-10-27",
        }),
      ])}
    />
  );
}
