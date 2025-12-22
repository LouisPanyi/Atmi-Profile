// src/components/produk/download-button.tsx
"use client";

import { useState } from 'react';

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    
    try {
      const link = document.createElement('a');
      link.href = '/downloads/katalog2024.pdf';
      link.download = 'katalog-produk-atmi.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Setelah download selesai
      setTimeout(() => {
        setDownloadSuccess(true);
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      // Anda bisa menambahkan notifikasi error di sini
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Download Katalog Produk</h2>
      <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
        Dapatkan katalog lengkap produk kami dalam format PDF. Katalog berisi informasi detail tentang semua produk kami termasuk spesifikasi dan harga.
      </p>
      
      <div className="flex flex-col items-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center justify-center font-medium py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
            isDownloading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengunduh...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Katalog
            </>
          )}
        </button>
        
        {downloadSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Katalog berhasil diunduh!
          </div>
        )}
      </div>
    </div>
  );
}