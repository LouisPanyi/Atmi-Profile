"use client";

import { useState } from "react";
import HeroSection from "@/components/layanan/section/hero";
import IntroductionSection from "@/components/layanan/section/introduction";
import ServicesTabsSection, { TabType } from "@/components/layanan/section/services";
import IndustriesSection from "@/components/layanan/section/industries";
import StrengthsSection from "@/components/layanan/section/strengths";
import CTASection from "@/components/layanan/section/cta";
import Breadcrumb from "@/components/breadcrumb";

export default function LayananClientPage() {
  // ✅ State untuk Tab tetap ada di sini (Client Side)
  const [activeTab, setActiveTab] = useState<TabType>("work-fabrication");

  return (
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
      
      {/* ✅ Fitur Tab Anda tetap berfungsi normal */}
      <ServicesTabsSection activeTab={activeTab} onTabChange={setActiveTab} />
      
      <IndustriesSection />
      <StrengthsSection />
      <CTASection />
    </div>
  );
}