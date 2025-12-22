export const chatFlow = {
  start: {
    botMessage: "Halo! Ada yang bisa saya bantu?",
    options: [
      { text: "Lokasi ATMI", nextNode: "answer_location" },
      { text: "Layanan", nextNode: "answer_services" },
      { text: "Kontak Marketing", nextNode: "answer_contact" },
      { text: "Produk", nextNode: "answer_products" },
    ],
  },
  answer_location: {
    botMessage: "Kantor dan workshop kami berlokasi di Jl. Adisucipto / Jl. Mojo No. 1, Karangasem, Laweyan, Surakarta 57145.",
    options: [
      { text: "Lihat Peta", nextNode: "map" },
      { text: "Kembali", nextNode: "start" },
    ],
  },
  answer_services: {
    botMessage: "Kami memiliki dua layanan utama:",
    subOptions: [
      { text: "Work Fabrication (WF)", nextNode: "wf_details" },
      { text: "Machine Development Center (MDC)", nextNode: "mdc_details" },
    ],
    options: [
      { text: "Kembali", nextNode: "start" },
    ],
  },
  wf_details: {
    botMessage: "Work Fabrication (WF) menyediakan layatan fabrikasi baja, struktur, dan komponen industri sesuai kebutuhan Anda.",
    options: [
      { text: "Kembali ke Layanan", nextNode: "answer_services" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  mdc_details: {
    botMessage: "Machine Development Center (MDC) fokus pada pengembangan mesin dan peralatan otomasi industri.",
    options: [
      { text: "Kembali ke Layanan", nextNode: "answer_services" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  answer_contact: {
    botMessage: "Anda bisa menghubungi tim marketing kami:",
    contactInfo: [
      { type: "Email", value: "marketing@atmi.co.id" },
      { type: "Telepon", value: "(0271) 714466 ext. 209/245" },
    ],
    options: [
      { text: "Kirim Email", nextNode: "email" },
      { text: "Kembali", nextNode: "start" },
    ],
  },
  answer_products: {
    botMessage: "Kami memproduksi berbagai macam produk:",
    productCategories: [
      { name: "Peralatan Rumah Sakit", nextNode: "hospital_products" },
      { name: "Kantor & Sekolah", nextNode: "office_products" },
      { name: "Bengkel", nextNode: "workshop_products" },
    ],
    options: [
      { text: "Kembali", nextNode: "start" },
    ],
  },
  hospital_products: {
    botMessage: "Peralatan Rumah Sakit: Tempat Tidur Pasien, Alat Laboratorium, Peralatan Sterilisasi, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  office_products: {
    botMessage: "Peralatan Kantor & Sekolah: Meja, Kursi, Rak Buku, Lemari Arsip, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  workshop_products: {
    botMessage: "Peralatan Bengkel: Meja Kerja, Rak Peralatan, Alat Ukur, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  map: {
    botMessage: "Silakan buka peta untuk melihat lokasi ATMI: [Link Peta]",
    options: [
      { text: "Kembali ke Lokasi", nextNode: "answer_location" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  email: {
    botMessage: "Email: marketing@atmi.co.id. Silakan kirim pesan Anda ke alamat ini.",
    options: [
      { text: "Kembali ke Kontak", nextNode: "answer_contact" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
} as const;

export type ChatNodeKey = keyof typeof chatFlow;