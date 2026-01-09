// src/components/berita/detail/related-news.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NewsRaw, NewsSection } from "@/lib/definitions"; // Import tipe dari definitions

interface RelatedNewsProps {
  items: NewsRaw[]; // Gunakan NewsRaw di sini
}

export default function RelatedNews({ items }: RelatedNewsProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-0 max-w-[900px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Rekomendasi Berita</h3>
          <Link href="/berita" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
            Lihat Semua <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => {
            let itemSections: NewsSection[] = [];
            try {
              itemSections = JSON.parse(item.sections);
            } catch {
              itemSections = [];
            }
            const thumb = itemSections[0]?.image || null;
            
            // Konversi tanggal dengan aman (handle string atau Date object)
            const dateObj = new Date(item.created_at);
            const recDate = isNaN(dateObj.getTime()) 
              ? "-" 
              : dateObj.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

            return (
              <Link href={`/berita/${item.slug}`} key={item.id} className="group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
                  <div className="h-40 bg-gray-200 overflow-hidden relative w-full">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-gray-500 mb-2 block">{recDate}</span>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}