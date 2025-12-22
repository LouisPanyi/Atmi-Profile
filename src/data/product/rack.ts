// src/data/product/rack.ts
import { CategoryData } from './product-types';

export const rackData: CategoryData = {
  category: "Rack",
  description: "Rack and shelving solutions for storage",
  products: [
    {
      id: "rack-001",
      name: "Rack Compartment",
      description: "Compartment rack",
      category: "Rack",
      images: [
        {
          id: "rack-001-1",
          url: "/images/products/rack/rack-compartment/rc1.jpg",
          alt: "Compartment rack",
          featured: true
        },
        {
          id: "rack-001-2",
          url: "/images/products/rack/rack-compartment/rc2.jpg",
          alt: "Compartment rack side view",
          featured: false
        },
        {
          id: "rack-001-3",
          url: "/images/products/rack/rack-compartment/rc3.jpg",
          alt: "Compartment rack open view",
          featured: false
        },
        {
          id: "rack-001-4",
          url: "/images/products/rack/rack-compartment/rc4.jpg",
          alt: "Compartment rack back view",
          featured: false
        },
        {
          id: "rack-001-5",
          url: "/images/products/rack/rack-compartment/rc5.jpg",
          alt: "Compartment rack detailed view",
          featured: false
        },
        {
          id: "rack-001-6",
          url: "/images/products/rack/rack-compartment/rc6.jpg",
          alt: "Compartment rack interior view",
          featured: false
        },
        {
          id: "rack-001-7",
          url: "/images/products/rack/rack-compartment/rc7.jpg",
          alt: "Compartment rack base view",
          featured: false
        },
        {
          id: "rack-001-8",
          url: "/images/products/rack/rack-compartment/rc8.jpg",
          alt: "Compartment rack adjustable view",
          featured: false
        }
      ],
      features: ["Compartment design", "Adjustable", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "120x90x180cm",
        "Compartments": "6"
      }
    },
    {
      id: "rack-002",
      name: "Footwear Case",
      description: "Footwear storage case",
      category: "Rack",
      images: [
        {
          id: "rack-002-1",
          url: "/images/products/rack/footwear-case/fwc1.jpg",
          alt: "Footwear storage case",
          featured: true
        },
        {
          id: "rack-002-2",
          url: "/images/products/rack/footwear-case/fwc2.jpg",
          alt: "Footwear storage case side view",
          featured: false
        },
        {
          id: "rack-002-3",
          url: "/images/products/rack/footwear-case/fwc3.jpg",
          alt: "Footwear storage case open view",
          featured: false
        },
        {
          id: "rack-002-4",
          url: "/images/products/rack/footwear-case/fwc4.jpg",
          alt: "Footwear storage case back view",
          featured: false
        },
        {
          id: "rack-002-5",
          url: "/images/products/rack/footwear-case/fwc5.jpg",
          alt: "Footwear storage case detailed view",
          featured: false
        },
        {
          id: "rack-002-6",
          url: "/images/products/rack/footwear-case/fwc6.jpg",
          alt: "Footwear storage case interior view",
          featured: false
        },
        {
          id: "rack-002-7",
          url: "/images/products/rack/footwear-case/fwc7.jpg",
          alt: "Footwear storage case base view",
          featured: false
        },
        {
          id: "rack-002-8",
          url: "/images/products/rack/footwear-case/fwc8.jpg",
          alt: "Footwear storage case adjustable view",
          featured: false
        },
        {
          id: "rack-002-9",
          url: "/images/products/rack/footwear-case/fwc9.jpg",
          alt: "Footwear storage case ventilated view",
          featured: false
        },
        {
          id: "rack-002-10",
          url: "/images/products/rack/footwear-case/fwc10.jpg",
          alt: "Footwear storage case durable view",
          featured: false
        },
        {
          id: "rack-002-11",
          url: "/images/products/rack/footwear-case/fwc11.jpg",
          alt: "Footwear storage case multiple compartments view",
          featured: false
        }
      ],
      features: ["Footwear storage", "Ventilated", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "90x30x180cm",
        "Compartments": "12"
      }
    },
    {
      id: "rack-003",
      name: "Small Book Shelves",
      description: "Small book shelves",
      category: "Rack",
      images: [
        {
          id: "rack-003-1",
          url: "/images/products/rack/small-book-shelves/sbs1.jpg",
          alt: "Small book shelves",
          featured: true
        },
        {
          id: "rack-003-2",
          url: "/images/products/rack/small-book-shelves/sbs2.jpg",
          alt: "Small book shelves side view",
          featured: false
        },
        {
          id: "rack-003-3",
          url: "/images/products/rack/small-book-shelves/sbs3.jpg",
          alt: "Small book shelves open view",
          featured: false
        }
      ],
      features: ["Small size", "Adjustable", "Durable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "80x30x180cm",
        "Shelves": "5"
      }
    },
    {
      id: "rack-004",
      name: "Big Book Shelves",
      description: "Large book shelves",
      category: "Rack",
      images: [
        {
          id: "rack-004-1",
          url: "/images/products/rack/big-book-shelves/bbs1.jpg",
          alt: "Large book shelves",
          featured: true
        },
        {
          id: "rack-004-2",
          url: "/images/products/rack/big-book-shelves/bbs2.jpg",
          alt: "Large book shelves side view",
          featured: false
        },
        {
          id: "rack-004-3",
          url: "/images/products/rack/big-book-shelves/bbs3.jpg",
          alt: "Large book shelves open view",
          featured: false
        },
        {
          id: "rack-004-4",
          url: "/images/products/rack/big-book-shelves/bbs4.jpg",
          alt: "Large book shelves detailed view",
          featured: false
        }
      ],
      features: ["Large size", "Adjustable", "Durable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "120x30x180cm",
        "Shelves": "6"
      }
    },
    {
      id: "rack-005",
      name: "Magazine Shelves",
      description: "Magazine storage shelves",
      category: "Rack",
      images: [
        {
          id: "rack-005-1",
          url: "/images/products/rack/magazine-shelves/ms1.jpg",
          alt: "Magazine storage shelves",
          featured: true
        },
        {
          id: "rack-005-2",
          url: "/images/products/rack/magazine-shelves/ms2.jpg",
          alt: "Magazine storage shelves side view",
          featured: false
        },
        {
          id: "rack-005-3",
          url: "/images/products/rack/magazine-shelves/ms3.jpg",
          alt: "Magazine storage shelves open view",
          featured: false
        },
        {
          id: "rack-005-4",
          url: "/images/products/rack/magazine-shelves/ms4.jpg",
          alt: "Magazine storage shelves detailed view",
          featured: false
        }
      ],
      features: ["Magazine storage", "Adjustable", "Durable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "90x30x180cm",
        "Shelves": "4"
      }
    },
    {
      id: "rack-006",
      name: "Book Shelves with Sliding Door",
      description: "Extended book shelves with sliding door",
      category: "Rack",
      images: [
        {
          id: "rack-006-1",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd1.jpg",
          alt: "Extended book shelves",
          featured: true
        },
        {
          id: "rack-006-2",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd2.jpg",
          alt: "Extended book shelves side view",
          featured: false
        },
        {
          id: "rack-006-3",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd3.jpg",
          alt: "Extended book shelves open view",
          featured: false
        },
        {
          id: "rack-006-4",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd4.jpg",
          alt: "Extended book shelves detailed view",
          featured: false
        },
        {
          id: "rack-006-5",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd5.jpg",
          alt: "Extended book shelves sliding door view",
          featured: false
        },
        {
          id: "rack-006-6",
          url: "/images/products/rack/book-shelves-with-sliding-door/bswsd6.jpg",
          alt: "Extended book shelves interior view",
          featured: false
        }
      ],
      features: ["Extended design", "Adjustable", "Durable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "150x30x180cm",
        "Shelves": "8"
      }
    }
  ]
};