// src/components/footer/section/column.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType } from "react";

interface FooterLink {
  name: string; // label UI (harus stabil)
  downloadName?: string; // filename untuk download attribute
  href?: string;
  type?: "download";
  url?: string;
  icon?: ElementType;
  disabled?: boolean;
}

interface FooterColumn {
  title: string;
  description: string;
  links: FooterLink[];
}

interface FooterColumnsProps {
  columns: FooterColumn[];
  onDownload: (url: string, displayName: string, downloadName?: string) => void;
  isDownloading: boolean;
}

export default function FooterColumns({ columns, onDownload, isDownloading }: FooterColumnsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      {columns.map((col) => (
        <motion.div
          key={col.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-6 flex items-center">
            {col.title}
            <div className="w-8 h-1 bg-blue-600 ml-3 rounded-full"></div>
          </h3>

          <p className="text-gray-400 mb-6 leading-relaxed text-sm">{col.description}</p>

          <ul className="space-y-3">
            {col.links.map((link) => {
              const key = link.type === "download" ? `dl:${link.name}` : `ln:${link.href ?? link.name}`;

              if (link.type === "download") {
                return (
                  <li key={key}>
                    <button
                      onClick={() => link.url && onDownload(link.url, link.name, link.downloadName)}
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
                      <span className="text-sm font-medium">{link.name}</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={key}>
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
