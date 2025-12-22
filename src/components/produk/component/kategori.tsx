// src/components/produk/component/kategori.tsx
import { motion } from 'framer-motion';


// Interface untuk data kategori
export interface CategoryItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

interface ProductCategoryProps {
  category: CategoryItem;
  isSelected: boolean;
  onChange: () => void;
  count?: number; 
}

// Definisikan skema warna untuk setiap kategori
const categoryColors: Record<string, {
  selected: string;
  unselected: string;
  icon: string;
}> = {
  'board': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'cabinet': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'cupboard': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'desk': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'chair': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'rack': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'locker': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'mobile-file': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'tool-cabinet': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'tool-cart': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'workshop': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
  'healthcare': {
    selected: 'bg-red-100 text-red-700 border-red-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50',
    icon: 'bg-red-50'
  },
  'machine-development': {
    selected: 'bg-gray-100 text-gray-700 border-gray-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    icon: 'bg-gray-50'
  },
};

// Default colors untuk kategori yang tidak terdaftar
const defaultColors = {
  selected: 'bg-gray-100 text-gray-700 border-gray-500',
  unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
  icon: 'bg-gray-50'
};

export default function ProductCategory({ category, isSelected, onChange, count }: ProductCategoryProps) {
  // Dapatkan warna berdasarkan kategori
  const colors = categoryColors[category.id] || defaultColors;

  // Gunakan count dari props jika ada, jika tidak gunakan fungsi fallback (untuk backward compatibility)
  const displayCount = count !== undefined ? count : getProductCount(category.id);

  return (
    <motion.button
      onClick={onChange}
      className={`w-full flex items-center p-2.5 rounded-lg border-2 transition-all duration-300 ${isSelected
        ? colors.selected
        : colors.unselected
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox */}
      <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${isSelected
        ? 'bg-blue-500 border-blue-500 text-white'
        : 'border-gray-300'
        }`}>
        {isSelected && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <div className={`p-1.5 rounded-lg ${isSelected ? colors.icon : 'bg-gray-100'
        } mr-2.5`}>
        <category.icon className="w-4 h-4" />
      </div>

      <span className="font-medium text-sm text-left flex-1">{category.title}</span>

      {/* Counter untuk kategori dengan banyak produk */}
      {category.id !== 'all' && (
        <span className="text-xs text-gray-500 ml-2">
          {displayCount}
        </span>
      )}
    </motion.button>
  );
}

// Fungsi Fallback (Hanya menghitung data statis, dipakai jika prop 'count' tidak dikirim)
function getProductCount(categoryId: string): number {
  try {
    const { getAllCategories } = require('@/utils/product');
    const category = getAllCategories().find((c: { category: string; }) =>
      c.category.toLowerCase().replace(/\s+/g, '-') === categoryId
    );
    return category ? category.products.length : 0;
  } catch (e) {
    return 0;
  }
}