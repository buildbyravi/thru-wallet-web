import { googleSiteVerification } from "@/lib/seo";

// Serves the Google Search Console "HTML file" verification response without committing a file
// named after a token that can change. `next.config.ts` rewrites `/google<token>.html` here, and
// the handler only answers when the requested filename matches GOOGLE_SITE_VERIFICATION.
export const dynamic = "force-dynamic";

const HEADERS = { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" };

function text(body: string, status: number) {
  return new Response(body, { status, headers: HEADERS });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const token = googleSiteVerification();
  const { file } = await params;

  if (!token) {
    return text("Google site verification is not configured on this deployment.\n", 404);
  }
  if (file !== `google${token}.html`) {
    return text("Not found.\n", 404);
  }
  return text(`google-site-verification: google${token}.html\n`, 200);
}
