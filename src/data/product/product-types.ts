// src/types/index.ts
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: ProductImage[];
  specifications?: Record<string, string>;
  features?: string[];
}

export interface CategoryData {
  category: string;
  description: string;
  products: Product[];
  bannerImage?: {
    url: string;
    alt: string;
  };
}