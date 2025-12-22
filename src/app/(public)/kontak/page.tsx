// src/app/kontak/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Hero from '@/components/kontak/section/hero';
import QuickActions from '@/components/kontak/section/quick-action';
import ContactInfo from '@/components/kontak/section/contact-info';
import TeamSection from '@/components/kontak/section/team';
import FAQSection from '@/components/kontak/section/faq';
import MapSection from '@/components/kontak/section/map';
import SocialMedia from '@/components/kontak/section/social-media';
import ContactForm from '@/components/kontak/contact-form';
import Breadcrumb from '@/components/breadcrumb';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Override title dynamically
    document.title = "Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering";
    
    // Override meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda.");
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', "kontak ATMI, informasi produk, penawaran, dukungan teknis, manufaktur presisi, rekayasa mesin, PT ATMI SOLO");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering</title>
        <meta name="description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta name="keywords" content="kontak ATMI, informasi produk, penawaran, dukungan teknis, manufaktur presisi, rekayasa mesin, PT ATMI SOLO" />
        <meta name="author" content="PT ATMI SOLO" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://atmi.ac.id/kontak" />
        <meta property="og:title" content="Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering" />
        <meta property="og:description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta property="og:image" content="/images/og-image-kontak.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://atmi.ac.id/kontak" />
        <meta property="twitter:title" content="Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering" />
        <meta property="twitter:description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta property="twitter:image" content="/images/twitter-image-kontak.jpg" />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        <Hero />
        <section className="container mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Kontak', href: '/kontak' },
            ]}
          />
        </section>
        
        <QuickActions />
        
        <section className="pt-8 pb-4">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Kontak & Informasi</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Temukan semua informasi yang Anda butuhkan untuk terhubung dengan kami, atau kirimkan pesan langsung melalui formulir di bawah.
            </p>
          </div>
        </section>
        
        <section className="pb-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kolom Kiri */}
              <div className="lg:col-span-2 space-y-8">
                <ContactInfo />
                <TeamSection />
                <FAQSection />
                <MapSection />
              </div>
              
              {/* Kolom Kanan - Sticky Container */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  <ContactForm />
                  <div className="sticky top-40">
                    <SocialMedia />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}