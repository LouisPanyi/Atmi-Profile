// src/app/(public)/berita/[slug]/page.tsx

import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/berita/share-buttons";
import { buildPageHref, paginateNewsSections, type Section } from "@/components/berita/pagination";
import { Props, NewsRaw } from "@/lib/definitions"; 
import NewsBreadcrumb from "@/components/berita/breadcrumb";
import NewsHeader from "@/components/berita/header";
import NewsContent from "@/components/berita/content";
import PaginationControls from "@/components/berita/pagination-control";
import RelatedNews from "@/components/berita/related-news";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  
  // 1. Fetch data spesifik untuk SEO (ringan)
  const { rows } = await sql`SELECT title, sections, created_at FROM news WHERE slug = ${decodedSlug}`;
  const news = rows[0];

  if (!news) {
    return {
      title: "Berita Tidak Ditemukan",
    };
  }

  // 2. Ambil Deskripsi dan Gambar dari JSON Sections
  let description = "Berita terkini dari PT ATMI SOLO.";
  let ogImage = "/images/atmi-solo.png"; // Fallback default

  try {
    const sections: Section[] = JSON.parse(news.sections);
    
    // Ambil paragraf pertama sebagai deskripsi SEO (max 160 chars)
    if (sections.length > 0 && sections[0].description) {
      description = sections[0].description.substring(0, 160).replace(/\n/g, " ") + "...";
    }

    // Ambil gambar pertama sebagai OG Image
    if (sections.length > 0 && sections[0].image) {
      ogImage = sections[0].image;
    }
  } catch{
  }

  return {
    title: news.title,
    description: description,
    openGraph: {
      title: news.title,
      description: description,
      images: [{ url: ogImage }],
      type: "article",
      publishedTime: new Date(news.created_at).toISOString(),
      authors: ["Tim Redaksi ATMI"],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: description,
      images: [ogImage],
    },
  };
}

const MAX_CHARS_PER_PAGE = 2600;

export default async function NewsDetailPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);

  // 1. Fetch Data Utama
  const { rows } = await sql`SELECT * FROM news WHERE slug = ${decodedSlug}`;
  const news = rows[0];
  if (!news) notFound();

  // 2. Fetch Berita Terkait
  const relatedRes = await sql`
    SELECT id, title, slug, created_at, sections 
    FROM news 
    WHERE slug != ${decodedSlug} 
    ORDER BY RANDOM() 
    LIMIT 3
  `;
  
  const relatedNews = relatedRes.rows as unknown as NewsRaw[];

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

  // 4. Format Tanggal
  const dateObj = new Date(news.created_at);
  const dateStr = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  // 5. Share URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}${buildPageHref(decodedSlug, page)}`;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="h-24 bg-blue-900"></div>

      <NewsBreadcrumb 
        title={news.title} 
        page={page} 
        totalPages={totalPages} 
      />

      <NewsHeader 
        title={news.title} 
        dateStr={dateStr} 
        timeStr={timeStr} 
      />

      <NewsContent 
        sections={pageSections} 
        isFirstPage={true} 
      />

      <PaginationControls 
        slug={decodedSlug} 
        currentPage={page} 
        totalPages={totalPages} 
      />

      <div className="container mx-auto px-4 md:px-0 max-w-[750px] mb-8">
        <ShareButtons title={news.title} url={shareUrl} />
      </div>

      <RelatedNews items={relatedNews} />
    </div>
  );
}