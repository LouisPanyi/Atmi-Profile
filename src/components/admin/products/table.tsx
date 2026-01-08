// src/components/admin/products/table.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Edit, Package } from "lucide-react";
import { deleteProduct } from "@/lib/actions";
import ConfirmationModal from "@/components/admin/confirmation-modal";
import type { ProductTableRow } from "@/lib/definitions";
import type { ProductImage } from "@/data/product/product-types";

export default function ProductsTable({ products }: { products: ProductTableRow[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);

    const formData = new FormData();
    formData.append("id", selectedId);

    try {
      const res = await deleteProduct(formData);
      if (res.success) {
        setIsModalOpen(false);
        router.refresh(); 
      } else {
        alert(res.message);
      }
    } catch {
      alert("Gagal menghapus produk.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper untuk mendapatkan thumbnail
  const getThumbnail = (imagesRaw: ProductImage[] | unknown) => {
    try {
      const imgs = Array.isArray(imagesRaw) ? (imagesRaw as ProductImage[]) : [];
      if (imgs.length === 0) return null;
      
      const featured = imgs.find((i) => i.featured) || imgs[0];
      return featured?.url || null;
    } catch {
      return null;
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Produk</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Belum ada produk.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const thumb = getThumbnail(product.images);

                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <Package className="text-gray-300 w-6 h-6" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(product.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Hapus Produk?"
        message="Produk yang dihapus tidak dapat dikembalikan lagi."
      />
    </>
  );
}