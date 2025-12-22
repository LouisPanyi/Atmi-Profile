// src/components/layanan/section/components/Lightbox.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export default function Lightbox({ open, onClose, src, alt }: LightboxProps) {
  // Alasan: aksesibilitas close dengan ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative max-w-6xl w-[92vw] aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 16 } }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain bg-black"
              sizes="100vw"
              priority
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 px-3 py-1.5 text-white text-sm"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}