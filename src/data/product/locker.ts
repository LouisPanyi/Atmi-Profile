// src/data/product/locker.ts
import {  CategoryData } from './product-types';

export const lockerData: CategoryData = {
  category: "Locker",
  description: "Locker solutions for storage and security",
  products: [
    {
      id: "locker-001",
      name: "Locker Single",
      description: "Single locker unit",
      category: "Locker",
      images: [
        {
          id: "locker-001-1",
          url: "/images/products/locker/locker-single/ls1.jpg",
          alt: "Single locker unit",
          featured: true
        },
        {
          id: "locker-001-2",
          url: "/images/products/locker/locker-single/ls2.jpg",
          alt: "Single locker unit side view",
          featured: false
        },
        {
          id: "locker-001-3",
          url: "/images/products/locker/locker-single/ls3.jpg",
          alt: "Single locker unit open view",
          featured: false
        },
        {
          id: "locker-001-4",
          url: "/images/products/locker/locker-single/ls4.jpg",
          alt: "Single locker unit back view",
          featured: false
        },
        {
          id: "locker-001-5",
          url: "/images/products/locker/locker-single/ls5.jpg",
          alt: "Single locker unit lock view",
          featured: false
        },   
        {
          id: "locker-001-6",
          url: "/images/products/locker/locker-single/ls6.jpg",
          alt: "Single locker unit interior view",
          featured: false
        },
        {
          id: "locker-001-7",
          url: "/images/products/locker/locker-single/ls7.jpg",
          alt: "Single locker unit base view",
          featured: false
        }
      ],
      features: ["Single unit", "Lockable", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "30x30x180cm",
        "Compartments": "1"
      }
    },
    {
      id: "locker-002",
      name: "Locker 6",
      description: "6-unit locker system",
      category: "Locker",
      images: [
        {
          id: "locker-002-1",
          url: "/images/products/locker/locker-6/l61.png",
          alt: "6-unit locker system",
          featured: true
        },
        {
          id: "locker-002-2",
          url: "/images/products/locker/locker-6/l62.png",
          alt: "6-unit locker system side view",
          featured: false
        },
        {
          id: "locker-002-3", 
          url: "/images/products/locker/locker-6/l63.png",
          alt: "6-unit locker system open view",
          featured: false
        },
        {
          id: "locker-002-4",
          url: "/images/products/locker/locker-6/l64.png",
          alt: "6-unit locker system back view",
          featured: false
        }
      ],
      features: ["6 units", "Lockable", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "180x30x180cm",
        "Compartments": "6"
      }
    }
  ]
};