// src/data/product/board.ts
import { CategoryData } from './product-types';

export const boardData: CategoryData = {
  category: "Board",
  description: "Whiteboards and display boards",
  products: [
    {
      id: "board-001",
      name: "sliding folding board",
      description: "Sliding folding board",
      category: "Board",
      images: [
        {
          id: "board-001-1",
          url: "/images/products/board/sliding-folding-board/sfb1.jpg",
          alt: "Sliding folding board",
          featured: true
        },
        {
          id: "board-001-2",
          url: "/images/products/board/sliding-folding-board/sfb2.jpg",
          alt: "Sliding folding board side view",
          featured: false
        },
        {
          id: "board-001-3",
          url: "/images/products/board/sliding-folding-board/sfb3.jpg",
          alt: "Sliding folding board",
          featured: true
        },
        {
          id: "board-001-4",
          url: "/images/products/board/sliding-folding-board/sfb4.jpg",
          alt: "Sliding folding board side view",
          featured: false
        }
      ],
      features: ["Easy installation", "Space saving", "Durable material"],
      specifications: {
        "Material": "Steel",
        "Dimensions": "120x90cm",
        "Weight": "5kg"
      }
    },
    {
      id: "board-002",
      name: "White Board",
      description: "Standard white board",
      category: "Board",
      images: [
        {
          id: "board-002-1",
          url: "/images/products/board/white-board/wb1.jpg",
          alt: "Standard white board",
          featured: true
        },
        {
          id: "board-002-2",
          url: "/images/products/board/white-board/wb2.jpg",
          alt: "Standard white board side view",
          featured: false
        }
      ],
      features: ["Smooth surface", "Easy to clean", "Magnetic surface"],
      specifications: {
        "Material": "Porcelain",
        "Dimensions": "90x120cm",
        "Color": "White"
      }
    },
    {
      id: "board-003",
      name: "White Board with Roller",
      description: "White board with additional features",
      category: "Board",
      images: [
        {
          id: "board-003-1",
          url: "/images/products/board/white-board-with-roller/wbwr1.jpg",
          alt: "White board with additional features",
          featured: true
        },
        {
          id: "board-003-2",
          url: "/images/products/board/white-board-with-roller/wbwr2.jpg",
          alt: "White board with additional features side view",
          featured: false
        },
        {
          id: "board-003-3",
          url: "/images/products/board/white-board-with-roller/wbwr3.jpg",
          alt: "Roller close up",
          featured: false
        }
      ],
      features: ["Built-in tray", "Mobile stand", "Adjustable height"],
      specifications: {
        "Material": "Steel with porcelain surface",
        "Dimensions": "100x150cm",
        "Color": "White with aluminum frame"
      }
    },
    {
      id: "board-004",
      name: "Board Sliding 3 Layer",
      description: "3-layer sliding board",
      category: "Board",
      images: [
        {
          id: "board-004-1",
          url: "/images/products/board/board-sliding-3-layer/bs3l1.png",
          alt: "3-layer sliding board",
          featured: true
        },
        {
          id: "board-004-2",
          url: "/images/products/board/board-sliding-3-layer/bs3l2.png",
          alt: "3-layer sliding board open view",
          featured: false
        },
        {
          id: "board-004-3",
          url: "/images/products/board/board-sliding-3-layer/bs3l3.png",
          alt: "3-layer sliding board side view",
          featured: false
        },
        {
          id: "board-004-4",
          url: "/images/products/board/board-sliding-3-layer/bs3l4.png",
          alt: "3-layer sliding board locking mechanism",
          featured: false
        }
      ],
      features: ["3 sliding panels", "Locking mechanism", "Easy to write"],
      specifications: {
        "Material": "Aluminum frame with PVC panels",
        "Dimensions": "120x180cm",
        "Number of layers": "3"
      }
    }
  ]
};