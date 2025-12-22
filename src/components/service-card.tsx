// src/components/service-card.tsx
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  features?: string[];
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  features,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 blur-xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`}></div>

      <motion.div
        className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full"
        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header with gradient */}
        <div className="relative bg-blue-700 p-6 text-white flex flex-col items-center overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-center relative z-10">{title}</h3>
          <p className="text-gray-200 text-center relative z-10">{description}</p>
        </div>

        {/* Content area */}
        <div className="p-6 flex-grow flex flex-col bg-white/80 backdrop-blur-sm">
          <h4 className="font-semibold text-gray-700 mb-4 text-center">Fitur Utama</h4>
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {features?.map((feature, index) => (
              <motion.span
                key={index}
                className="bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href={href}
              aria-label={`Pelajari lebih lanjut tentang ${title}`}
              className="relative w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 overflow-hidden group"
            >
              <span className="relative z-10">Pelajari Lebih Lanjut</span>
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              ></motion.span>
              <motion.span
                className="ml-2 inline-block relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}