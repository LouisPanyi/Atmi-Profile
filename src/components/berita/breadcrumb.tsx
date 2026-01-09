import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface NewsBreadcrumbProps {
  title: string;
  page?: number;
  totalPages?: number;
}

export default function NewsBreadcrumb({ title, page = 1, totalPages = 1 }: NewsBreadcrumbProps) {
  return (
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
            {title}
          </span>
          {totalPages > 1 && (
            <>
              <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              <span className="text-gray-900 font-medium">
                Hal {page}/{totalPages}
              </span>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}