import type { NextConfig } from "next";

/** Project Pages URL: https://<user>.github.io/sarka_head_spa/ */
const repo = "sarka_head_spa";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : undefined,
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
  // cacheComponents / PPR nejdou se static exportem (GitHub Pages)
  images: {
    unoptimized: true,
    qualities: [75, 80, 92, 100],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
