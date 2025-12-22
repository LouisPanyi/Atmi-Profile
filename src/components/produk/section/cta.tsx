// src/components/produk/section/CTASection.tsx
"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <motion.section
      id="kontak"
      className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Butuh Produk Custom?
        </motion.h2>
        <motion.p
          className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Kami siap membantu Anda mendapatkan produk yang sesuai dengan kebutuhan spesifik perusahaan Anda.
        </motion.p>
        <motion.a
          href="/kontak"
          className="inline-flex items-center bg-white text-blue-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Hubungi Kami
          <ArrowRight size={20} className="ml-2" />
        </motion.a>
      </div>
    </motion.section>
  );
}