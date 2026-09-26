const RULE = "#cbc4b3";
const INK = "#16150f";
const WARM = "#6b6659";
const SOFT = "#e8e3d7";
const VIO = "#5c6bf5";
const RED = "#d93b1e";

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  fill = "#ffffff",
  stroke = RULE,
  dash,
  titleFill = INK,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  fill?: string;
  stroke?: string;
  dash?: string;
  titleFill?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1} strokeDasharray={dash} />
      <text x={x + 14} y={y + (sub ? 24 : h / 2 + 4)} className="mono" fontSize={12.5} fontWeight={500} fill={titleFill}>
        {title}
      </text>
      {sub && (
        <text x={x + 14} y={y + 43} className="mono" fontSize={10.5} fill={WARM}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Down({ x, y1, y2, label }: { x: number; y1: number; y2: number; label?: string }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 6} stroke={WARM} strokeWidth={1} />
      <path d={"M " + (x - 4) + " " + (y2 - 7) + " L " + (x + 4) + " " + (y2 - 7) + " L " + x + " " + (y2 - 1) + " Z"} fill={WARM} />
      {label && (
        <text x={x + 10} y={(y1 + y2) / 2 + 3} className="mono" fontSize={10} fill={WARM}>
          {label}
        </text>
      )}
    </g>
  );
}

export function ArchDiagram() {
  return (
    <div className="overflow-x-auto border border-rule bg-white/60 p-5 md:p-8">
      <svg viewBox="0 0 1000 566" className="mono min-w-[860px] w-full" role="img" aria-label="Architecture comparison: Rabby four-context stack versus Thru two-context stack">
        <text x={16} y={22} fontSize={11} letterSpacing={2.2} fill={RED}>
          RABBY — 4 EXECUTION CONTEXTS
        </text>
        <text x={516} y={22} fontSize={11} letterSpacing={2.2} fill={VIO}>
          THRU — 2 EXECUTION CONTEXTS
        </text>
        <line x1={500} y1={8} x2={500} y2={558} stroke={RULE} strokeWidth={1} strokeDasharray="2 4" />

        {/* LEFT — RABBY */}
        <Box x={16} y={40} w={468} h={44} title="dApp page context" sub="window.ethereum · EIP-1193 request()" />
        <Down x={250} y1={84} y2={106} />
        <Box x={16} y={108} w={468} h={44} title="contentscript.js → pageProvider.js" sub="postMessage ⇄ port.postMessage bridge" />
        <Down x={250} y1={152} y2={174} label="runtime.onConnect + session" />
        <Box
          x={16}
          y={176}
          w={468}
          h={318}
          title="background.js — walletController + providerController"
          sub="MV2 background page · MV3 sw.js"
          fill={SOFT}
          stroke={INK}
        />
        <Box x={32} y={232} w={436} h={52} title="walletController" sub="mounted on window.wallet — reflected method table" />
        <Box x={32} y={296} w={436} h={52} title="providerController ← rpcFlow.ts" sub="connect · walletState · securityCheck · approval" />
        <Box x={32} y={360} w={436} h={64} title="services: keyring · chain · openapi" sub="preference · notification · transaction · approval" />
        <Box x={32} y={436} w={436} h={44} title="chrome.storage.local — AES vault + prefs" sub="decrypted keyrings live in the background page" />
        <text x={16} y={524} className="mono" fontSize={10.5} fill={WARM}>
          UI: popup · notification window · tab page — all three read window.wallet
        </text>
        <text x={16} y={544} className="mono" fontSize={10.5} fill={WARM}>
          Approval screen is the product surface: SignTx · SignText · SignTypedData
        </text>

        {/* RIGHT — THRU */}
        <Box x={516} y={40} w={468} h={52} title="src/ui/app/routes/* — 14 routes" sub="src/ui/kit/dom.js h() · the only DOM sink" />
        <Down x={750} y1={92} y2={116} label="bridge.send(method, params)" />
        <Box x={516} y={118} w={468} h={44} title="src/ui/app/bridge.js" sub="sole outbound sendMessage caller (enforced)" />
        <Down x={750} y1={162} y2={186} label="chrome.runtime.sendMessage" />
        <Box x={516} y={188} w={468} h={254} title="src/background/api-router.js" sub="auth + contract validation + dispatch" fill={SOFT} stroke={INK} />
        <Box x={532} y={244} w={436} h={52} title="src/shared/contract/manifest.js — v7" sub="74 methods · allowlist · returns 'json'" stroke={VIO} titleFill={VIO} />
        <Box x={532} y={308} w={436} h={52} title="auth tiers: none | password | signing" sub="re-verified against the ENCRYPTED blob" />
        <Box x={532} y={372} w={436} h={56} title="services/* → lib/vault.js · thru-client.js" sub="networks.js · BigInt in, stringified over messages" />
        <Box x={516} y={462} w={468} h={44} title="chrome.storage.session — decrypted vault" sub="no auto-lock alarm — see F-03" stroke={RED} titleFill={RED} />
        <Box x={516} y={516} w={468} h={38} title="provider seam — NOT BUILT (deliberate)" sub="" stroke={WARM} dash="4 4" titleFill={WARM} />
      </svg>
    </div>
  );
}
