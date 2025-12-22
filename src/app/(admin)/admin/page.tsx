import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Newspaper, Users, Clock, History } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role || "user";

  // 1. Ambil Data Statistik
  // Hitung Berita
  const newsCountRes = await sql`SELECT COUNT(*) FROM news`;
  const totalNews = newsCountRes.rows[0].count;

  // Hitung User (Hanya perlu jika admin)
  let totalUsers = 0;
  if (userRole === 'admin') {
    const userCountRes = await sql`SELECT COUNT(*) FROM users`;
    totalUsers = userCountRes.rows[0].count;
  }

  // 2. Ambil Data Change Logs (Limit 10 Terakhir)
  // Kita JOIN dengan table users untuk mengambil nama siapa yang melakukan aksi
  const logsRes = await sql`
    SELECT 
        l.id, 
        l.action, 
        l.details, 
        l.created_at, 
        u.name as actor_name,
        u.email as actor_email
    FROM news_logs l
    LEFT JOIN users u ON l.user_id = u.id
    ORDER BY l.created_at DESC
    LIMIT 10
  `;
  const recentLogs = logsRes.rows;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
            Halo, {session?.user?.name} 👋
        </h1>
        <p className="text-gray-500">Berikut adalah ringkasan aktivitas di website Anda.</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card Berita (Muncul untuk Admin & Writer) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Newspaper size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Berita</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalNews}</h3>
          </div>
        </div>

        {/* Card Users (HANYA MUNCUL JIKA ADMIN) */}
        {userRole === 'admin' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 animate-in fade-in">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">Total Pengguna</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalUsers}</h3>
            </div>
            </div>
        )}

        {/* Card Log Activity (Total aktivitas hari ini - Dummy/Simple Count) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <History size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Aktivitas Tercatat</p>
            <h3 className="text-2xl font-bold text-gray-800">{recentLogs.length}</h3>
          </div>
        </div>
      </div>

      {/* --- TABLE CHANGE LOGS --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            <h3 className="font-bold text-gray-700">Riwayat Perubahan Berita (Change Log)</h3>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-semibold">User (Author)</th>
                        <th className="px-6 py-3 font-semibold">Aksi</th>
                        <th className="px-6 py-3 font-semibold">Judul Berita</th>
                        <th className="px-6 py-3 font-semibold">Waktu</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentLogs.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                Belum ada aktivitas tercatat.
                            </td>
                        </tr>
                    ) : (
                        recentLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {log.actor_name ? log.actor_name.charAt(0) : "?"}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{log.actor_name || "Unknown"}</span>
                                            <span className="text-[10px] text-gray-400">{log.actor_email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                        ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' : ''}
                                        ${log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' : ''}
                                        ${log.action === 'DELETE' ? 'bg-red-100 text-red-700' : ''}
                                    `}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700 truncate max-w-[200px]">
                                    {log.details}
                                </td>
                                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                    {new Date(log.created_at).toLocaleString("id-ID", {
                                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                                    })}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}