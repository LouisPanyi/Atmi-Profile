// src/components/tentang/section/CompanyValuesSection.tsx
import { motion } from 'framer-motion';
import { Star} from 'lucide-react';

interface Value {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface CompanyValuesSectionProps {
  valuesData: Value[];
}

export default function CompanyValuesSection({ valuesData }: CompanyValuesSectionProps) {
  return (
    <motion.section
      id="nilai-nilai"
      className="py-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Star className="mx-auto w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Nilai-Nilai Dasar Kami</h2>
          <p className="text-gray-600 mt-2">Prinsip yang menjadi pemandu setiap langkah kami.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {valuesData.map((value, index) => (
            <motion.div
              key={value.title}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <value.icon className="w-6 h-6 text-blue-700" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2 text-center">{value.title}</h4>
              <p className="text-sm text-gray-600 text-center">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}