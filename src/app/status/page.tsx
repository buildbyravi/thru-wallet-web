import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { completed, roadmap } from "@/content/roadmap";
import { auditedDoc, incoming, release, releaseTracks, site, unverified } from "@/content/site";
import { listSmoke } from "@/lib/catalog";
import { formatStamp } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Status",
  description: "Thru Wallet source baseline, Chrome listing, and the browser smoke checklist stored in the catalog.",
};

export default async function StatusPage() {
  const checks = await listSmoke();
  const passed = checks.filter((check) => check.status === "pass").length;

  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Status"
        title="Two clocks agree. One does not."
        lede="The store listing and the tagged release finally describe the same build. The repository’s own status document does not. And nothing here has been through a browser."
        meta={`${passed} of ${checks.length} desk rows marked pass · ${unverified.checked} of ${unverified.rows} rows in the extension's own checklist`}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {releaseTracks.map((track) => (
          <article
            key={track.key}
            className={
              track.key === "store"
                ? "rounded-2xl bg-plate p-5 text-paper"
                : track.key === "release"
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
              href={track.href} target="_blank" rel="noopener noreferrer"
            >
              {track.hrefLabel}
            </a>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-rule p-5">
          <p className="label text-warm">Source release detail</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="label text-dim">Merge commit</dt>
              <dd className="mono mt-1">{release.mergeCommit}</dd>
            </div>
            <div>
              <dt className="label text-dim">Contract</dt>
              <dd className="mt-1">
                {release.contract} · {release.methods} methods
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Packages</dt>
              <dd className="mt-1">
                {release.sdk} · {release.programs}
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Network</dt>
              <dd className="mono mt-1">{release.rpc}</dd>
            </div>
            <div>
              <dt className="label text-dim">Permissions</dt>
              <dd className="mt-1">{release.permissions.join(", ")}</dd>
            </div>
            <div>
              <dt className="label text-dim">Suite at release</dt>
              <dd className="mt-1">{release.tests}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-warm">{release.note}</p>
        </div>
        <div className="rounded-2xl border-l-2 border-alert bg-alert-soft/50 p-5">
          <p className="label text-alert">What a store install gets you today</p>
          <p className="mt-3 text-sm text-warm">
            Package {site.listing.version} from {site.listing.updated}, {site.listing.size}, built for{" "}
            {site.listing.network}: contract {release.contract}, @thru 0.4.1, the token drawer, chain-verified custom
            tokens, optional desktop notifications, and an auto-lock that measures real inactivity. The listing copy
            describes that build rather than the previous one — the first time those two have matched here.
          </p>
          <p className="mt-3 text-sm text-warm">
            Two things are still true. The repository&rsquo;s own status document describes contract {auditedDoc.version}{" "}
            at {auditedDoc.commit} and was not touched by either the merge or the release. And{" "}
            <strong className="font-normal text-ink">
              {unverified.checked} of {unverified.rows} rows
            </strong>{" "}
            in {unverified.doc} are ticked — {unverified.cells} individual checks once each row is counted for popup and side panel — because the package went from merge to store in a day on automated evidence alone.
          </p>
          <p className="mt-3 text-sm text-warm">
            Listing facts re-read from the live store page on {site.listing.verifiedOn}.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <div className="rounded-2xl border border-accent-dark/40 bg-accent-light/25 p-6">
          <p className="label text-accent-dark">Already written, not yet merged</p>
          <h2 className="mt-3 font-serif text-2xl font-light tracking-[-0.03em]">
            Contract {incoming.contract} retires {incoming.removes.join(" and ")}.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-warm">{incoming.note}</p>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label text-dim">Contract</dt>
              <dd className="mt-1">
                {incoming.contract} · {incoming.methods} methods ({incoming.methodDelta})
              </dd>
            </div>
            <div>
              <dt className="label text-dim">Source files</dt>
              <dd className="mt-1">{incoming.sourceFiles} changed</dd>
            </div>
            <div>
              <dt className="label text-dim">Package version</dt>
              <dd className="mt-1">{incoming.packageVersion} — unchanged</dd>
            </div>
            <div>
              <dt className="label text-dim">Read on</dt>
              <dd className="mt-1">{incoming.checkedOn}</dd>
            </div>
          </dl>
          <ul className="mt-5 space-y-2 text-sm text-warm">
            {incoming.prs.map((pr) => (
              <li key={pr.number}>
                <a className="text-link" href={pr.url} target="_blank" rel="noopener noreferrer">
                  #{pr.number}
                </a>{" "}
                {pr.title} — <span className="mono text-xs">{pr.head}</span>, base {pr.base}, {pr.files} files,{" "}
                {pr.commits} commits
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl border-l-2 border-alert pl-4 text-sm text-alert">{incoming.consequence}</p>
        </div>
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
          . They are not a second opinion on the extension&rsquo;s {unverified.doc}, which holds {unverified.rows} rows
          and {unverified.cells} individual checks and is the runbook that has to be signed off. Both are at zero.
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
        </div>
      </section>
    </main>
  );
}
