import type { Metadata } from "next";
import LayananClientPage from "@/components/layanan/section/client-page";

export const metadata: Metadata = {
  title: "Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering",
  description: "Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO. Solusi terdepan untuk kebutuhan industri Anda.",
  keywords: ["layanan manufaktur", "rekayasa mesin", "presisi manufacturing", "engineering services", "PT ATMI SOLO", "solusi industri"],
  authors: [{ name: "PT ATMI SOLO" }],
  openGraph: {
    type: "website",
    url: "https://atmi.ac.id/layanan",
    title: "Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering",
    description: "Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO. Solusi terdepan untuk kebutuhan industri Anda.",
    images: [
      {
        url: "/images/og-image-layanan.jpg", 
        width: 1200,
        height: 630,
        alt: "Layanan PT ATMI SOLO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan | PT ATMI SOLO - Precision Manufacturing & Engineering",
    description: "Layanan manufaktur presisi dan rekayasa mesin dari PT ATMI SOLO.",
    images: ["/images/twitter-image-layanan.jpg"],
  },
};

export default function ServicesPage() {
  return <LayananClientPage />;
}