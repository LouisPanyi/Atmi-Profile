// src/components/chatbot/flow/nodes/location.ts
import { ChatFlowMap } from '../types';

export const locationNodes: ChatFlowMap = {
  location_contact: {
    botMessage: "Informasi Lokasi & Kontak ATMI SOLO:",
    contactInfo: [
      {
        type: "Alamat",
        value: "Jl. Adisucipto / Jl. Mojo No. 1, Karangasem, Laweyan, Surakarta 57145",
      },
      { type: "Telepon", value: "(0271) 714466 - Ext. 209/245" },
      {
        type: "Email",
        value: "marketing@atmi.co.id | marketing@atmisolo.co.id",
      },
      { type: "Website", value: "www.atmisolo.co.id" },
    ],
    options: [
      { 
        text: "Hubungi via WhatsApp", nextNode: "contact_all"
      },
      { text: "Kembali ke Menu Utama", nextNode: "start" },
    ],
  }
};