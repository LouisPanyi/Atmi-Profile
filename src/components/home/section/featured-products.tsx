// src/components/home/section/featured-products.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
  gallery: string[];
}

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
  activeProduct?: string | null;
}

const featuredProducts: Product[] = [
  {
    id: "Standard Products",
    name: "Standard Products",
    category: "Produk Standar",
    description: "Beragam produk standar berkualitas tinggi untuk kebutuhan industri Anda",
    image: "/images/standard-products.jpg",
    highlights: ["Kualitas tinggi", "Beragam pilihan", "Sertifikasi internasional"],
    gallery: [
      "/images/standard-products/sp1.png",
      "/images/standard-products/sp2.png",
      "/images/standard-products/sp3.png",
      "/images/standard-products/sp4.png",
    ],
  },
  // {
  //   id: "Industrial Product",
  //   name: "Industrial Product",
  //   category: "Produk Industri",
  //   description: "Solusi industri lengkap untuk meningkatkan produktivitas dan efisiensi operasional",
  //   image: "/images/industrial-products.jpg",
  //   highlights: ["Dibuat untuk industri", "Tahan lama", "Performa tinggi"],
  //   gallery: [
  //     "/images/indus-products/ip1.png",
  //     "/images/indus-products/ip2.png",
  //     "/images/indus-products/ip3.png",
  //     "/images/indus-products/ip4.jpg",
  //   ],
  // },
  {
    id: "Precision Parts",
    name: "Precision Parts",
    category: "Suku Cadang Presisi",
    description: "Suku cadang presisi untuk mesin dan peralatan industri Anda",
    image: "/images/precision-parts.jpg",
    highlights: ["CNC Machining", "Toleransi ketat", "Kustomisasi tersedia"],
    gallery: [
      "/images/precision-parts/pp1.jpg",
      "/images/precision-parts/pp2.jpg",
      "/images/precision-parts/pp3.jpg",
      "/images/precision-parts/pp4.jpg",
    ],
  },
];

export default function FeaturedProducts({ onProductClick, activeProduct }: FeaturedProductsProps) {
  const [activeImages, setActiveImages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialImages: { [key: string]: number } = {};
    featuredProducts.forEach((product) => {
      initialImages[product.id] = 0;
    });
    setActiveImages(initialImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImages((prev) => {
        const next = { ...prev };
        featuredProducts.forEach((product) => {
          if (activeProduct !== product.id) {
            next[product.id] = (next[product.id] + 1) % product.gallery.length;
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [activeProduct]);

  const handleImageClick = (productId: string) => {
    onProductClick(productId);
  };

  return (
    <section id="produk" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Produk Unggulan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eksplorasi koleksi produk berkualitas tinggi dari PT ATMI SOLO
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {featuredProducts.map((product) => {
            const isActive = activeProduct === product.id;
            const currentImageIndex = activeImages[product.id] || 0;
            const currentImage = product.gallery[currentImageIndex];

            return (
              <motion.div
                key={product.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 ${
                  isActive ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleImageClick(product.id)}
                aria-pressed={isActive}
                role="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-64 bg-gray-200 overflow-hidden relative">
                  <img
                    src={currentImage}
                    alt={`${product.name} - Gambar ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    {product.gallery.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-400"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-blue-600">{product.category}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.highlights.map((highlight, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`w-full py-2 rounded-md transition duration-300 flex items-center justify-center gap-2 ${
                      isActive ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isActive ? "Tutup Detail" : "Lihat Detail"}
                    {!isActive && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}  