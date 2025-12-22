// src/data/product/cupboard.ts
import {  CategoryData } from './product-types';

export const cupboardData: CategoryData = {
  category: "Cupboard",
  description: "Cupboard solutions for office and storage needs",
  products: [
    {
      id: "cupboard-001",
      name: "Office Cabinet",
      description: "Standard office cabinet",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-001-1",
          url: "/images/products/cupboard/office-cabinet/oc1.jpg",
          alt: "Standard office cabinet",
          featured: true
        },
        {
          id: "cupboard-001-2",
          url: "/images/products/cupboard/office-cabinet/oc2.jpg",
          alt: "Standard office cabinet side view",
          featured: false
        },
        {
          id: "cupboard-001-3",
          url: "/images/products/cupboard/office-cabinet/oc3.jpg",
          alt: "Standard office cabinet open",
          featured: false
        },
        {
          id: "cupboard-001-4",
          url: "/images/products/cupboard/office-cabinet/oc4.jpg",
          alt: "Standard office cabinet close-up",
          featured: false
        },
        {
          id: "cupboard-001-5",
          url: "/images/products/cupboard/office-cabinet/oc5.jpg",
          alt: "Standard office cabinet interior",
          featured: false
        }
      ],
      features: ["Lockable", "Adjustable shelves", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "4"
      }
    },
    {
      id: "cupboard-002",
      name: "Offfice Cabinet Sliding Glass Doors",
      description: "Office cabinet with sliding glass doors",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-002-1",
          url: "/images/products/cupboard/office-cabinet-sliding/ocsgd1.jpg",
          alt: "Office cabinet with sliding glass doors",
          featured: true
        },
        {
          id: "cupboard-002-2",
          url: "/images/products/cupboard/office-cabinet-slidings/ocsgd2.jpg",
          alt: "Office cabinet sliding glass doors side view",
          featured: false
        },
        {
          id: "cupboard-002-3",
          url: "/images/products/cupboard/office-cabinet-slidings/ocsgd3.jpg",
          alt: "Office cabinet sliding glass doors open",
          featured: false
        },
        {
          id: "cupboard-002-4",
          url: "/images/products/cupboard/office-cabinet-sliding/ocsgd4.jpg",
          alt: "Office cabinet sliding glass doors close-up",
          featured: false
        },
      ],
      features: ["Sliding glass doors", "Lockable", "Adjustable shelves"],
      specifications: {
        "Material": "Steel and Glass",
        "Dimensions": "90x45x180cm",
        "Shelves": "4"
      }
    },
    {
      id: "cupboard-003",
      name: "Office Cabinet Single Small Door",
      description: "Office cabinet with a single small door",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-003-1",
          url: "/images/products/cupboard/office-cabinet-single/ocssd1.jpg",
          alt: "Office cabinet with single small door",
          featured: true
        },
        {
          id: "cupboard-003-2",
          url: "/images/products/cupboard/office-cabinet-single/ocssd1.jpg",
          alt: "Office cabinet single small door side view",
          featured: false
        },
        {
          id: "cupboard-003-3",
          url: "/images/products/cupboard/office-cabinet-single/ocssd1.jpg",
          alt: "Office cabinet single small door open",
          featured: false
        },
      ],
      features: ["Single small door", "Lockable", "Compact design"],
      specifications: { 
        "Material": "Steel",
        "Dimensions": "60x40x120cm",
        "Shelves": "5"
      }
    },
    {
      id: "cupboard-004",
      name: "Office Cabinet Swing Glass Doors",
      description: "Office cabinet with swing glass doors",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-004-1",
          url: "/images/products/cupboard/office-cabinet-swing/ocswgd1.jpg",
          alt: "Office cabinet with swing glass doors",
          featured: true
        },
        {
          id: "cupboard-004-2",
          url: "/images/products/cupboard/office-cabinet-swing/ocswgd2.jpg",
          alt: "Office cabinet swing glass doors side view",
          featured: false
        },
        {
          id: "cupboard-004-3",
          url: "/images/products/cupboard/office-cabinet-swing/ocswgd3.jpg",
          alt: "Office cabinet swing glass doors open",
          featured: false
        },
      ],
      features: ["Swing glass doors", "Lockable", "Adjustable shelves"],
      specifications: {
        "Material": "Metal and Glass",
        "Dimensions": "90x45x180cm",
        "Shelves": "4"
      }
    },
    {
      id: "cupboard-005",
      name: "Tool Cupboard - Small",
      description: "Small tool cupboard for storage",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-005-1",
          url: "/images/products/cupboard/small-tool-cupboard/tcs1.jpg",
          alt: "Small tool cupboard",
          featured: true
        },
        {
          id: "cupboard-005-2",
          url: "/images/products/cupboard/small-tool-cupboard/tcs2.jpg",
          alt: "Small tool cupboard side view",
          featured: false
        },
        {
          id: "cupboard-005-3",
          url: "/images/products/cupboard/small-tool-cupboard/tcs3.jpg",
          alt: "Small tool cupboard open",
          featured: false
        },
        {
          id: "cupboard-005-4",
          url: "/images/products/cupboard/small-tool-cupboard/tcs4.jpg",
          alt: "Small tool cupboard close-up",
          featured: false
        },
        {
          id: "cupboard-005-5",
          url: "/images/products/cupboard/small-tool-cupboard/tcs5.jpg",
          alt: "Small tool cupboard interior",
          featured: false
        },
        {
          id: "cupboard-005-6",
          url: "/images/products/cupboard/small-tool-cupboard/tcs6.jpg",
          alt: "Small tool cupboard back view",
          featured: false
        }
      ],
      features: ["Compact size", "Lockable", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "70x35x120cm",
        "Shelves": "4"
      }
    },
    {
      id: "cupboard-006",
      name: "Tool Cupboard - Big",
      description: "Big tool cupboard for extensive storage",
      category: "Cupboard",
      images: [
        {
          id: "cupboard-006-1",
          url: "/images/products/cupboard/big-tool-cupboard/btc1.jpg",
          alt: "Big tool cupboard",
          featured: true
        },
        {
          id: "cupboard-006-2",
          url: "/images/products/cupboard/big-tool-cupboard/btc2.jpg",
          alt: "Big tool cupboard side view",
          featured: false
        },
        {
          id: "cupboard-006-3",
          url: "/images/products/cupboard/big-tool-cupboard/btc3.jpg",
          alt: "Big tool cupboard open",
          featured: false
        }, 
        {
          id: "cupboard-006-4",
          url: "/images/products/cupboard/big-tool-cupboard/btc4.jpg",
          alt: "Big tool cupboard close-up",
          featured: false
        },
        {
          id: "cupboard-006-5",
          url: "/images/products/cupboard/big-tool-cupboard/btc5.jpg",
          alt: "Big tool cupboard interior",
          featured: false
        },
        {
          id: "cupboard-006-6",
          url: "/images/products/cupboard/big-tool-cupboard/btc6.jpg",
          alt: "Big tool cupboard back view",
          featured: false
        }
      ],
      features: ["Large capacity", "Lockable", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "120x50x180cm",
        "Shelves": "5"
      }
    }
  ]
};