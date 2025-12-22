"use server";

import "server-only";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import type { Product } from "@/data/product/product-types"; 
import type { ProductTableRow } from "@/lib/definitions"; 

const ITEMS_PER_PAGE = 5;

export async function fetchNewsBySlug(slug: string) {
  noStore();
  try {
    const decoded = decodeURIComponent(slug);
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`SELECT id, title, slug, created_at, sections FROM news WHERE slug = ${decoded} LIMIT 1`;
    return rows[0] ?? null;
  } catch (e) {
    console.error("fetchNewsBySlug error:", e);
    return null;
  }
}

export async function fetchFilteredNews(query: string, currentPage: number) {
  noStore();
  const q = query?.trim() || "";
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE title ILIKE ${`%${q}%`}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
  } catch (e) {
    console.error("fetchFilteredNews error:", e);
    return [];
  }
}

export async function fetchNewsPages(query: string) {
  noStore();
  const q = query?.trim() || "";
  try {
    const count = await sql<{ count: string }>`
      SELECT COUNT(*)::text AS count FROM news WHERE title ILIKE ${`%${q}%`}
    `;
    return Math.max(1, Math.ceil(Number(count.rows[0]?.count ?? 0) / ITEMS_PER_PAGE));
  } catch (e) {
    console.error("fetchNewsPages error:", e);
    return 1;
  }
}

export async function fetchRelatedNews(currentSlug: string) {
  noStore();
  try {
    const decoded = decodeURIComponent(currentSlug);
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE slug <> ${decoded}
      ORDER BY created_at DESC
      LIMIT 3
    `;
    return rows;
  } catch {
    return [];
  }
}

// Produk
// 1. FETCH SEMUA PRODUK (Untuk Tabel Admin)
export async function fetchAdminProducts() {
  try {
    const { rows } = await sql`
      SELECT id, name, category, images, created_at 
      FROM products 
      ORDER BY created_at DESC
    `;
    
    // Casting ke tipe yang ada di definitions.ts
    return rows as unknown as ProductTableRow[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil data produk.");
  }
}

// 2. FETCH PRODUK BY ID (Untuk Halaman Edit)
export async function fetchProductById(id: string) {
  try {
    const { rows } = await sql`
      SELECT id, name, description, category, images, features, specifications 
      FROM products 
      WHERE id = ${id}
    `;
    
    return rows.length > 0 ? (rows[0] as unknown as Product) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal mengambil detail produk.");
  }
}

// 3. FETCH UNTUK HALAMAN PUBLIK (Contoh penggunaan)
export async function fetchPublicProducts() {
   try {
    const { rows } = await sql`
      SELECT id, name, description, category, images, features, specifications, created_at
      FROM products 
      ORDER BY created_at DESC
    `;
    
    // Helper untuk parse JSON jika driver pg mengembalikan string
    return rows.map((row) => ({
      ...row,
      images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
      specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications) : row.specifications,
    })) as unknown as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    return []; 
  }
}