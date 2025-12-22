// src/components/chatbot/ChatButton.tsx
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
        isOpen 
          ? "bg-gray-600 text-white" 
          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Tutup Chat" : "Buka Chat"}
    >
      <MessageSquare size={24} />
    </motion.button>
  );
}