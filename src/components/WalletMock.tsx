export function WalletMock() {
  return (
    <figure className="relative">
      <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_80%_0%,rgba(92,107,245,0.45),transparent_42%),radial-gradient(circle_at_0%_100%,rgba(217,59,30,0.18),transparent_36%)] blur-2xl" />
      <div className="plate-grain overflow-hidden rounded-[1.7rem] border border-white/10 bg-plate text-paper shadow-[0_30px_70px_rgba(18,18,12,0.28)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="h-6 w-6 text-paper" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="currentColor" />
              <rect x="9" y="6" width="3.2" height="20" fill="#12120c" />
              <rect x="19.8" y="6" width="3.2" height="20" fill="#12120c" />
              <rect x="14.2" y="13" width="3.6" height="6" fill="#5c6bf5" />
            </svg>
            <div>
              <p className="font-serif text-sm leading-none">Thru</p>
              <p className="label mt-1 text-paper/50">Popup study · 400px</p>
            </div>
          </div>
          <p className="label text-paper/50">Sample</p>
        </div>
        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="label text-paper/50">primary</p>
              <p className="mono mt-1 text-sm text-paper/80">7Kq3 ··· e91A</p>
            </div>
            <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] tracking-[0.14em] text-paper/70 uppercase">
              Locked view
            </span>
          </div>
          <p className="mt-6 font-serif text-5xl leading-none font-light tracking-[-0.04em]">12.480</p>
          <p className="mt-2 text-sm text-paper/70">
            THRU <span className="mono text-paper/45">· 12,480,000,000 base</span>
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Send", "Receive", "Faucet"].map((action, index) => (
              <div
                key={action}
                className={`rounded-xl px-2 py-3 text-center ${index === 0 ? "bg-accent text-white" : "bg-plate-3 text-paper"}`}
              >
                <p className="label">{action}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <p className="label text-paper/50">Activity</p>
              <p className="label text-paper/40">No invented dates</p>
            </div>
            <ul className="mt-3 space-y-3">
              <Activity kind="Sent" amount="−0.500 THRU" meta="Block 1,842,201" />
              <Activity kind="Faucet" amount="+10,000 base" meta="Raw units, not 10,000 THRU" />
              <Activity kind="Received" amount="+2.000 THRU" meta="Block 1,841,994" />
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <p className="flex items-center gap-2 text-sm">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Alphanet
          </p>
          <p className="label text-paper/50">contract v12</p>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-warm">
        Static study. Not connected. Sample figures only — not a balance, not an address format certification.
      </figcaption>
    </figure>
  );
}

function Activity({ kind, amount, meta }: { kind: string; amount: string; meta: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <div>
        <p className="text-sm">{kind}</p>
        <p className="mono text-[11px] text-paper/45">{meta}</p>
      </div>
      <p className="mono text-sm">{amount}</p>
    </li>
  );
}
