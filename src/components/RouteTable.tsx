import { routes } from "@/content/routes";

export function RouteTable() {
  return (
    <div className="overflow-x-auto border-y border-rule">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-rule">
            <th className="label py-3 pr-4 font-medium text-warm">Path</th>
            <th className="label py-3 font-medium text-warm">Use</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.path} className="border-b border-rule/70">
              <td className="mono py-3 pr-4 text-sm">{route.path}</td>
              <td className="py-3 text-warm">{route.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
