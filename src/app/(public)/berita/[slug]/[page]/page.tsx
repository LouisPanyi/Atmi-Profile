import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/berita/share-buttons";
import { buildPageHref, paginateNewsSections, type Section } from "@/components/berita/pagination";
import NewsBreadcrumb from "@/components/berita/breadcrumb";
import NewsHeader from "@/components/berita/header";
import NewsContent from "@/components/berita/content";
import PaginationControls from "@/components/berita/pagination-control";

type Props = {
  params: Promise<{ slug: string; page: string }>; // Ubah jadi Promise
};

const MAX_CHARS_PER_PAGE = 2600;

export default async function NewsDetailPaged({ params }: Props) {
  const { slug, page } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const pageNum = Number(page);

  // Validasi Halaman (Harus angka dan >= 2)
  if (!Number.isFinite(pageNum) || pageNum < 2) notFound();

  // 1. Fetch Data
  const { rows } = await sql`SELECT * FROM news WHERE slug = ${decodedSlug}`;
  const news = rows[0];
  if (!news) notFound();

  // 2. Parsing Section & Pagination
  let sections: Section[] = [];
  try {
    sections = JSON.parse(news.sections);
  } catch {
    sections = [];
  }

  const pages = paginateNewsSections(sections, MAX_CHARS_PER_PAGE);
  const totalPages = pages.length;

  // Jika user akses halaman yang melebihi total halaman -> 404
  if (pageNum > totalPages) notFound();

  const pageSections = pages[pageNum - 1] ?? [];

  // 3. Format Tanggal
  const dateObj = new Date(news.created_at);
  const dateStr = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  // 4. Share URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}${buildPageHref(decodedSlug, pageNum)}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="h-24 bg-blue-900"></div>

      <NewsBreadcrumb
        title={news.title}
        page={pageNum}
        totalPages={totalPages}
      />

      <NewsHeader
        title={news.title}
        dateStr={dateStr}
        timeStr={timeStr}
      />

      <NewsContent
        sections={pageSections}
        isFirstPage={false}
      />

      <PaginationControls
        slug={decodedSlug}
        currentPage={pageNum}
        totalPages={totalPages}
      />

      <div className="container mx-auto px-4 md:px-0 max-w-[750px] mb-8">
        <ShareButtons title={news.title} url={shareUrl} />
      </div>

    </div>
  );
}