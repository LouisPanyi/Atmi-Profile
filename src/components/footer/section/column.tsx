"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FooterLink {
  name: string;          
  downloadName?: string;  
  href?: string;
  type?: "download";
  url?: string;
  icon?: React.ElementType;
  disabled?: boolean;
}

interface FooterColumn {
  title: string;
  description: string;
  links: FooterLink[];
}

interface FooterColumnsProps {
  columns: FooterColumn[];
  onDownload: (url: string, fileName: string) => void;
  isDownloading: boolean;
}

export default function FooterColumns({
  columns,
  onDownload,
  isDownloading,
}: FooterColumnsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      {columns.map((col, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            {col.title}
            <div className="w-8 h-1 bg-blue-600 ml-3 rounded-full"></div>
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed text-sm">{col.description}</p>
          <ul className="space-y-3">
            {col.links.map((link, idx) => {
              if (link.type === "download") {
                return (
                  <li key={idx}>
                    <button
                      // LOGIC BARU: Gunakan downloadName jika ada, jika tidak pakai name biasa
                      onClick={() => link.url && onDownload(link.url, link.downloadName || link.name)}
                      disabled={isDownloading || link.disabled}
                      className={`flex items-center text-left transition-colors group ${
                        link.disabled
                          ? "opacity-50 cursor-not-allowed text-gray-500"
                          : "text-gray-300 hover:text-blue-400"
                      }`}
                    >
                      {link.icon && (
                        <link.icon
                          className={`w-4 h-4 mr-2 transition-transform ${
                            !link.disabled && "group-hover:scale-110"
                          }`}
                        />
                      )}
                      {/* TAMPILAN: Selalu gunakan link.name (yang sudah difixed) */}
                      <span className="text-sm font-medium">{link.name}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={idx}>
                  <Link
                    href={link.href || "#"}
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="text-sm font-medium hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}