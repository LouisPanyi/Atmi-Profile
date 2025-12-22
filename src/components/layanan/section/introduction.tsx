// src/components/layanan/section/IntroductionSection.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Factory, Wrench } from "lucide-react";
import { IntroductionSectionProps } from "../types";
import ImageShowcase from "../component/imageshowcase";

const container: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i, ease: "easeOut" },
  }),
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 + i * 0.2, ease: "easeOut" },
  }),
};

export default function IntroductionSection({
  wfSrc = "/images/wf1.jpg",
  mdcSrc = "/images/mdc1.jpg",
  wfAlt = "Work Fabrication - proses fabrikasi presisi",
  mdcAlt = "Machine Development Center - inovasi & perakitan mesin",
}: IntroductionSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.section
      id="keunggulan"
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50"
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      variants={container}
    >
      {/* Background Pattern dan Decorative blobs tetap di sini */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex justify-center mb-8">
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>

        <motion.div
          className="text-center max-w-5xl mx-auto mb-12"
          variants={container}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            custom={0}
            variants={child}
          >
            <span className="block mb-2 text-black">Dua Pilar Utama</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Keunggulan Kami
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-700 text-lg max-w-2xl mx-auto"
            custom={1}
            variants={child}
          >
            PT ATMI SOLO membangun keunggulan melalui dua divisi utama yang saling melengkapi
          </motion.p>
        </motion.div>

        {/* Two Pillars Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={container}
        >
          {/* Pillar 1: Work Fabrication */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
            custom={0}
            variants={pillarVariants}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <h3 className="text-2xl font-bold text-center mb-2">
                Work Fabrication
              </h3>
              <p className="text-blue-100 text-center">
                Pertama dari Dua Pilar Keunggulan
              </p>
            </div>

            <ImageShowcase
              src={wfSrc}
              alt={wfAlt}
              label="Work Fabrication"
              tone="blue"
              icon={<Factory className="w-4 h-4 text-blue-700" />}
            />

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Menangani semua kebutuhan manufaktur komponen dan fabrikasi dengan presisi tinggi
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Menggunakan teknologi terkini dan standar kualitas internasional
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Tim ahli dengan pengalaman lebih dari 20 tahun di bidang fabrikasi
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          </motion.div>

          {/* Pillar 2: Machine Development Center */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100"
            custom={1}
            variants={pillarVariants}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
              <h3 className="text-2xl font-bold text-center mb-2">
                Machine Development Center
              </h3>
              <p className="text-indigo-100 text-center">
                Kedua dari Dua Pilar Keunggulan
              </p>
            </div>

            <ImageShowcase
              src={mdcSrc}
              alt={mdcAlt}
              label="Machine Development Center"
              tone="indigo"
              icon={<Wrench className="w-4 h-4 text-indigo-700" />}
            />

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Berinovasi dalam menciptakan mesin-mesin industri yang efisien dan andal
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Riset dan pengembangan teknologi mesin untuk industri manufaktur
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Solusi mesin custom sesuai kebutuhan spesifik industri Anda
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          </motion.div>
        </motion.div>

        {/* Connector and Summary */}
        <motion.div className="flex justify-center mt-12" variants={child} custom={2}>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-2" />
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto border border-blue-100"
          variants={child}
          custom={3}
        >
          <p className="text-gray-700 text-lg">
            Kedua divisi ini bekerja sama secara sinergis untuk memberikan solusi terintegrasi dari konsep hingga produksi massal
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}