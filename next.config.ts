import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/cursos",
        destination: "/cursos/index.html",
      },
    ];
  },
};

export default nextConfig;
