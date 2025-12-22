// src/components/layanan/section/StrengthsSection.tsx
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users } from 'lucide-react';

interface Strength {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export default function StrengthsSection() {
  const strengthsData: Strength[] = [
    { icon: CheckCircle, title: 'Teknologi Terdepan', description: 'Menggunakan mesin CNC dan teknologi terkini' },
    { icon: Award, title: 'Kualitas Terjamin', description: 'Sertifikasi ISO 9001:2015' },
    { icon: Users, title: 'Tim Ahli', description: 'Profesional berpengalaman dan terlatih' }
  ];

  return (
    <motion.section 
      className="py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Keunggulan Kami</h2>
            <p className="text-gray-600">Mengapa memilih PT ATMI SOLO sebagai partner manufaktur Anda?</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengthsData.map((strength, index) => (
              <motion.div
                key={strength.title}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <strength.icon className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{strength.title}</h3>
                <p className="text-gray-600">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}