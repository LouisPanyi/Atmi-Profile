// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://atmisolo.co.id";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${base}/tentang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/layanan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/produk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontak`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/berita`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
