import type { NextConfig } from "next";

/** Project Pages URL: https://<user>.github.io/head_spa/ */
const repo = "head_spa";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // cacheComponents / PPR nejdou se static exportem (GitHub Pages)
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
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
