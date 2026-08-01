import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
