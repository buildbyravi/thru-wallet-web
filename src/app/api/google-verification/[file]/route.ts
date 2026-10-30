import { googleVerificationFileToken } from "@/lib/seo";

// Serves the Google Search Console "HTML file" verification response, so no token-named file has
// to be committed and renamed whenever the property changes. `next.config.ts` rewrites
// `/google<token>.html` here, and the handler only answers when the filename matches the token
// from googleVerificationFileToken() — which is GOOGLE_SITE_VERIFICATION_FILE, falling back to the
// meta-tag token, because Search Console normally issues the same string for both methods.
export const dynamic = "force-dynamic";

const HEADERS = { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" };

function text(body: string, status: number) {
  return new Response(body, { status, headers: HEADERS });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const token = googleVerificationFileToken();
  const { file } = await params;

  // The token is never empty — it falls back to the committed value — so the only failure mode
  // is a filename that does not match it. Anything else is a 404 with a body, not an error page.
  if (file !== `google${token}.html`) {
    return text("Not found.\n", 404);
  }
  return text(`google-site-verification: google${token}.html\n`, 200);
}
