import { llmsShort } from "@/lib/llms";

export function GET() {
  return new Response(llmsShort(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
