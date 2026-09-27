import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/extension", destination: "/install", permanent: false },
      { source: "/chrome", destination: "/install", permanent: false },
    ];
  },
};

export default nextConfig;
