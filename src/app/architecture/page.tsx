import type { Metadata } from "next";
import { ArchDiagram } from "@/components/ArchDiagram";
import { PageHeader } from "@/components/Section";
import { RouteTable } from "@/components/RouteTable";
import { architectureFlow, boundaries, contractBreaks } from "@/content/architecture";
import { routeCount } from "@/content/routes";
import { auditedDoc, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How Thru Wallet separates UI routes, the bridge, the API router, services, and sacred adapters.",
};

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Architecture"
        title="Authority sits in the background."
        lede={`${architectureFlow.length} layers. ${routeCount} routes. Contract ${site.contract.version} with ${site.contract.methods} methods in the published build, ${auditedDoc.version} in a status document that has not caught up. The UI asks. The background decides.`}
      />
      <div className="mt-10">
        <ArchDiagram />
      </div>
      <section className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Boundaries</h2>
          <p className="mt-3 text-warm">These are enforced by tests where the repository can enforce them, and by review where it cannot.</p>
        </div>
        <ul className="divide-y divide-rule border-y border-rule">
          {boundaries.map((item) => (
            <li key={item} className="py-3 text-warm">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Fourteen routes</h2>
        <p className="mt-3 max-w-2xl text-warm">
          One stack. No legacy popup fallback. Every route is mounted by the lifecycle test in no-vault, locked, and unlocked states.
        </p>
        <div className="mt-6">
          <RouteTable />
        </div>
      </section>
      <section className="mt-14">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Documented contract breaks</h2>
        <p className="mt-3 max-w-2xl text-warm">The contract is append-only, except these security changes, which are called out rather than hidden. Steps v13 to v15 shipped in the 1.4.1 package, published to the store on 2026-10-04.</p>
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {contractBreaks.map((item) => (
            <li key={item.version} className="grid gap-2 py-4 sm:grid-cols-[5rem_1fr]">
              <span className="mono text-sm text-accent-dark">{item.version}</span>
              <span>{item.change}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
