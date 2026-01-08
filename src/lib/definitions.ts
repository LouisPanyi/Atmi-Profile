// src/lib/definitions.ts
import type { ProductImage } from "@/data/product/product-types"; 

// =========================================
// 1. COMMON / UTILITIES
// =========================================

// Tipe untuk respon Server Actions (Create/Update/Delete)
export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

// Tipe untuk Pagination
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage: number;
}

// Tipe untuk Search Params di Page Component
export interface SearchParams {
  query?: string;
  page?: string;
}

// =========================================
// 2. USERS (PENGGUNA)
// =========================================

export type UserRole = 'admin' | 'news_writer' | 'user';

// Tipe User seperti yang keluar dari Database
export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string; // Avatar jika ada
  created_at: string | Date; // Postgres bisa return Date atau string
}

// =========================================
// 3. PRODUCTS (PRODUK)
// =========================================

// Tipe Produk Mentah (Raw) dari Database (sebelum JSON parsing)
// Karena Vercel Postgres/SQL kadang mengembalikan JSON sebagai string

export interface ProductRaw {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string; // JSON String
  features: string; // JSON String
  specifications: string; // JSON String
  created_at: Date | string;
}

// Tipe Produk Bersih untuk Frontend (setelah JSON parsing)
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: ProductImage[]; 
  features: string[];
  specifications: Record<string, string>;
  created_at: Date;
}

// Tipe Data untuk Tabel Admin (Ringkasan)
export interface ProductTableRow {
  id: string;
  name: string;
  category: string;
  images: ProductImage[];
  created_at: Date;
}

// Tipe untuk Form Input (Create/Edit)
export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  images: ProductImage[]; // Bisa URL string atau object upload
  features: string[];
  specifications: Record<string, string>;
}

// =========================================
// 4. NEWS (BERITA)
// =========================================

// Struktur Konten Berita (Section)
export interface NewsSection {
  image?: string;
  caption?: string;
  description?: string; // HTML/Text content
}

export interface News {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  sections: any[];
  author_id?: number | null; // Update jadi nullable
}

export interface NewsRaw {
  id: string;
  title: string;
  slug: string;
  created_at: Date;
  sections: string;
  author_id?: number | null; // Update jadi nullable
}

export interface NewsListItem {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  author_id?: number | null; // Izinkan null/undefined
}

// Tipe untuk Form Input Berita
export interface NewsFormData {
  title: string;
  sections: NewsSection[];
  // Slug biasanya di-generate otomatis di server, tapi bisa manual
}

export interface NewsLog {
  id: string;
  user_name: string;
  action: string;
  details: string;
  created_at: string;
  news_title?: string;
}

// =========================================
// 5. FOOTER FILES (INFORMASI)
// =========================================

export type FooterFileCategory = 'katalog' | 'presentasi' | 'profile';

export interface FooterFile {
  id: string;
  category: FooterFileCategory;
  title: string;
  file_url: string;
  file_type: string;
  is_active: boolean;
  created_at: Date | string;
}

// =========================================
// 6. LOGS & ACTIVITY
// =========================================

// Tipe untuk Log Download
export interface DownloadLog {
  id: string;
  email: string;
  file_title: string;
  category: string;
  downloaded_at: string; // Ubah ke string agar aman untuk Client Component
}

// Tipe untuk Log Login
export interface LoginLog {
  id: string;
  name: string;
  email: string;
  role: string;
  login_at: string; // Ubah ke string agar aman untuk Client Component
}

// Update FooterFile jika perlu memastikan created_at konsisten
export interface FooterFile {
  id: string;
  category: 'katalog' | 'presentasi' | 'profile'; // Pastikan literal type
  title: string;
  file_url: string;
  file_type: string;
  is_active: boolean;
  created_at: string | Date; // Serialized date
}


// =========================================
// 7. ADDITIONAL DEFINITIONS
// =========================================

export interface NumericField {
  min?: number;
  max?: number;
  step?: number;
}

export interface ContactInfo {
  title: string;
  icon: React.ElementType; 
  details: string[];
}

export interface QuickLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ElementType; 
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; 
}

export interface Industry {
  icon: React.ElementType; 
  name: string;
  description: string;
}

