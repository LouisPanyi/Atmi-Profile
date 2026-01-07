// src/components/footer-wrapper.tsx
import { sql } from "@vercel/postgres";
import Footer from "./footer";
import { FooterFile } from "@/lib/definitions";

export default async function FooterWrapper() {
  // 1. Ambil file yang statusnya AKTIF (is_active = true)
  //    Pastikan table 'footer_files' sudah ada isinya.
  const { rows } = await sql`
    SELECT * FROM footer_files WHERE is_active = true
  `;

  const files = rows as FooterFile[];

  // 2. Petakan data berdasarkan kategori
  const activeFiles = {
    katalog: files.find((f) => f.category === 'katalog'),
    presentasi: files.find((f) => f.category === 'presentasi'),
    profile: files.find((f) => f.category === 'profile'),
  };

  // 3. Kirim data ke komponen Client (Footer UI)
  return <Footer activeFiles={activeFiles} />;
}