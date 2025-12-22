// src/data/product/cabinet.ts
import { CategoryData } from './product-types';

export const cabinetData: CategoryData = {
  category: "Cabinet",
  description: "Various cabinet solutions for office and industrial use",
  products: [
    {
      id: "cabinet-000",
      name: "Custom Cabinet Expo",
      description: "Multi Function Custom cabinet with Compartment, Locker and Drawer",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-000-1",
          url: "/images/products/cabinet/custom-cabinet-expo/cce1.png",
          alt: "Custom Cabinet Expo front view",
          featured: true
        },
        {
          id: "cabinet-000-2",
          url: "/images/products/cabinet/custom-cabinet-expo/cce2.png",
          alt: "Locker cabinet side view",
          featured: false
        },
        {
          id: "cabinet-000-3",  
          url: "/images/products/cabinet/custom-cabinet-expo/cce3.png",
          alt: "Locker cabinet open view",
          featured: false
        }
      ],
      features: ["Multiple compartments", "Durable construction", "Lockable doors"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "90x45x180cm",
        "Compartments": "6"
      }
    },
    {
      id: "cabinet-001",
      name: "Small Cabinet Sliding Door",
      description: "Small sliding cabinet for storage",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-001-1",
          url: "/images/products/cabinet/small-cabinet-sliding-door/scsd1.png",
          alt: "Small sliding cabinet",
          featured: true
        },
        {
          id: "cabinet-001-2",
          url: "/images/products/cabinet/small-cabinet-sliding-door/scsd2.png",
          alt: "Small sliding cabinet side view",
          featured: false
        },
        {
          id: "cabinet-001-3",
          url: "/images/products/cabinet/small-cabinet-sliding-door/scsd3.png",    
          alt: "Small sliding cabinet open view",
          featured: false
        },
        {
          id: "cabinet-001-4",
          url: "/images/products/cabinet/small-cabinet-sliding-door/scsd4.png",    
          alt: "Small sliding cabinet drawer view",
          featured: false
        }
      ],
      features: ["Space saving", "Easy access", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "40x40x120cm",
        "Drawers": "2"
      }
    },
    {
      id: "cabinet-002",
      name: "Big Cabinet Sliding Door",
      description: "Large sliding cabinet for storage",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-002-1",
          url: "/images/products/cabinet/big-cabinet-sliding-door/bcsd1.jpg",
          alt: "Big sliding cabinet",
          featured: true
        },
        {
          id: "cabinet-002-2",
          url: "/images/products/cabinet/big-cabinet-sliding-door/bcsd2.jpg",
          alt: "Big sliding cabinet side view",
          featured: false
        },
        {
          id: "cabinet-002-3",
          url: "/images/products/cabinet/big-cabinet-sliding-door/bcsd3.jpg",
          alt: "Big sliding cabinet open view",
          featured: false
        }
      ],
      features: ["Large capacity", "Smooth sliding", "Durable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x60x180cm",
        "Drawers": "4"
      }
    },
    {
      id: "cabinet-003",
      name: "Filing Cabinet 2D",
      description: "2-drawer filing cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-003-1",
          url: "/images/products/cabinet/filing-cabinet-2d/fc2d1.jpg",
          alt: "2-drawer filing cabinet",
          featured: true
        },
        {
          id: "cabinet-003-2",
          url: "/images/products/cabinet/filing-cabinet-2d/fc2d2.jpg",
          alt: "2-drawer filing cabinet side view",
          featured: false
        },
        {
          id: "cabinet-003-3",
          url: "/images/products/cabinet/filing-cabinet-2d/fc2d3.jpg",
          alt: "2-drawer filing cabinet open view",
          featured: false
        }
      ],
      features: ["A4 size", "Lockable", "Smooth drawers"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x40x70cm",
        "Drawers": "2"
      }
    },
    {
      id: "cabinet-004",
      name: "Filing Cabinet 3D",
      description: "3-drawer filing cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-004-1",
          url: "/images/products/cabinet/filing-cabinet-3d/fc3d1.jpg",
          alt: "3-drawer filing cabinet",
          featured: true
        },
        {
          id: "cabinet-004-2",
          url: "/images/products/cabinet/filing-cabinet-3d/fc3d2.jpg",
          alt: "3-drawer filing cabinet side view",
          featured: false
        },
        {
          id: "cabinet-004-3",
          url: "/images/products/cabinet/filing-cabinet-3d/fc3d3.jpg",
          alt: "3-drawer filing cabinet open view",
          featured: false
        }
      ],
      features: ["A4 size", "Lockable", "Smooth drawers"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x40x100cm",
        "Drawers": "3"
      }
    },
    {
      id: "cabinet-005",
      name: "Filing Cabinet 4D",
      description: "4-drawer filing cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-005-1",
          url: "/images/products/cabinet/filing-cabinet-4d/fc4d1.jpg",
          alt: "4-drawer filing cabinet",
          featured: true
        },
        {
          id: "cabinet-005-2",
          url: "/images/products/cabinet/filing-cabinet-4d/fc4d2.jpg",
          alt: "4-drawer filing cabinet side view",
          featured: false
        },
        {
          id: "cabinet-005-3",
          url: "/images/products/cabinet/filing-cabinet-4d/fc4d3.jpg",
          alt: "4-drawer filing cabinet open view",
          featured: false
        }
      ],
      features: ["A4 size", "Lockable", "Smooth drawers"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x40x130cm",
        "Drawers": "4"
      }
    },
    {
      id: "cabinet-006",
      name: "Filing Cabinet 4D 2 lock",
      description: "4-drawer filing cabinet with 2 locks",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-006-1",
          url: "/images/products/cabinet/filing-cabinet-4d-2lock/fc4d2l1.jpg",
          alt: "Standard filing cabinet",
          featured: true
        },
        {
          id: "cabinet-006-2",
          url: "/images/products/cabinet/filing-cabinet-4d-2lock/fc4d2l2.jpg",
          alt: "Filing cabinet side view",
          featured: false
        },
        {
          id: "cabinet-006-3",
          url: "/images/products/cabinet/filing-cabinet-4d-2lock/fc4d2l3.jpg",
          alt: "Filing cabinet open view",
          featured: false
        }
      ],
      features: ["A4 size", "Lockable", "Smooth drawers"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x40x100cm",
        "Drawers": "3"
      }
    },
    {
      id: "cabinet-007",
      name: "Filing Cabinet 4D 4 lock",
      description: "4-drawer filing cabinet with 4 locks",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-007-1",
          url: "/images/products/cabinet/filing-cabinet-4d-4lock/fc4d4l1.jpg",
          alt: "Additional filing cabinet option",
          featured: true
        },
        {
          id: "cabinet-007-2",
          url: "/images/products/cabinet/filing-cabinet-4d-4lock/fc4d4l2.jpg",
          alt: "Filing cabinet side view",
          featured: false
        },
        { 
          id: "cabinet-007-3",
          url: "/images/products/cabinet/filing-cabinet-4d-4lock/fc4d4l3.jpg",
          alt: "Filing cabinet open view",
          featured: false
        }
      ],
      features: ["A3 size", "Lockable", "Smooth drawers"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x100cm",
        "Drawers": "3"
      }
    },
    {
      id: "cabinet-008",
      name: "Trolley for Filing Cabinets",
      description: "Mobile trolley for filing cabinets",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-008-1",
          url: "/images/products/cabinet/trolley-filing/tffc1.jpg",
          alt: "Mobile trolley for filing cabinets",
          featured: true
        },
        {
          id: "cabinet-008-2",
          url: "/images/products/cabinet/trolley-filing/tffc2.jpg",
          alt: "Trolley side view",
          featured: false
        },
        { 
          id: "cabinet-008-3",
          url: "/images/products/cabinet/trolley-filing/tffc3.jpg",
          alt: "Trolley close up view",
          featured: false
        }
      ],
      features: ["Mobile", "Sturdy", "Easy to assemble"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "60x40x70cm",
        "Wheels": "4"
      }
    },
    {
      id: "cabinet-009",
      name: "Cabinet Floor 1D",
      description: "Single door floor cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-009-1",
          url: "/images/products/cabinet/cabinet-floor-1d/cf1d2.png",
          alt: "Single door floor cabinet",
          featured: true
        },
        {
          id: "cabinet-009-2",
          url: "/images/products/cabinet/cabinet-floor-1d/cf1d1.png",
          alt: "Cabinet side view",
          featured: false
        },
        { 
          id: "cabinet-009-3",
          url: "/images/products/cabinet/cabinet-floor-1d/cf1d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-009-4",
          url: "/images/products/cabinet/cabinet-floor-1d/cf1d4.png",
          alt: "Cabinet inside view",
          featured: false
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "1"
      }
    },
    {
      id: "cabinet-010",
      name: "Cabinet Floor 2D",
      description: "Double door floor cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-010-1",
          url: "/images/products/cabinet/cabinet-floor-2d/cf2d1.png",
          alt: "Double door floor cabinet",
          featured: true
        },
        {
          id: "cabinet-010-2",
          url: "/images/products/cabinet/cabinet-floor-2d/cf2d2.png",
          alt: "Cabinet side view",
          featured: false
        },
        { 
          id: "cabinet-010-3",
          url: "/images/products/cabinet/cabinet-floor-2d/cf2d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-010-4",
          url: "/images/products/cabinet/cabinet-floor-2d/cf2d4.png",
          alt: "Cabinet inside view",
          featured: false
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "1"
      }
    },
    {
      id: "cabinet-011",
      name: "Cabinet Floor 4D",
      description: "Four drawer floor cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-011-1",
          url: "/images/products/cabinet/cabinet-floor-4d/cf4d1.png",
          alt: "Four drawer floor cabinet",
          featured: true
        },
        {
          id: "cabinet-011-2",
          url: "/images/products/cabinet/cabinet-floor-4d/cf4d2.png",
          alt: "Cabinet side view",
          featured: false
        },
        { 
          id: "cabinet-011-3",
          url: "/images/products/cabinet/cabinet-floor-4d/cf4d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-011-4",
          url: "/images/products/cabinet/cabinet-floor-4d/cf4d4.png",
          alt: "Cabinet inside view",
          featured: false
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "4"
      }
    },
    {
      id: "cabinet-012",
      name: "Cabinet Floor 8D",
      description: "Eight drawer floor cabinet",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-012-1",
          url: "/images/products/cabinet/cabinet-floor-8d/cf8d1.png",
          alt: "Eight drawer floor cabinet",
          featured: true
        },
        {
          id: "cabinet-012-2",
          url: "/images/products/cabinet/cabinet-floor-8d/cf8d2.png",
          alt: "Cabinet side view",
          featured: false
        },
        {
          id: "cabinet-012-3",
          url: "/images/products/cabinet/cabinet-floor-8d/cf8d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-012-4",
          url: "/images/products/cabinet/cabinet-floor-8d/cf8d4.png",
          alt: "Cabinet inside view",
          featured: false
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "8"
      }
    },
    {
      id: "cabinet-013",
      name: "Cabinet floor 1D1D",
      description: "Combination floor cabinet with door and drawer",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-013-1",
          url: "/images/products/cabinet/cabinet-floor-1d1d/cf1d1d1.png",
          alt: "Combination floor cabinet with door and drawer",
          featured: true
        },
        {
          id: "cabinet-013-2",
          url: "/images/products/cabinet/cabinet-floor-1d1d/cf1d1d2.png",
          alt: "Cabinet side view",
          featured: false
        },
        {
          id: "cabinet-013-3",
          url: "/images/products/cabinet/cabinet-floor-1d1d/cf1d1d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-013-4",
          url: "/images/products/cabinet/cabinet-floor-1d1d/cf1d1d4.png",
          alt: "Cabinet inside view",
          featured: false 
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "1",
        "Drawers": "1"
      }
    },
    {
      id: "cabinet-014",
      name: "Cabinet Floor 2D2D",
      description: "Combination floor cabinet with doors and drawers",
      category: "Cabinet",
      images: [
        {
          id: "cabinet-014-1", 
          url: "/images/products/cabinet/cabinet-floor-2d2d/cf2d2d1.png",
          alt: "Combination floor cabinet with doors and drawers",
          featured: true
        },
        {
          id: "cabinet-014-2",  
          url: "/images/products/cabinet/cabinet-floor-2d2d/cf2d2d2.png",
          alt: "Cabinet side view",
          featured: false
        },
        {
          id: "cabinet-014-3",
          url: "/images/products/cabinet/cabinet-floor-2d2d/cf2d2d3.png",
          alt: "Cabinet open view",
          featured: false
        },
        {
          id: "cabinet-014-4",
          url: "/images/products/cabinet/cabinet-floor-2d2d/cf2d2d4.png",
          alt: "Cabinet inside view",
          featured: false
        }
      ],
      features: ["Spacious", "Durable", "Lockable"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "80x40x180cm",
        "Shelves": "2",
        "Drawers": "2"
      }
    },
    
  ]
};