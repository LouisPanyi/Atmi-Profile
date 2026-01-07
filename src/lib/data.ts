// src/lib/data.ts
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import type { 
  News, 
  NewsRaw, 
  Product, 
  ProductRaw, 
  ProductTableRow, 
  UserRow, 
  Pagination 
} from "@/lib/definitions";

const ITEMS_PER_PAGE = 6; // Sesuaikan jumlah item per halaman

// ============================================================================
// 1. NEWS (BERITA)
// ============================================================================

export async function fetchFilteredNews(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // ILIKE digunakan untuk pencarian case-insensitive di Postgres
    const { rows } = await sql<NewsRaw>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE title ILIKE ${`%${query}%`} OR sections ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // Mapping dari format database (Raw) ke format Aplikasi (Clean)
    return rows.map((row) => ({
      ...row,
      created_at: new Date(row.created_at).toISOString(),
      sections: typeof row.sections === 'string' ? JSON.parse(row.sections) : row.sections,
    })) as News[];
  } catch (error) {
    console.error("Database Error (fetchFilteredNews):", error);
    throw new Error("Gagal mengambil daftar berita.");
  }
}

export async function fetchNewsPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM news
      WHERE title ILIKE ${`%${query}%`} OR sections ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error (fetchNewsPages):", error);
    throw new Error("Gagal menghitung total halaman berita.");
  }
}

export async function fetchNewsBySlug(slug: string) {
  noStore();
  try {
    const { rows } = await sql<NewsRaw>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      ...row,
      created_at: new Date(row.created_at).toISOString(),
      sections: typeof row.sections === 'string' ? JSON.parse(row.sections) : row.sections,
    } as News;
  } catch (error) {
    console.error("Database Error (fetchNewsBySlug):", error);
    return null; // Return null agar halaman bisa handle 404
  }
}

// Untuk Halaman Admin Edit (Fetch by ID)
export async function fetchNewsById(id: string) {
  noStore();
  try {
    const { rows } = await sql<NewsRaw>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE id = ${id}
    `;

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      ...row,
      created_at: new Date(row.created_at).toISOString(),
      sections: typeof row.sections === 'string' ? JSON.parse(row.sections) : row.sections,
    } as News;
  } catch (error) {
    console.error("Database Error (fetchNewsById):", error);
    throw new Error("Gagal mengambil detail berita.");
  }
}

// ============================================================================
// 2. PRODUCTS (PRODUK)
// ============================================================================

export async function fetchAdminProducts() {
  noStore();
  try {
    const { rows } = await sql<ProductTableRow>`
      SELECT id, name, category, images, created_at
      FROM products
      ORDER BY created_at DESC
    `;
    
    // Pastikan images di-parse jika string
    return rows.map(row => ({
      ...row,
      images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images
    })) as ProductTableRow[];
  } catch (error) {
    console.error("Database Error (fetchAdminProducts):", error);
    throw new Error("Gagal mengambil data produk admin.");
  }
}

export async function fetchProductById(id: string) {
  noStore();
  try {
    const { rows } = await sql<ProductRaw>`
      SELECT id, name, description, category, images, features, specifications, created_at
      FROM products
      WHERE id = ${id}
    `;

    if (rows.length === 0) return null;
    const row = rows[0];

    // Parsing JSON string dari database
    return {
      ...row,
      created_at: new Date(row.created_at),
      images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
      specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications) : row.specifications,
    } as Product;
  } catch (error) {
    console.error("Database Error (fetchProductById):", error);
    throw new Error("Gagal mengambil detail produk.");
  }
}

// ============================================================================
// 3. USERS (PENGGUNA)
// ============================================================================

export async function fetchUsers() {
  noStore();
  try {
    const { rows } = await sql<UserRow>`
      SELECT id, name, email, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error (fetchUsers):", error);
    throw new Error("Gagal mengambil data pengguna.");
  }
}

// ============================================================================
// 4. DASHBOARD (STATISTIK)
// ============================================================================

export async function fetchCardData() {
  noStore();
  try {
    // Jalankan query secara paralel untuk performa lebih baik
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM products`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM users`;
    const newsCountPromise = sql`SELECT COUNT(*) FROM news`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      newsCountPromise,
    ]);

    const numberOfProducts = Number(data[0].rows[0].count ?? "0");
    const numberOfUsers = Number(data[1].rows[0].count ?? "0");
    const numberOfNews = Number(data[2].rows[0].count ?? "0");

    return {
      numberOfProducts,
      numberOfUsers,
      numberOfNews,
    };
  } catch (error) {
    console.error("Database Error (fetchCardData):", error);
    throw new Error("Gagal mengambil data dashboard.");
  }
}

