"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // This boundary catches every route error, not only database ones — a rendering bug or a bad
  // import lands here too. The old copy asserted "the Postgres catalog did not answer", which was
  // wrong for most of what could actually reach it. The digest is the only detail a production
  // build exposes, and it is what ties this screen to a server log line.
  const reference = error.digest ?? "no digest";

  return (
    <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <p className="label text-warm">Error</p>
      <h1 className="mt-3 font-serif text-5xl font-light tracking-[-0.04em]">This page did not render.</h1>
      <p className="mt-4 text-warm">
        Something failed while building the page — most often the Postgres catalog, which backs the
        desk notes and smoke marks on the overview, status, and changelog pages. The rest of the
        dossier is static and still available.
      </p>
      <p className="mono mt-3 text-xs text-dim">Reference: {reference}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn btn-ink" type="button" onClick={reset}>
          Try again
        </button>
        <a className="btn btn-line" href="/status">
          Status
        </a>
      </div>
    </main>
  );
}
