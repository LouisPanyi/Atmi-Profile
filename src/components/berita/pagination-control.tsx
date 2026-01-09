import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildPageHref } from "@/components/berita/pagination";

interface PaginationControlsProps {
  slug: string;
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ slug, currentPage, totalPages }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="container mx-auto px-4 md:px-0 max-w-[750px] mt-10 mb-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
      {/* Tombol Sebelumnya */}
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(slug, currentPage - 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-semibold"
        >
          <ArrowLeft size={18} /> Sebelumnya
        </Link>
      ) : (
        /* Spacer kosong agar tombol Lanjut tetap di kanan jika Prev tidak ada */
        <div /> 
      )}

      <span className="text-sm text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </span>

      {/* Tombol Lanjut */}
      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(slug, currentPage + 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold"
        >
          Lanjut <ArrowRight size={18} />
        </Link>
      ) : (
         <span className="text-sm text-gray-400">Selesai</span>
      )}
    </div>
  );
}