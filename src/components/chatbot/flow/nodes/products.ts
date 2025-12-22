// src/components/chatbot/flow/nodes/products.ts
import { ChatFlowMap } from '../types';

export const productNodes: ChatFlowMap = {
  products: {
    botMessage: "Produk ATMI SOLO dibagi dalam beberapa kategori:",
    productCategories: [
      { name: "Peralatan Rumah Sakit", nextNode: "hospital_products" },
      { name: "Kantor & Sekolah", nextNode: "office_products" },
      { name: "Bengkel & Industri", nextNode: "workshop_products" },
      { name: "Perabotan Umum", nextNode: "household_products" },
    ],
    options: [
      { text: "Minta Katalog", nextNode: "rfq_intro" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  hospital_products: {
    botMessage: "Peralatan Rumah Sakit:\n\n- Tempat tidur pasien dengan aksesori lengkap\n- Meja operasi dan meja pemeriksaan\n- Alat laboratorium dan analisis\n- Peralatan sterilisasi\n- Rak penyimpanan rumah sakit\n- Kursi roda dan alat bantu mobilitas\n\nSemua produk memenuhi standar kesehatan dan kenyamanan.",
    options: [
      { text: "Kembali ke Produk", nextNode: "products" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  office_products: {
    botMessage: "Peralatan Kantor & Sekolah:\n\n- Meja kerja dan kursi ergonomis\n- Lemari arsip dan rak buku\n- Papan tulis dan whiteboard\n- Meja rapat dan kursi rapat\n- Kursi kelas dan meja sekolah\n- Peralatan administrasi\n\nDesain fungsional dan estetis untuk berbagai kebutuhan.",
    options: [
      { text: "Kembali ke Produk", nextNode: "products" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  workshop_products: {
    botMessage: "Peralatan Bengkel & Industri:\n\n- Meja kerja bengkel yang kuat\n- Rak alat dan sistem penyimpanan\n- Alat ukur dan presisi\n- Meja kerja elektrik\n- Sistem ventilasi dan exhaust\n- Peralatan keselamatan\n\nDibuat dari bahan berkualitas untuk daya tahan dan keamanan.",
    options: [
      { text: "Kembali ke Produk", nextNode: "products" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  household_products: {
    botMessage: "Perabotan Umum:\n\n- Lemari pakaian dan rak pakaian\n- Mebel ruang tamu dan ruang makan\n- Tempat tidur dan perabotan kamar\n- Rak sepatu dan tempat penyimpanan\n- Peralatan dapur dan rumah tangga\n\nDesain modern dan fungsional.",
    options: [
      { text: "Kembali ke Produk", nextNode: "products" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },
};