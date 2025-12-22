// src/components/home/section/HeroSection.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone, MapPin, ChevronLeft, ChevronRight, Factory, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  onContactClick: () => void;
}

interface HeroImage {
  id: number;
  src: string;
  alt: string;
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  // Array gambar untuk carousel - semuanya fokus pada Steel Furniture
  const heroImages: HeroImage[] = [
    { id: 1, src: "/images/atmi-workshop.jpg", alt: "Steel Furniture Manufacturing Workshop" },
    { id: 2, src: "/images/homepage/floorplan_workshop.jpg", alt: "Steel Furniture Production Line" },
    { id: 3, src: "/images/homepage/floorplan_warehouse.jpg", alt: "Steel Furniture Warehouse" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('left');
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setDirection('left');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevImage = () => {
    setDirection('right');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-white bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <Image
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content - Didesain untuk menonjolkan Steel Furniture */}
      <motion.div
        className="relative z-20 container mx-auto px-6 text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Focus - Steel Furniture */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
        </motion.div>

        <motion.div
          className="inline-block bg-blue-600/30 border border-gray-500/50 rounded-full py-1.5 px-4 text-sm mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Precision Manufacturing Excellence
        </motion.div>
        {/* Brand */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">PT ATMI SOLO</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        {/* Tagline yang sangat jelas - Warna diubah ke atas */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">STEEL FURNITURE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Precision Manufacturing for Quality Steel Furniture Solutions
          </p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">ISO 9001:2015 CERTIFIED</span>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
        </motion.div>

        {/* Quick Info */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>(0271) 714466</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Surakarta, Indonesia</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}