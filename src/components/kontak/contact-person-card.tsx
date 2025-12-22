// src/components/kontak/contact-person-card.tsx
"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Copy, Check, Phone, Mail, User } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  email: string;
  position: string;
}

interface ContactPersonCardProps {
  title: string;
  contacts: Contact[];
}

/** Buat warna gradien stabil dari nama (hash -> HSL) */
function useNameGradient(name: string) {
  return useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
    const h1 = Math.abs(hash) % 360;
    const h2 = (h1 + 40) % 360;
    return { from: `hsl(${h1} 85% 55%)`, to: `hsl(${h2} 85% 45%)` };
  }, [name]);
}

/** Ambil inisial nama (maks 2 huruf) */
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? "";
  return (first + last).toUpperCase();
}
    
/** Avatar fallback (foto → inisial warna gradien) */
function ContactAvatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  const { from, to } = useNameGradient(name);
  const initials = getInitials(name);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`Foto ${name}`}
        className="w-12 h-12 rounded-full object-cover border-2 border-white"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold border-2 border-white"
      aria-label={`Avatar inisial untuk ${name}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials || <User className="w-6 h-6 opacity-90" />}
    </div>
  );
}

export default function ContactPersonCard({ title, contacts }: ContactPersonCardProps) {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(text);
      setTimeout(() => setCopiedPhone(null), 2000);
    } else {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const formatWa = (phone: string) => phone.replace(/[^\d+]/g, "");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-3" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Kontak List */}
      <div className="divide-y divide-gray-100">
        {contacts.map((contact, index) => (
          <div key={index} className="p-4 hover:bg-blue-50 transition-colors duration-200">
            {/* Avatar + Nama */}
            <div className="flex items-center mb-3">
              <div className="relative">
                <ContactAvatar name={contact.name} />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-800 font-semibold text-lg">{contact.name}</p>
                <p className="text-blue-600 text-sm font-medium">{contact.position}</p>
              </div>
            </div>

            {/* Info Kontak */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{contact.phone}</span>
                <button
                  onClick={() => handleCopy(contact.phone, "phone")}
                  className="ml-auto text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Salin nomor telepon"
                >
                  {copiedPhone === contact.phone ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700 flex-1 break-all">{contact.email}</span>
                <button
                  onClick={() => handleCopy(contact.email, "email")}
                  className="ml-2 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Salin email"
                >
                  {copiedEmail === contact.email ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol WhatsApp saja */}
            <div className="mt-4">
              <a
                href={`https://wa.me/${formatWa(contact.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
