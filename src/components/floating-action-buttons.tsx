// src/components/FloatingActionButtons.tsx
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import Chatbot from './chatbot/chatbot';

export default function FloatingActionButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-4 z-50">
      {/* Tombol Chatbot */}
      <Chatbot />
      
      {/* Tombol Back to Top */}
      <motion.a
        href="#"
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Kembali ke Atas"
      >
        <ChevronUp className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}