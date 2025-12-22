// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://atmisolo.co.id";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [`${base}/sitemap.xml`],
    host: base,
  };
}

