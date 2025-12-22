"use client";

import { deleteNews } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
// Import komponen modal yang baru dibuat
import ConfirmationModal from "@/components/admin/confirmation-modal";

export default function NewsTable({ news }: { news: any[] }) {
  const router = useRouter();
  
  // State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (news.length === 0) {
    return <div className="p-8 text-center text-gray-500">Belum ada berita.</div>;
  }

  // 1. Fungsi saat tombol tong sampah diklik (Buka Modal)
  const onClickDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // 2. Fungsi saat tombol "Ya, Hapus" di modal diklik (Eksekusi Hapus)
  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setIsDeleting(true); // Aktifkan loading di tombol modal
    const formData = new FormData();
    formData.append("id", selectedId);

    try {
      const result = await deleteNews(formData);
      
      if (result?.success) {
        router.refresh();
        setIsModalOpen(false); // Tutup modal jika sukses
        setSelectedId(null);
      } else {
        alert("Gagal menghapus berita.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsDeleting(false); // Matikan loading
    }
  };

  return (
    <>
      {/* Tabel Data */}
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-700">Judul</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {news.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
              <td className="px-6 py-4 text-gray-500">
                {item.created_at 
                  ? new Date(item.created_at).toLocaleDateString("id-ID")
                  : "-"}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/berita/${item.slug}`}
                    target="_blank"
                    className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Lihat di Website"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/berita/edit/${item.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit Berita"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  
                  {/* Tombol Delete memicu onClickDelete */}
                  <button 
                    onClick={() => onClickDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Hapus Berita"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Modal di luar tabel */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Hapus Berita?"
        message="Apakah Anda yakin ingin menghapus berita ini secara permanen? Data yang sudah dihapus tidak dapat dikembalikan."
      />
    </>
  );
}