import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ChevronRight, Home, ArrowLeft, ArrowRight } from "lucide-react";
import ShareButtons from "@/components/berita/share-buttons";
import {buildPageHref, paginateNewsSections, type Section} from "@/components/berita/pagination";

function TextRenderer({ text }: { text?: string }) {
  if (!text) return null;
  const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
  return (
    <div className="text-gray-900 font-serif text-lg md:text-[1.15rem] leading-relaxed">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="mb-6 text-justify break-words whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

type Props = {
  params: { slug: string; page: string };
};

const MAX_CHARS_PER_PAGE = 2600;

export default async function NewsDetailPaged({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  const pageNum = Number(params.page);

  if (!Number.isFinite(pageNum) || pageNum < 2) notFound();

  const { rows } = await sql`SELECT * FROM news WHERE slug = ${decodedSlug}`;
  const news = rows[0];
  if (!news) notFound();

  let sections: Section[] = [];
  try {
    sections = JSON.parse(news.sections);
  } catch {
    sections = [];
  }

  const pages = paginateNewsSections(sections, MAX_CHARS_PER_PAGE);
  const totalPages = pages.length;

  if (pageNum > totalPages) notFound();

  const pageSections = pages[pageNum - 1] ?? [];

  const dateObj = new Date(news.created_at);
  const dateStr = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}${buildPageHref(decodedSlug, pageNum)}`;

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
            <Link href={`/berita/${decodedSlug}`} className="hover:text-blue-600 transition-colors truncate max-w-[220px] md:max-w-[420px]">
              {news.title}
            </Link>
            <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            <span className="text-gray-900 font-medium">Hal {pageNum}/{totalPages}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 max-w-[800px] mt-8 mb-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 capitalize">
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
              <TextRenderer text={section.description} />
            </article>
          </div>
        ))}

        <div className="mt-10 mb-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
          <Link
            href={buildPageHref(decodedSlug, pageNum - 1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-semibold"
          >
            <ArrowLeft size={18} /> Sebelumnya
          </Link>

          <span className="text-sm text-gray-500">
            Halaman {pageNum} dari {totalPages}
          </span>

          {pageNum < totalPages ? (
            <Link
              href={buildPageHref(decodedSlug, pageNum + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold"
            >
              Lanjut <ArrowRight size={18} />
            </Link>
          ) : (
            <span className="text-sm text-gray-400">Selesai</span>
          )}
        </div>

        <ShareButtons title={news.title} url={shareUrl} />
      </div>
    </div>
  );
}