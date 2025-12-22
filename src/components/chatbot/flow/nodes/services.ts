// src/components/chatbot/flow/nodes/services.ts
import { ChatFlowMap } from '../types';

export const serviceNodes: ChatFlowMap = {
  services: {
    botMessage: "ATMI SOLO menyediakan dua layanan utama:",
    subOptions: [
      { text: "Work Fabrication (WF)", nextNode: "wf_details" },
      { text: "Machine Development Center (MDC)", nextNode: "mdc_details" },
    ],
    options: [
      { text: "Studi Kasus", nextNode: "case_studies" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  wf_details: {
    botMessage: "Work Fabrication (WF)\n\nLayanan fabrikasi presisi dengan teknologi modern:\n- Fabrikasi baja dan struktur\n- Pengolahan logam (CNC machining, welding, cutting)\n- Pembuatan cetakan (mould making)\n- Perawatan permukaan dan finishing\n- Pengecekan kualitas dan pengujian\n\nKami menerima pesanan kustom sesuai kebutuhan Anda.",
    options: [
      { text: "Kembali ke Layanan Kami", nextNode: "services" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },

  mdc_details: {
    botMessage: "Machine Development Center (MDC)\n\nPusat pengembangan mesin dan otomasi:\n- Rancang bangun mesin industri\n- Sistem otomasi dan kontrol\n- Integrasi robotika\n- Konsultasi rekayasa mesin\n- Prototyping dan uji coba\n\nTim engineering kami siap membantu mengembangkan solusi sesuai kebutuhan industri Anda.",
    options: [
      { text: "Kembali ke Layanan Kami", nextNode: "services" },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  },
};