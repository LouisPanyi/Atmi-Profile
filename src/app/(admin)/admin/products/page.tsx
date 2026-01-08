import Link from "next/link";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/admin/products/table";
import { fetchAdminProducts } from "@/lib/data";
import { getServerSession } from "next-auth"; // 1. Import Session
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 2. Import Auth Config
import { redirect } from "next/navigation"; // 3. Import Redirect

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // 4. LOGIKA KEAMANAN (Cek Session & Role)
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // KUNCI PINTU: Jika bukan admin, tendang ke dashboard utama
  if (session.user.role !== "admin") {
    redirect("/admin");
  }

  // 5. Jika lolos (Admin), baru ambil data
  const products = await fetchAdminProducts();

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}