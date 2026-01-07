"use client";

import { FooterFile } from "@/lib/definitions";
import { activateFooterFile, deleteFooterFile } from "@/lib/actions";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "@/components/admin/confirmation-modal";
import toast from "react-hot-toast";

export default function InformationTable({ 
  files, 
  category 
}: { 
  files: FooterFile[], 
  category: string 
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // State Delete Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);

  const handleActivate = async (id: string) => {
    setLoadingId(id);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("category", category);

    const res = await activateFooterFile(formData);
    if (res.success) toast.success("File berhasil diaktifkan!");
    else toast.error(res.message);
    setLoadingId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    
    const formData = new FormData();
    formData.append("id", deleteId);
    if (deleteUrl) formData.append("fileUrl", deleteUrl);

    const res = await deleteFooterFile(formData);
    if (res.success) toast.success("File dihapus.");
    else toast.error(res.message);
    
    setDeleteId(null);
    setDeleteUrl(null);
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
        <p className="text-gray-900 font-semibold text-lg">Belum ada file.</p>
        <p className="text-gray-600 text-sm mt-1">Silakan upload file baru untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <>
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wider">Judul File</th>
            <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wider">Tipe</th>
            <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wider">Status</th>
            <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {files.map((file) => (
            <tr key={file.id} className={`transition-colors ${file.is_active ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
              <td className="px-6 py-4">
                {/* TEXT-GRAY-900 AGAR JELAS */}
                <div className="font-bold text-gray-900 text-base mb-1">{file.title}</div>
                <div className="text-xs text-gray-600 font-medium">
                  Diunggah: {new Date(file.created_at).toLocaleDateString("id-ID", {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-block px-2 py-1 rounded border border-gray-300 bg-gray-100 text-xs font-bold text-gray-700 uppercase">
                  {file.file_type}
                </span>
              </td>
              <td className="px-6 py-4">
                {file.is_active ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle size={14} className="mr-1.5" />
                    Sedang Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    <XCircle size={14} className="mr-1.5" />
                    Tidak Aktif
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <a 
                    href={file.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 rounded-lg transition-colors border border-blue-200"
                    title="Lihat / Preview File"
                  >
                    <Eye size={18} />
                  </a>

                  {!file.is_active && (
                     <button
                       onClick={() => handleActivate(file.id)}
                       disabled={loadingId === file.id}
                       className="flex items-center justify-center w-10 h-10 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-800 rounded-lg transition-colors border border-green-200 disabled:opacity-50"
                       title="Aktifkan (Tampilkan di Website)"
                     >
                       <CheckCircle size={18} />
                     </button>
                  )}

                  <button
                    onClick={() => { setDeleteId(file.id); setDeleteUrl(file.file_url); }}
                    className="flex items-center justify-center w-10 h-10 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-800 rounded-lg transition-colors border border-red-200"
                    title="Hapus Permanen"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ConfirmationModal
      isOpen={!!deleteId}
      onClose={() => setDeleteId(null)}
      onConfirm={handleConfirmDelete}
      title="Hapus File?"
      message="Apakah Anda yakin ingin menghapus file ini? Tindakan ini tidak dapat dibatalkan."
    />
    </>
  );
}