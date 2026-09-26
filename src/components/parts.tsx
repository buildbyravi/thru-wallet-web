import { useState } from "react";
import type { ReactNode } from "react";
import type { Severity } from "../data/panes";

/* ---------- shared bits ---------- */

export function Section({
  id,
  num,
  title,
  kicker,
  children,
  notes,
  wide = false,
}: {
  id: string;
  num: string;
  title: string;
  kicker?: string;
  children: ReactNode;
  notes?: ReactNode;
  wide?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-8 py-16 md:py-24">
      <header className="hair pt-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label text-defect">§{num}</span>
          {kicker && <span className="label text-warm">{kicker}</span>}
        </div>
        <h2 className="mt-3 max-w-[22ch] text-[clamp(30px,4.4vw,52px)] font-[350] leading-[1.02] tracking-[-0.025em]">
          {title}
        </h2>
      </header>
      <div className={wide ? "mt-10" : "mt-10 grid gap-x-14 gap-y-10 xl:grid-cols-[minmax(0,1fr)_248px]"}>
        <div className="min-w-0">{children}</div>
        {!wide && notes && (
          <aside className="hidden xl:block">
            <div className="sticky top-10 space-y-8 border-l border-rule pl-5">{notes}</div>
          </aside>
        )}
      </div>
    </section>
  );
}

export function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="label text-warm-2">{label}</div>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-warm">{children}</p>
    </div>
  );
}

const SEV: Record<Severity, string> = {
  BLOCKER: "text-[#e5563a] border-[#e5563a]",
  MAJOR: "text-paper border-paper/60",
  MINOR: "text-warm-2 border-warm-2/60",
  HOLD: "text-rabby-light border-rabby/70",
};

export function Stamp({ sev, onDark = false }: { sev: Severity; onDark?: boolean }) {
  if (!onDark) {
    const light =
      sev === "BLOCKER"
        ? "text-defect border-defect"
        : sev === "HOLD"
          ? "text-rabby-dark border-rabby-dark"
          : "text-warm border-warm/70";
    return <span className={`label border px-2 py-[3px] ${light}`}>{sev}</span>;
  }
  return (
    <span className={`label border px-2 py-[3px] ${SEV[sev]} bg-plate/60`}>{sev}</span>
  );
}

/* ---------- code rendering ---------- */

const RE =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|await|async|if|else|import|from|export|default|new|class|extends|try|catch|throw|typeof|for|of|in|null|undefined|true|false|this)\b)/g;

function highlight(src: string): string {
  const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.replace(RE, (m, c, b, s, n, k) => {
    if (c) return '<span class="tok-c">' + c + "</span>";
    if (b) return '<span class="tok-c">' + b + "</span>";
    if (s) return '<span class="tok-s">' + s + "</span>";
    if (n) return '<span class="tok-n">' + n + "</span>";
    if (k) return '<span class="tok-k">' + k + "</span>";
    return m;
  });
}

export function CopyButton({
  text,
  label = "Copy",
  onDark = false,
}: {
  text: string;
  label?: string;
  onDark?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          },
          () => undefined,
        );
      }}
      className={
        "label border px-2 py-[3px] transition-colors duration-[120ms] " +
        (onDark
          ? "border-white/30 text-paper hover:bg-white/10"
          : "border-ink/30 text-ink hover:bg-ink/10")
      }
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

export function Code({
  code,
  label,
  tone = "neutral",
}: {
  code: string;
  label: string;
  tone?: "rabby" | "thru" | "fix" | "neutral";
}) {
  const accent =
    tone === "rabby" ? "text-rabby-light" : tone === "thru" ? "text-paper" : tone === "fix" ? "text-[#d9c27e]" : "text-warm-2";
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 flex items-center justify-between gap-3 border-b border-white/10 pb-2">
        <span className={`label truncate ${accent}`}>{label}</span>
        <span className="shrink-0">
          <CopyButton text={code} onDark />
        </span>
      </figcaption>
      <pre className="mono max-h-[420px] overflow-auto pr-3 text-[11.5px] leading-[1.65] text-[#cfcaba]">
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </figure>
  );
}

export function verdictTone(sev: Severity) {
  return sev === "BLOCKER" ? "text-[#e5563a]" : sev === "HOLD" ? "text-rabby-light" : "text-[#d9c27e]";
}
