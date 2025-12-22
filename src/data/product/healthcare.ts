import {  CategoryData } from './product-types';

export const healthcareData: CategoryData = {
    category: "Healthcare",
    description: "Healthcare and medical equipment",
    products: [
        {
            id: "healthcare-001",
            name: "Medical Trolley",
            description: "Stainless steel medical trolley with multiple shelves",
            category: "Healthcare",
            images: [
                {
                    id: "healthcare-001-1",
                    url: "/images/products/healthcare/medical-trolley/mt1.jpg",
                    alt: "Stainless steel medical trolley",
                    featured: true
                },
                {
                    id: "healthcare-001-2",
                    url: "/images/products/healthcare/medical-trolley/mt2.jpg",
                    alt: "Medical trolley side view",
                    featured: false
                }
            ],
            features: ["Stainless steel", "Multiple shelves", "Lockable wheels"],
            specifications: {
                "Material": "Stainless Steel",
                "Dimensions": "90x45x85cm",
                "Weight": "15kg"
            }
        },
        {
            id: "healthcare-003",
            name: "Bed Single A",
            description: "Bed Single A",
            category: "Healthcare",
            images: [
                {
                    id: "healthcare-003-1",
                    url: "/images/products/healthcare/bed-single-a/bsa1.png",
                    alt: "Adjustable hospital bed",
                    featured: true
                },
                {
                    id: "healthcare-003-2",
                    url: "/images/products/healthcare/bed-single-a/bsa2.png",
                    alt: "Hospital bed side view",
                    featured: false
                },
                {
                    id: "healthcare-003-3",
                    url: "/images/products/healthcare/bed-single-a/bsa3.png",
                    alt: "Hospital bed with mattress",
                    featured: false
                }
            ],
            features: ["Adjustable height", "Side rails", "Durable frame"],
            specifications: {
                "Material": "Steel Frame with Foam Mattress",
                "Dimensions": "200x90x50cm",
                "Weight": "35kg"
            }
            },
        {
            id: "healthcare-002",
            name: "Bed Double A",
            description: "Bed Double A",
            category: "Healthcare",
            images: [
                {
                    id: "healthcare-002-1",
                    url: "/images/products/healthcare/bed-double-a/bda1.png",
                    alt: "Adjustable hospital bed",
                    featured: true
                },
                {
                    id: "healthcare-002-2",
                    url: "/images/products/healthcare/bed-double-a/bda2.png",
                    alt: "Hospital bed side view",
                    featured: false
                },
                {
                    id: "healthcare-002-3",
                    url: "/images/products/healthcare/bed-double-a/bda3.png",
                    alt: "Hospital bed with mattress",
                    featured: false
                }
            ],
            features: ["Adjustable height", "Side rails", "Durable frame"],
            specifications: {
                "Material": "Steel Frame with Foam Mattress",
                "Dimensions": "200x90x50cm",
                "Weight": "40kg"
            }
        }
    ]
};