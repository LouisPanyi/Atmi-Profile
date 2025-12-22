// src/components/kontak/sections/TeamSection.tsx
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
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tim Sales & Marketing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactPersonCard title="Sheet Metal Products" contacts={sheetMetalContacts} />
        <ContactPersonCard title="Machine Mechanical Products" contacts={machineMechanicalContacts} />
      </div>
    </div>
  );
}