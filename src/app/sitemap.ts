import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Při větší změně obsahu posunout.
const lastModified = "2026-11-08";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/ochrana-osobnich-udaju`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
