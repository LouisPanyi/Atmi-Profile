"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCategory from '../component/kategori';
import ProductCard from '../component/card';
import ProductModal from '../component/modal';
import type { Product } from '@/data/product/product-types';
import SearchBar from '@/components/produk/component/searchbar';

// Tambahkan Interface Props
interface ProductListSectionProps {
  initialProducts: any[]; 
}

export default function ProductListSection({ initialProducts }: ProductListSectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [productsToShow, setProductsToShow] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const infoTextDesktopRef = useRef<HTMLParagraphElement>(null);
  const infoTextMobileRef = useRef<HTMLParagraphElement>(null);

  const allProducts = useMemo(() => {
    return initialProducts as Product[];
  }, [initialProducts]);

  // --- MODIFIKASI: Hitung jumlah produk per kategori secara dinamis ---
  const categoryList = useMemo(() => {
    // 1. Hitung frekuensi produk per kategori ID
    const stats = allProducts.reduce((acc, product) => {
      const catId = product.category.toLowerCase().replace(/\s+/g, '-');
      acc[catId] = (acc[catId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 2. Buat daftar kategori unik
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    
    // 3. Return format data kategori + count
    return uniqueCategories.map(cat => {
      const id = cat.toLowerCase().replace(/\s+/g, '-');
      return {
        category: cat,
        id: id,
        count: stats[id] || 0 // Ambil jumlah dari hasil perhitungan di atas
      };
    });
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    if (selectedCategories.length > 0) {
      products = products.filter((product) =>
        selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
      );
    }
    return products;
  }, [allProducts, selectedCategories, searchQuery]);

  useEffect(() => {
    setProductsToShow(20);
  }, [filteredProducts]);

  const getActiveInfoEl = useCallback((): HTMLParagraphElement | null => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    return isDesktop ? infoTextDesktopRef.current : infoTextMobileRef.current;
  }, []);

  const scrollToInfo = useCallback(() => {
    const el = getActiveInfoEl();
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      });
    });
  }, [getActiveInfoEl]);

  const handleImageLoad = (productId: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleInquiry = () => {
    setIsModalOpen(false);
    window.location.href = '/kontak';
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      return next;
    });
    if (isSidebarOpen) setIsSidebarOpen(false);
    scrollToInfo();
  };

  const resetCategoriesAndScroll = () => {
    setSelectedCategories([]);
    if (isSidebarOpen) setIsSidebarOpen(false);
    scrollToInfo();
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    if (isSidebarOpen) setIsSidebarOpen(false);
    scrollToInfo();
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setProductsToShow((prev) => prev + 20);
      setLoading(false);
    }, 1000);
  };

  const visibleProducts = filteredProducts.slice(0, productsToShow);
  const hasMore = productsToShow < filteredProducts.length;

  return (
    <motion.section
      id="produk"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Katalog Produk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih kategori untuk melihat produk yang tersedia atau gunakan pencarian untuk menemukan produk yang Anda butuhkan.
          </p>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6 flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8">
          {/* Desktop Sidebar */}
          <div className="w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filter Kategori</h3>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={resetCategoriesAndScroll}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus Semua
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <ProductCategory
                  category={{ id: 'all', title: 'Semua Produk', icon: () => <div className="w-4 h-4 bg-blue-500 rounded-full" /> }}
                  isSelected={selectedCategories.length === 0}
                  onChange={resetCategoriesAndScroll}
                  // Kirim total semua produk untuk kategori 'All'
                  count={allProducts.length} 
                />
                
                {categoryList.map((cat) => {
                  return (
                    <ProductCategory
                      key={cat.category}
                      category={{ id: cat.id, title: cat.category, icon: () => <div className="w-4 h-4 bg-blue-500 rounded-full" /> }}
                      isSelected={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      // KIRIM COUNT DISINI
                      count={cat.count}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Products */}
          <div className="w-3/4">
            <SearchBar
              onSearch={(query) => setSearchQuery(query)}
              placeholder="Cari produk berdasarkan nama atau deskripsi..."
              className="mb-8"
            />

            {/* Info hasil pencarian (Desktop) */}
            <div className="mb-6">
              <p ref={infoTextDesktopRef} className="text-center text-gray-600">
                Menampilkan {visibleProducts.length} dari {filteredProducts.length} produk
                {selectedCategories.length > 0 &&
                  ` dari kategori: ${selectedCategories
                    .map((id) => {
                      const category = categoryList.find(
                        (c) => c.id === id
                      );
                      return category?.category;
                    })
                    .join(', ')}`}
                {searchQuery && ` dengan pencarian "${searchQuery}"`}
              </p>
              {(selectedCategories.length > 0 || searchQuery) && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus semua filter
                  </button>
                </div>
              )}
            </div>

            {/* Produk Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                      onImageLoad={() => handleImageLoad(product.id)}
                      imageLoaded={!!loadedImages[product.id]}
                    />
                  ))}
                </motion.div>

                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        loading
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Memuat...
                        </div>
                      ) : (
                        'Tampilkan Lebih Banyak'
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tampilkan Semua Produk
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Cari berdasarkan nama atau deskripsi..."
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Info hasil pencarian (Mobile) */}
          <div className="mb-6">
            <p ref={infoTextMobileRef} className="text-center text-gray-600">
              Menampilkan {visibleProducts.length} dari {filteredProducts.length} produk
              {selectedCategories.length > 0 &&
                ` dari kategori: ${selectedCategories
                  .map((id) => {
                    const category = categoryList.find(
                      (c) => c.id === id
                    );
                    return category?.category;
                  })
                  .join(', ')}`}
              {searchQuery && ` dengan pencarian "${searchQuery}"`}
            </p>
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus semua filter
                </button>
              </div>
            )}
          </div>

          {/* Produk Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    onImageLoad={() => handleImageLoad(product.id)}
                    imageLoaded={!!loadedImages[product.id]}
                  />
                ))}
              </motion.div>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      loading
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Memuat...
                      </div>
                    ) : (
                      'Tampilkan Lebih Banyak'
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Pop-up */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="w-80 h-full bg-white shadow-xl border-r border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Filter Kategori</h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100vh-73px)]">
                  <div className="space-y-3">
                    <ProductCategory
                      category={{ id: 'all', title: 'Semua Produk', icon: () => <div className="w-4 h-4 bg-blue-500 rounded-full" /> }}
                      isSelected={selectedCategories.length === 0}
                      onChange={resetCategoriesAndScroll}
                      // Kirim count untuk mobile juga
                      count={allProducts.length} 
                    />
                    {categoryList.map((cat) => {
                      return (
                        <ProductCategory
                          key={cat.category}
                          category={{ id: cat.id, title: cat.category, icon: () => <div className="w-4 h-4 bg-blue-500 rounded-full" /> }}
                          isSelected={selectedCategories.includes(cat.id)}
                          onChange={() => handleCategoryChange(cat.id)}
                          // KIRIM COUNT DISINI
                          count={cat.count}
                        />
                      );
                    })}
                  </div>

                  {selectedCategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={resetCategoriesAndScroll}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Hapus Semua Pilihan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onInquiry={handleInquiry}
        />
      </div>
    </motion.section>
  );
}