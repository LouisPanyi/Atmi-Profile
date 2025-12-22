// src/components/tentang/section/QualityManagementSection.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";

export default function QualityManagementSection() {
  return (
    <motion.section
      id="manajemen-mutu"
      className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span className="font-medium">Kualitas Terjamin</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Manajemen Mutu ISO 9001:2015</h2>
        <p className="text-blue-100 mt-4 max-w-3xl mx-auto leading-relaxed">
          PT. ATMI SOLO berkomitmen pada kepuasan pelanggan melalui produk dan jasa berkualitas tinggi. Kami secara konsisten menerapkan{" "}
          <a
            href="/images/certificate/iso-9001-2015.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 underline font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            Sistem Manajemen Mutu ISO 9001:2015
          </a>{" "}
          dan menjalankan peran sebagai partner industri bagi lembaga pendidikan vokasi untuk memastikan implementasi sistem pendidikan berbasis produksi yang efektif dan efisien.
        </p>
        <motion.a
          href="/kontak"
          className="mt-8 inline-flex items-center bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hubungi Kami
          <ChevronRight className="w-4 h-4 ml-2" />
        </motion.a>
      </div>
    </motion.section>
  );
}