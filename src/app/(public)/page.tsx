// src/app/page.tsx
"use client";

import HeroSection from "@/components/home/section/hero";
import CtaSection from "@/components/home/section/cta";

export default function HomePage() {

  const handleContactClick = () => {
    window.location.href = "/kontak";
  };

  return (
    <>
      <HeroSection/>
      <CtaSection onContactClick={handleContactClick}/>
    </>
  );
}
