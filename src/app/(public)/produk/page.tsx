import { sql } from "@vercel/postgres";
import HeroSection from '@/components/produk/section/hero';
import BreadcrumbSection from '@/components/produk/section/breadcrumb';
import ProductListSection from '@/components/produk/section/productlist';
import CTASection from '@/components/produk/section/cta';
import DownloadButton from '@/components/produk/component/download-button';
import { getAllProducts, getAllCategories } from '@/utils/product';
import type { Product } from '@/lib/definitions'; // Pastikan import Product

export const dynamic = "force-dynamic";

// Helper Generic untuk safeParse
const safeParse = <T,>(data: string | object | null | undefined, fallback: T): T => {
  if (!data) return fallback;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }
  return data as T;
};

export default async function ProductsPage() {
  // 1. Ambil data dari database
  let dbProducts: Product[] = [];
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
      images: safeParse(row.images, []),
      features: safeParse(row.features, []),
      specifications: safeParse(row.specifications, {}),
      created_at: new Date(row.created_at), 
    })) as Product[];
  } catch (error) {
    console.error("Gagal mengambil data database:", error);
  }

  // 2. Ambil data statis (pastikan tipe data statis kompatibel atau gunakan union type jika perlu)
  const staticProducts = getAllProducts();

  // 3. Gabungkan data
  // Kita asumsikan getAllProducts mengembalikan array yang kompatibel dengan Product
  const combinedProducts: Product[] = [...dbProducts, ...staticProducts as unknown as Product[]];

  // 4. Perbaiki Urutan (Sort)
  const categoryOrder = getAllCategories().map(c => c.category);

  combinedProducts.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);

    if (indexA !== -1 && indexB !== -1) {
      if (indexA !== indexB) return indexA - indexB;
      return 0; 
    }

    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

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