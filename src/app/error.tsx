"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="label text-warm">Catalog</p>
      <h1 className="mt-3 font-serif text-5xl font-light tracking-[-0.04em]">This page could not read the database.</h1>
      <p className="mt-4 text-warm">The dossier copy is fine. The Postgres catalog did not answer.</p>
      <button className="btn btn-ink mt-6" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
