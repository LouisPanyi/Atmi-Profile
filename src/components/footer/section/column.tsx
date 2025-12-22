// src/components/footer/section/columns.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface FooterLink {
  name: string;
  href?: string;
  type?: "download";
  fileName?: string;
  fileType?: string;
  icon?: LucideIcon;
}

interface FooterColumn {
  title: string;
  description: string;
  links: FooterLink[];
}

interface FooterColumnsProps {
  columns: FooterColumn[];
  onDownload?: (fileName: string, fileType: string) => void;
  isDownloading?: boolean;
}

export default function FooterColumns({
  columns,
  onDownload,
  isDownloading = false,
}: FooterColumnsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {columns.map((column, index) => (
        <motion.div
          key={column.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            {column.title}
            <div className="w-8 h-0.5 bg-blue-500 ml-3" />
          </h3>

          <p className="text-gray-400 mb-6">{column.description}</p>

          <ul className="space-y-3">
            {column.links.map((link, linkIndex) => {
              const delay = index * 0.1 + linkIndex * 0.05;

              if (link.type === "download" && onDownload) {
                return (
                  <motion.li
                    key={`${column.title}-${link.name}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay }}
                    viewport={{ once: true }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onDownload(link.fileName ?? "", link.fileType ?? "pdf")
                      }
                      disabled={isDownloading}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group w-full text-left disabled:opacity-50"
                    >
                      {link.icon && <link.icon className="w-4 h-4 mr-2" />}
                      {link.name}
                      <motion.div
                        className="w-0 h-0.5 bg-white ml-2"
                        initial={{ width: 0 }}
                        whileHover={{ width: 20 }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  </motion.li>
                );
              }

              const href = link.href && link.href.trim().length > 0 ? link.href : "#";

              return (
                <motion.li
                  key={`${column.title}-${link.name}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={href}
                    prefetch={false}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group w-full text-left"
                  >
                    {link.name}
                    <motion.div
                      className="w-0 h-0.5 bg-white ml-2"
                      initial={{ width: 0 }}
                      whileHover={{ width: 20 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
