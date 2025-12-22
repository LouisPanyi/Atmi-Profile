// src/components/chatbot/flow/nodes/main.ts
import { ChatFlowMap, Option } from '../types';
import { buildWhatsAppLink } from '../helpers';

/* Helper agar literal type terjaga */
const waBtn = (text: string, phone: string, msg: string): Option => ({
  text,
  action: { type: 'whatsapp' as const, value: buildWhatsAppLink(phone, msg) },
});

/* === GANTI nomor WA di bawah ke nomor resmi (format internasional tanpa "+") === */
const SHEET_METAL_CONTACTS = [
  { name: 'Greg', phone: '6282228444401' },
  { name: 'Patrick', phone: '6281329316240' },
  { name: 'Albert', phone: '628122790258' },
] as const;

const MACHINE_MECH_CONTACTS = [
  { name: 'Dany', phone: '6285647058385' },
  { name: 'Rubyanto', phone: '6281329928700' },
  { name: 'Aji', phone: '6281393440750' }
] as const;

export const mainNodes = {
  start: {
    // ... (node 'start' Anda tetap sama)
    rich: {
      hero: {
        title: "Selamat datang di ATMI SOLO",
        subtitle: "Perusahaan manufaktur & rekayasa presisi sejak 1968. Ada yang bisa kami bantu?",
      },
      highlights: [
        { title: "ISO 9001:2015", detail: "Sistem manajemen kualitas tersertifikasi" },
        { title: "Solusi Kustom", detail: "Dari desain, prototipe, hingga produksi" },
        { title: "Teknologi Modern", detail: "CNC, otomasi, robotika" },
      ],
    },
    botMessage:
      "Selamat datang di ATMI SOLO! Kami adalah perusahaan manufaktur dan rekayasa yang berdiri sejak 1968. Bagaimana saya bisa membantu Anda hari ini?",
    options: [
      { text: "Tentang ATMI", nextNode: "about_atmi" },
      { text: "Layanan Kami", nextNode: "services" },
      { text: "Produk", nextNode: "products" },
      { text: "Lokasi & Kontak", nextNode: "location_contact" },
      { text: "Semua Kontak (WA)", nextNode: "contact_all" },
    ]
  },

  /* === Semua kontak: nama bisa diklik menuju WhatsApp === */
  contact_all: {
    // Ini adalah 'botMessage' yang memberi instruksi
    botMessage:
      "Hubungi PIC kami melalui WhatsApp sesuai layanan yang di innginkan (klik nama):",

    // Ini adalah 'options' (tombol) yang berisi nama-nama yang bisa diklik
    options: [
      // Group 1: Sheet Metal Products
      ...SHEET_METAL_CONTACTS.map((c) =>
        waBtn(`Sheet Metal — ${c.name} `, c.phone, "Halo, saya ingin tanya Sheet Metal Products.")
      ),
      // Group 2: Machine Mechanical Product
      ...MACHINE_MECH_CONTACTS.map((c) =>
        waBtn(`Machine Mechanical — ${c.name}`, c.phone, "Halo, saya ingin tanya Machine Mechanical Product.")
      ),
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },
} satisfies ChatFlowMap;