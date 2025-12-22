// src/components/home/section/AboutSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, ChevronRight } from "lucide-react";

interface AboutSectionProps {
  onAboutClick: () => void;
}

export default function AboutSection({ onAboutClick }: AboutSectionProps) {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Gambar + overlay + badges */}
          <motion.div
            className="relative md:col-span-7 h-[22rem] md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/atmi2.jpg"
              alt="Workshop PT ATMI SOLO"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={85}
              className="object-cover"
              priority
            />
            {/* Kenapa: bantu kontras di sisi kiri/atas agar fokus visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
            {/* Label sudut */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-gray-800 text-sm font-medium shadow">
              Sejak 1968
            </div>
            {/* Badges melayang */}
            <div className="pointer-events-none absolute bottom-4 right-4 flex flex-col gap-3">
              <div className="px-3 py-2 rounded-xl bg-white/90 backdrop-blur text-gray-800 shadow">
                ISO 9001:2015
              </div>
              <div className="px-3 py-2 rounded-xl bg-white/90 backdrop-blur text-gray-800 shadow">
                50+ tahun pengalaman
              </div>
            </div>
          </motion.div>

          {/* Kartu teks overlap */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative bg-white/85 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6 md:p-7 lg:p-8 lg:-ml-16">
              <p className="text-blue-600 font-semibold mb-2">PT ATMI SOLO</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Partner Rekayasa Terpercaya Sejak 1968
              </h2>
              <p className="text-gray-600 mb-6">
                Menggabungkan tradisi keahlian teknik dengan inovasi untuk hasil presisi dan andal.
              </p>

              <div className="space-y-4 mb-7">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Kualitas Terjamin</strong>
                    <p className="text-gray-600 text-sm mt-1">Sertifikasi ISO 9001:2015</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-yellow-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Pengalaman Terbukti</strong>
                    <p className="text-gray-600 text-sm mt-1">50+ tahun di manufaktur</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="text-blue-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-800">Tim Ahli</strong>
                    <p className="text-gray-600 text-sm mt-1">Profesional berdedikasi multi-disiplin</p>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={onAboutClick}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Selengkapnya Tentang Kami <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
