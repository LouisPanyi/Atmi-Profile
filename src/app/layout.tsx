import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? process.env.NEXT_PUBLIC_BASE_URL 
  : "https://atmi.co.id";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PT ATMI SOLO - Manufaktur Presisi & Rekayasa Mesin",
    template: "%s | PT ATMI SOLO",
  },
  description: "Solusi manufaktur terdepan: Sheet Metal Fabrication, Machine Development, dan Furniture Industri. Partner terpercaya sejak 1968.",
  keywords: ["Fabrication", "Sheet Metal", "CNC", "Machine Maker", "ATMI Solo", "Manufaktur Indonesia", "Laser Cutting", "Engineering"],
  authors: [{ name: "PT ATMI SOLO" }],
  creator: "PT ATMI SOLO",
  publisher: "PT ATMI SOLO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "PT ATMI SOLO - Precision Manufacturing",
    description: "Solusi manufaktur presisi dan rekayasa mesin terdepan untuk industri nasional dan global.",
    url: baseUrl,
    siteName: "PT ATMI SOLO",
    images: [
      {
        url: "/images/atmi-workshop.jpg", 
        width: 1200,
        height: 630,
        alt: "PT ATMI SOLO Factory",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "kode-verifikasi-google-console-anda", // Isi nanti saat setup GSC
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}