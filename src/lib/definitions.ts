// src/lib/definitions.ts
import type { ProductImage } from "@/data/product/product-types"; //

// Interface untuk baris tabel produk di Admin (hasil query DB)
export interface ProductTableRow {
  id: string;
  name: string;
  category: string;
  images: ProductImage[];
  created_at: Date;
}

// Anda juga bisa memindahkan definisi Product form di sini jika mau
export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  images: ProductImage[];
  features: string[];
  specifications: Record<string, string>;
}

export interface Section {
  image?: string;
  caption?: string;
  description?: string;
}

export interface NewsRow {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  sections: string; 
}

export interface NewsListItem {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  sections: string;
}

export interface Pagination {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems?: number;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}
