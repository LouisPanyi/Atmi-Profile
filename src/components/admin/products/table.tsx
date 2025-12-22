"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/actions";
import { Trash2, Edit, Package } from "lucide-react";
import ConfirmationModal from "@/components/admin/confirmation-modal"; 
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    category: string;
    images: any; // JSONB
    created_at: string;
}

export default function ProductsTable({ products }: { products: Product[] }) {
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
        } catch (e) {
            alert("Gagal menghapus.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Produk</th>
                            <th className="px-6 py-4 font-semibold">Kategori</th>
                            <th className="px-6 py-4 font-semibold">Tanggal Dibuat</th>
                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                    Belum ada produk. Silakan tambah produk baru.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                // Parsing Images (Handle jika JSONB string atau object)
                                let thumb = null;
                                try {
                                    // Jika database mengembalikan string, parse. Jika object, langsung pakai.
                                    const imgs = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                                    // Ambil gambar yang featured, atau gambar pertama
                                    const featured = Array.isArray(imgs) ? imgs.find((i: any) => i.featured) || imgs[0] : null;
                                    thumb = featured?.url;
                                } catch (e) { }

                                return (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                    {thumb ? (
                                                        <img src={thumb} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="text-gray-300 w-6 h-6" />
                                                    )}
                                                </div>
                                                <span className="font-semibold text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(product.created_at).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "short", year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Produk"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                {/* Tombol Delete */}
                                                <button
                                                    onClick={() => handleDeleteClick(product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus Produk"
                                                >
                                                    <Trash2 size={18} />
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