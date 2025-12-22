// src/app/tentang/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/tentang/section/hero';
import CompanyHistorySection from '@/components/tentang/section/history';
import VisionMissionSection from '@/components/tentang/section/visi-misi';
import CompanyValuesSection from '@/components/tentang/section/values';
import QualityManagementSection from '@/components/tentang/section/qm';
import { HeartHandshake, Lightbulb, ShieldCheck, Star, Users } from 'lucide-react';
import Breadcrumb from '@/components/breadcrumb';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Tentang | Sejarah, Visi Misi & Nilai Perusahaan";
    
    // Override meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Ketahui lebih dalam tentang ATMI Surakarta melalui sejarah, visi misi, nilai-nilai perusahaan, dan sistem manajemen kualitas kami.");
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', "ATMI Surakarta, politeknik, sejarah, visi misi, nilai perusahaan, manajemen kualitas, pendidikan vokasi");
    }
  }, []);

  const milestoneData = [
    { year: '1968', event: 'ATMI sebagai Akademi Teknik Mesin Industri Surakarta berdiri' },
    { year: '1974', event: 'Memulai membangun unit produksi' },
    { year: '1977', event: 'Memulai memproduksi produk-produk dari lembaran baja' },
    { year: '1986', event: 'Memulai memproduksi cetakan (mould making unit)' },
    { year: '1996', event: 'Dinyatakan oleh Pemerintah sebagai pelaksana sistem vokasi terbaik' },
    { year: '2001', event: 'Menerima sertifikat ISO 9001' },
    { year: '2006', event: 'Pembukaan program studi baru untuk mekatronika dan perancangan' },
    { year: '2011', event: 'ATMI Surakarta berubah status menjadi Politeknik ATMI Surakarta' },
    { year: '2012', event: 'Unit Produksi ATMI secara resmi berubah menjadi PT. ATMI SOLO' },
  ];

  // -- Data untuk Nilai-Nilai Perusahaan --
  const valuesData = [
    { icon: HeartHandshake, title: 'Kenyamanan Kerja', description: 'Menjamin lingkungan kerja yang kondusif bagi perkembangan setiap pribadi.' },
    { icon: ShieldCheck, title: 'Integritas Moral', description: 'Mengutamakan kejujuran dalam setiap tindakan.' },
    { icon: Users, title: 'Komunitas', description: 'Menempatkan kerjasama di atas prestasi individu.' },
    { icon: Star, title: 'Keunggulan', description: 'Menuntut usaha terus menerus untuk perbaikan diri.' },
    { icon: Lightbulb, title: 'Keluwesan', description: 'Luwea dalam menjawab kebutuhan pelanggan dan pasar.' },
  ];

  return (
    <>
      <Head>
        <title>Tentang ATMI Surakarta | Sejarah, Visi Misi & Nilai Perusahaan</title>
        <meta name="description" content="Ketahui lebih dalam tentang ATMI Surakarta melalui sejarah, visi misi, nilai-nilai perusahaan, dan sistem manajemen kualitas kami." />
        <meta name="keywords" content="ATMI Surakarta, politeknik, sejarah, visi misi, nilai perusahaan, manajemen kualitas, pendidikan vokasi" />
        <meta name="author" content="ATMI Surakarta" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://atmi.ac.id/tentang" />
        <meta property="og:title" content="Tentang | Sejarah, Visi Misi & Nilai Perusahaan" />
        <meta property="og:description" content="Ketahui lebih dalam tentang ATMI Surakarta melalui sejarah, visi misi, nilai-nilai perusahaan, dan sistem manajemen kualitas kami." />
        <meta property="og:image" content="/images/og-image-tentang.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://atmi.ac.id/tentang" />
        <meta property="twitter:title" content="Tentang ATMI Surakarta | Sejarah, Visi Misi & Nilai Perusahaan" />
        <meta property="twitter:description" content="Ketahui lebih dalam tentang ATMI Surakarta melalui sejarah, visi misi, nilai-nilai perusahaan, dan sistem manajemen kualitas kami." />
        <meta property="twitter:image" content="/images/twitter-image-tentang.jpg" />
      </Head>
      
      <div className="bg-white">
        <HeroSection />
        <div className="container mx-auto px-6 mt-8">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Tentang', href: '/tentang' },
            ]}
          />
        </div>
        <CompanyHistorySection milestoneData={milestoneData} />
        <VisionMissionSection />
        <CompanyValuesSection valuesData={valuesData} />
        <QualityManagementSection />
      </div>
    </>
  );
}