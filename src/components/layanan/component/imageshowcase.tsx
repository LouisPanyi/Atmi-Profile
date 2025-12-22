// src/components/layanan/section/components/ImageShowcase.tsx
"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Lightbox from "./lightbox";

type ImageShowcaseProps = {
  src: string;
  alt: string;
  label: string;
  tone: "blue" | "indigo";
  icon: React.ReactNode;
};

export default function ImageShowcase({
  src,
  alt,
  label,
  tone,
  icon,
}: ImageShowcaseProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  // Alasan: parallax yang halus dan tidak mengganggu.
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  
  const ringFrom = tone === "blue" ? "from-blue-400" : "from-indigo-400";
  const ringTo = tone === "blue" ? "to-cyan-300" : "to-violet-300";
  const borderTone = tone === "blue" ? "border-blue-100" : "border-indigo-100";
  const chipTone = tone === "blue" ? "bg-blue-600" : "bg-indigo-600";

  const [open, setOpen] = useState(false);
  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  const sizes = useMemo(
    () => "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 92vw",
    []
  );

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{ y }}
        className={`relative mx-6 mt-6 group cursor-pointer`}
        whileHover={{ scale: 1.01, rotate: 0.15 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
          mass: 0.4,
        }}
        onClick={openLightbox} // Tambahkan trigger lightbox
      >
        {/* Gradient Ring */}
        <div
          className={`pointer-events-none absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r ${ringFrom} ${ringTo} opacity-60 blur-[2px]`}
          aria-hidden
        />
        {/* Frame */}
        <div
          className={`relative rounded-2xl overflow-hidden border ${borderTone} bg-white/60 backdrop-blur-sm shadow-xl`}
        >
          {/* Masked grid texture */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              maskImage:
                "radial-gradient(120% 120% at 50% 10%, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(120% 120% at 50% 10%, black 40%, transparent 75%)",
              backgroundImage:
                "linear-gradient(0deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
            aria-hidden
          />
          {/* Image */}
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.025]"
              sizes={sizes}
              priority={false}
            />
            {/* Gradient overlay bottom for caption readability */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          {/* Top label + icon chip */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full ${chipTone} text-white/95 text-xs font-medium px-3 py-1 shadow-lg shadow-black/10`}
            >
              {label}
            </span>
            <div className="grid place-items-center w-8 h-8 rounded-full bg-white/80 backdrop-blur border border-white/60 shadow">
              {icon}
            </div>
          </div>

          {/* Caption + actions */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
            <p className="text-white/95 text-sm md:text-[0.95rem] font-medium drop-shadow">
              {alt}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox open={open} onClose={closeLightbox} src={src} alt={alt} />
    </>
  );
}