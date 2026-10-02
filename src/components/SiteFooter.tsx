import Link from "next/link";
import { pendingRelease, site } from "@/content/site";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/install", label: "Install" },
      { href: "/features", label: "Features" },
      { href: "/architecture", label: "Architecture" },
      { href: "/security", label: "Security" },
      { href: "/status", label: "Status" },
    ],
  },
  {
    heading: "Reference",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/changelog", label: "Changelog" },
      { href: "/agents", label: "Agents" },
      { href: "/llms.txt", label: "llms.txt" },
      { href: "/llms-full.txt", label: "llms-full.txt" },
      { href: "/api/catalog", label: "API catalog" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { href: site.links.chromeStore, label: "Chrome Web Store", external: true },
      { href: site.repos.extension, label: "Extension source", external: true },
      { href: site.repos.website, label: "Website source", external: true },
      { href: site.links.thruDocs, label: "Thru docs", external: true },
      { href: site.links.explorer, label: "Thru explorer", external: true },
      { href: site.links.telegramGroup, label: "Telegram group", external: true },
      { href: site.links.license, label: "MIT license", external: true },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-rule bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[20px] leading-tight">{site.name}</p>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-warm">{site.descriptor}</p>
            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-warm">{site.disclaimer}</p>
          </div>
          {columns.map((column) => (
            <div key={column.heading} className="md:col-span-2">
              <p className="label text-warm">{column.heading}</p>
              <ul className="mt-4 space-y-2 text-[15px]">
                {column.links.map((link) =>
                  "external" in link && link.external ? (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">
                        {link.label} <span aria-hidden="true" className="text-dim">↗</span>
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link href={link.href} className="no-underline hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <p className="label text-warm">
            Baseline {site.baselineCommit} · {site.baselineDate} · contract {site.contract.version} · {site.contract.methods} methods ·{" "}
            {site.routesCount} routes · store {site.listing.version} · {pendingRelease.version} {pendingRelease.state}
          </p>
          <Link href="/desk" className="label text-dim no-underline hover:text-ink">
            Desk
          </Link>
        </div>
      </div>
    </footer>
  );
}
