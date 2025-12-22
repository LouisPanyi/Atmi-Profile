// src/components/home/section/product-showcase.tsx
"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link component

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
  specifications: { name: string; value: string }[];
  applications: string[];
  gallery: string[];
}

export const productDetails: Record<string, Product> = {
  "Standard Products": {
    id: "Standard Products",
    name: "Standard Products",
    category: "Produk Standar",
    description:
      "Koleksi produk standar kami dirancang untuk memenuhi kebutuhan industri dengan kualitas, keandalan, dan presisi tinggi. Cocok untuk berbagai aplikasi manufaktur dan teknik.",
    image: "/images/standard-products.jpg",
    highlights: ["Kualitas tinggi", "Desain serbaguna", "Standar internasional"],
    specifications: [
      { name: "Material", value: "Baja, Aluminium, dan Plastik Teknik" },
      { name: "Proses Produksi", value: "Cutting, Punching, Welding, Assembly, Coating" },
      { name: "Finishing", value: "Polishing, Powder coating" },
    ],
    applications: ["Perkantoran", "Pendidikan", "Fasilitas publik", "Rumah sakit"],
    gallery: [
      "/images/standard-products/sp1.png",
      "/images/standard-products/sp2.png",
      "/images/standard-products/sp3.png",
      "/images/standard-products/sp4.png",
    ],
  },
  "Industrial Product": {
    id: "Industrial Products",
    name: "Industrial Products",
    category: "Solusi Perangkat & Komponen Industri",
    description:
      "Kami menyediakan solusi perangkat dan komponen untuk sektor kesehatan, F&B, teknologi, dan manufaktur. Fokus pada kebersihan, keamanan, presisi, dan keandalan operasional agar proses bisnis klien berjalan efisien dan sesuai standar industri.",
    image: "/images/industrial/industrial-products.jpg",
    highlights: [
      "Keamanan & Kepatuhan",
      "Presisi & Kustom",
      "Tangguh & Tersertifikasi",
    ],
    specifications: [
      { name: "Material", value: "Stainless 304/316, Cold/Hot-rolled Steel, Aluminium" },
      { name: "Proses Utama", value: "Punching & Shearing, Bending, Inline Panel Bender, Machining (CNC)*" },
      { name: "Pengelasan", value: "Resistance Spot, MIG/MAG, TIG, MIG Robot (volume besar)" },
      { name: "Finishing", value: "Powder/Epoxy Coating; opsi electropolish/anodizing sesuai kebutuhan" },
    ],
    applications: [
      "Fasilitas kesehatan",
      "Produksi & penanganan F&B",
      "Perakitan elektronik & otomasi",
      "Lini manufaktur & logistik",
    ],
    gallery: [
      "/images/indus-products/ip1.png",
      "/images/indus-products/ip2.png",
      "/images/indus-products/ip3.png",
      "/images/indus-products/ip4.jpg",
    ],
  },
  "Precision Parts": {
    id: "Precision Parts",
    name: "Precision Parts",
    category: "Suku Cadang Presisi",
    description:
      "Komponen presisi hasil rekayasa akurat menggunakan teknologi CNC modern. Ideal untuk peralatan berteknologi tinggi dan sistem dengan toleransi ketat.",
    image: "/images/precision-parts.jpg",
    highlights: ["Toleransi ketat", "Teknologi CNC", "Kustomisasi tersedia"],
    specifications: [
      { name: "Material", value: "Stainless Steel & Aluminium" },
      { name: "Toleransi", value: "±0.005 mm" },
      { name: "Proses Produksi", value: "CNC Milling, Turning, Grinding" },
      { name: "Finishing", value: "Polishing & Anodizing" },
    ],
    applications: ["Aerospace", "Medis", "Mesin Presisi", "Peralatan laboratorium"],
    gallery: [
      "/images/precision-parts/pp1.jpg",
      "/images/precision-parts/pp2.jpg",
      "/images/precision-parts/pp3.jpg",
      "/images/precision-parts/pp4.jpg",
    ],
  },
};

export default function ProductShowcase({ activeProduct }: { activeProduct: string | null }) {
  const [activeImage, setActiveImage] = useState(0);
  const product = activeProduct ? productDetails[activeProduct] : null;

  if (!product) {
    return (
      <section id="produk-utama" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Produk Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih salah satu produk unggulan di atas untuk melihat detail lengkap.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="produk-utama" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gambar Produk */}
          <div>
            <div className="mb-6">
              <img
                src={product.gallery[activeImage]}
                alt={`${product.name} - Gambar ${activeImage + 1}`}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded overflow-hidden transition-all duration-200 ${activeImage === index
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detail Produk */}
          <div>
            <span className="text-sm font-semibold text-blue-600">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Keunggulan</h3>
              <div className="flex flex-wrap gap-2">
                {product.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Spesifikasi</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-medium text-gray-700">{spec.name}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Aplikasi</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((application, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                  >
                    {application}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Tombol Hubungi Kami - mengarah ke halaman kontak */}
              <Link
                href="/produk"
                className="px-6 py-3 text-white rounded-md hover:bg-blue-700 bg-blue-600 transition duration-300 text-center inline-block"
              >
                Lihat Produk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}