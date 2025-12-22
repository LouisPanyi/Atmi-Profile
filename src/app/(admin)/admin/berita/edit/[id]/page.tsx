import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/news/create-form";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  // 1. Fetch data berita berdasarkan ID dari URL
  const { rows } = await sql`
    SELECT id, title, sections 
    FROM news 
    WHERE id = ${params.id}
  `;

  // 2. Jika tidak ditemukan, tampilkan 404
  if (rows.length === 0) {
    notFound();
  }

  const newsData = rows[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Berita</h1>
      {/* 3. Lempar data ke Form dengan mode Edit */}
      <NewsForm 
        isEditMode={true} 
        initialData={{
          id: newsData.id,
          title: newsData.title,
          sections: newsData.sections // Masih berupa string JSON dari DB
        }} 
      />
    </div>
  );
}