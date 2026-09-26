import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { axes, overall } from "../data/audit";

/** Bullet graph plate: filled bar = Thru, periwinkle tick = Rabby reference. */
export function ScorePlate() {
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const active = axes.find((a) => a.id === hover);

  return (
    <div className="border border-rule bg-white/60 p-6 md:p-9">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-5">
        <div>
          <div className="label text-warm">Plate 01 · scorecard · 0–10</div>
          <p className="verdict mt-3 max-w-[30ch] text-[24px] leading-[1.15]">{overall.headline}</p>
        </div>
        <div className="flex items-end gap-8">
          {[
            { k: "THRU", v: overall.thru, cls: "text-ink" },
            { k: "RABBY", v: overall.rabby, cls: "text-rabby-dark" },
          ].map((s) => (
            <div key={s.k}>
              <div className="label text-warm-2">{s.k}</div>
              <div className={`mono text-[44px] font-[500] leading-none tracking-[-0.03em] ${s.cls}`}>
                {s.v.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-2">
        {axes.map((a, i) => (
          <li
            key={a.id}
            onMouseEnter={() => setHover(a.id)}
            onMouseLeave={() => setHover(null)}
            className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-6 gap-y-2 border-b border-rule/60 py-4 md:grid-cols-[248px_minmax(0,1fr)_78px]"
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="label text-warm-2">{a.id}</span>
                <span className="truncate text-[16px] leading-tight">{a.name}</span>
              </div>
              <div className="mono mt-1 truncate text-[10.5px] text-warm-2">{a.file}</div>
            </div>

            <div className="relative h-[26px] bg-paper-2">
              <motion.div
                className="absolute inset-y-0 left-0 bg-ink"
                initial={{ width: reduce ? (a.thru / 10) * 100 + "%" : 0 }}
                whileInView={{ width: (a.thru / 10) * 100 + "%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
              />
              <motion.div
                className="absolute -top-[5px] bottom-[-5px] w-[2px] bg-rabby"
                initial={reduce ? false : { left: 0, opacity: 0 }}
                whileInView={{ left: (a.rabby / 10) * 100 + "%", opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + i * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
              />
            </div>

            <div className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-0">
              <div className="mono text-[22px] font-[500] leading-none tracking-[-0.02em]">{a.thru.toFixed(1)}</div>
              <div className="mono text-[11px] leading-none text-rabby-dark">R {a.rabby.toFixed(1)}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
        <p className="verdict max-w-[58ch] text-[18px] leading-[1.4]">{overall.verdict}</p>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <span className="inline-block h-[10px] w-[26px] bg-ink" />
            <span className="label text-warm">Thru</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-[14px] w-[2px] bg-rabby" />
            <span className="label text-warm">Rabby</span>
          </span>
        </div>
      </div>

      <div className="mt-4 min-h-[46px] border-l-2 border-rabby pl-4 text-[13.5px] leading-[1.5] text-warm">
        {active ? (
          <>
            <span className="label mr-2 text-warm-2">{active.id}</span>
            {active.note}
          </>
        ) : (
          <span className="text-warm-2">Hover an axis for the reasoning behind the score.</span>
        )}
      </div>
    </div>
  );
}
