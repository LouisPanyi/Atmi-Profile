// src/components/Footer/section/BackToTopButton.tsx
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTopButton() {
  return (
    <motion.a
      href="#"
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronUp className="w-6 h-6" />
    </motion.a>
  );
}