"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-12 mb-8">
      <h4 className="font-bold text-gray-800 text-lg mb-4">Bagikan artikel ini:</h4>
      <div className="flex flex-wrap gap-3 items-center">
        {/* Tombol Copy Link */}
        <button
          onClick={handleCopy}
          // PERBAIKAN: Menambahkan 'text-gray-700' agar tulisan TIDAK transparan/putih
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mr-4"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-500" />}
          {copied ? <span className="text-green-600">Link Disalin!</span> : <span>Salin Link</span>}
        </button>

        {/* Tombol Sosmed */}
        <a 
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          title="Share ke WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
        
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          title="Share ke Facebook"
        >
          <Facebook size={18} />
        </a>
        
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          title="Share ke X / Twitter"
        >
          <Twitter size={18} />
        </a>
        
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
          title="Share ke LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  );
}