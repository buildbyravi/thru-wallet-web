import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

// The JSON handlers and the gated desk are not search content. robots.txt says so; these headers
// say so to crawlers that never read robots.txt.
const noIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.e2b.app"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: noIndex,
      },
      {
        source: "/desk",
        headers: noIndex,
      },
    ];
  },
  async redirects() {
    // 308 instead of 307 so the old names pass their ranking signal to /install instead of
    // asking a crawler to keep the old URL. `/extension` and `/chrome` appear in the README,
    // in the older docs, and in at least one shared link.
    return [
      { source: "/extension", destination: "/install", permanent: true },
      { source: "/chrome", destination: "/install", permanent: true },
    ];
  },
  async rewrites() {
    // Google Search Console's "HTML file" verification method asks for a file whose name it
    // generates: /google<token>.html. Rewriting that one pattern to a handler reading
    // GOOGLE_SITE_VERIFICATION means the token lives in an environment variable instead of a
    // committed file that has to be renamed every time the property is re-added.
    return [
      {
        source: "/:file(google[\\w-]+\\.html)",
        destination: "/api/google-verification/:file",
      },
    ];
  },
};

export default nextConfig;
