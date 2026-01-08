import Link from "next/link";
import { sql } from "@vercel/postgres";
import { UserPlus } from "lucide-react";
import UsersTable, { TableUser } from "@/components/admin/users/table"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"; // <--- 1. IMPORT INI

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  // LOGIKA KEAMANAN (Defense in Depth)
  // 1. Cek apakah user login?
  if (!session) {
    redirect("/login");
  }

  // 2. Cek apakah role-nya ADMIN? (INI YANG SEBELUMNYA HILANG)
  // Jika news_writer (atau role lain) mencoba masuk, tendang mereka keluar.
  if (session.user.role !== "admin") {
    // Redirect ke halaman dashboard utama mereka atau halaman berita
    redirect("/admin"); 
  }

  // --- Jika lolos pengecekan di atas, baru jalankan query database ---

  const { rows } = await sql<TableUser>`
    SELECT id, name, email, role, created_at 
    FROM users 
    ORDER BY created_at DESC
  `;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <Link
          href="/admin/users/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Tambah User Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <UsersTable users={rows} currentUserId={session?.user?.id || ""} />
      </div>
    </div>
  );
}