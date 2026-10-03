import Link from "next/link";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Badge } from "@/components/Badge";
import { CodeBlock } from "@/components/CodeBlock";
import { SoftwareJsonLd } from "@/components/JsonLd";
import { McpTables } from "@/components/McpTables";
import { Section } from "@/components/Section";
import { StoreButton } from "@/components/StoreButton";
import { WalletMock } from "@/components/WalletMock";
import { changelog } from "@/content/changelog";
import { featureGroups, features } from "@/content/features";
import { securityPrinciples } from "@/content/security";
import { chromeStoreUrl, extensionId, heroMetrics, release, releaseTracks, site, storeStatus } from "@/content/site";
import { listNotes } from "@/lib/catalog";
import { formatDay, formatStamp } from "@/lib/format";

export const dynamic = "force-dynamic";

const installCommands = `git clone https://github.com/buildbyravi/thru-wallet-ext.git
cd thru-wallet-ext
npm install
npm test
npm run build`;

export default async function HomePage() {
  const notes = await listNotes(3);
  const latest = changelog.slice(0, 3);

  return (
    <main>
      <SoftwareJsonLd />
      <div className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
        <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.85fr)]">
          <div>
            <p className="label text-warm">
              {site.status} · unofficial · {site.network}
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.7rem,7vw,5.1rem)] leading-[0.94] font-light tracking-[-0.04em]">
              A self-custody wallet extension, built for Thru’s <em className="verdict">betanet</em>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-warm">{site.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton />
              <Link className="btn btn-line" href="/install">
                Install notes
              </Link>
              <Link className="btn btn-line" href="/docs">
                Read docs
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm text-warm">
              Listing {site.listing.version} · {site.listing.size} · offered by {site.listing.offeredBy}. Extension id{" "}
              <span className="mono text-ink">{extensionId}</span>.
            </p>
            <div className="mt-6 max-w-xl border-l-2 border-alert bg-alert-soft/70 px-4 py-3 text-sm text-alert">
              {site.warning}
            </div>
          </div>
          <WalletMock />
        </section>

        <section className="mt-12 overflow-hidden rounded-[1.6rem] bg-plate text-paper">
          <div className="plate-grain grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1.3fr_auto] lg:items-center">
            <div>
              <p className="label text-paper/55">Extension · Chrome Web Store</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-light tracking-[-0.03em] sm:text-4xl">
                The packaged wallet is already listed.
              </h2>
              <p className="mt-3 max-w-xl text-paper/75">
                {site.listing.blurb} Version {site.listing.version}, updated {formatDay(site.listing.updated)}. Use this
                link unless you are loading <span className="mono text-paper">dist/</span> from source.
              </p>
              <p className="mt-3 max-w-xl text-sm text-paper/60">
                That package is the {site.listing.network}-era build. The betanet work shipped as source release{" "}
                {release.tag} on {release.publishedOn}, and package {storeStatus.version} is {storeStatus.sentenceLabel}.
                Check the three tracks below before you quote a version.
              </p>
              <p className="mono mt-4 text-xs break-all text-paper/55">{chromeStoreUrl}</p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <StoreButton variant="ghost" label="Add extension" />
              <a className="text-sm text-paper/70 underline underline-offset-4" href={site.links.privacy}>
                Privacy policy
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-3xl leading-tight font-light tracking-[-0.03em]">
              Three artifacts, kept apart.
            </h2>
            <Link className="label text-accent-dark" href="/status">
              Status detail
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {releaseTracks.map((track) => (
              <article
                key={track.key}
                className={`rounded-2xl border p-5 ${
                  track.key === "release" ? "border-accent-dark bg-accent-light/40" : "border-rule bg-paper-2/40"
                }`}
              >
                <p className="label text-warm">{track.label}</p>
                <p className="mt-3 font-serif text-4xl leading-none font-light tracking-[-0.04em]">{track.value}</p>
                <p className="label mt-2 text-accent-dark">{track.pill}</p>
                <p className="mono mt-2 text-xs text-dim">{track.meta}</p>
                <p className="mt-3 text-sm text-warm">{track.detail}</p>
                <a className="text-link mt-4 inline-block text-sm" href={track.href}>
                  {track.hrefLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <dl className="mt-10 grid grid-cols-2 border-y border-rule lg:grid-cols-4">
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="border-rule px-1 py-5 sm:px-4 lg:border-l lg:first:border-l-0">
              <dt className="label text-warm">{metric.label}</dt>
              <dd className="mt-2 font-serif text-4xl leading-none tracking-[-0.04em]">{metric.value}</dd>
              <dd className="mt-2 text-sm text-warm">{metric.note}</dd>
            </div>
          ))}
        </dl>

        <Section
          id="features"
          kicker="Features"
          title="What the extension actually does."
          lede="Grouped the way the product is used. Planned means it is not in the extension today."
          action={
            <Link className="label text-accent-dark" href="/features">
              Full feature index
            </Link>
          }
        >
          <div className="space-y-10">
            {featureGroups.map((group) => (
              <div key={group}>
                <h3 className="label text-warm">{group}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {features
                    .filter((feature) => feature.group === group)
                    .map((feature) => (
                      <article key={feature.title} className="border-t border-rule pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-serif text-xl tracking-[-0.02em]">{feature.title}</h4>
                          <Badge value={feature.status} />
                        </div>
                        <p className="mt-2 text-sm text-warm">{feature.body}</p>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="install"
          kicker="Install"
          title="Store first. Source if you need the tree."
          lede="The Chrome listing is the path for a packaged extension. Clone only when you intend to read or rebuild it."
          action={
            <Link className="label text-accent-dark" href="/install">
              Both paths
            </Link>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <CodeBlock code={installCommands} label="Unpacked, after the store" />
            <div className="flex flex-col justify-between rounded-2xl border border-rule bg-paper-2/40 p-5">
              <div>
                <p className="label text-warm">Load unpacked</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-warm">
                  <li>Open chrome://extensions and enable Developer mode.</li>
                  <li>Load unpacked and select dist/, not the repo root.</li>
                  <li>Reload the extension — not only the popup — after a rebuild.</li>
                </ol>
              </div>
              <StoreButton />
            </div>
          </div>
        </Section>

        <Section
          id="architecture"
          kicker="Architecture"
          title="Five layers, one direction of trust."
          lede="The popup never holds signing authority. The background does, behind an append-only contract."
          action={
            <Link className="label text-accent-dark" href="/architecture">
              Architecture
            </Link>
          }
        >
          <ArchDiagram />
        </Section>

        <Section
          id="security"
          kicker="Security"
          title="Constraints, not a certificate."
          lede="The design is strict. The review has not happened. Those are different sentences."
          action={
            <Link className="label text-accent-dark" href="/security">
              Security model
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {securityPrinciples.slice(0, 3).map((principle) => (
              <article key={principle.title} className="rounded-2xl bg-paper-2/70 p-5">
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.03em]">{principle.title}</h3>
                <p className="mt-3 text-sm text-warm">{principle.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="updates"
          kicker="Ledger"
          title="Listing, contract, and desk notes stay separate."
          lede="A store version is not a contract version. A desk note is neither."
          action={
            <Link className="label text-accent-dark" href="/changelog">
              Changelog
            </Link>
          }
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="label text-warm">Authored</p>
              <ul className="mt-4 divide-y divide-rule border-y border-rule">
                {latest.map((entry) => (
                  <li key={entry.version + entry.title} className="py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge value={entry.tag} />
                      <span className="label text-dim">{formatDay(entry.date)}</span>
                    </div>
                    <p className="mt-2 font-serif text-xl">{entry.title}</p>
                    <p className="mt-1 text-sm text-warm">{entry.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-warm">From the desk database</p>
              <ul className="mt-4 space-y-4">
                {notes.map((note) => (
                  <li key={note.id} className="border-t border-rule pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge value={note.tag} />
                      <span className="label text-dim">{formatStamp(note.createdAt)} UTC</span>
                    </div>
                    <p className="mt-2 font-serif text-xl">{note.title}</p>
                    <p className="mt-1 text-sm text-warm">{note.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="agents"
          kicker="Agents"
          title="Read-only context. No signing path."
          lede="Machine-readable files for this site, plus the policy a future wallet companion would have to obey."
          action={
            <Link className="label text-accent-dark" href="/agents">
              Agent page
            </Link>
          }
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/llms.txt", title: "/llms.txt", body: "Short context, including the store link." },
              { href: "/llms-full.txt", title: "/llms-full.txt", body: "Docs, routes, policy, and changelog." },
              { href: "/docs/ai-and-mcp", title: "AI & MCP", body: "Allowed, protected, and forbidden tools." },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="rounded-2xl border border-rule p-4 hover:border-ink">
                <p className="mono text-sm">{card.title}</p>
                <p className="mt-2 text-sm text-warm">{card.body}</p>
              </Link>
            ))}
          </div>
          <McpTables />
        </Section>
      </div>
    </main>
  );
}
