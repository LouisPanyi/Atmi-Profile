// src/components/produk/SearchBar.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Cari produk berdasarkan nama atau deskripsi...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Input dengan ikon search */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 search-input"
            placeholder={placeholder}
          />
          
          {/* Ikon search di kiri */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          
          {/* Tombol clear di kanan (muncul saat ada teks) */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-12 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors search-clear"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Tombol search di kanan */}
          <button 
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center search-button"
          >
            <span className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center">
              <Search className="h-5 w-5 mr-1" />
              Cari
            </span>
          </button>
        </div>
        
        {/* Placeholder untuk hasil pencarian */}
        {query && (
          <motion.div 
            className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="text-sm text-blue-700">
              Mencari produk dengan kata kunci: <span className="font-semibold">&quot;{query}&quot;</span>
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
} 