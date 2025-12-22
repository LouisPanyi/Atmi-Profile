// src/components/produk/modal.tsx
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ImageSlider from '@/components/image-slider';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onInquiry: () => void;
}

export default function ProductModal({ product, isOpen, onClose, onInquiry }: ProductModalProps) {
  if (!isOpen || !product)
    return null;

  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.category}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Image Slider */}
          <div className="mb-8">
            {images.length > 0 ? (
              <ImageSlider
                images={images}
              />
            ) : (
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gambar tidak tersedia</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h4>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Fitur</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Spesifikasi</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">{key}</p>
                    <p className="font-medium text-gray-700">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={onInquiry}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}