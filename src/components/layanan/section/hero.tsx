// src/components/layanan/section/HeroSection.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image (hindari z-index negatif agar tidak hilang) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/robot.jpg"
          alt="Layanan & Solusi PT ATMI SOLO"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay kiri untuk kontras teks */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Konten kiri–tengah */}
      <div className="relative z-20 container mx-auto px-6 h-full flex items-center justify-start max-w-6xl">
        <motion.div
          className="w-full md:w-1/2 lg:w-5/12"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Layanan <span className="text-blue-400">& Solusi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Work Fabrication & Machine Development Center
          </p>
        </motion.div>
      </div>

      {/* Garis dekoratif */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="w-24 h-1 bg-blue-400 rounded-full" />
      </div>
    </motion.section>
  );
}
