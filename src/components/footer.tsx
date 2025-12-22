// src/components/Footer.tsx
"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import FooterColumns from "./footer/section/column";
import QuickLinksAndIndustries from "./footer/section/link";
import ContactInfoSection from "./footer/section/contact";
import SocialMediaSection from "./footer/section/sosmed";
import BottomBar from "./footer/section/bottom";
import FloatingActionButtons from "./floating-action-buttons";

import {
  Download,
  Home,
  Building,
  Factory,
  Box,
  Mail,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
  MapPin,
  Newspaper,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = (fileName: string, fileType: string) => {
    setIsDownloading(true);
    try {
      const a = document.createElement("a");
      a.href = `/downloads/${fileName}.${fileType}`;
      a.download = `${fileName}.${fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success(`File ${fileName} berhasil diunduh!`);
    } catch (err) {
      console.error("Download error:", err);
      toast.error(`Gagal mengunduh file ${fileName}.`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Data statis & stabil (tidak berubah saat hydrate)
  const quickLinks = useMemo(
    () => [
      { name: "Beranda", href: "/", icon: Home },
      { name: "Tentang Kami", href: "/tentang", icon: Building },
      { name: "Layanan", href: "/layanan", icon: Factory },
      { name: "Produk", href: "/produk", icon: Box },
      { name: "Berita", href: "/berita", icon: Newspaper },
      { name: "Kontak", href: "/kontak", icon: Mail },
    ],
    []
  );

  const industryLogos = useMemo(
    () => [
      // Gunakan nama file gambar yang sudah Anda siapkan di folder public
      { name: "Yayasan Karya Bakti Surakarta", src: "/images/logo/ykbs.png"},
      { name: "PT ATMI Solo", src: "/images/logo/atmi-solo.png"},
      { name: "Atmi ADE", src: "/images/logo/ade.png"},
      { name: "Atmi Bizdec", src: "/images/logo/bizdec.png"},
      { name: "SMK PIKA", src: "/images/logo/smk-pika.png"},
      { name: "SMK Mikael Surakarta", src: "/images/logo/smk.png"},
      { name: "Politeknik ATMI", src: "/images/logo/poltek.png"},
      { name: "Atmi IGI", src: "/images/logo/igi.png"}
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { name: "LinkedIn", url: "https://www.linkedin.com/company/pt-atmi-solo", icon: Linkedin },
      { name: "Instagram", url: "https://www.instagram.com/atmisolo", icon: Instagram },
      { name: "YouTube", url: "https://www.youtube.com/channel/your-channel-id", icon: Youtube },
    ],
    []
  );

  const footerColumns = useMemo(
    () => [
      {
        title: "Tentang Perusahaan",
        description:
          "PT ATMI SOLO menyediakan solusi manufaktur presisi dan rekayasa mesin terdepan untuk industri nasional dan global.",
        links: [
          { name: "Sejarah Perusahaan", href: "/tentang#sejarah" },
          { name: "Visi & Misi", href: "/tentang#visi-misi" },
          { name: "Nilai-Nilai Perusahaan", href: "/tentang#nilai-nilai" },
          { name: "Manajemen Mutu", href: "/tentang#manajemen-mutu" },
        ],
      },
      {
        title: "Layanan Kami",
        description:
          "Solusi terintegrasi untuk kebutuhan manufaktur dan pengembangan mesin industri.",
        links: [
          { name: "Work Fabrication", href: "/layanan#work-fabrication" },
          { name: "Machine Development", href: "/layanan#machine-development" },
          { name: "Industri yang Dilayani", href: "/layanan#industri" },
          { name: "Keunggulan Kami", href: "/layanan#keunggulan" },
        ],
      },
      {
        title: "Informasi",
        description: "Download informasi terkini dan berguna dari PT ATMI SOLO.",
        links: [
          { name: "Katalog", type: "download" as const, fileName: "katalog2024", fileType: "pdf", icon: Download },
          { name: "Presentation Slide", type: "download" as const, fileName: "presentasi24", fileType: "pptx", icon: Download },
          { name: "Company Profile", type: "download" as const, fileName: "profile24", fileType: "pdf", icon: Download },
        ],
      },
      {
        title: "Kontak & Lokasi",
        description: "Hubungi kami untuk informasi lebih lanjut atau kunjungi lokasi kami.",
        links: [
          { name: "Kantor Pusat", href: "/kontak" },
          { name: "Workshop", href: "/kontak" },
          { name: "Tim Sales & Marketing", href: "/kontak#tim-sales" },
          { name: "News", href: "/berita" },
        ],
      },
    ],
    []
  );

  const contacts = useMemo(
    () => [
      { title: "Telepon", icon: Phone, details: ["(0271) 714466", "Ext. 209/245"] },
      { title: "Email", icon: Mail, details: ["marketing@atmi.co.id", "marketing@atmisolo.co.id"] },
      {
        title: "Lokasi",
        icon: MapPin,
        details: ["Jl. Adisucipto / Jl. Mojo No. 1", "Karangasem, Laweyan, Surakarta 57145"],
      },
    ],
    []
  );
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        <FooterColumns
          columns={footerColumns}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
        <QuickLinksAndIndustries quickLinks={quickLinks} industryLogos={industryLogos} />
        <ContactInfoSection contacts={contacts} />
        <SocialMediaSection socialLinks={socialLinks} />
      </div>

      <BottomBar year={year} />
      <FloatingActionButtons />
    </footer>
  );
}
