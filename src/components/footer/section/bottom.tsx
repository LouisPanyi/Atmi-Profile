// src/components/Footer/section/BottomBar.tsx
import Link from 'next/link';

interface BottomBarProps {
  year: number;
}

export default function BottomBar({ year }: BottomBarProps) {
  return (
    <div className="bg-gray-900 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {year} PT ATMI SOLO. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/kebijakan-hukum" className="text-gray-500 hover:text-white text-sm transition-colors">
              Kebijakan Privasi & Syarat
            </Link>
            <Link href="/peta-situs" className="text-gray-500 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}