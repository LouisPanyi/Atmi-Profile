// src/components/Footer/section/QuickLinksAndIndustries.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface QuickLink {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export interface IndustryLogo {
  name: string;
  src: string;
  /**
   * Pilihan render logo:
   * - "original": warna asli (default)
   * - "mono": grayscale (seragam), tidak mengubah brightness
   * - "inverse": negatif/putih untuk logo gelap (hindari jika ingin warna asli)
   */
  mode?: "original" | "mono" | "inverse";
}

interface QuickLinksAndIndustriesProps {
  quickLinks: QuickLink[];
  industryLogos: IndustryLogo[];
}

/* Why: satukan semua aturan gambar agar konsisten dan mudah diubah per-logo */
function LogoImage({
  src,
  alt,
  mode = "original",
}: {
  src: string;
  alt: string;
  mode?: "original" | "mono" | "inverse";
}) {
  const base =
    "object-contain transition-opacity duration-300 opacity-85 group-hover:opacity-100";
  const byMode =
    mode === "original"
      ? "" // tanpa filter → warna asli
      : mode === "mono"
      ? "grayscale contrast-125" // mono lembut
      : "invert contrast-200"; // inverse/negatif (opsional)

  return (
    <div className="relative w-full h-12">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 25vw" className={`${base} ${byMode}`} />
    </div>
  );
}

export default function QuickLinksAndIndustries({
  quickLinks,
  industryLogos,
}: QuickLinksAndIndustriesProps) {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-gray-800 pt-8">
      {/* LEFT: Quick Links */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center">
          Quick Links
          <div className="w-12 h-0.5 bg-blue-500 ml-3 rounded-full"></div>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={link.href}
                className="group flex items-center px-3 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-lg transition-all duration-300"
              >
                <link.icon className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium">
                  {link.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Industri & Partner */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center">
          Partners
          <div className="w-12 h-0.5 bg-blue-500 ml-3 rounded-full"></div>
        </h3>

        <div className="w-full py-2">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            loop
            speed={1000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            className="industries-swiper w-full"
          >
            {industryLogos.map((logo, index) => (
              <SwiperSlide key={index} className="flex h-20 items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 group hover:bg-gray-800/60 transition-all duration-300">
                  <LogoImage src={logo.src} alt={logo.name} mode={logo.mode ?? "original"} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
