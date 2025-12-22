import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import ProfileForm from "@/components/admin/profile/profile-form"; // Kita buat di bawah

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  // Ambil data terbaru dari DB (session kadang datanya lama)
  const { rows } = await sql`SELECT name, email FROM users WHERE email = ${session?.user?.email}`;
  const user = rows[0];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Informasi Akun</h2>
            <p className="text-sm text-gray-500">Perbarui nama dan password akun Anda di sini.</p>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  );
}