// File: src/app/(public)/berita/[slug]/page.tsx
// (Page 1)
// ============================================================================

import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ChevronRight, Home, ArrowRight } from "lucide-react";
import ShareButtons from "@/components/berita/share-buttons";
import {buildPageHref, paginateNewsSections, type Section} from "@/components/berita/pagination";

function TextRenderer({ text, isFirstSection = false }: { text?: string; isFirstSection?: boolean }) {
  if (!text) return null;
  const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
  return (
    <div className="text-gray-900 font-serif text-lg md:text-[1.15rem] leading-relaxed">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="mb-6 text-justify break-words whitespace-pre-wrap">
          {isFirstSection && idx === 0 ? (
            <span>
              <span className="font-bold text-black">Atmi.co.id - </span>
              {paragraph.trim()}
            </span>
          ) : (
            paragraph
          )}
        </p>
      ))}
    </div>
  );
}

type Props = {
  params: { slug: string };
};

const MAX_CHARS_PER_PAGE = 2600;

export default async function NewsDetailPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);

  const { rows } = await sql`SELECT * FROM news WHERE slug = ${decodedSlug}`;
  const news = rows[0];
  if (!news) notFound();

  const relatedRes = await sql`
    SELECT id, title, slug, created_at, sections 
    FROM news 
    WHERE slug != ${decodedSlug} 
    ORDER BY RANDOM() 
    LIMIT 3
  `;
  const relatedNews = relatedRes.rows;

  let sections: Section[] = [];
  try {
    sections = JSON.parse(news.sections);
  } catch {
    sections = [];
  }

  const pages = paginateNewsSections(sections, MAX_CHARS_PER_PAGE);
  const page = 1;
  const totalPages = pages.length;
  const pageSections = pages[0] ?? [];

  const dateObj = new Date(news.created_at);
  const dateStr = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}${buildPageHref(decodedSlug, page)}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="h-24 bg-blue-900"></div>

      <div className="bg-gray-50 border-b border-gray-100 py-3 sticky top-20 z-10 md:static">
        <div className="container mx-auto px-4 md:px-0 max-w-[800px]">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Home size={14} /> <span className="hidden md:inline">Beranda</span>
            </Link>
            <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            <Link href="/berita" className="hover:text-blue-600 transition-colors">
              Berita
            </Link>
            <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate block max-w-[150px] md:max-w-[400px]">
              {news.title}
            </span>
            {totalPages > 1 && (
              <>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                <span className="text-gray-900 font-medium">Hal {page}/{totalPages}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 max-w-[800px] mt-8 mb-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-4 relative">
          <span className="text-green-600 font-bold uppercase tracking-wider text-xs md:text-sm bg-green-50 px-3 py-1 rounded-full">
            Berita Utama
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 capitalize">
          {news.title}
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-gray-500 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={16} />
            </div>
            <span className="font-bold text-gray-700">Tim Redaksi ATMI</span>
          </div>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {dateStr} - {timeStr} WIB
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 max-w-[750px]">
        {pageSections.map((section, index) => (
          <div key={index} className="mb-10 last:mb-0">
            {section.image && (
              <figure className="mb-8 w-full">
                <div className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-100 relative">
                  <Image
                    src={section.image}
                    alt={section.caption || news.title}
                    width={1000}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto object-cover"
                    priority={index === 0}
                  />
                </div>
                {section.caption && (
                  <figcaption className="text-xs text-gray-500 mt-2 text-left italic border-l-2 border-green-500 pl-3">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            )}
            <article>
              <TextRenderer text={section.description} isFirstSection={index === 0} />
            </article>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="mt-10 mb-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
            <span className="text-sm text-gray-500">
              Halaman {page} dari {totalPages}
            </span>
            <Link
              href={buildPageHref(decodedSlug, page + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold"
            >
              Lanjut <ArrowRight size={18} />
            </Link>
          </div>
        )}

        <ShareButtons title={news.title} url={shareUrl} />
      </div>

      {relatedNews.length > 0 && (
        <div className="bg-gray-50 py-16 border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-0 max-w-[900px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Rekomendasi Berita</h3>
              <Link href="/berita" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                Lihat Semua <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => {
                let itemSections: any[] = [];
                try {
                  itemSections = JSON.parse(item.sections);
                } catch {
                  itemSections = [];
                }
                const thumb = itemSections[0]?.image || null;
                const recDate = new Date(item.created_at).toLocaleDateString("id-ID", {
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
      )}
    </div>
  );
}
