import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { contractTimeline, drift } from "@/content/drift";
import { completed, roadmap } from "@/content/roadmap";
import { auditedDoc, release, releaseTracks, site, source, storeStatus, unverified } from "@/content/site";
import { listSmoke } from "@/lib/catalog";
import { formatStamp } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Status",
  description: "Thru Wallet source baseline, Chrome listing, the contract gap between them, and the browser smoke checklist stored in the catalog.",
};

export default async function StatusPage() {
  const checks = await listSmoke();
  const passed = checks.filter((check) => check.status === "pass").length;

  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Status"
        title="Three clocks. One version string."
        lede="The store build stopped on 2026-10-04. Main kept going for 23 days and 13 contract versions. The repository's own status document describes neither, and one of a hundred browser checks is ticked."
        meta={`${passed} of ${checks.length} desk rows marked pass · ${unverified.checked} of ${unverified.cells} cells in the extension's own runbook`}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {releaseTracks.map((track) => (
          <article
            key={track.key}
            className={
              track.key === "store"
                ? "rounded-2xl bg-plate p-5 text-paper"
                : track.key === "source"
                  ? "rounded-2xl border border-accent-dark bg-accent-light/40 p-5"
                  : "rounded-2xl border border-dashed border-alert/60 p-5"
            }
          >
            <p className={`label ${track.key === "store" ? "text-paper/50" : "text-warm"}`}>{track.label}</p>
            <p className="mt-3 font-serif text-4xl font-light tracking-[-0.04em]">{track.value}</p>
            <p className={`label mt-2 ${track.key === "store" ? "text-paper/70" : "text-accent-dark"}`}>{track.pill}</p>
            <p className={`mt-2 text-sm ${track.key === "store" ? "text-paper/70" : "text-warm"}`}>{track.meta}</p>
            <p className={`mt-3 text-sm ${track.key === "store" ? "text-paper/70" : "text-warm"}`}>{track.detail}</p>
            <a
              className={`mt-4 inline-block text-sm ${track.key === "store" ? "underline underline-offset-4" : "text-link"}`}
              href={track.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {track.hrefLabel}
            </a>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-rule p-5">
          <p className="label text-warm">Source detail · main</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="label text-dim">Commit</dt>
              <dd className="mono mt-1">{site.contract.commit}</dd>
            </div>
            <div>
              <dt className="label text-dim">Contract</dt>
              <dd className="mt-1">
                {site.contract.version} · {site.contract.methods} methods
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Packages</dt>
              <dd className="mt-1">
                {site.contract.sdk} · {site.contract.programs}
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Routes</dt>
              <dd className="mt-1">{site.routesCount} — /name added 2026-10-09</dd>
            </div>
            <div>
              <dt className="label text-dim">Package version</dt>
              <dd className="mt-1">
                {site.contract.package} — unchanged since {release.tag}
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Local suite</dt>
              <dd className="mt-1">{source.tests}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-warm">
            Checked on {site.contract.checkedOn}: {drift.sourceWalletCore} wallet-core methods plus{" "}
            {drift.sourceDefi} gated DeFi methods, {site.contract.sdk} and {site.contract.programs}, and a clean{" "}
            <span className="mono">dist/</span> build. No tag after {release.tag} exists.
          </p>
        </div>
        <div className="rounded-2xl border-l-2 border-alert bg-alert-soft/50 p-5">
          <p className="label text-alert">What a store install gets you today</p>
          <p className="mt-3 text-sm text-warm">
            Package {site.listing.version} from {site.listing.updated}, {site.listing.size}, built for{" "}
            {site.listing.network}: contract {drift.storeContract}, {drift.storeMethods} methods,{" "}
            {drift.storeRoutes} routes, {drift.storePackages}, the token drawer, chain-verified custom tokens, optional
            desktop notifications, and inactivity-based auto-lock.
          </p>
          <p className="mt-3 text-sm text-warm">
            What it does not get you: the Domain screen, faucet policy reads, token discovery, cached-first painting,
            the 0.4.2 packages, or any of contract {drift.sourceContract}&rsquo;s {drift.sourceMethods} methods. The
            listing was re-read on {site.listing.verifiedOn} and still reports{" "}
            <strong className="font-normal text-ink">{site.listing.users}</strong>, so this is not an adoption story.
            It is an unpublished-source story.
          </p>
          <p className="mt-3 text-sm text-warm">
            Two things are also still true. The repository&rsquo;s status document describes contract{" "}
            {auditedDoc.version} with {auditedDoc.methods} methods against a {auditedDoc.date} baseline, and exactly{" "}
            <strong className="font-normal text-ink">
              {unverified.checked} of {unverified.cells} cells
            </strong>{" "}
            in {unverified.doc} is ticked.
          </p>
          <p className="mt-3 text-sm text-warm">Listing facts re-read from the live store page on {site.listing.verifiedOn}.</p>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label text-accent-dark">Not in any package</p>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-[-0.03em]">
              The {drift.days} days the store has not seen.
            </h2>
          </div>
          <a
            className="label text-accent-dark"
            href={site.links.contractManifest}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the manifest
          </a>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-warm">
          Contract versions {drift.contractVersions}, in order, each merged to main and shipped to nobody. The net
          effect is {drift.methodsAdded} more declared methods — {drift.walletCoreAdded} wallet-core, {drift.sourceDefi}{" "}
          gated DeFi — a fifteenth route, and two retired signing paths. The package manifest has said 1.4.1 throughout.
        </p>
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {contractTimeline.map((entry) => (
            <li key={entry.version} className="grid gap-2 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <div>
                <p className="mono text-sm text-accent-dark">{entry.version}</p>
                <p className="label mt-1 text-dim">{entry.date}</p>
              </div>
              <div>
                <p className="font-serif text-xl">{entry.title}</p>
                <p className="mt-1 text-sm text-warm">{entry.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-3xl border-l-2 border-alert pl-4 text-sm text-alert">
          Merging a contract change without a package bump is the defect, not the changelog. A build from main and the
          install from the store both answer to {drift.packageVersion} while speaking {drift.sourceContract} and{" "}
          {drift.storeContract}. Step 01 of the roadmap is the fix.
        </p>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Browser smoke checklist</h2>
          <a className="label text-accent-dark" href={site.links.smokeDoc} target="_blank" rel="noopener noreferrer">
            Canonical runbook
          </a>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-warm">
          These {checks.length} rows are this desk&rsquo;s own tracking subset, editable from{" "}
          <Link className="text-link" href="/desk">
            the desk
          </Link>
          . They are not a second opinion on the extension&rsquo;s {unverified.doc}, which holds {unverified.cells}{" "}
          checkbox cells across {unverified.rows} lines and is the runbook that has to be signed off.{" "}
          {unverified.checked} cell there is ticked; none here is.
        </p>
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {checks.map((check) => (
            <li key={check.itemKey} className="grid gap-3 py-4 sm:grid-cols-[8rem_1fr]">
              <div>
                <Badge value={check.status} />
              </div>
              <div>
                <p className="font-serif text-xl">{check.label}</p>
                <p className="mt-1 text-sm text-warm">{check.detail}</p>
                {check.note ? <p className="mt-2 text-sm">Note: {check.note}</p> : null}
                <p className="label mt-2 text-dim">Updated {formatStamp(check.updatedAt)} UTC</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Still open or blocked</h2>
          <ol className="mt-4 space-y-4">
            {roadmap.map((item) => (
              <li key={item.step} className="border-t border-rule pt-4">
                <div className="flex items-center gap-3">
                  <span className="mono text-sm text-accent-dark">{item.step}</span>
                  <Badge value={item.status} />
                </div>
                <p className="mt-2 font-serif text-xl">{item.title}</p>
                <p className="mt-1 text-sm text-warm">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Recorded done</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-warm">
            {completed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-warm">
            Shipping state: {storeStatus.version} {storeStatus.sentenceLabel} since {storeStatus.publishedOn},{" "}
            {storeStatus.daysBehindSource} days and {storeStatus.contractVersionsBehind} contract versions behind main.
          </p>
        </div>
      </section>
    </main>
  );
}
