import { MetadataRoute } from "next";
import { sql } from "@vercel/postgres"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atmi.co.id";

  const staticRoutes = [
    "",
    "/tentang",
    "/layanan",
    "/produk",
    "/berita",
    "/kontak",
    "/kebijakan-hukum",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Halaman Berita Dinamis (Fetch dari DB)
  let newsRoutes: MetadataRoute.Sitemap = [];
  
  try {
    // Ambil slug dan updated_at (atau created_at jika updated ga ada)
    const { rows } = await sql`SELECT slug, created_at FROM news ORDER BY created_at DESC`;
    
    newsRoutes = rows.map((item) => ({
      url: `${baseUrl}/berita/${item.slug}`,
      lastModified: new Date(item.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Gagal generate sitemap berita:", error);
  }

  return [...staticRoutes, ...newsRoutes];
}