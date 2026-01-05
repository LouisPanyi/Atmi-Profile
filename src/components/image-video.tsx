// src/components/image-video.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface ImageSliderWithVideoProps {
  images: string[];
  video: string;
  channelName?: string;
}

export default function ImageSliderWithVideo({ images, video, channelName = 'PT ATMI SOLO' }: ImageSliderWithVideoProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoState, setVideoState] = useState<'idle' | 'loading' | 'playing' | 'ended'>('idle');
  const [isClient, setIsClient] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const autoAdvanceIntervalRef = useRef<number | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Pastikan images selalu array
  const safeImages = Array.isArray(images) ? images : [];
  
  // Pastikan video selalu string
  const safeVideo = typeof video === 'string' ? video : '';

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tambahkan efek untuk mendeteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Set ukuran awal
    handleResize();
    
    // Tambahkan event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getYouTubeEmbedUrl = (originalUrl: string) => {
    if (!originalUrl) return '';
    
    const videoIdMatch = originalUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    if (!videoId) return originalUrl;

    const params = new URLSearchParams({
      'rel': '0',
      'modestbranding': '1',
      'showinfo': '0',
      'iv_load_policy': '3',
      'controls': '1',
      'autoplay': '1',
      'mute': '0',
    });

    if (isClient) {
      params.append('origin', window.location.origin);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}&enablejsapi=1`;
  };

  const resetAutoAdvance = useCallback(() => {
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
    }
    if (currentSlide < safeImages.length && !isVideoPlaying) {
      autoAdvanceIntervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev === safeImages.length ? 0 : prev + 1));
      }, 5000);
    }
  }, [currentSlide, safeImages.length, isVideoPlaying]);

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceIntervalRef.current) {
        clearInterval(autoAdvanceIntervalRef.current);
      }
    };
  }, [currentSlide, safeImages.length, isVideoPlaying, resetAutoAdvance]);

  const goToSlide = (index: number) => {
    if (currentSlide === safeImages.length && videoRef.current) {
      videoRef.current.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
      setIsVideoPlaying(false);
      setVideoState('idle');
    }
    setCurrentSlide(index);
    resetAutoAdvance();
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlide === safeImages.length ? 0 : currentSlide + 1;
    goToSlide(nextSlideIndex);
  };

  const goToPrevSlide = () => {
    const prevSlideIndex = currentSlide === 0 ? safeImages.length : currentSlide - 1;
    goToSlide(prevSlideIndex);
  };

  const handleVideoClick = () => {
    setVideoState('loading');
    setIsVideoPlaying(true);
    resetAutoAdvance();
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setVideoState('ended');
  };

  // Gunakan safeVideo untuk mencegah error
  const videoIdMatch = safeVideo.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';
  const videoThumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';

  const modifiedVideoUrl = getYouTubeEmbedUrl(safeVideo);

  // Buat array thumbnail tanpa duplikasi
  const imageThumbnails = safeImages.map((img, index) => ({
    id: index,
    src: img || '', // Pastikan src adalah string
    isVideo: false
  }));

  // Tambahkan thumbnail video di akhir (tanpa duplikasi)
  const allThumbnails = [
    ...imageThumbnails,
    { id: safeImages.length, src: videoThumbnailUrl, isVideo: true }
  ];

  // FIX: Menggunakan 'fill' agar Image mengisi parent elementnya (yang sudah relative)
  const renderImage = (src: string, alt: string, sizes: string = "100vw") => {
    if (!src) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No image</span>
        </div>
      );
    }
    return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />;
  };

  return (
    <div className="relative w-full h-full">
      {/* Main Display with Fixed Aspect Ratio - Reduced Size */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {currentSlide < safeImages.length ? (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* Main Image */}
              {renderImage(safeImages[currentSlide], `Slide ${currentSlide + 1}`, "(max-width: 768px) 100vw, 75vw")}
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black"
            >
              <div className="relative w-full h-full">
                {isVideoPlaying ? (
                  <div className="relative w-full h-full">
                    {modifiedVideoUrl ? (
                      <iframe
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        src={modifiedVideoUrl}
                        title={`Video ${channelName}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        onEnded={handleVideoEnd}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <p className="text-white">Video tidak tersedia</p>
                      </div>
                    )}
                    {/* Close button when video is playing */}
                    <button
                      onClick={() => {
                        videoRef.current?.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                        setIsVideoPlaying(false);
                        setVideoState('ended');
                        // Kembali ke slide pertama foto
                        setCurrentSlide(0);
                      }}
                      className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-all"
                      aria-label="Close video"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 bg-gray-900 flex items-center justify-center cursor-pointer"
                    onClick={handleVideoClick}
                    style={{ 
                      backgroundImage: videoThumbnailUrl ? `url(${videoThumbnailUrl})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-white text-lg font-medium">Tonton Video</p>
                      <p className="text-gray-300 text-sm">{channelName}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons - Enhanced for Mobile */}
        {currentSlide < safeImages.length && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all md:p-1.5 md:left-2"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800 md:w-5 md:h-5" />
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all md:p-1.5 md:right-2"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800 md:w-5 md:h-5" />
            </button>
          </>
        )}
      </div>

      {/* Enhanced Thumbnails Footer - Hidden when video is playing */}
      {!isVideoPlaying && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div 
            ref={thumbnailContainerRef}
            className={`flex px-4 py-2 backdrop-blur-sm rounded-lg max-w-full overflow-x-auto scrollbar-custom ${
              isMobileView ? 'bg-black/50' : 'bg-black/30'
            }`}
            style={{ 
              gap: isMobileView ? '4px' : '8px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.3) transparent',
              msOverflowStyle: 'none'
            }}
          >
            {/* Custom scrollbar styling */}
            <style jsx>{`
              .scrollbar-custom::-webkit-scrollbar {
                height: 8px;
              }
              .scrollbar-custom::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
                margin: 0 8px;
              }
              .scrollbar-custom::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.3);
                border-radius: 4px;
              }
              .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.5);
              }
              .scrollbar-custom::-webkit-scrollbar-button {
                display: none;
              }
            `}</style>
            
            {allThumbnails.map((thumbnail, index) => {
              // Cek apakah ini thumbnail video
              const isVideoThumbnail = thumbnail.id === safeImages.length;
              
              // Untuk thumbnail video, langsung gunakan id
              // Untuk thumbnail gambar, gunakan index asli
              const slideIndex = isVideoThumbnail ? safeImages.length : thumbnail.id;
              const isCurrentSlide = currentSlide === slideIndex;
              
              // Untuk mobile, tampilkan dots yang sangat kecil
              if (isMobileView) {
                return (
                  <button
                    key={thumbnail.id}
                    onClick={() => goToSlide(slideIndex)}
                    className={`flex-shrink-0 rounded-full transition-all ${
                      isCurrentSlide
                        ? 'w-2 h-2 bg-blue-500'
                        : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                    style={{ margin: '0 2px' }}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                  />
                );
              }
              
              // Untuk desktop, tampilkan thumbnail
              return (
                <button
                  key={thumbnail.id}
                  onClick={() => goToSlide(slideIndex)}
                  // Class 'relative' penting untuk Image fill
                  className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all transform ${
                    isCurrentSlide
                      ? 'ring-4 ring-blue-500 scale-110 shadow-lg'
                      : 'opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-md'
                  }`}
                  style={{ width: '80px', height: '60px' }}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                >
                  {/* Thumbnail Image */}
                  {renderImage(thumbnail.src, `Thumbnail ${slideIndex + 1}`, "80px")}
                  {isVideoThumbnail && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}