// src/app/(admin)/admin/products/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/products/product-form"; //
import { fetchProductById } from "@/lib/data"; //

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = params;

  // 1. Ambil data menggunakan fungsi yang sudah kita buat di data.ts
  // Fungsi ini sudah mengembalikan tipe data 'Product' yang benar (atau null)
  const product = await fetchProductById(id);

  // 2. Validasi jika produk tidak ditemukan
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm initialData={product} />
    </div>
  );
}