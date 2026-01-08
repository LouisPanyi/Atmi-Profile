import { Metadata } from "next";
import { fetchFilteredNews, fetchNewsLogs } from "@/lib/data";
import NewsClientPage from "@/components/admin/news/client-page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NewsListItem, NewsLog } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Manajemen Berita | Admin Panel",
};

export const dynamic = "force-dynamic";

// Perhatikan perubahan tipe Props di sini
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>; // Ubah jadi Promise
}) {
  // 1. AWAIT searchParams TERLEBIH DAHULU
  const params = await searchParams;
  
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;

  // 2. Fetch Session User
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  // 3. Define Variables
  let news: NewsListItem[] = [];
  let logs: NewsLog[] = [];

  // 4. Fetch Data Awal
  const allNews = await fetchFilteredNews(query, currentPage);

  // 5. Logika Filtering Data Berdasarkan Role
  if (currentUser?.role === "admin") {
    // Admin: Melihat semua berita & Log aktivitas
    news = allNews;
    logs = await fetchNewsLogs();
  } else {
    // Penulis/User: Hanya melihat berita miliknya sendiri & Log Kosong
    const currentUserId = Number(currentUser?.id);
    news = allNews.filter((item) => Number(item.author_id) === currentUserId);
    logs = []; 
  }

  return (
    <div className="p-8">
      <NewsClientPage 
        news={news} 
        logs={logs} 
        currentUser={currentUser} 
      />
    </div>
  );
}