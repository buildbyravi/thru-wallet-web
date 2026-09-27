import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { changelog } from "@/content/changelog";
import { listNotes } from "@/lib/catalog";
import { formatDay, formatStamp } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Thru Wallet listing releases, contract notes, and desk ledger entries.",
};

export default async function ChangelogPage() {
  const notes = await listNotes(12);

  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Changelog"
        title="What changed, and in which artifact."
        lede="Authored entries are reviewed with the site. Desk notes are rows in Postgres. A store release and a contract bump are not the same event."
      />
      <ol className="mt-12 space-y-10">
        {changelog.map((entry) => (
          <li key={`${entry.version}-${entry.title}`} className="grid gap-4 border-t border-rule pt-6 lg:grid-cols-[11rem_1fr]">
            <div>
              <p className="mono text-sm">{entry.version}</p>
              <p className="label mt-2 text-dim">{formatDay(entry.date)}</p>
              <div className="mt-3">
                <Badge value={entry.tag} />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-tight font-light tracking-[-0.03em]">{entry.title}</h2>
              <p className="mt-3 max-w-2xl text-warm">{entry.summary}</p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5">
                {entry.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <section className="mt-16">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Desk ledger</h2>
        <p className="mt-2 max-w-2xl text-warm">
          These notes are stored in the catalog database. They can be added from the desk without pretending to be a release.
        </p>
        <ul className="mt-6 space-y-5">
          {notes.map((note) => (
            <li key={note.id} className="border-t border-rule pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge value={note.tag} />
                <span className="label text-dim">{formatStamp(note.createdAt)} UTC · {note.author}</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl">{note.title}</h3>
              <p className="mt-2 max-w-3xl text-warm">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
