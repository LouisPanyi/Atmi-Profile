// src/components/home/section/IndustriesSection.tsx
"use client";

import { motion } from 'framer-motion';
import { industriesData } from '@/data/industries-data';

export default function IndustriesSection() {
  return (
    <section id="industri" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Industri Kami Layani
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <industry.icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{industry.name}</h3>
              <p className="text-gray-600 text-sm">{industry.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}