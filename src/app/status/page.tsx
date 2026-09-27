import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { completed, roadmap } from "@/content/roadmap";
import { site } from "@/content/site";
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
        title="Two clocks, both visible."
        lede="The store listing is what Chrome will install. The status document is what the audited source tree claims. Neither one closes the browser checklist."
        meta={`${passed} of ${checks.length} smoke rows marked pass in the desk database`}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-plate p-5 text-paper">
          <p className="label text-paper/50">Chrome listing</p>
          <p className="mt-3 font-serif text-4xl font-light tracking-[-0.04em]">{site.listing.version}</p>
          <p className="mt-2 text-sm text-paper/70">Updated {site.listing.updated} · {site.listing.offeredBy}</p>
          <a className="mt-4 inline-block text-sm underline underline-offset-4" href={site.links.chromeStore}>
            Open the listing
          </a>
        </article>
        <article className="rounded-2xl border border-rule p-5">
          <p className="label text-warm">Source baseline</p>
          <p className="mt-3 font-serif text-4xl font-light tracking-[-0.04em]">{site.contract.version}</p>
          <p className="mt-2 text-sm text-warm">
            {site.contract.methods} methods · {site.contract.auditedOn} · {site.contract.auditedCommit}
          </p>
          <a className="text-link mt-4 inline-block text-sm" href={site.links.statusDoc}>
            STATUS_AND_ROADMAP.md
          </a>
        </article>
        <article className="rounded-2xl border border-rule p-5">
          <p className="label text-warm">Still manual</p>
          <p className="mt-3 font-serif text-4xl font-light tracking-[-0.04em]">{checks.length - passed}</p>
          <p className="mt-2 text-sm text-warm">Checklist rows not marked pass. Node tests do not flip these.</p>
          <Link className="text-link mt-4 inline-block text-sm" href="/desk">
            Update from the desk
          </Link>
        </article>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Browser smoke checklist</h2>
          <a className="label text-accent-dark" href={site.links.smokeDoc}>
            Canonical runbook
          </a>
        </div>
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
