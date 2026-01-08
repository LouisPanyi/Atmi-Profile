"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import FooterColumns from "./footer/section/column";
import QuickLinksAndIndustries from "./footer/section/link";
import ContactInfoSection from "./footer/section/contact";
import SocialMediaSection from "./footer/section/sosmed";
import BottomBar from "./footer/section/bottom";
import FloatingActionButtons from "./floating-action-buttons";
import DownloadModal from "./footer/download-modal";
import { FooterFile } from "@/lib/definitions";

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

interface FooterProps {
  activeFiles?: {
    katalog?: FooterFile;
    presentasi?: FooterFile;
    profile?: FooterFile;
  };
}

type DownloadSelection = {
  url: string;
  displayName: string;
  downloadName: string;
  category: "katalog" | "presentasi" | "profile" | "other";
};

// Konfigurasi Default File
const DEFAULT_FILES = {
  katalog: {
    title: "Katalog",
    url: "/downloads/katalog2024.pdf",
    downloadName: "katalog2024.pdf",
  },
  presentasi: {
    title: "Presentation Slide",
    url: "/downloads/presentasi24.pptx",
    downloadName: "presentasi24.pptx",
  },
  profile: {
    title: "Company Profile",
    url: "/downloads/profile24.pdf",
    downloadName: "profile24.pdf",
  },
} as const;

function detectCategory(displayName: string): DownloadSelection["category"] {
  const lower = displayName.toLowerCase();
  if (lower.includes("katalog")) return "katalog";
  if (lower.includes("presentasi") || lower.includes("presentation")) return "presentasi";
  if (lower.includes("profile")) return "profile";
  return "other";
}

export default function Footer({ activeFiles = {} }: FooterProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DownloadSelection | null>(null);

  const resolvedFiles = useMemo(() => {
    return {
      katalogUrl: activeFiles.katalog?.file_url || DEFAULT_FILES.katalog.url,
      presentasiUrl: activeFiles.presentasi?.file_url || DEFAULT_FILES.presentasi.url,
      profileUrl: activeFiles.profile?.file_url || DEFAULT_FILES.profile.url,
    };
  }, [activeFiles]);

  const handleDownloadClick = (url: string, displayName: string, downloadName?: string) => {
    if (!url) {
      toast.error("File tidak ditemukan.");
      return;
    }

    const category = detectCategory(displayName);

    setSelectedFile({
      url,
      displayName,
      downloadName: downloadName || displayName,
      category,
    });
    setModalOpen(true);
  };

  const handleConfirmDownload = async (email: string) => {
    if (!selectedFile) return;

    setIsDownloading(true);

    try {
      const response = await fetch("/api/downloads/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fileName: selectedFile.displayName,
          category: selectedFile.category,
        }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan log");

      const link = document.createElement("a");
      link.href = selectedFile.url;
      link.download = selectedFile.downloadName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download dimulai!");

      setModalOpen(false);
      setSelectedFile(null);
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Terjadi kesalahan saat memproses permintaan.");
    } finally {
      setIsDownloading(false);
    }
  };

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
      { name: "Yayasan Karya Bakti Surakarta", src: "/images/logo/ykbs.png" },
      { name: "PT ATMI Solo", src: "/images/logo/atmi-solo.png" },
      { name: "Atmi ADE", src: "/images/logo/ade.png" },
      { name: "Atmi Bizdec", src: "/images/logo/bizdec.png" },
      { name: "SMK PIKA", src: "/images/logo/smk-pika.png" },
      { name: "SMK Mikael Surakarta", src: "/images/logo/smk.png" },
      { name: "Politeknik ATMI", src: "/images/logo/poltek.png" },
      { name: "Atmi IGI", src: "/images/logo/igi.png" },
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
        description: "Solusi terintegrasi untuk kebutuhan manufaktur dan pengembangan mesin industri.",
        links: [
          { name: "Work Fabrication", href: "/layanan#work-fabrication" },
          { name: "Machine Development", href: "/layanan#machine-development" },
          { name: "Produk Kami", href: "/produk" },
          { name: "Keunggulan Kami", href: "/layanan#keunggulan" },
        ],
      },
      {
        title: "Informasi",
        description: "Download informasi terkini dan berguna dari PT ATMI SOLO.",
        links: [
          {
            name: DEFAULT_FILES.katalog.title,
            downloadName: DEFAULT_FILES.katalog.downloadName,
            type: "download" as const,
            url: resolvedFiles.katalogUrl,
            icon: Download,
            disabled: false,
          },
          {
            name: DEFAULT_FILES.presentasi.title,
            downloadName: DEFAULT_FILES.presentasi.downloadName,
            type: "download" as const,
            url: resolvedFiles.presentasiUrl,
            icon: Download,
            disabled: false,
          },
          {
            name: DEFAULT_FILES.profile.title,
            downloadName: DEFAULT_FILES.profile.downloadName,
            type: "download" as const,
            url: resolvedFiles.profileUrl,
            icon: Download,
            disabled: false,
          },
        ],
      },
      {
        title: "Kontak & Lokasi",
        description: "Hubungi kami untuk informasi lebih lanjut atau kunjungi lokasi kami.",
        links: [
          { 
            name: "Kantor Pusat", 
            href: "/kontak#maps" 
          },
          { name: "Tim Sales & Marketing", href: "/kontak#tim-sales" },
          { name: "News", href: "/berita" },
        ],
      },
    ],
    [resolvedFiles]
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
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
      <div className="container mx-auto px-6 py-12">
        <FooterColumns columns={footerColumns} onDownload={handleDownloadClick} isDownloading={isDownloading} />
        <QuickLinksAndIndustries quickLinks={quickLinks} industryLogos={industryLogos} />
        <ContactInfoSection contacts={contacts} />
        <SocialMediaSection socialLinks={socialLinks} />
      </div>

      <BottomBar year={year} />
      <FloatingActionButtons />

      <DownloadModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedFile(null);
        }}
        onConfirm={handleConfirmDownload}
        fileName={selectedFile?.displayName || "Dokumen"}
        isLoading={isDownloading}
      />
    </footer>
  );
}