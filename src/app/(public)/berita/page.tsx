import Link from "next/link";
import { sql } from "@vercel/postgres";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

// Tipe data untuk section (hasil parse JSON)
interface Section {
  image: string;
  caption: string;
  description: string;
}

export const dynamic = "force-dynamic"; // Agar data selalu fresh

export default async function NewsListPage() {
  // 1. Ambil data dari database (urutkan dari yang terbaru)
  const { rows: news } = await sql`
    SELECT id, title, slug, sections, created_at 
    FROM news 
    ORDER BY created_at DESC
  `;

  // Helper untuk memformat tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Artikel</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          Informasi terbaru seputar kegiatan, teknologi, dan perkembangan terkini dari perusahaan kami.
        </p>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 -mt-10">
        {news.length === 0 ? (
          // Tampilan jika belum ada berita
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Belum ada berita</h3>
            <p className="text-gray-500">Nantikan update terbaru dari kami segera.</p>
          </div>
        ) : (
          // Grid Berita
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => {
              // Parse JSON sections untuk mengambil gambar & cuplikan teks
              let thumbnail = "/placeholder-news.jpg"; // Default image jika tidak ada
              let excerpt = "Klik untuk membaca selengkapnya...";
              
              try {
                const sections: Section[] = JSON.parse(item.sections);
                // Cari gambar pertama yang ada isinya
                const firstImageSection = sections.find((s) => s.image);
                if (firstImageSection) thumbnail = firstImageSection.image;

                // Ambil paragraf pertama sebagai cuplikan (potong 120 karakter)
                if (sections[0]?.description) {
                    excerpt = sections[0].description.substring(0, 120) + "...";
                }
              } catch (e) {
                console.error("Error parsing sections JSON", e);
              }

              return (
                <Link 
                  href={`/berita/${item.slug}`} 
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                    <img 
                      src={thumbnail} 
                      alt={item.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600 mb-3 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {item.created_at ? formatDate(item.created_at) : "Tanggal tidak tersedia"}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {excerpt}
                    </p>

                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}