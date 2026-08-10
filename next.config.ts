import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allows the dev server to be reached via 127.0.0.1 (e.g. from automated
  // browser tooling) in addition to localhost. Dev-only; unrelated to prod.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
