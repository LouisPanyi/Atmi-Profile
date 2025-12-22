// src/components/layanan/section/IndustriesSection.tsx
import { motion } from 'framer-motion';
import { Factory, Cpu } from 'lucide-react';

interface Industry {
  icon: React.ComponentType<any>;
  name: string;
  description: string;
}

export default function IndustriesSection() {
  const industriesData: Industry[] = [
    { icon: Factory, name: 'Manufaktur', description: 'Sistem produksi dan otomasi untuk industri manufaktur' },
    { icon: Cpu, name: 'Teknologi', description: 'Komponen presisi untuk industri teknologi tinggi' },
    { icon: Factory, name: 'Energi', description: 'Peralatan untuk sektor energi dan sumber daya' },
    { icon: Cpu, name: 'Kesehatan', description: 'Peralatan medis dan rumah sakit berkualitas' }
  ];

  return (
    <motion.section 
      className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Industri yang Dilayani</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Solusi manufaktur terpadu untuk berbagai sektor industri dengan kebutuhan yang spesifik.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {industriesData.map((industry, index) => (
            <motion.div
              key={industry.name}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <industry.icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{industry.name}</h3>
              <p className="text-gray-600 text-sm text-center">{industry.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}