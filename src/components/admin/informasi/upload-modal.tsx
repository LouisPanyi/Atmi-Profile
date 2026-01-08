"use client";

import { createFooterFile } from "@/lib/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface UploadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory: string;
}

export default function UploadFormModal({ isOpen, onClose, defaultCategory }: UploadFormModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await createFooterFile(formData);
    
    if (res.success) {
      toast.success("Upload berhasil!");
      onClose();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(res.message);
    }
    setIsUploading(false);
  }

  if (!isOpen) return null;

  const categoryTitle = defaultCategory.charAt(0).toUpperCase() + defaultCategory.slice(1);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Upload {categoryTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <input type="hidden" name="category" value={defaultCategory} />
          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Judul Tampilan</label>
            <input 
              name="title" 
              required 
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              placeholder="Contoh: Katalog Produk 2025" 
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-800 mb-2">Pilih File</label>
             <input 
               type="file" 
               name="file" 
               required 
               className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
               accept=".pdf,.pptx,.ppt,.doc,.docx" 
             />
             <p className="text-xs text-gray-500 mt-1">Mendukung format PDF, PPTX, DOCX.</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? "Mengunggah..." : "Simpan File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}