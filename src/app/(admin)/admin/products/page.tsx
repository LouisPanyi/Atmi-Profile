import Link from "next/link";
import { sql } from "@vercel/postgres";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/admin/products/table";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Ambil data produk terbaru
  const { rows: products } = await sql`
    SELECT id, name, category, images, created_at 
    FROM products 
    ORDER BY created_at DESC
  `;

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola katalog produk perusahaan.</p>
        </div>
        
        <Link
          href="/admin/products/create"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-medium"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* @ts-ignore: Next.js SQL Row type mismatch fix */}
        <ProductsTable products={products} />
      </div>
    </div>
  );
}