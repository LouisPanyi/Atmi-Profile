// src/components/admin/news/table.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Lock } from "lucide-react";
import { deleteNews } from "@/lib/actions";
import type { NewsListItem } from "@/lib/definitions";
import ConfirmationModal from "@/components/admin/confirmation-modal";
import { User } from "next-auth"; // Import tipe User dari next-auth

// Tambahkan prop currentUser
interface NewsTableProps {
  news: NewsListItem[];
  currentUser: User | null | undefined;
}

export default function NewsTable({ news, currentUser }: NewsTableProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper untuk cek izin akses
  const canEditOrDelete = (newsItem: NewsListItem) => {
    if (!currentUser) return false;
    const isAdmin = currentUser.role === "admin";
    const authorId = newsItem.author_id ? Number(newsItem.author_id) : 0;
    const currentUserId = Number(currentUser.id);

    return isAdmin || (authorId === currentUserId);
  };

  if (!news || news.length === 0) {
    return <div className="p-8 text-center text-gray-500">Belum ada berita.</div>;
  }

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", selectedId);

    try {
      const result = await deleteNews(formData);
      if (result?.success) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert(result?.message || "Gagal menghapus berita.");
      }
    } catch {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsDeleting(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Judul</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {news.map((item) => {
              // Cek hak akses per baris
              const hasAccess = canEditOrDelete(item);

              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/berita/${item.slug}`}
                        target="_blank"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Lihat Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {hasAccess ? (
                        <>
                          <Link
                            href={`/admin/berita/edit/${item.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit Berita"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Hapus Berita"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        // Indikator Gembok jika tidak punya akses
                        <div className="p-2 text-gray-400 cursor-not-allowed" title="Akses Dibatasi">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Hapus Berita?"
        message="Apakah Anda yakin? Data yang dihapus tidak dapat dikembalikan."
      />
    </>
  );
}