import { Clock, User } from "lucide-react";

interface NewsHeaderProps {
  title: string;
  dateStr: string;
  timeStr: string;
}

export default function NewsHeader({ title, dateStr, timeStr }: NewsHeaderProps) {
  return (
    <div className="container mx-auto px-4 md:px-0 max-w-[800px] mt-8 mb-8 text-center">
      <div className="flex justify-center items-center gap-3 mb-4 relative">
        <span className="text-green-600 font-bold uppercase tracking-wider text-xs md:text-sm bg-green-50 px-3 py-1 rounded-full">
          Berita Utama
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 capitalize">
        {title}
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
  );
}