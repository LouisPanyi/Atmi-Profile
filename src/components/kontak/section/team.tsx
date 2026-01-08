// src/components/kontak/sections/Team.tsx
import ContactPersonCard from '@/components/kontak/contact-person-card';

const sheetMetalContacts = [
  
  {
    name: 'Greg',
    phone: '+62 822 2844 4401',
    email: 'gregory@atmisolo.co.id',
    position: 'Sales Executive'
  },
  {
    name: 'Patrick',
    phone: '+62 813 2931 6240',
    email: 'patrickyuwana@atmisolo.co.id',
    position: 'Sales Executive'
  },
  {
    name: 'Albert',
    phone: '+62 812 2790 258',
    email: 'albert@atmisolo.co.id',
    position: 'Sales Manager'
  }
];

const machineMechanicalContacts = [
 
  {
    name: 'Dany',
    phone: '+62 856 4705 8385',
    email: 'danykurniawan@atmisolo.co.id',
    position: 'Sales Executive'
  },
  {
    name: 'Rubyanto',
    phone: '+62 813 2992 8700',
    email: 'rubyanto@atmisolo.co.id',
    position: 'Sales Executive'
  },
   {
    name: 'Aji',
    phone: '+62 813 9344 0750',
    email: 'aji@atmisolo.co.id',
    position: 'Sales Assistant Manager'
  },
];

export default function TeamSection() {
  return (
   <section id="tim-sales" className="py-16 md:py-24 bg-gray-50 scroll-mt-24">
      <div className="container mx-auto px-6">
        
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Sales & Marketing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hubungi spesialis produk kami untuk konsultasi teknis, penawaran harga, dan solusi terbaik untuk kebutuhan industri Anda.
          </p>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          <ContactPersonCard 
            title="Sheet Metal Products" 
            contacts={sheetMetalContacts} 
          />
          <ContactPersonCard 
            title="Machine Mechanical Products" 
            contacts={machineMechanicalContacts} 
          />
        </div>
        
      </div>
    </section>
  );
}