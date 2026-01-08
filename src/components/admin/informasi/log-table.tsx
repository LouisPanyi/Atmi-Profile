// src/components/admin/informasi/log-table.tsx
import { DownloadLog } from "@/lib/definitions";
import { Download, Calendar, Mail, FileText } from "lucide-react";

export default function LogTable({ logs }: { logs: DownloadLog[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
        <Download size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">Belum ada riwayat download</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold">Waktu Download</th>
              <th className="px-6 py-4 font-semibold">Email Pengguna</th>
              <th className="px-6 py-4 font-semibold">File yang Diunduh</th>
              <th className="px-6 py-4 font-semibold">Kategori</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(log.downloaded_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-blue-500" />
                    {log.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-orange-500" />
                    {log.file_title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      log.category === "katalog"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : log.category === "presentasi"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {log.category.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>Menampilkan {logs.length} riwayat terakhir</span>
      </div>
    </div>
  );
}