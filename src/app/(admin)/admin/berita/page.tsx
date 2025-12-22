import Link from "next/link";
import { sql } from "@vercel/postgres";
import NewsTable from "@/components/admin/news/table";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  // UPDATE: Tambahkan 'slug' di sini
  const { rows: news } = await sql`
    SELECT id, title, slug, created_at 
    FROM news 
    ORDER BY created_at DESC
  `;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Berita</h1>
        <Link
          href="/admin/berita/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Buat Berita Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <NewsTable news={news} />
      </div>
    </div>
  );
}