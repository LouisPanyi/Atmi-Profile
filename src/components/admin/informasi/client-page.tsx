"use client";

import { useState } from "react";
import { FooterFile, DownloadLog } from "@/lib/definitions";
import { 
  Folder, 
  Presentation, 
  FileText, 
  History, 
  Upload, 
  FileCog,
  LucideIcon 
} from "lucide-react";
import InformationTable from "./table";
import LogTable from "./log-table";
import UploadFormModal from "./upload-modal";

// Definisikan tipe kategori secara manual jika belum ada di definitions
type FooterFileCategory = "katalog" | "presentasi" | "profile";

interface InformasiClientPageProps {
  files: FooterFile[];
  logs: DownloadLog[];
}

interface SubTabItem {
  id: FooterFileCategory;
  label: string;
  icon: LucideIcon;
}

export default function InformasiClientPage({ files, logs }: InformasiClientPageProps) {
  // 1. State Tab Utama (Pindah antara tabel file dan log)
  const [activeMainTab, setActiveMainTab] = useState<"files" | "logs">("files");

  // 2. State Sub-Tab (Pindah kategori file: Katalog/Presentasi/Profile)
  const [activeCategory, setActiveCategory] = useState<FooterFileCategory>("katalog");
  
  // 3. State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter file berdasarkan kategori yang sedang aktif
  const filteredFiles = files.filter((f) => f.category === activeCategory);

  const categoryTabs: SubTabItem[] = [
    { id: "katalog", label: "Katalog", icon: Folder },
    { id: "presentasi", label: "Presentasi", icon: Presentation },
    { id: "profile", label: "Company Profile", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* === HEADER SECTION === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pusat Informasi</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeMainTab === "files" 
              ? "Kelola dokumen publik yang ditampilkan di footer website." 
              : "Pantau aktivitas pengunjung yang mengunduh dokumen."}
          </p>
        </div>

        {/* Tombol Upload (Hanya muncul saat di tab Files) */}
        {activeMainTab === "files" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Upload size={18} />
            {/* Label tombol dinamis sesuai kategori aktif */}
            <span>Upload {activeCategory === 'profile' ? 'Profile' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
          </button>
        )}
      </div>

      {/* === MAIN TAB NAVIGATION (Files vs Logs) === */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveMainTab("files")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeMainTab === "files"
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
          }`}
        >
          <FileCog size={16} />
          Kelola File
        </button>
        <button
          onClick={() => setActiveMainTab("logs")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeMainTab === "logs"
              ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
          }`}
        >
          <History size={16} />
          Riwayat Download
        </button>
      </div>

      {/* === CONTENT AREA === */}
      <div className="min-h-[400px]">
        
        {/* VIEW 1: MANAJEMEN FILE */}
        {activeMainTab === "files" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Sub-Tabs Kategori (Katalog | Presentasi | Profile) */}
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                    activeCategory === tab.id
                      ? "bg-blue-50 text-blue-700 border-blue-200 ring-2 ring-blue-500/20"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tabel File (Menerima filteredFiles & activeCategory) */}
            <InformationTable 
              files={filteredFiles} 
              category={activeCategory} // ERROR SEBELUMNYA HILANG KARENA INI DI-PASS
            />
          </div>
        ) : (
          
        /* VIEW 2: RIWAYAT DOWNLOAD */
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <LogTable logs={logs} />
          </div>
        )}
      </div>

      {/* === UPLOAD MODAL === */}
      <UploadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultCategory={activeCategory} // ERROR SEBELUMNYA HILANG KARENA INI DI-PASS
      />
    </div>
  );
}