// src/components/chatbot/flow/helpers.ts
import { CurrencyIDR, FormField } from './types';

export const formatCurrencyID = (value: CurrencyIDR): string =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const buildWhatsAppLink = (phone: string, text: string): string => {
  const normalized = phone.replace(/[^\d]/g, "");
  const query = encodeURIComponent(text);
  return `https://wa.me/${normalized}?text=${query}`;
};

export const validateForm = (
  fields: FormField[],
  payload: Record<string, unknown>
): { ok: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (payload[f.id] ?? "") as string;
    if (f.required && !String(v).trim()) {
      errors[f.id] = "Wajib diisi";
      continue;
    }
    if (f.kind === "email" && v) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) errors[f.id] = "Format email tidak valid";
    }
    if (f.kind === "tel" && v) {
      const ok = /^[0-9+\-\s()]{8,20}$/.test(v);
      if (!ok) errors[f.id] = "Nomor telepon tidak valid";
    }
    if (f.kind === "number" && v) {
      const num = Number(v);
      if (Number.isNaN(num)) errors[f.id] = "Harus angka";
      if (typeof (f as any).min === "number" && num < (f as any).min) errors[f.id] = `Minimal ${(f as any).min}`;
      if (typeof (f as any).max === "number" && num > (f as any).max) errors[f.id] = `Maksimal ${(f as any).max}`;
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
};

export const getNode = (flow: Record<string, unknown>, key: string): unknown => {
  const node = flow[key];
  if (!node) throw new Error(`ChatFlow: node "${key}" tidak ditemukan`);
  return node;
};

export const goToNext = (flow: Record<string, unknown>, currentKey: string, optionIndex: number): string | null => {
  const node = getNode(flow, currentKey) as { options: { nextNode?: string }[] };
  const opt = node.options[optionIndex];
  return opt?.nextNode ?? null;
};
