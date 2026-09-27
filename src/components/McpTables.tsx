import { aiMcp } from "@/content/ai";

const columns = [
  { title: "Allowed reads", tone: "border-ink", items: aiMcp.allowed },
  { title: "Protected intents", tone: "border-accent", items: aiMcp.protected },
  { title: "Forbidden", tone: "border-alert", items: aiMcp.forbidden },
] as const;

export function McpTables() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <section key={column.title} className={`border-t-2 ${column.tone} bg-paper-2/50 p-5`}>
          <h3 className="label text-warm">{column.title}</h3>
          <ul className="mt-4 space-y-3">
            {column.items.map((item) => (
              <li key={item} className="mono text-[13px] leading-relaxed text-ink">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
