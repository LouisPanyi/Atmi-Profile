// src/components/kontak/sections/QuickActions.tsx
import { Send, MessageCircle, Clock } from 'lucide-react';

const quickActions = [
  { title: 'Pesan Produk', description: 'Kirim permintaan produk Anda', icon: <Send className="w-5 h-5" /> },
  { title: 'Konsultasi Teknis', description: 'Diskusikan kebutuhan teknis Anda', icon: <MessageCircle className="w-5 h-5" /> },
  { title: 'Permintaan Katalog', description: 'Dapatkan katalog produk terbaru', icon: <Clock className="w-5 h-5" /> },
];

export default function QuickActions() {
  return (
    <section className="py-8 bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <div className="text-blue-700">{action.icon}</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}