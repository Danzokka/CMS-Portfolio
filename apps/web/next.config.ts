import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "go-skill-icons.vercel.app",
        pathname: "/api/icons**",
      },
    ],
  },

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
