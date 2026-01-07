import { sql } from "@vercel/postgres";
import InformationClient from "@/components/admin/informasi/client-page";

export default async function AdminInformasiPage() {
  // Fetch semua file, urutkan dari yang terbaru
  const { rows } = await sql`
    SELECT * FROM footer_files ORDER BY created_at DESC
  `;

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Manajemen File Informasi (Footer)</h1>
      <p className="text-gray-700 mb-8 max-w-2xl">
        Kelola file yang akan ditampilkan di footer website. Pilih file untuk setiap kategori 
        (Katalog, Presentasi, Profil) dan klik tombol <strong>Checklist</strong> untuk mengaktifkannya agar bisa didownload oleh pengunjung.
      </p>
      
      {/* Kirim data ke Client Component */}
      <InformationClient files={rows as any} />
    </div>
  );
}