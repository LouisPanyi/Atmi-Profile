// src/utils/product.ts
import { boardData } from '@/data/product/board';
import { cabinetData } from '@/data/product/cabinet';
import { cupboardData } from '@/data/product/cupboard';
import { deskTableData } from '@/data/product/desk-table';
import { chairData } from '@/data/product/chair';
import { rackData } from '@/data/product/rack';
import { lockerData } from '@/data/product/locker';
import { mobileFileData } from '@/data/product/mobile-file';
import { toolCabinetData } from '@/data/product/tool-cabinet';
import { toolCartData } from '@/data/product/tool-cart';
// import { machineDevelopmentData } from '@/data/product/machine-development';
// import { laboratoryData } from '@/data/product/laboratory';
// import { workshopData } from '@/data/product/workshop';
import { healthcareData } from '@/data/product/healthcare';
// import { housewareData } from '@/data/product/houseware';
// import { publicGalleryData } from '@/data/product/public-gallery';
import type { CategoryData } from '@/data/product/product-types';

// Daftar semua data kategori
const allCategories: CategoryData[] = [
  boardData,
  cabinetData,
  cupboardData,
  deskTableData,
  chairData,
  rackData,
  lockerData,
  mobileFileData,
  toolCabinetData,
  toolCartData,
  // machineDevelopmentData,
  // laboratoryData,
  // workshopData,
  healthcareData,
  // housewareData,
  // publicGalleryData,
];

// Fungsi untuk mendapatkan semua kategori
export const getAllCategories = () => {
  return allCategories;
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = (category: string) => {
  if (!category || category === 'all') {
    return getAllProducts();
  }
  
  // Normalisasi kategori yang dicari
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  
  // Cari kategori yang cocok
  const categoryData = allCategories.find(cat => 
    cat.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategory
  );
  
  return categoryData ? categoryData.products : [];
};

// Fungsi untuk mendapatkan produk berdasarkan ID
export const getProductById = (id: string) => {
  for (const category of allCategories) {
    const product = category.products.find(p => p.id === id);
    if (product) {
      return product;
    }
  }
  return null;
};

// Fungsi untuk mendapatkan semua produk
export const getAllProducts = () => {
  return allCategories.flatMap(category => category.products);
};