// src/components/home/section/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/service-card";
import { servicesData } from "@/data/services-data";

export default function ServicesSection() {
  return (
    <section
      id="layanan"
      className="
        relative overflow-hidden py-20
        bg-gradient-to-b from-blue-100 via-blue-200/60 to-blue-50
        dark:from-blue-400 dark:via-blue-600 dark:to-blue-750
      "
      aria-labelledby="layanan-heading"
    >
      {/* Grid biru tipis */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          className="text-blue-300 dark:text-blue-800"
        />
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>

      {/* Blob biru lembut */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-blue-300/35 blur-3xl"
        initial={{ opacity: 0.6, x: 0, y: 0 }}
        animate={{ x: 30, y: 20 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl"
        initial={{ opacity: 0.5, x: 0, y: 0 }}
        animate={{ x: -40, y: 15 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-3xl"
        initial={{ opacity: 0.45, x: 0, y: 0 }}
        animate={{ x: 20, y: -10 }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 id="layanan-heading" className="text-3xl font-bold text-slate-900 dark:text-white">
            Layanan Inti Kami
          </h2>
          <p className="text-slate-700 dark:text-blue-100/90 mt-2 mb-12 max-w-2xl mx-auto">
            Dua pilar utama yang menopang keunggulan rekayasa dan manufaktur di PT ATMI SOLO.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                [@supports(backdrop-filter:blur(0))]:backdrop-blur
                bg-white/70 dark:bg-blue-900/30
                ring-1 ring-blue-200/60 dark:ring-blue-800/60 rounded-2xl
              "
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                features={service.features}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
