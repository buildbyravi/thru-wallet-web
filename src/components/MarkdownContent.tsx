import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/CopyButton";

type Node =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; code: string; lang?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function isBlockStart(line: string) {
  return (
    line.startsWith("#") ||
    line.startsWith("```") ||
    line.startsWith(">") ||
    line.startsWith("|") ||
    /^[-*] /.test(line) ||
    /^\d+\. /.test(line)
  );
}

function parseTable(lines: string[]): Node | null {
  const cells = (line: string) =>
    line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
  if (lines.length < 2) return null;
  const headers = cells(lines[0] ?? "");
  const rows = lines.slice(2).map(cells).filter((row) => row.length > 0);
  if (headers.length === 0) return null;
  return { type: "table", headers, rows };
}

export function parseMarkdown(source: string): Node[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const nodes: Node[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || undefined;
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !(lines[i] ?? "").startsWith("```")) {
        buf.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      nodes.push({ type: "code", code: buf.join("\n"), lang });
      continue;
    }
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("|")) {
        tableLines.push(lines[i] ?? "");
        i += 1;
      }
      const table = parseTable(tableLines);
      if (table) nodes.push(table);
      continue;
    }
    if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith(">")) {
        buf.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i += 1;
      }
      nodes.push({ type: "quote", text: buf.join(" ") });
      continue;
    }
    if (line.startsWith("### ")) {
      nodes.push({ type: "h3", text: line.slice(4).trim() });
      i += 1;
      continue;
    }
    if (line.startsWith("## ") || line.startsWith("# ")) {
      nodes.push({ type: "h2", text: line.replace(/^#{1,2}\s/, "").trim() });
      i += 1;
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^[-*] /, ""));
        i += 1;
      }
      nodes.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^\d+\. /, ""));
        i += 1;
      }
      nodes.push({ type: "ol", items });
      continue;
    }
    const buf = [line.trim()];
    i += 1;
    while (i < lines.length && (lines[i] ?? "").trim() && !isBlockStart(lines[i] ?? "")) {
      buf.push((lines[i] ?? "").trim());
      i += 1;
    }
    nodes.push({ type: "p", text: buf.join(" ") });
  }

  return nodes;
}

function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("https://") || href.startsWith("http://")) return href;
  return null;
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return (
            <code key={index} className="mono rounded bg-paper-2 px-1 py-0.5 text-[0.86em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={index} className="font-medium text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const href = safeHref(link[2] ?? "");
          if (!href) return <span key={index}>{link[1]}</span>;
          if (href.startsWith("/")) {
            return (
              <Link key={index} href={href} className="text-link">
                {link[1]}
              </Link>
            );
          }
          return (
            <a key={index} href={href} className="text-link" target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const nodes = parseMarkdown(markdown);
  return (
    <div className="prose-dossier max-w-none text-[1.05rem] text-ink">
      {nodes.map((node, index) => renderNode(node, index))}
    </div>
  );
}

function renderNode(node: Node, index: number): ReactNode {
  if (node.type === "h2") {
    return (
      <h2 key={index} id={headingId(node.text)}>
        {node.text}
      </h2>
    );
  }
  if (node.type === "h3") {
    return (
      <h3 key={index} id={headingId(node.text)}>
        {node.text}
      </h3>
    );
  }
  if (node.type === "p") {
    return (
      <p key={index}>
        <Rich text={node.text} />
      </p>
    );
  }
  if (node.type === "quote") {
    return (
      <blockquote key={index} className="border-l-2 border-alert bg-alert-soft/60 px-4 py-3 text-alert">
        <Rich text={node.text} />
      </blockquote>
    );
  }
  if (node.type === "ul" || node.type === "ol") {
    const Tag = node.type === "ul" ? "ul" : "ol";
    return (
      <Tag key={index}>
        {node.items.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </Tag>
    );
  }
  if (node.type === "code") {
    return (
      <div key={index} className="not-prose">
        <figure className="overflow-hidden rounded-2xl bg-plate text-paper">
          <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span className="label text-paper/60">{node.lang ?? "text"}</span>
            <CopyButton value={node.code} />
          </figcaption>
          <pre className="overflow-x-auto px-4 py-4">
            <code className="mono text-[12.5px] leading-relaxed">{node.code}</code>
          </pre>
        </figure>
      </div>
    );
  }
  if (node.type !== "table") return null;
  return (
    <div key={index} className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-[0.95rem]">
        <thead>
          <tr className="border-b border-rule">
            {node.headers.map((header) => (
              <th key={header} className="label py-2 pr-4 font-medium text-warm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {node.rows.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${row.join("|")}`} className="border-b border-rule/80">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="py-2 pr-4 align-top">
                  <Rich text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
