// src/app/page.tsx
"use client";

import HeroSection from "@/components/home/section/hero";
import CtaSection from "@/components/home/section/cta";

export default function HomePage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT ATMI SOLO",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://atmi.co.id",
    "logo": "https://atmi.co.id/images/logo/atmi-solo.png", 
    "sameAs": [
      "https://www.linkedin.com/company/pt-atmi-solo",
      "https://www.instagram.com/atmisolo",
      "https://www.youtube.com/@atmisolo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-271-714466",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Adisucipto / Jl. Mojo No. 1, Karangasem",
      "addressLocality": "Surakarta",
      "addressRegion": "Jawa Tengah",
      "postalCode": "57145",
      "addressCountry": "ID"
    }
  };

  const handleContactClick = () => {
    window.location.href = "/kontak";
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <CtaSection onContactClick={handleContactClick} />
    </>
  );
}
