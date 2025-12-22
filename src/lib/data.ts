"use server";

import "server-only";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 5;

export async function fetchNewsBySlug(slug: string) {
  noStore();
  try {
    const decoded = decodeURIComponent(slug);
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`SELECT id, title, slug, created_at, sections FROM news WHERE slug = ${decoded} LIMIT 1`;
    return rows[0] ?? null;
  } catch (e) {
    console.error("fetchNewsBySlug error:", e);
    return null;
  }
}

export async function fetchFilteredNews(query: string, currentPage: number) {
  noStore();
  const q = query?.trim() || "";
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE title ILIKE ${`%${q}%`}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
  } catch (e) {
    console.error("fetchFilteredNews error:", e);
    return [];
  }
}

export async function fetchNewsPages(query: string) {
  noStore();
  const q = query?.trim() || "";
  try {
    const count = await sql<{ count: string }>`
      SELECT COUNT(*)::text AS count FROM news WHERE title ILIKE ${`%${q}%`}
    `;
    return Math.max(1, Math.ceil(Number(count.rows[0]?.count ?? 0) / ITEMS_PER_PAGE));
  } catch (e) {
    console.error("fetchNewsPages error:", e);
    return 1;
  }
}

export async function fetchRelatedNews(currentSlug: string) {
  noStore();
  try {
    const decoded = decodeURIComponent(currentSlug);
    const { rows } = await sql<{
      id: string; title: string; slug: string; created_at: string; sections: string;
    }>`
      SELECT id, title, slug, created_at, sections
      FROM news
      WHERE slug <> ${decoded}
      ORDER BY created_at DESC
      LIMIT 3
    `;
    return rows;
  } catch {
    return [];
  }
}
