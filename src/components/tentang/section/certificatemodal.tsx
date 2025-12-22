// src/components/tentang/section/CertificateModal.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string; // bisa .pdf atau gambar
  title: string;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.2;

const springTransition: Transition = { type: "spring", stiffness: 260, damping: 22 };
const overlayVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, scale: 0.98, y: 8 },
};

export default function CertificateModal({ isOpen, onClose, fileUrl, title }: CertificateModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const isPdf = /\.pdf(\?.*)?$/i.test(fileUrl);

  // state khusus gambar
  const [zoom, setZoom] = useState<number>(1);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Reset saat buka
  useEffect(() => {
    if (!isOpen) return;
    setZoom(1);
    setPos({ x: 0, y: 0 });
    setDragging(false);
    lastPointRef.current = null;
  }, [isOpen, fileUrl]);

  // ESC + pan dengan arrow (gambar)
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (!isPdf && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && zoom > 1) {
        const d = 20 / zoom;
        setPos((p) => {
          if (e.key === "ArrowUp") return { ...p, y: p.y + d };
          if (e.key === "ArrowDown") return { ...p, y: p.y - d };
          if (e.key === "ArrowLeft") return { ...p, x: p.x + d };
          return { ...p, x: p.x - d };
        });
      }
    },
    [isOpen, onClose, zoom, isPdf]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [isOpen, onKeyDown]);

  // Focus trap sederhana
  useEffect(() => {
    if (!isOpen) return;
    const node = dialogRef.current;
    if (!node) return;
    const focusable = node.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    node.addEventListener("keydown", trap);
    (first ?? node).focus();
    return () => node.removeEventListener("keydown", trap);
  }, [isOpen]);

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  // Zoom dengan wheel (gambar)
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (isPdf || !canvasRef.current) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left - rect.width / 2;
    const cursorY = e.clientY - rect.top - rect.height / 2;

    const direction = e.deltaY > 0 ? -1 : 1;
    const nextZoom = clamp(Number((zoom + direction * ZOOM_STEP).toFixed(3)), ZOOM_MIN, ZOOM_MAX);
    if (nextZoom === zoom) return;

    const scale = nextZoom / zoom;
    setPos((p) => ({
      x: (p.x - cursorX) * scale + cursorX,
      y: (p.y - cursorY) * scale + cursorY,
    }));
    setZoom(nextZoom);
  };

  // Pan (gambar)
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (isPdf || zoom <= 1) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    lastPointRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (isPdf || !dragging || zoom <= 1 || !lastPointRef.current) return;
    const dx = (e.clientX - lastPointRef.current.x) / zoom;
    const dy = (e.clientY - lastPointRef.current.y) / zoom;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (isPdf) return;
    setDragging(false);
    lastPointRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const zoomIn = () => setZoom((z) => clamp(Number((z + 0.5).toFixed(3)), ZOOM_MIN, ZOOM_MAX));
  const zoomOut = () => setZoom((z) => clamp(Number((z - 0.5).toFixed(3)), ZOOM_MIN, ZOOM_MAX));
  const resetView = () => { setZoom(1); setPos({ x: 0, y: 0 }); };
  const onDoubleClick = () => { if (!isPdf) (zoom === 1 ? setZoom(2) : resetView()); };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          aria-hidden
        >
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            className="relative max-w-7xl w-[min(96vw,1280px)] h-[94vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col outline-none"
            variants={dialogVariants}
            onClick={stop}
            ref={dialogRef}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between">
              <h3 id="certificate-modal-title" className="text-base md:text-lg font-semibold line-clamp-1">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                aria-label="Tutup modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Toolbar */}
            <div className="bg-gray-50 border-b px-4 py-2 flex items-center justify-between sticky top-0 z-10">
              {isPdf ? (
                <div className="flex items-center gap-2">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-9 inline-flex items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
                    title="Buka di tab baru"
                  >
                    Buka Tab
                  </a>
                  <a
                    href={fileUrl}
                    download
                    className="px-3 h-9 inline-flex items-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium"
                    title="Unduh PDF"
                  >
                    Unduh
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={zoomOut}
                    disabled={zoom <= ZOOM_MIN}
                    className="h-9 w-9 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Perkecil"
                    title="Perkecil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                    </svg>
                  </button>
                  <span className="px-2 text-sm tabular-nums w-14 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={zoomIn}
                    disabled={zoom >= ZOOM_MAX}
                    className="h-9 w-9 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Perbesar"
                    title="Perbesar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </button>
                  <button
                    onClick={resetView}
                    className="ml-1 h-9 px-3 rounded-lg hover:bg-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Reset tampilan"
                  >
                    Reset
                  </button>
                </div>
              )}
              <div className="text-xs md:text-sm text-gray-600">
                {isPdf ? "Gulir untuk navigasi halaman" : "Drag untuk geser • Scroll untuk zoom • Double-click toggle"}
              </div>
            </div>

            {/* Konten */}
            {isPdf ? (
              <div className="flex-1 bg-gray-100">
                {/* Kenapa iframe: ringan & kompatibel; pdf.js hanya jika butuh kontrol granular */}
                <iframe
                  src={`${fileUrl}#toolbar=0&navpanes=0&statusbar=0&view=FitH`}
                  className="w-full h-full"
                  title={title}
                />
              </div>
            ) : (
              <div
                ref={canvasRef}
                className="flex-1 bg-gray-100 relative overflow-hidden"
                onWheel={handleWheel}
                onDoubleClick={onDoubleClick}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{ cursor: dragging && zoom > 1 ? "grabbing" : "grab" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
                      transformOrigin: "center center",
                      willChange: "transform",
                    }}
                  >
                    <img
                      src={fileUrl}
                      alt={title}
                      draggable={false}
                      className="select-none pointer-events-none max-h-[80vh] md:max-h-[82vh] object-contain"
                      onError={() => console.warn("Gagal memuat media:", fileUrl)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-center">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

