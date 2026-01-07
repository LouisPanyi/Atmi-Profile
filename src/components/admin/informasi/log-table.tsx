"use client";

import { DownloadLog, LoginLog } from "@/lib/definitions";
import { Download, User, Calendar, Mail } from "lucide-react";

interface LogTableProps {
  type: "download" | "login";
  data: (DownloadLog | LoginLog)[];
}

export default function LogTable({ type, data }: LogTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
        <div className="bg-gray-100 p-3 rounded-full mb-3">
          {type === 'download' ? <Download className="text-gray-400" /> : <User className="text-gray-400" />}
        </div>
        <p className="text-gray-900 font-medium">Belum ada aktivitas {type === 'download' ? 'unduhan' : 'login'}.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-xs">Waktu</th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-xs">
                {type === 'download' ? 'Email Pengunjung' : 'User Info'}
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 uppercase text-xs">
                {type === 'download' ? 'File yang Diunduh' : 'Role'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item: any) => (
              <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(type === 'download' ? item.downloaded_at : item.login_at).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  {type === 'download' ? (
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      <Mail size={14} className="text-gray-400" />
                      {item.email}
                    </div>
                  ) : (
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  {type === 'download' ? (
                    <div>
                      <div className="font-medium text-blue-700 mb-0.5">{item.file_title}</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wide border border-gray-200">
                        {item.category}
                      </span>
                    </div>
                  ) : (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.role}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}