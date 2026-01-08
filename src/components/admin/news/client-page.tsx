"use client";

import { useState } from "react";
import { NewsListItem, NewsLog } from "@/lib/definitions";
import { Newspaper, History, Plus } from "lucide-react";
import NewsTable from "./table";
import NewsLogTable from "./log-table";
import Link from "next/link";
import { User } from "next-auth";

interface NewsClientPageProps {
  news: NewsListItem[];
  logs: NewsLog[];
  currentUser: User | undefined;
}

export default function NewsClientPage({ news, logs, currentUser }: NewsClientPageProps) {
  const [activeTab, setActiveTab] = useState<"news" | "logs">("news");
  
  // Cek apakah user adalah admin
  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Berita</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === "news" 
              ? "Buat, edit, dan kelola artikel berita perusahaan." 
              : "Pantau riwayat aktivitas perubahan berita."}
          </p>
        </div>

        {/* Tombol Buat Berita Tampil untuk Admin & Penulis */}
        {activeTab === "news" && (
          <Link
            href="/admin/berita/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={18} />
            Buat Berita Baru
          </Link>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("news")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === "news"
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
          }`}
        >
          <Newspaper size={16} />
          Daftar Berita
        </button>

        {/* LOGIC VIEW: Tab Log HANYA muncul jika Admin */}
        {isAdmin && (
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "logs"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            <History size={16} />
            Log Aktivitas
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === "news" ? (
          <NewsTable news={news} currentUser={currentUser} />
        ) : (
          // Proteksi ganda: LogTable hanya dirender jika Admin
          isAdmin ? <NewsLogTable logs={logs} /> : null
        )}
      </div>
    </div>
  );
}