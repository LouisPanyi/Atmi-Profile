import { sql } from "@vercel/postgres";
import ProductForm from "@/components/admin/products/product-form";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data produk berdasarkan ID
  const { rows } = await sql`
    SELECT id, name, description, category, images, features, specifications 
    FROM products 
    WHERE id = ${id}
  `;

  if (rows.length === 0) {
    notFound();
  }

  const product = rows[0];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Kirim data produk sebagai props 'initialData' ke form.
        Form akan mendeteksi ini sebagai mode Edit.
      */}
      {/* @ts-ignore: Next.js SQL Row type mismatch fix */}
      <ProductForm initialData={product} />
    </div>
  );
}