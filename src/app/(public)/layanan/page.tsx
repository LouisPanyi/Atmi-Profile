// File: src/app/layanan/page.tsx
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import HeroSection from "@/components/layanan/section/hero";
import IntroductionSection from "@/components/layanan/section/introduction";
import ServicesTabsSection from "@/components/layanan/section/services";
import IndustriesSection from "@/components/layanan/section/industries";
import StrengthsSection from "@/components/layanan/section/strengths";
import CTASection from "@/components/layanan/section/cta";
import Breadcrumb from "@/components/breadcrumb";

type TabType = "work-fabrication" | "machine-development";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("work-fabrication");

  useEffect(() => {
    document.title =
      "Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering";
  }, []);

  return (
    <>
      <Head>
        <title>
          Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering
        </title>
        <meta
          name="description"
          content="Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO. Solusi terdepan untuk kebutuhan industri Anda."
        />
        <meta
          name="keywords"
          content="layanan manufaktur, rekayasa mesin, presisi manufacturing, engineering services, PT ATMI SOLO, solusi industri"
        />
        <meta name="author" content="PT ATMI SOLO" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://atmi.ac.id/layanan" />
        <meta
          property="og:title"
          content="Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering"
        />
        <meta
          property="og:description"
          content="Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO. Solusi terdepan untuk kebutuhan industri Anda."
        />
        <meta property="og:image" content="/images/og-image-layanan.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://atmi.ac.id/layanan" />
        <meta
          property="twitter:title"
          content="Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering"
        />
        <meta
          property="twitter:description"
          content="Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO. Solusi terdepan untuk kebutuhan industri Anda."
        />
        <meta property="twitter:image" content="/images/twitter-image-layanan.jpg" />
      </Head>

      {/* Background terang + grid halus */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <HeroSection />

        <div className="container mx-auto px-6 mt-8 relative z-[1]">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Layanan", href: "/layanan" },
            ]}
          />
        </div>
        <IntroductionSection />
        <ServicesTabsSection activeTab={activeTab} onTabChange={setActiveTab} />
        <IndustriesSection />
        <StrengthsSection />
        <CTASection />
      </div>
    </>
  );
}