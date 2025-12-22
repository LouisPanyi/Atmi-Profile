import Link from "next/link";
import { sql } from "@vercel/postgres";
import { UserPlus } from "lucide-react";
import UsersTable from "@/components/admin/users/table"; // Kita buat file ini di bawah
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  // Ambil semua user kecuali password
  const { rows: users } = await sql`
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
        <UsersTable users={users} currentUserId={session?.user?.id || ""} />
      </div>
    </div>
  );
}