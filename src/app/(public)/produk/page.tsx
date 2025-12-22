import { sql } from "@vercel/postgres";
import HeroSection from '@/components/produk/section/hero';
import BreadcrumbSection from '@/components/produk/section/breadcrumb';
import ProductListSection from '@/components/produk/section/productlist';
import CTASection from '@/components/produk/section/cta';
import DownloadButton from '@/components/produk/component/download-button';
import { getAllProducts, getAllCategories } from '@/utils/product';

export const dynamic = "force-dynamic";

// Helper untuk parsing JSON dengan aman agar tidak error jika null/invalid
const safeParse = (data: any, fallback: any) => {
  if (!data) return fallback;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return fallback;
    }
  }
  return data; // Jika sudah berupa object/array
};

export default async function ProductsPage() {
  // 1. Ambil data dari database
  let dbProducts: any[] = [];
  try {
    const { rows } = await sql`
      SELECT id, name, description, category, images, features, specifications, created_at
      FROM products 
      ORDER BY created_at DESC
    `;

    dbProducts = rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      category: row.category,
      // Gunakan safeParse agar produk tetap muncul meski gambar/fitur kosong
      images: safeParse(row.images, []),
      features: safeParse(row.features, []),
      specifications: safeParse(row.specifications, {}),
      created_at: row.created_at, // Opsional: simpan timestamp untuk sorting sekunder
    }));
  } catch (error) {
    console.error("Gagal mengambil data database:", error);
    // Lanjut tanpa data DB jika error
  }

  // 2. Ambil data statis
  const staticProducts = getAllProducts();

  // 3. Gabungkan data
  const combinedProducts = [...dbProducts, ...staticProducts];

  // 4. Perbaiki Urutan (Sort) berdasarkan urutan Kategori Standar
  // Ambil daftar urutan kategori resmi dari utils
  const categoryOrder = getAllCategories().map(c => c.category);

  combinedProducts.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);

    // Jika keduanya ada di daftar kategori standar, urutkan berdasarkan index kategori
    if (indexA !== -1 && indexB !== -1) {
      if (indexA !== indexB) return indexA - indexB;
      // Jika kategori sama, produk DB (yang punya created_at) bisa ditaruh di atas statis
      // atau biarkan default. Di sini kita biarkan sesuai urutan gabungan (DB dulu).
      return 0; 
    }

    // Jika salah satu tidak ada di daftar standar (kategori baru dari DB), taruh di paling bawah
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // Jika keduanya kategori baru, urutkan alphabetical
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="bg-white">
      <HeroSection />
      <BreadcrumbSection />
      <ProductListSection initialProducts={combinedProducts} />
      <DownloadButton />
      <CTASection />
    </div>
  );
}