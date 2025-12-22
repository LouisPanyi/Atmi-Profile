// src/components/produk/section/ProductCategoriesSection.tsx
import { motion } from 'framer-motion';
import { Factory, Building, Users, Cpu } from 'lucide-react';

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export default function ProductCategoriesSection() {
  const categories: ProductCategory[] = [
    {
      id: 'manufacturing',
      title: 'Manufaktur',
      description: 'Peralatan dan mesin untuk industri manufaktur',
      icon: Factory
    },
    {
      id: 'office',
      title: 'Kantor & Sekolah',
      description: 'Furniture dan peralatan untuk kantor dan sekolah',
      icon: Building
    },
    {
      id: 'healthcare',
      title: 'Kesehatan',
      description: 'Peralatan rumah sakit dan fasilitas kesehatan',
      icon: Users
    },
    {
      id: 'technology',
      title: 'Teknologi',
      description: 'Komponen dan peralatan teknologi tinggi',
      icon: Cpu
    }
  ];

  return (
    <motion.section
      id="kategori"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kategori Produk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai kategori produk yang kami sediakan untuk memenuhi kebutuhan industri Anda.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <category.icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{category.title}</h3>
              <p className="text-gray-600 text-center">{category.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}