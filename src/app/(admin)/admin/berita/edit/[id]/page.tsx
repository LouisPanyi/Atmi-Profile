// src/app/(admin)/admin/berita/edit/[id]/page.tsx
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/news/create-form";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  const { rows } = await sql`
    SELECT id, title, sections 
    FROM news 
    WHERE id = ${id}
  `;

  if (rows.length === 0) {
    notFound();
  }

  const newsData = rows[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Berita</h1>
      <NewsForm 
        isEditMode={true} 
        initialData={{
          id: newsData.id,
          title: newsData.title,
          sections: newsData.sections
        }} 
      />
    </div>
  );
}