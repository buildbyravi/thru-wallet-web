import type { Pane } from "../data/panes";
import { Code, Stamp, verdictTone } from "./parts";

export function DiffPlate({ pane, total }: { pane: Pane; total: number }) {
  const groupLabel = pane.group === "frontend" ? "FRONTEND TEARDOWN" : "BACKEND TEARDOWN";
  return (
    <article className="grain -mx-6 my-10 bg-plate px-6 py-10 text-paper md:-mx-10 md:px-10 md:py-14">
      {/* plate header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label text-dim">
            {pane.group === "frontend" ? "§03" : "§04"} · {groupLabel} · PANE {pane.index}/{total}
          </span>
          <span className="label text-dim">ID {pane.id.toUpperCase()}</span>
        </div>
        <Stamp sev={pane.severity} onDark />
      </div>

      <h3 className="mt-6 max-w-[26ch] text-[clamp(22px,2.6vw,34px)] font-[350] leading-[1.1] tracking-[-0.02em] text-paper">
        {pane.title}
      </h3>

      {/* A / B comparison */}
      <div className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-2">
        <div className="min-w-0 lg:pr-10 lg:border-r lg:border-white/10">
          <Code code={pane.rabby} label={"A — RABBY · " + pane.rabbyFile} tone="rabby" />
        </div>
        <div className="min-w-0">
          <Code code={pane.thru} label={"B — THRU · " + pane.thruFile} tone="thru" />
        </div>
      </div>

      {/* verdict */}
      <div className="mt-12 border-t border-white/15 pt-6">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_240px]">
          <p className="verdict max-w-[62ch] text-[19px] leading-[1.45] text-paper-2">
            <span className={`label not-italic mr-3 align-[3px] ${verdictTone(pane.severity)}`}>VERDICT</span>
            {pane.verdict}
          </p>
          <div className="self-end">
            <span className="label text-dim">Remediation</span>
            <p className="mt-2 text-[14px] leading-[1.5] text-paper-2/85">{pane.fix}</p>
          </div>
        </div>
      </div>

      {/* C — remediation */}
      <div className="mt-10 border-l-2 border-rabby pl-6">
        <Code code={pane.fixCode} label={"C — REMEDIATION · target: " + pane.thruFile.split(" ")[0]} tone="fix" />
      </div>
    </article>
  );
}
