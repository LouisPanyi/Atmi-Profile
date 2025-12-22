// src/components/chatbot/flow/nodes/about.ts
import { ChatFlowMap } from '../types';

export const aboutNodes: ChatFlowMap = {
  about_atmi: {
    botMessage: "ATMI SOLO adalah perusahaan manufaktur dan rekayasa yang berdiri sejak 1968. Kami menyediakan solusi manufaktur presisi dan rekayasa mesin untuk berbagai industri.",
    rich: {
      highlights: [
        { title: "Sejak 1968" },
        { title: "Kemitraan Industri", detail: "Sinergi pendidikan–industri" },
        { title: "Keunggulan Vokasi", detail: "Pelaksana sistem vokasi terbaik" },
      ],
    },
    subOptions: [
      { text: "Sejarah ATMI", nextNode: "history" },
      { text: "Visi & Misi", nextNode: "vision_mission" },
      { text: "Nilai Perusahaan", nextNode: "company_values" },
      { text: "Sertifikasi", nextNode: "certifications" },
    ],
    options: [{ text: "Kembali ke Menu Utama", nextNode: "start" }],
  },

  history: {
    botMessage: "Sejarah ATMI:\n\n1968 - ATMI berdiri sebagai Akademi Teknik Mesin Industri Surakarta\n1974 - Memulai membangun unit produksi\n1977 - Memulai memproduksi produk dari lembaran baja\n1986 - Memulai memproduksi cetakan (mould making unit)\n1996 - Dinyatakan sebagai pelaksana sistem vokasi terbaik\n2001 - Menerima sertifikat ISO 9001\n2006 - Pembukaan program studi baru untuk mekatronika dan perancangan\n2011 - Berubah status menjadi Politeknik ATMI Surakarta\n2012 - Unit Produksi ATMI berubah menjadi PT. ATMI SOLO",
    options: [
      { text: "Kembali ke Tentang ATMI", nextNode: "about_atmi" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  vision_mission: {
    botMessage: "Visi: Menjadi pusat keunggulan dalam pendidikan vokasi dan industri yang berorientasi pada kebutuhan global.\n\nMisi:\n1. Menyelenggarakan pendidikan vokasi yang relevan dengan kebutuhan industri\n2. Mengembangkan produk dan layanan yang inovatif dan berkualitas\n3. Membangun sinergi antara pendidikan dan industri\n4. Mencetak lulusan yang kompeten dan berdaya saing",
    options: [
      { text: "Kembali ke Tentang ATMI", nextNode: "about_atmi" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  company_values: {
    botMessage: "Nilai-nilai perusahaan ATMI:\n\n1. Kenyamanan Kerja - Menjamin lingkungan kerja yang kondusif\n2. Integritas Moral - Mengutamakan kejujuran dalam setiap tindakan\n3. Komunitas - Menempatkan kerjasama di atas prestasi individu\n4. Keunggulan - Menuntut usaha terus menerus untuk perbaikan diri\n5. Keluwesan - Luwe dalam menjawab kebutuhan pelanggan dan pasar",
    options: [
      { text: "Kembali ke Tentang ATMI", nextNode: "about_atmi" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  certifications: {
    botMessage: "Sertifikasi yang dimiliki ATMI:\n\n- ISO 9001:2015 untuk sistem manajemen kualitas\n- Sertifikat kompetensi dari berbagai lembaga standar nasional\n- Penghargaan sebagai pelaksana sistem vokasi terbaik\n- Kerjasama dengan industri terkemuka",
    options: [
      { text: "Kembali ke Tentang ATMI", nextNode: "about_atmi" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },
};