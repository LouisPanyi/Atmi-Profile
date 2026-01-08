"use client";

import { deleteUser } from "@/lib/actions";
import { Trash2, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "@/components/admin/confirmation-modal";

// 1. Definisikan Interface untuk User di Tabel
export interface TableUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersTable({ 
  users, 
  currentUserId 
}: { 
  users: TableUser[], // Gunakan tipe TableUser, bukan any[]
  currentUserId: string 
}) {
  const router = useRouter();
  
  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Buka Modal
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // Konfirmasi Hapus
  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);

    const formData = new FormData();
    formData.append("id", selectedId);

    try {
      const result = await deleteUser(formData);
      if (result?.success) {
        router.refresh();
        setIsModalOpen(false);
      } else {
        alert(result?.message || "Gagal menghapus user.");
      }
    } catch {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-700">Nama</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => {
            const isMe = user.id.toString() === currentUserId;

            return (
              <tr key={user.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                        {user.role === 'admin' ? <Shield size={14}/> : <User size={14}/>}
                    </div>
                    {user.name || "Tanpa Nama"}
                    {isMe && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Anda</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : ''}
                    ${user.role === 'news_writer' ? 'bg-blue-100 text-blue-700' : ''}
                    ${user.role === 'user' ? 'bg-gray-100 text-gray-700' : ''}
                  `}>
                    {user.role === 'admin' ? 'Administrator' : user.role === 'news_writer' ? 'Penulis Berita' : 'User Biasa'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {!isMe && (
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Hapus User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Konfirmasi */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Hapus Pengguna?"
        message="Apakah Anda yakin ingin menghapus pengguna ini? Akses mereka akan dicabut permanen."
      />
    </>
  );
}