import { CopyButton } from "./CopyButton";

const TOKEN_RE =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|await|async|if|else|import|from|export|default|new|class|extends|try|catch|throw|typeof|for|of|in|null|undefined|true|false|this|npm|npx|git|cd)\b)/g;

function highlight(src: string): string {
  const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.replace(TOKEN_RE, (m, c, b, s, n, k) => {
    if (c) return `<span class="tok-c">${c}</span>`;
    if (b) return `<span class="tok-c">${b}</span>`;
    if (s) return `<span class="tok-s">${s}</span>`;
    if (n) return `<span class="tok-n">${n}</span>`;
    if (k) return `<span class="tok-k">${k}</span>`;
    return m;
  });
}

export function CodeBlock({ code, label = "code" }: { code: string; label?: string }) {
  return (
    <figure className="not-prose my-6 min-w-0 rounded-sm border border-ink/10 bg-plate p-4">
      <figcaption className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-2">
        <span className="label truncate text-paper/70">{label}</span>
        <span className="shrink-0">
          <CopyButton text={code} onDark />
        </span>
      </figcaption>
      <pre className="mono max-h-[420px] overflow-auto pr-3 text-[13px] leading-[1.65] text-[#cfcaba]">
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </figure>
  );
}
