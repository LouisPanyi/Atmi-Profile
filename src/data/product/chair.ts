// src/data/product/chair.ts
import {  CategoryData } from './product-types';

export const chairData: CategoryData = {
  category: "Chair",
  description: "Various chair solutions for office and institutional use",
  products: [
    {
      id: "chair-001",
      name: "Typist Chair",
      description: "Typist chair",
      category: "Chair",
      images: [
        {
          id: "chair-001-1",
          url: "/images/products/chair/typist-chair/tc1.jpg",
          alt: "Typist chair",
          featured: true
        },
        {
          id: "chair-001-2",
          url: "/images/products/chair/typist-chair/tc2.jpg",
          alt: "Typist chair side view",
          featured: false
        },
        {
          id: "chair-001-3",
          url: "/images/products/chair/typist-chair/tc3.jpg",
          alt: "Typist chair back view",
          featured: false
        }
      ],
      features: ["Ergonomic", "Adjustable height", "Comfortable"],
      specifications: {
        "Material": "Mesh with steel frame",
        "Dimensions": "45x45x110cm",
        "Weight capacity": "120kg"
      }
    },
    {
      id: "chair-002",
      name: "Swivel Chair",
      description: "Swivel chair",
      category: "Chair",
      images: [
        {
          id: "chair-002-1",
          url: "/images/products/chair/swivel-chair/sc1.jpg",
          alt: "Swivel chair",
          featured: true
        },
        {
          id: "chair-002-2",
          url: "/images/products/chair/swivel-chair/sc2.jpg",
          alt: "Swivel chair side view",
          featured: false
        }
      ],
      features: ["360° rotation", "Comfortable seat", "Adjustable height"],
      specifications: {
        "Material": "Leather with steel base",
        "Dimensions": "50x50x120cm",
        "Weight capacity": "150kg"
      }
    },
    {
      id: "chair-003",
      name: "Administration Chair",
      description: "Administration chair",
      category: "Chair",
      images: [
        {
          id: "chair-003-1",
          url: "/images/products/chair/administration-chair/ad1.jpg",
          alt: "Administration chair",
          featured: true
        },
        {
          id: "chair-003-2",
          url: "/images/products/chair/administration-chair/ad2.jpg",
          alt: "Administration chair side view",
          featured: false
        },
        {
          id: "chair-003-3",
          url: "/images/products/chair/administration-chair/ad3.jpg",
          alt: "Administration chair back view",
          featured: false
        },
        {
          id: "chair-003-4",
          url: "/images/products/chair/administration-chair/ad4.jpg",
          alt: "Administration chair detail",
          featured: false
        },
        {
          id: "chair-003-5",
          url: "/images/products/chair/administration-chair/ad5.jpg",
          alt: "Administration chair base",
          featured: false
        },
        {
          id: "chair-003-6",
          url: "/images/products/chair/administration-chair/ad6.jpg",
          alt: "Administration chair armrest",
          featured: false
        }
      ],
      features: ["Premium leather", "Ergonomic design", "Adjustable"],
      specifications: {
        "Material": "Premium leather with wood frame",
        "Dimensions": "55x55x130cm",
        "Weight capacity": "180kg"
      }
    },
    {
      id: "chair-004",
      name: "laguna 3s with table",
      description: "Laguna 3-seat chair with table",
      category: "Chair",
      images: [
        {
          id: "chair-004-1",
          url: "/images/products/chair/laguna-3s-with-table/l3swt1.jpg",
          alt: "Laguna 3-seat chair with table",
          featured: true
        },
        {
          id: "chair-004-2",
          url: "/images/products/chair/laguna-3s-with-table/l3swt2.jpg",
          alt: "Laguna 3-seat chair with table side view",
          featured: false
        },
        {
          id: "chair-004-3",
          url: "/images/products/chair/laguna-3s-with-table/l3swt3.jpg",
          alt: "Laguna 3-seat chair with table back view",
          featured: false
        },
        {
          id: "chair-004-4",
          url: "/images/products/chair/laguna-3s-with-table/l3swt4.jpg",
          alt: "Laguna 3-seat chair with table detail",
          featured: false
        },
        {
          id: "chair-004-5",
          url: "/images/products/chair/laguna-3s-with-table/l3swt5.jpg",
          alt: "Laguna 3-seat chair with table top view",
          featured: false
        },
        {
          id: "chair-004-6",
          url: "/images/products/chair/laguna-3s-with-table/l3swt6.jpg",
          alt: "Laguna 3-seat chair with table base",
          featured: false
        }
      ],
      features: ["3 seats", "Built-in table", "Space saving"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "180x60x75cm",
        "Seats": "3"
      }
    },
    {
      id: "chair-005",
      name: "laguna 4s",
      description: "Laguna 4-seat chair",
      category: "Chair",
      images: [
        {
          id: "chair-005-1",
          url: "/images/products/chair/laguna-4s/l4s1.jpg",
          alt: "Laguna 4-seat chair",
          featured: true
        },
        {
          id: "chair-005-2",
          url: "/images/products/chair/laguna-4s/l4s2.jpg",
          alt: "Laguna 4-seat chair side view",
          featured: false
        },
        {
          id: "chair-005-3",
          url: "/images/products/chair/laguna-4s/l4s3.jpg",
          alt: "Laguna 4-seat chair back view",
          featured: false
        },
        {
          id: "chair-005-4",
          url: "/images/products/chair/laguna-4s/l4s4.jpg",
          alt: "Laguna 4-seat chair detail",
          featured: false
        },
        {
          id: "chair-005-5",
          url: "/images/products/chair/laguna-4s/l4s5.jpg",
          alt: "Laguna 4-seat chair base",
          featured: false
        },
        {
          id: "chair-005-6",
          url: "/images/products/chair/laguna-4s/l4s6.jpg",
          alt: "Laguna 4-seat chair top view",
          featured: false
        },
        {
          id: "chair-005-7",
          url: "/images/products/chair/laguna-4s/l4s7.jpg",
          alt: "Laguna 4-seat chair armrest",
          featured: false
        }
      ],
      features: ["4 seats", "Comfortable", "Durable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "200x60x75cm",
        "Seats": "4"
      }
    },
    {
      id: "chair-006",
      name: "scarlet 4s",
      description: "Scarlet 4-seat chair",
      category: "Chair",
      images: [
        {
          id: "chair-006-1",
          url: "/images/products/chair/scarlet-4s/s4s1.jpg",
          alt: "Scarlet 4-seat chair",
          featured: true
        },
        {
          id: "chair-006-2",
          url: "/images/products/chair/scarlet-4s/s4s2.jpg",
          alt: "Scarlet 4-seat chair side view",
          featured: false
        },
        {
          id: "chair-006-3",
          url: "/images/products/chair/scarlet-4s/s4s3.jpg",
          alt: "Scarlet 4-seat chair back view",
          featured: false
        },
        {
          id: "chair-006-4",
          url: "/images/products/chair/scarlet-4s/s4s4.jpg",
          alt: "Scarlet 4-seat chair detail",
          featured: false
        },
        {
          id: "chair-006-5",
          url: "/images/products/chair/scarlet-4s/s4s5.jpg",
          alt: "Scarlet 4-seat chair base",
          featured: false
        },
        {
          id: "chair-006-6",
          url: "/images/products/chair/scarlet-4s/s4s6.jpg",
          alt: "Scarlet 4-seat chair top view",
          featured: false
        }
      ],
      features: ["4 seats", "Modern design", "Comfortable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "200x60x75cm",
        "Seats": "4"
      }
    },
    {
      id: "chair-007",
      name: "scarlet 3s with table",
      description: "Scarlet 3-seat chair with table",
      category: "Chair",
      images: [
        {
          id: "chair-007-1",
          url: "/images/products/chair/scarlet-3s-with-table/s3swt1.jpg",
          alt: "Scarlet 3-seat chair with table",
          featured: true
        },
        {
          id: "chair-007-2",
          url: "/images/products/chair/scarlet-3s-with-table/s3swt2.jpg",
          alt: "Scarlet 3-seat chair with table side view",
          featured: false
        },
        {
          id: "chair-007-3",
          url: "/images/products/chair/scarlet-3s-with-table/s3swt3.jpg",
          alt: "Scarlet 3-seat chair with table back view",
          featured: false
        },
        {
          id: "chair-007-4",
          url: "/images/products/chair/scarlet-3s-with-table/s3swt4.jpg",
          alt: "Scarlet 3-seat chair with table detail",
          featured: false
        },
        {
          id: "chair-007-5",
          url: "/images/products/chair/scarlet-3s-with-table/s3swt5.jpg",
          alt: "Scarlet 3-seat chair with table top view",
          featured: false
        }
      ],
      features: ["3 seats", "Built-in table", "Modern design"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "180x60x75cm",
        "Seats": "3"
      }
    },
    {
      id: "chair-008",
      name: "scarlet 4s with table",
      description: "Scarlet 4-seat chair with table",
      category: "Chair",
      images: [
        {
          id: "chair-008-1",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt1.jpg",
          alt: "Scarlet 4-seat chair with table",
          featured: true
        },
        {
          id: "chair-008-2",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt2.jpg",
          alt: "Scarlet 4-seat chair with table side view",
          featured: false
        },
        {
          id: "chair-008-3",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt3.jpg",
          alt: "Scarlet 4-seat chair with table back view",
          featured: false
        },
        {
          id: "chair-008-4",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt4.jpg",
          alt: "Scarlet 4-seat chair with table detail",
          featured: false
        },
        {
          id: "chair-008-5",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt5.jpg",
          alt: "Scarlet 4-seat chair with table top view",
          featured: false
        },
        {
          id: "chair-008-6",
          url: "/images/products/chair/scarlet-4s-with-table/s4swt6.jpg",
          alt: "Scarlet 4-seat chair with table base",
          featured: false
        }
      ],
      features: ["4 seats", "Built-in table", "Modern design"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "200x60x75cm",
        "Seats": "4"
      }
    },
    {
      id: "chair-009",
      name: "laguna 4s with table",
      description: "Laguna 4-seat chair with table",
      category: "Chair",
      images: [
        {
          id: "chair-009-1",
          url: "/images/products/chair/laguna-4s-with-table/l4swt1.jpg",
          alt: "Laguna 4-seat chair with table",
          featured: true
        },
        {
          id: "chair-009-2",
          url: "/images/products/chair/laguna-4s-with-table/l4swt2.jpg",
          alt: "Laguna 4-seat chair with table side view",
          featured: false
        },
        {
          id: "chair-009-3",
          url: "/images/products/chair/laguna-4s-with-table/l4swt3.jpg",
          alt: "Laguna 4-seat chair with table back view",
          featured: false
        },
        {
          id: "chair-009-4",
          url: "/images/products/chair/laguna-4s-with-table/l4swt4.jpg",
          alt: "Laguna 4-seat chair with table detail",
          featured: false
        },
        {
          id: "chair-009-5",
          url: "/images/products/chair/laguna-4s-with-table/l4swt5.jpg",
          alt: "Laguna 4-seat chair with table top view",
          featured: false
        },
        {
          id: "chair-009-6",
          url: "/images/products/chair/laguna-4s-with-table/l4swt6.jpg",
          alt: "Laguna 4-seat chair with table base",
          featured: false
        },
        {
          id: "chair-009-7",
          url: "/images/products/chair/laguna-4s-with-table/l4swt7.jpg",
          alt: "Laguna 4-seat chair with table armrest",
          featured: false
        }
      ],
      features: ["4 seats", "Built-in table", "Comfortable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "200x60x75cm",
        "Seats": "4"
      }
    },
    {
      id: "chair-010",
      name: "Typist Chair with footrest",
      description: "Typist chair with additional features",
      category: "Chair",
      images: [
        {
          id: "chair-010-1",
          url: "/images/products/chair/typist-chair-with-footrest/tcwf1.jpg",
          alt: "Typist chair with additional features",
          featured: true
        },
        {
          id: "chair-010-2",
          url: "/images/products/chair/typist-chair-with-footrest/tcwf2.jpg",
          alt: "Typist chair with footrest side view",
          featured: false
        },
        {
          id: "chair-010-3",
          url: "/images/products/chair/typist-chair-with-footrest/tcwf3.jpg",
          alt: "Typist chair with footrest back view",
          featured: false
        }
      ],
      features: ["Ergonomic", "Adjustable height", "Lumbar support"],
      specifications: {
        "Material": "Mesh with steel frame",
        "Dimensions": "45x45x115cm",
        "Weight capacity": "130kg"
      }
    },
    {
      id: "chair-011",
      name: "Swivel Chair with footrest",
      description: "Swivel chair with additional features",
      category: "Chair",
      images: [
        {
          id: "chair-011-1",
          url: "/images/products/chair/swivel-chair-with-footrest/scwf1.jpg",
          alt: "Swivel chair with additional features",
          featured: true
        },
        {
          id: "chair-011-2",
          url: "/images/products/chair/swivel-chair-with-footrest/scwf2.jpg",
          alt: "Swivel chair with footrest side view",
          featured: false
        },
        {
          id: "chair-011-3",
          url: "/images/products/chair/swivel-chair-with-footrest/scwf3.jpg",
          alt: "Swivel chair with footrest back view",
          featured: false
        }
      ],
      features: ["360° rotation", "Adjustable height", "Armrests"],
      specifications: {
        "Material": "Leather with steel base",
        "Dimensions": "55x55x125cm",
        "Weight capacity": "160kg"
      }
    },
    {
      id: "chair-012",
      name: "Typist Chair with Sidearms",
      description: "Alternative typist chair with features",
      category: "Chair",
      images: [
        {
          id: "chair-012-1",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa1.jpg",
          alt: "Alternative typist chair with features",
          featured: true
        },
        {
          id: "chair-012-2",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa2.jpg",
          alt: "Typist chair with sidearms side view",
          featured: false
        },
        {
          id: "chair-012-3",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa3.jpg",
          alt: "Typist chair with sidearms back view",
          featured: false
        },
        {
          id: "chair-012-4",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa4.jpg",
          alt: "Typist chair with sidearms detail",
          featured: false
        },
        {
          id: "chair-012-5",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa5.jpg",
          alt: "Typist chair with sidearms armrest",
          featured: false
        },
        {
          id: "chair-012-6",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa6.jpg",
          alt: "Typist chair with sidearms base",
          featured: false
        },
        {
          id: "chair-012-7",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa7.jpg",
          alt: "Typist chair with sidearms top view",
          featured: false
        },
        {
          id: "chair-012-8",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa8.jpg",
          alt: "Typist chair with sidearms adjustment",
          featured: false
        },
        {
          id: "chair-012-9",
          url: "/images/products/chair/typist-chair-with-side-arm/tcwsa9.jpg",
          alt: "Typist chair with sidearms close-up",
          featured: false
        }
      ],
      features: ["Ergonomic", "Adjustable height", "Breathable mesh"],
      specifications: {
        "Material": "Mesh with steel frame",
        "Dimensions": "45x45x110cm",
        "Weight capacity": "125kg"
      }
    },
    {
      id: "chair-013",
      name: "Administration Chair with rollers",
      description: "Extended administration chair",
      category: "Chair",
      images: [
        {
          id: "chair-013-1",
          url: "/images/products/chair/administration-chair-with-roller/adwr1.jpg",
          alt: "Extended administration chair",
          featured: true
        },
        {
          id: "chair-013-2",
          url: "/images/products/chair/administration-chair-with-roller/adwr2.jpg",
          alt: "Administration chair with rollers side view",
          featured: false
        },
        {
          id: "chair-013-3",
          url: "/images/products/chair/administration-chair-with-roller/adwr3.jpg",
          alt: "Administration chair with rollers back view",
          featured: false
        }
      ],
      features: ["Premium leather", "Extended backrest", "Adjustable"],
      specifications: {
        "Material": "Premium leather with wood frame",
        "Dimensions": "55x55x140cm",
        "Weight capacity": "180kg"
      }
    },
    {
      id: "chair-014",
      name: "Mulltipurpose Chair Mild Steel (Coating)",
      description: "Multipurpose chair option 1",
      category: "Chair",
      images: [
        {
          id: "chair-014-1",
          url: "/images/products/chair/multipurpose-chair-mild-steel-coating/mcmsc1.jpg",
          alt: "Multipurpose chair option 1",
          featured: true
        },
        {
          id: "chair-014-2",
          url: "/images/products/chair/multipurpose-chair-mild-steel-coating/mcmsc2.jpg",
          alt: "Multipurpose chair side view",
          featured: false
        },
        {
          id: "chair-014-3",
          url: "/images/products/chair/multipurpose-chair-mild-steel-coating/mcmsc3.jpg",
          alt: "Multipurpose chair back view",
          featured: false
        }
      ],
      features: ["Versatile", "Comfortable", "Durable"],
      specifications: {
        "Material": "Plastic with steel base",
        "Dimensions": "45x45x90cm",
        "Weight capacity": "100kg"
      }
    },
    {
      id: "chair-015",
      name: "Multipurpose Chair with Table (Coating)",
      description: "Multipurpose chair option 2",
      category: "Chair",
      images: [
        {
          id: "chair-015-1",
          url: "/images/products/chair/multipurpose-chair-with-table-coating/mcwtc1.jpg",
          alt: "Multipurpose chair option 2",
          featured: true
        },
        {
          id: "chair-015-2",
          url: "/images/products/chair/multipurpose-chair-with-table-coating/mcwtc2.jpg",
          alt: "Multipurpose chair with table side view",
          featured: false
        },
        {
          id: "chair-015-3",
          url: "/images/products/chair/multipurpose-chair-with-table-coating/mcwtc3.jpg",
          alt: "Multipurpose chair with table back view",
          featured: false
        }
      ],
      features: ["Versatile", "Stackable", "Lightweight"],
      specifications: {
        "Material": "Plastic with steel base",
        "Dimensions": "45x45x85cm",
        "Weight capacity": "90kg"
      }
    },
    {
      id: "chair-016",
      name: "Multipurpose Chair stainless steel",
      description: "Multipurpose chair option 3",
      category: "Chair",
      images: [
        {
          id: "chair-016-1",
          url: "/images/products/chair/multipurpose-chair-stainless-steel/mcss1.jpg",
          alt: "Multipurpose chair option 3",
          featured: true
        },
        {
          id: "chair-016-2",
          url: "/images/products/chair/multipurpose-chair-stainless-steel/mcss2.jpg",
          alt: "Multipurpose chair side view",
          featured: false
        },
        {
          id: "chair-016-3",
          url: "/images/products/chair/multipurpose-chair-stainless-steel/mcss3.jpg",
          alt: "Multipurpose chair back view",
          featured: false
        }
      ],
      features: ["Versatile", "Comfortable", "Stackable"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "45x45x90cm",
        "Weight capacity": "120kg"
      }
    },
    {
      id: "chair-017",
      name: "Multipurpose Chair with Table Stainless Steel",
      description: "Multipurpose chair option 4",
      category: "Chair",
      images: [
        {
          id: "chair-017-1",
          url: "/images/products/chair/multipurpose-chair-with-table-stainless-steel/mcwtss1.jpg",
          alt: "Multipurpose chair option 4",
          featured: true
        },
        {
          id: "chair-017-2",
          url: "/images/products/chair/multipurpose-chair-with-table-stainless-steel/mcwtss2.jpg",
          alt: "Multipurpose chair with table side view",
          featured: false
        },
        {
          id: "chair-017-3",
          url: "/images/products/chair/multipurpose-chair-with-table-stainless-steel/mcwtss3.jpg",
          alt: "Multipurpose chair with table back view",
          featured: false
        },
        {
          id: "chair-017-4",
          url: "/images/products/chair/multipurpose-chair-with-table-stainless-steel/mcwtss4.jpg",
          alt: "Multipurpose chair with table detail",
          featured: false
        },
        {
          id: "chair-017-5",
          url: "/images/products/chair/multipurpose-chair-with-table-stainless-steel/mcwtss5.jpg",
          alt: "Multipurpose chair with table top view",
          featured: false
        }
      ],
      features: ["Versatile", "Comfortable", "Adjustable height"],
      specifications: {
        "Material": "Wood and steel",
        "Dimensions": "45x45x100cm",
        "Weight capacity": "130kg"
      }
    },
    {
      id: "chair-018",
      name: "Classroom Chair",
      description: "Classroom chair",
      category: "Chair",
      images: [
        {
          id: "chair-018-1",
          url: "/images/products/chair/classroom-chair/cr1.jpg",
          alt: "Classroom chair",
          featured: true
        },
        {
          id: "chair-018-2",
          url: "/images/products/chair/classroom-chair/cr2.jpg",
          alt: "Classroom chair side view",
          featured: false
        },
        {
          id: "chair-018-3",
          url: "/images/products/chair/classroom-chair/cr3.jpg",
          alt: "Classroom chair back view",
          featured: false
        },
        {
          id: "chair-018-4",
          url: "/images/products/chair/classroom-chair/cr4.jpg",
          alt: "Classroom chair detail",
          featured: false
        },
        {
          id: "chair-018-5",
          url: "/images/products/chair/classroom-chair/cr5.jpg",
          alt: "Classroom chair base",
          featured: false
        },
        {
          id: "chair-018-6",
          url: "/images/products/chair/classroom-chair/cr6.jpg",
          alt: "Classroom chair stack",
          featured: false
        }
      ],
      features: ["Durable", "Stackable", "Comfortable"],
      specifications: {
        "Material": "Plastic with steel base",
        "Dimensions": "40x40x80cm",
        "Weight capacity": "80kg"
      }
    }
  ]
};