"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fabricationData } from "@/data/work-fabrication-data";
import ImageSliderWithVideo from "@/components/image-video";
import CoatingDetailSection from "@/components/layanan/section/coating-detail";
import { coatingDetailData } from "@/data/coating-data";

// Definisi Interface untuk Data
interface FabricationDetail {
  label: string;
  items: string[];
}

interface FabricationItem {
  title?: string;
  description?: string;
  capabilities?: string[];
  images?: string[];
  video?: string;
  details?: FabricationDetail[];
}

export default function WorkFabrication() {
  const serviceKeys = Object.keys(fabricationData || {});
  const [activeService, setActiveService] = useState(serviceKeys[0] || "");

  // Casting aman ke Record
  const dataMap = fabricationData as Record<string, FabricationItem>;
  const currentData = dataMap[activeService] || {};

  return (
    <motion.div 
      // PERBAIKAN: Tambahkan ID untuk target scroll dari footer
      id="work-fabrication"
      className="scroll-mt-24" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.3 }}
    >
      {/* Lead */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900">Work Fabrication</h3>
        <p className="text-slate-700 mt-2">
          Layanan manufaktur presisi end-to-end: machining, fabrication, finishing, hingga QC.
        </p>
        <div className="mt-4 rounded-xl border border-blue-200/70 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <p className="text-blue-900 text-sm">
            <strong>Keunggulan:</strong> teknologi modern, tenaga ahli, kontrol kualitas ketat, dan layanan one-stop.
          </p>
        </div>
      </div>

      {/* Sub-Service Pills */}
      {serviceKeys.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {serviceKeys.map((key) => {
              const active = activeService === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveService(key)}
                  aria-label={`Pilih layanan ${key}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative hover:z-10 ${active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {key}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Content Card */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md ring-1 ring-slate-200 shadow-md"
          >
            {(currentData.title || currentData.description) && (
              <div className="border-b border-slate-200 px-6 py-4">
                {currentData.title && (
                  <h4 className="text-xl font-bold text-slate-900">{currentData.title}</h4>
                )}
                {currentData.description && (
                  <p className="text-slate-700 mt-1">{currentData.description}</p>
                )}
              </div>
            )}

            <div className="p-6">
              {/* Capabilities */}
              {!!currentData.capabilities?.length && (
                <div className="mb-6">
                  <h5 className="text-base font-semibold text-slate-900 mb-2">
                    Kemampuan Layanan
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentData.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-blue-200 bg-blue-50 text-blue-800 px-3 py-1.5 text-sm"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Media */}
              {!!(currentData.images?.length) && currentData.video && (
                <div className="mb-6">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-slate-200 shadow">
                    <div className="absolute inset-0">
                      <ImageSliderWithVideo
                        images={currentData.images}
                        video={currentData.video}
                        channelName="PT ATMI SOLO"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Details */}
              {!!currentData.details?.length && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentData.details.map((detail, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <p className="mb-2 font-medium text-slate-800">{detail.label}:</p>
                      <ul className="space-y-1">
                        {(detail.items || []).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start text-slate-700">
                            <span className="mr-2 text-blue-600">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Coating detail khusus */}
              {activeService === "Coating" && (
                <div className="mt-6">
                  <CoatingDetailSection sections={coatingDetailData} />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}