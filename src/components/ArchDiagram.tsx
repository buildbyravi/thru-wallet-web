import { architectureFlow } from "@/content/architecture";

export function ArchDiagram() {
  return (
    <ol className="relative space-y-0">
      {architectureFlow.map((layer, index) => (
        <li key={layer.layer} className="grid gap-4 border-t border-rule py-5 sm:grid-cols-[7rem_1fr] sm:gap-8">
          <div>
            <p className="label text-accent-dark">0{index + 1}</p>
            <p className="mt-2 font-serif text-xl leading-tight tracking-[-0.03em]">{layer.layer}</p>
          </div>
          <div>
            <p className="mono text-sm text-accent-dark">{layer.path}</p>
            <p className="mt-2 max-w-2xl text-warm">{layer.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
