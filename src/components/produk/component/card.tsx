// src/components/produk/card/ProductCard.tsx
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/data/product/product-types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onImageLoad?: () => void;
  imageLoaded?: boolean;
}

export default function ProductCard({ product, onClick, onImageLoad, imageLoaded = false }: ProductCardProps) {
  // Gunakan gambar pertama sebagai gambar utama
  const mainImage = product.images[0];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Container gambar dengan overlay informatif */}
      <div className="relative h-56 overflow-hidden">
        {mainImage ? (
          <div className="relative w-full h-full">
            {/* Loading state untuk gambar */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            <Image
              src={mainImage.url}
              alt={mainImage.alt || product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onLoad={onImageLoad}
            />
            
            {/* Badge kategori */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-md">
                {product.category}
              </span>
            </div>
            
            {/* Indikator jumlah gambar */}
            {product.images.length > 1 && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  <span className="mr-1">{product.images.length}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Overlay hover untuk detail */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <button className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Eye size={16} className="mr-2" />
                Lihat Detail
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Gambar tidak tersedia</span>
          </div>
        )}
      </div>
      
      {/* Konten produk */}
      <div className="p-5">
        {/* Judul */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h3>
          </div>
          {/* Placeholder untuk harga atau promo */}
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            Hubungi
          </div>
        </div>
        
        {/* Deskripsi singkat */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Fitur produk */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Fitur Unggulan</h4>
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{product.features.length - 3} fitur
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Tombol detail */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {product.images.length} gambar
            </span>
          </div>
          
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
            <Eye size={16} className="mr-1" />
            Detail
          </button>
        </div>
      </div>
    </motion.div>
  );
}