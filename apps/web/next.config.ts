import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Enable if using Docker with health checks
  async rewrites() {
    return [
      {
        source: "/api/health",
        destination: "/api/health",
      },
    ];
  },
};

export default nextConfig;
