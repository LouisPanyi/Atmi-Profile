// src/components/timeline.tsx
"use client";

import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  event: string;
}

interface TimelineProps {
  data: TimelineItem[];
}

export default function Timeline({ data }: TimelineProps) {
  const milestoneImages = [
    {
      url: '/images/milestones/1968-establishment.jpg',
      alt: 'Pendirian ATMI Surakarta tahun 1968',
      caption: 'Foto gedung ATMI saat pertama berdiri',
    },
    {
      url: '/images/milestones/1974-production-unit.jpg',
      alt: 'Pembangunan unit produksi tahun 1974',
      caption: 'Proses pembangunan unit produksi awal',
    },
  ];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/placeholder.jpg'; // fallback image
  };

  return (
    <div className="relative">
      {/* Gallery of milestone images for first two items */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Milestone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {milestoneImages.map((item, index) => (
            <div key={index} className="relative">
              {/* Image container */}
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  onError={handleImgError}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mt-2 italic">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple timeline without images */}
      <div className="relative pl-8 border-l-2 border-gray-300">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="relative mb-8 last:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <div className="absolute -left-9 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>

            {/* Year badge */}
            <div className="mb-3">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                {item.year}
              </div>
            </div>

            {/* Event content */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-800 leading-relaxed">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
