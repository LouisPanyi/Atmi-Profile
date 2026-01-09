import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Slug stabil + suffix waktu pendek agar unik. */
export function generateSlug(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const stamp = Date.now().toString(36).slice(-4);
  return `${base}-${stamp}`;
}

