import NewsForm from "@/components/admin/news/create-form";

export default function CreateNewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Buat Berita Baru</h1>
      <NewsForm isEditMode={false} />
    </div>
  );
}