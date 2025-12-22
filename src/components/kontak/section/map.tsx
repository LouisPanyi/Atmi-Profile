// src/components/kontak/sections/MapSection.tsx
import MapLoader from '@/components/kontak/map-loader';

export default function MapSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lokasi Kami</h2>
      <MapLoader />
    </div>
  );
}