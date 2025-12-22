// src/app/page.tsx
"use client";

// import { useState } from "react";
import HeroSection from "@/components/home/section/hero";
// import FeaturedProducts from "@/components/home/section/featured-products";
// import ProductShowcase from "@/components/home/section/product-showcase";
// import ServicesSection from "@/components/home/section/services";
// import IndustriesSection from "@/components/home/section/industries";
// import AboutSection from "@/components/home/section/about";
import CtaSection from "@/components/home/section/cta";

export default function HomePage() {
  // const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleContactClick = () => {
    window.location.href = "/kontak";
  };

  const handleServicesClick = () => {
    document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" });
  };

  // const handleAboutClick = () => {
  //   document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" });
  // };

  // // Toggle open/close ProductShowcase
  // const handleProductClick = (productId: string) => {
  //   setActiveProduct((prev) => {
  //     const next = prev === productId ? null : productId;
  //     if (next) {
  //       setTimeout(() => {
  //         document.getElementById("produk-utama")?.scrollIntoView({ behavior: "smooth" });
  //       }, 50);
  //     }
  //     return next;
  //   });
  // };

  return (
    <>
      <HeroSection onContactClick={handleContactClick} />
      {/* <AboutSection onAboutClick={handleAboutClick} />
      <FeaturedProducts onProductClick={handleProductClick} activeProduct={activeProduct} />
      <ProductShowcase activeProduct={activeProduct} />
      <ServicesSection />
      <IndustriesSection /> */}
      <CtaSection onContactClick={handleContactClick} onServicesClick={handleServicesClick} />
    </>
  );
}
