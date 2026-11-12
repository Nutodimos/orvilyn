import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    agentUpgrade: "security",
  },
  async rewrites() {
    return [
      {
        source: "/chair",
        destination: "/demo/sharp",
      },
      {
        source: "/sharp",
        destination: "/demo/sharp",
      },
    ];
  },
};

export default nextConfig;
