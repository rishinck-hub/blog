import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rishinck-hub.github.io",
        pathname: "/Portfolio/images/**",
      },
    ],
  },
};

export default nextConfig;
