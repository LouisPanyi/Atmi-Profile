// src/components/kontak/sections/ContactInfo.tsx
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat',
    content: ['Jl. Adisucipto/Jl. Mojo No. 1', 'Karangasem, Laweyan, Surakarta 57145'],
    bgColor: 'bg-blue-50',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-700'
  },
  {
    icon: Phone,
    title: 'Telepon',
    content: ['(0271) 714466', 'Ext. 209/245'],
    bgColor: 'bg-green-50',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-700'
  },
  {
    icon: Mail,
    title: 'Email',
    content: [
      { 
        type: 'email', 
        value: 'marketing@atmi.co.id'
      },
      { 
        type: 'email', 
        value: 'marketing@atmisolo.co.id'
        
      }
    ],
    bgColor: 'bg-purple-50',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-700'
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    content: ['Senin - Jumat: 08:00 - 17:00'],
    bgColor: 'bg-yellow-50',
    iconBgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-700'
  }
];

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactInfo.map((info, index) => (
          <div key={index} className={`flex items-start p-4 rounded-lg ${info.bgColor}`}>
            <div className={`p-3 rounded-lg mr-4 ${info.iconBgColor}`}>
              <info.icon className={`w-6 h-6 ${info.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{info.title}</h3>
              <div className="mt-1 text-gray-600">
                {info.content.map((line, lineIndex) => {
                  if (typeof line === 'string') {
                    return (
                      <p key={lineIndex} className="mb-1 last:mb-0">
                        {line}
                      </p>
                    );
                  } else if (line.type === 'email') {
                    return (
                      <p key={lineIndex} className="mb-1 last:mb-0">
                        <a 
                          href={`mailto:${line.value}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors inline-block"
                        >
                          {line.value} 
                        </a>
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}