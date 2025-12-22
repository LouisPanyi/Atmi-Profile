// src/components/tentang/section/VisionMissionSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Target, Cog, ShieldCheck, Handshake, CheckCircle } from "lucide-react"; // Ikon yang pasti tersedia

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.08 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function VisionMissionSection() {
  return (
    <motion.section
      id="visi-misi"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      {/* tekstur grid halus untuk kesan profesional */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={child}>
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/80 ring-1 ring-slate-200 shadow flex items-center justify-center">
            <Target className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
              Visi &amp; Misi Kami
            </span>
          </h2>
          <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Dasar arah strategi dan budaya kerja yang kami pegang teguh.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Visi */}
          <motion.div
            variants={child}
            className="relative rounded-2xl bg-white/85 backdrop-blur-sm ring-1 ring-slate-200 shadow-lg"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b from-blue-600 to-indigo-600" />
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 ring-1 ring-blue-200">
                  <Target className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">Visi</h3>
              </div>

              <blockquote className="relative">
                <div className="absolute -left-3 top-0 text-4xl text-blue-600/20 select-none leading-none">“</div>
                <p className="text-slate-700 leading-relaxed pl-3">
                  Terciptanya masyarakat industri yang adil dan sejahtera, menghormati martabat manusia,
                  dan bertanggung jawab atas keseimbangan lingkungan hidup.
                </p>
              </blockquote>
            </div>
          </motion.div>

          {/* Misi */}
          <motion.div
            variants={child}
            className="relative rounded-2xl bg-white/85 backdrop-blur-sm ring-1 ring-slate-200 shadow-lg"
          >
            <div className="p-6 md:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 ring-1 ring-indigo-200">
                  <CheckCircle className="w-5 h-5 text-indigo-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">Misi</h3>
              </div>

              <p className="text-slate-700 leading-relaxed mb-5">
                Mendidik kaum muda menjadi tenaga profesional yang mampu membantu perkembangan bangsa menuju masyarakat industri yang adil dan makmur,
                mempunyai tanggung jawab moral dan sosial yang terumuskan dalam trilogi <strong>4C</strong> :
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Trilogi 4C">
                {/* C1 */}
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-50 ring-1 ring-blue-200">
                    <Cog className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-600 text-white">C1</span>
                      <h4 className="font-semibold text-slate-900">Competentia</h4>
                    </div>
                    <p className="text-sm text-slate-600">Ketrampilan Teknis</p>
                  </div>
                </li>

                {/* C2 */}
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-50 ring-1 ring-blue-200">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-600 text-white">C2</span>
                      <h4 className="font-semibold text-slate-900">Conscientia</h4>
                    </div>
                    <p className="text-sm text-slate-600">Tanggung Jawab Moral</p>
                  </div>
                </li>

                {/* C3 */}
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-50 ring-1 ring-blue-200">
                    <Handshake className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-600 text-white">C3</span>
                      <h4 className="font-semibold text-slate-900">Compassio</h4>
                    </div>
                    <p className="text-sm text-slate-600">Pengarus Sosial &amp; Kegiatan Industri</p>
                  </div>
                </li>

                {/* C4 */}
                <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-blue-50 ring-1 ring-blue-200">
                    <CheckCircle className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-600 text-white">C4</span>
                      <h4 className="font-semibold text-slate-900">Commitment</h4>
                    </div>
                    <p className="text-sm text-slate-600">Komitmen terhadap Tanggung Jawab</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* garis accent bawah */}
        <motion.div variants={child} className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>
    </motion.section>
  );
}
