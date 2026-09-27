import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/Section";
import { docSlots } from "@/content/smoke";
import { docs } from "@/content/docs";
import { DocsFilter } from "@/components/DocsFilter";

export const metadata: Metadata = {
  title: "Docs",
  description: "Thru Wallet documentation hub: install, architecture, security, agents, and the content guide.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Docs"
        title="A short dossier, not a second repository."
        lede="These pages describe the extension and this website. The extension repository remains authoritative for source behavior."
      />
      <DocsFilter
        docs={docs.map((doc) => ({
          slug: doc.slug,
          title: doc.title,
          description: doc.description,
          tag: doc.tag,
        }))}
      />
      <section className="mt-14">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Open slots</h2>
        <p className="mt-2 max-w-2xl text-warm">Reserved, not written. An empty slot is more honest than a page that invents a result.</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {docSlots.map((slot) => (
            <li key={slot.title} className="rounded-2xl border border-dashed border-rule p-5">
              <p className="label text-dim">Unwritten</p>
              <h3 className="mt-2 font-serif text-2xl">{slot.title}</h3>
              <p className="mt-2 text-sm text-warm">{slot.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-warm">
          Machine copies:{" "}
          <Link className="text-link" href="/llms.txt">
            /llms.txt
          </Link>{" "}
          and{" "}
          <Link className="text-link" href="/llms-full.txt">
            /llms-full.txt
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
