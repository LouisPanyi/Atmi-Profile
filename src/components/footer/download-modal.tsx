"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  FileText, 
  FileSpreadsheet, 
  File, 
  ShieldCheck, 
  Loader2 
} from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  fileName: string;
  isLoading: boolean;
}

export default function DownloadModal({
  isOpen,
  onClose,
  onConfirm,
  fileName,
  isLoading,
}: DownloadModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Reset form setiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
    }
  }, [isOpen]);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Regex Email Strict
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email wajib diisi untuk melanjutkan.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Mohon masukkan format email yang valid.");
      return;
    }

    setError("");
    onConfirm(email);
  };

  // Helper untuk menentukan warna & ikon berdasarkan tipe file
  const getFileVisuals = () => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith(".pdf")) {
      return { 
        icon: <FileText size={28} className="text-red-500" />, 
        bg: "bg-red-50 border-red-100" 
      };
    }
    if (lowerName.endsWith(".pptx") || lowerName.endsWith(".ppt")) {
      return { 
        icon: <FileSpreadsheet size={28} className="text-orange-600" />, 
        bg: "bg-orange-50 border-orange-100" 
      };
    }
    return { 
      icon: <File size={28} className="text-blue-500" />, 
      bg: "bg-blue-50 border-blue-100" 
    };
  };

  const fileVisual = getFileVisuals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop Gelap dengan Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm transition-all"
          />

          {/* 2. Container Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-white/20 flex flex-col"
            >
              
              {/* === HEADER BAGIAN ATAS === */}
              <div className="relative h-32 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex items-center justify-center overflow-hidden">
                {/* Pattern Background Abstrak */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                  </svg>
                </div>

                <div className="relative z-10 text-center mb-4">
                  <div className="mx-auto w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner mb-2 border border-white/30">
                    <Download className="text-white drop-shadow-sm" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide text-shadow-sm">
                    Download File
                  </h3>
                </div>

                {/* Tombol Close Pojok Kanan */}
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* === BODY CONTENT === */}
              <div className="px-6 pb-6 pt-10 relative flex-grow bg-white">
                
                {/* Floating Card: Info File (Overlap Header & Body) */}
                <div className="absolute -top-8 left-6 right-6">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-4"
                  >
                    <div className={`p-3 rounded-lg border ${fileVisual.bg} shrink-0`}>
                      {fileVisual.icon}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Dokumen Terpilih
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate" title={fileName}>
                        {fileName}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Form Input */}
                <div className="mt-4">
                  <p className="text-slate-600 text-sm text-center mb-6 leading-relaxed">
                    Silakan verifikasi identitas Anda dengan memasukkan alamat email untuk mengunduh dokumen ini.
                  </p>

                  <form onSubmit={validateAndSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-semibold text-slate-700 ml-1"
                      >
                        Alamat Email
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          disabled={isLoading}
                          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all duration-200 
                            ${error 
                              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-red-900 placeholder:text-red-300" 
                              : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-800 hover:border-blue-300"
                            } disabled:bg-slate-100 disabled:text-slate-400`}
                          placeholder="nama@domain.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                          autoFocus
                        />
                      </div>
                      
                      {/* Pesan Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-xs font-medium ml-1 mt-1"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Badge Privasi */}
                    <div className="flex items-start gap-2.5 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/50">
                      <ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Kami menghargai privasi Anda. Email hanya digunakan untuk keperluan pendataan internal perusahaan.
                      </p>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2.5 text-slate-600 font-semibold bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="relative px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed overflow-hidden group"
                      >
                        <span className={`flex items-center justify-center gap-2 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                          Download
                        </span>
                        
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-600">
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                            <span className="ml-2 text-sm">Memproses...</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}