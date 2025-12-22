// src/components/tentang/section/CompanyHistorySection.tsx
import { motion } from 'framer-motion';
import Timeline from '@/components/tentang/timeline';
import { History } from 'lucide-react';
import Image from 'next/image';

interface Milestone { year: string; event: string; }
interface CompanyHistorySectionProps { milestoneData: Milestone[]; }

export default function CompanyHistorySection({ milestoneData }: CompanyHistorySectionProps) {
  return (
    <motion.section
      id="sejarah"
      className="py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-3">
            <History className="w-5 h-5 mr-2" />
            <span className="font-medium">Sejarah Perusahaan</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Sejarah & Tonggak Sejarah Kami</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Dari lembaga pendidikan vokasi terkemuka menjadi perusahaan manufaktur presisi yang mandiri.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.figure
          className="max-w-3xl mx-auto mb-10 overflow-hidden rounded-lg shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/images/atmi1.jpg"
              alt="Area kampus/kompleks ATMI Solo"
              fill
              priority={false}
              className="object-cover"
              sizes="(min-width:1280px) 768px, (min-width:768px) 640px, 100vw"
            />
          </div>
          <figcaption className="px-3 py-2 text-center text-xs text-gray-600 bg-white">
            Lingkungan Praktik ATMI — area praktik mahasiswa
          </figcaption>
        </motion.figure>

        <motion.div
          className="max-w-4xl mx-auto text-gray-700 space-y-6 leading-relaxed mb-16 text-justify"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p>
            Pada awal pendirian, ATMI (Akademi Teknik Mesin Industri) Surakarta sebagai lembaga pendidikan vokasi
            telah didirikan pada tahun 1968 oleh para Pastur Serikat Yesus. Pada awalnya ATMI dijalankan oleh para
            Pastor Jesuit dari Swiss.
          </p>

          <p>
            Pada tahun 2012, ATMI secara resmi mempunyai 3 program studi, yaitu Program Studi Mekanik, Program Studi
            Mekatronik dan Program Studi Design. Pada saat itu nama ATMI berubah menjadi Politeknik ATMI Surakarta.
          </p>

          <p>
            Politeknik ATMI Surakarta menyelenggarakan pendidikan vokasi dengan 67% praktek produksi dan 33% kuliah
            teori. Proses pelaksanaan pendidikan praktek produksi para mahasiswa/i untuk mengasah ketrampilan teknis
            dilaksanakan di dalam bengkel produksi.
          </p>

          <p>
            Dalam rangka untuk menyesuaikan dengan perkembangan jaman, pada awal tahun 2012, bengkel produksi
            pendidikan praktek mahasiswa dinyatakan secara resmi berubah menjadi sebuah perusahaan perseroan terbatas
            dengan nama PT. ATMI SOLO.
          </p>

          <p>
            PT. ATMI SOLO berdiri sebagai sebuah perusahaan yang bergerak dalam bidang manufaktur peralatan perkantoran
            dan sekolah, peralatan laboratorium, peralatan bengkel produksi, peralatan rumah sakit dan mesin-mesin khusus.
          </p>

          <p>
            Sebagai sebuah perusahaan yang profesional, PT. ATMI SOLO terus menerus menjalankan strategi untuk perbaikan
            terus-menerus, dalam rangka untuk terus meningkatkan potensi daya saing perusahaan.
          </p>

          <p>
            PT. ATMI Solo mengerjakan produk-produknya dengan menggunakan bahan baku yang berkualitas tinggi dan dengan
            proses produksi yang standar dan efisien, sehingga akan menjamin produk yang berkualitas dan tahan lama.
          </p>

          <p>
            PT ATMI Solo berdiri sebagai sarana pendukung pelaksanaan pendidikan berbasis produksi, sebagai tempat
            berlatih mengasah ketrampilan para Mahasiswa/i di Politeknik ATMI Surakarta dan siswa-siswa di Sekolah
            Menengah Kejuruan Santo Mikael Surakarta, sehingga menjamin mutu lulusan benar-benar siap bekerja di Industri.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Timeline data={milestoneData} />
        </motion.div>
      </div>
    </motion.section>
  );
} 