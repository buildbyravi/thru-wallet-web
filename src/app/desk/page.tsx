import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { PageHeader } from "@/components/Section";
import { createNote, deleteNote, login, logout, updateSmoke } from "@/app/desk/actions";
import { listNotes, listSmoke } from "@/lib/catalog";
import { deskIsWritable, isDeskAuthed, passwordHint } from "@/lib/desk";
import { formatStamp } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Desk",
  description: "Local catalog desk for Thru Wallet field notes and smoke-check marks.",
};

export default async function DeskPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const writable = deskIsWritable();
  const authed = writable && await isDeskAuthed();
  const notes = await listNotes(20);
  const checks = await listSmoke();
  const errorText =
    error === "1"
      ? "That password does not match the desk gate."
      : error === "note"
        ? "The note was rejected. Use a title of 4–140 characters and a body of 8–4000."
        : error === "auth"
          ? "The desk gate closed. Sign in again."
          : null;

  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Desk"
        title="A ledger, not a wallet."
        lede="Field notes and smoke marks live in Postgres. The gate only protects this editor. It does not protect keys, and notes are public on the changelog."
        meta={passwordHint()}
      />
      {errorText ? <p className="mt-6 border-l-2 border-alert bg-alert-soft/70 px-4 py-3 text-sm text-alert">{errorText}</p> : null}

      {!writable ? (
        <p className="mt-8 max-w-2xl border-l-2 border-accent bg-accent-light px-4 py-3 text-sm text-accent-dark">
          Desk editing is unavailable. Configure both DATABASE_URL and DESK_PASSWORD; public pages remain available in read-only mode.
        </p>
      ) : authed ? (
        <form action={logout} className="mt-6">
          <button className="btn btn-line" type="submit">
            Lock desk
          </button>
        </form>
      ) : (
        <form action={login} className="mt-8 max-w-md space-y-3 rounded-2xl border border-rule p-5">
          <label className="block">
            <span className="label text-warm">Desk password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full border-b border-rule bg-transparent py-2 outline-none"
            />
          </label>
          <button className="btn btn-ink" type="submit">
            Open desk
          </button>
        </form>
      )}

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Add a field note</h2>
          <form action={createNote} className="mt-4 space-y-3">
            <label className="block">
              <span className="label text-warm">Title</span>
              <input name="title" required disabled={!authed} className="mt-2 w-full border-b border-rule bg-transparent py-2 outline-none disabled:opacity-50" />
            </label>
            <label className="block">
              <span className="label text-warm">Tag</span>
              <select name="tag" disabled={!authed} className="mt-2 w-full border-b border-rule bg-transparent py-2 outline-none disabled:opacity-50">
                {["NOTE", "DOCS", "RELEASE", "SECURITY", "SMOKE", "FIX"].map((tag) => (
                  <option key={tag}>{tag}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label text-warm">Note</span>
              <textarea name="body" required rows={5} disabled={!authed} className="mt-2 w-full border border-rule bg-transparent p-3 outline-none disabled:opacity-50" />
            </label>
            <button className="btn btn-ink" type="submit" disabled={!authed}>
              Save note
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Recent notes</h2>
          <ul className="mt-4 space-y-4">
            {notes.map((note) => (
              <li key={note.id} className="border-t border-rule pt-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge value={note.tag} />
                  {authed ? (
                    <form action={deleteNote}>
                      <input type="hidden" name="id" value={note.id} />
                      <button className="label text-alert" type="submit">
                        Remove
                      </button>
                    </form>
                  ) : null}
                </div>
                <p className="mt-2 font-serif text-xl">{note.title}</p>
                <p className="mt-1 text-sm text-warm">{note.body}</p>
                <p className="label mt-2 text-dim">{formatStamp(note.createdAt)} UTC</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Smoke marks</h2>
        <p className="mt-2 max-w-2xl text-sm text-warm">
          Mark a row pass only after a real Chrome run. Saving here does not change the extension.
        </p>
        <form action={updateSmoke} className="mt-5 space-y-4">
          {checks.map((check) => (
            <div key={check.itemKey} className="grid gap-3 border-t border-rule pt-4 lg:grid-cols-[1fr_9rem_1fr]">
              <input type="hidden" name="keys" value={check.itemKey} />
              <div>
                <p className="font-serif text-lg">{check.label}</p>
                <p className="text-sm text-warm">{check.detail}</p>
              </div>
              <select
                name={`status:${check.itemKey}`}
                defaultValue={check.status}
                disabled={!authed}
                className="h-10 border border-rule bg-transparent px-2 disabled:opacity-60"
              >
                {["open", "pass", "fail", "blocked"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <input
                name={`note:${check.itemKey}`}
                defaultValue={check.note ?? ""}
                disabled={!authed}
                placeholder="What was observed"
                className="h-10 border-b border-rule bg-transparent disabled:opacity-60"
              />
            </div>
          ))}
          <button className="btn btn-ink" type="submit" disabled={!authed}>
            Save checklist
          </button>
        </form>
      </section>
    </main>
  );
}
