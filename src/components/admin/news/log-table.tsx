"use client";

import { NewsLog } from "@/lib/definitions";
import { Calendar, User, Activity, FileText } from "lucide-react";

export default function NewsLogTable({ logs }: { logs: NewsLog[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200 rounded-lg bg-gray-50">
        <Activity size={32} className="text-gray-400 mb-2" />
        <p className="text-gray-900 font-medium">Belum ada aktivitas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-bold">Waktu</th>
              <th className="px-6 py-4 font-bold">Admin</th>
              <th className="px-6 py-4 font-bold">Aksi</th>
              <th className="px-6 py-4 font-bold">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(log.created_at).toLocaleString("id-ID", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500" />
                    {log.user_name || "Unknown"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      log.action === "CREATE" ? "bg-green-50 text-green-700 border-green-200" :
                      log.action === "UPDATE" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-800 font-medium flex items-center gap-1.5">
                      <FileText size={14} className="text-gray-400" />
                      {log.news_title || <span className="italic text-gray-400">Berita dihapus</span>}
                    </span>
                    <span className="text-xs text-gray-500">{log.details}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}