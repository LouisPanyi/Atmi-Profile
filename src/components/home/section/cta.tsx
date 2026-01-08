// src/components/home/section/CtaSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

interface CtaSectionProps {
  onContactClick: () => void;
}

export default function CtaSection({ onContactClick }: CtaSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memulai Proyek Anda?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Tim ahli kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan manufaktur Anda.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={onContactClick}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} />
              Hubungi Sekarang
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}