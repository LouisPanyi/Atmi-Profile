"use client";

import { useState } from 'react';
import { toast } from "react-hot-toast";
import { Download, FileText } from 'lucide-react';
import DownloadModal from '@/components/footer/download-modal'; // Menggunakan komponen modal yang sama dengan footer

export default function DownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Konfigurasi File Katalog (Sesuaikan URL jika berubah)
  const catalogFile = {
    displayName: "Katalog Produk 2024",
    downloadName: "katalog-produk-atmi.pdf",
    url: "/downloads/katalog2024.pdf",
    category: "katalog" as const,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDownload = async (email: string) => {
    setIsDownloading(true);

    try {
      // 1. Catat log download ke database (API yang sama dengan Footer)
      const response = await fetch("/api/downloads/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fileName: catalogFile.displayName,
          category: catalogFile.category,
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan log");

      // 2. Proses Download File
      const link = document.createElement("a");
      link.href = catalogFile.url;
      link.download = catalogFile.downloadName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download dimulai! Terima kasih.");
      setIsModalOpen(false);

    } catch (err) {
      console.error("Download error:", err);
      toast.error("Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white border-y border-blue-100/50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
            <FileText size={32} />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Download Katalog Lengkap
          </h2>
          
          <p className="mb-8 text-gray-600 leading-relaxed text-lg">
            Dapatkan informasi detail mengenai spesifikasi teknis, varian, dan fitur unggulan seluruh produk kami dalam satu dokumen PDF yang praktis.
          </p>
          
          <button
            onClick={handleOpenModal}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <Download className="w-5 h-5 mr-3 transition-transform group-hover:animate-bounce" />
            <span>Unduh Katalog PDF</span>
          </button>
          
          <p className="mt-4 text-sm text-gray-400">
            Format: PDF • Ukuran: ~5 MB
          </p>
        </div>

        {/* Integrasi Modal yang sama dengan Footer */}
        <DownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDownload}
          fileName={catalogFile.displayName}
          isLoading={isDownloading}
        />
      </div>
    </section>
  );
}