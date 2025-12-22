// src/data/product/tool-cart.ts
import { CategoryData } from './product-types';

export const toolCartData: CategoryData = {
  category: "Tool Cart",
  description: "Mobile tool cart solutions",
  products: [
    {
      id: "tool-cart-001",
      name: "Tool Cart",
      description: "Mobile tool cart",
      category: "Tool Cart",
      images: [
        {
          id: "tool-cart-001-1",
          url: "/images/products/tool-cart/tc1.jpg",
          alt: "Mobile tool cart",
          featured: true
        },
        {
          id: "tool-cart-001-2",
          url: "/images/products/tool-cart/tc2.jpg",
          alt: "Mobile tool cart side view",
          featured: false
        },
        {
          id: "tool-cart-001-3",
          url: "/images/products/tool-cart/tc3.jpg",
          alt: "Mobile tool cart open view",
          featured: false
        },
        {
          id: "tool-cart-001-4",
          url: "/images/products/tool-cart/tc4.jpg",
          alt: "Mobile tool cart back view",
          featured: false
        },
        {
          id: "tool-cart-001-5",
          url: "/images/products/tool-cart/tc5.jpg",
          alt: "Mobile tool cart drawer view",
          featured: false
        }
      ],
      features: ["Mobile", "Sturdy", "Multiple drawers"],
      specifications: {
        "Model": "Tool Cart",
        "Dimensions": "600x450x850mm",
        "Drawers": "5"
      }
    }
  ]
};