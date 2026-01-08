"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface Image {
  url: string;
  alt?: string;
}

interface ImageSliderProps {
  images: Image[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(400); // default height
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Track modal state
  const [modalImage, setModalImage] = useState<string>(''); // Store image URL for modal
  const [modalIndex, setModalIndex] = useState(0); // Track current index in modal
  const autoAdvanceIntervalRef = useRef<number | null>(null); // Ref to store interval ID

  // Auto-advance slide functionality
  const resetAutoAdvance = useCallback(() => {
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
    }
    
    // Set interval for auto-advance
    autoAdvanceIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds
  }, [images.length]);

  // useEffect to handle auto-advance and cleanup
  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current);
      }
    };
  }, [resetAutoAdvance]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setImageLoaded(false);
    resetAutoAdvance(); // Reset interval after manual interaction
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setImageLoaded(false);
    resetAutoAdvance(); // Reset interval after manual interaction
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    
    const maxHeight = 600; // maximum height
    const minHeight = 300; // minimum height
    const calculatedHeight = 400 * aspectRatio; // 400px is the reference height
    
    const finalHeight = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
    setContainerHeight(finalHeight);
    setImageLoaded(true);
  };

  const handleImageClick = (imageUrl: string, index: number) => {
    setModalImage(imageUrl);
    setModalIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImage('');
    setModalIndex(0);
  };

  // Navigation functions for modal
  const goToPreviousInModal = () => {
    const isFirstSlide = modalIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : modalIndex - 1;
    setModalImage(images[newIndex].url);
    setModalIndex(newIndex);
  };

  const goToNextInModal = () => {
    const isLastSlide = modalIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : modalIndex + 1;
    setModalImage(images[newIndex].url);
    setModalIndex(newIndex);
  };

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Tidak ada gambar tersedia</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Display Container */}
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
            style={{ height: `${containerHeight}px` }}
          >
            {/* PERBAIKAN 1: Tambahkan prop 'fill' dan 'sizes' */}
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `Product image ${currentIndex + 1}`}
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-contain cursor-pointer"
              onLoad={handleImageLoad}
              onClick={() => handleImageClick(images[currentIndex].url, currentIndex)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white p-2 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Thumbnails Container */}
      <div className="mt-4">
        <div className="flex space-x-2 overflow-x-auto p-2 -mx-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setImageLoaded(false);
                resetAutoAdvance(); 
              }}
              className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 focus:outline-none ${
                currentIndex === index ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent hover:ring-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <motion.div
            className="bg-white p-4 rounded-lg shadow-2xl relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all"
              aria-label="Tutup gambar"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousInModal}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white p-2 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <button
                  onClick={goToNextInModal}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/60 hover:bg-white p-2 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20">
              {modalIndex + 1} / {images.length}
            </div>

            <div className="relative w-full h-full">
              <Image
                src={modalImage}
                alt={`Enlarged product ${modalIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}