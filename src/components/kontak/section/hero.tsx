// src/components/kontak/sections/Hero.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <motion.section
      className="relative h-64 md:h-80 bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src="/images/atmi-workshop.jpg"
        alt="Tentang PT ATMI SOLO"
        fill
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70"></div>
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Hubungi Kami
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Kami siap membantu Anda dengan informasi, penawaran, atau dukungan teknis yang Anda butuhkan.
        </motion.p>
      </div>
    </motion.section>
  );
}