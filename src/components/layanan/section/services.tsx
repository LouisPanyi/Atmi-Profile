// File: src/components/layanan/section/services.tsx
// ============================================================================
"use client";

import { motion } from "framer-motion";
import WorkFabrication from "./work-fabrication";
import MachineDevelopment from "./machine-development";

export type TabType = "work-fabrication" | "machine-development";

interface ServicesTabsSectionProps {
  activeTab: TabType;
  onTabChange: (tabId: TabType) => void;
}

interface Tab {
  id: TabType;
  label: string;
  desc: string;
}

const tabs: Tab[] = [
  {
    id: "work-fabrication",
    label: "Work Fabrication",
    desc: "Manufaktur presisi & finishing",
  },
  {
    id: "machine-development",
    label: "Machine Development Center",
    desc: "Rancang bangun mesin khusus",
  },
];

export default function ServicesTabsSection({
  activeTab,
  onTabChange,
}: ServicesTabsSectionProps) {
  return (
    <motion.section
      id="daftar-layanan"
      className="relative py-10"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Panel kaca terang */}
      <div className="mx-auto max-w-6xl rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-slate-200/80 shadow-sm">
        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-6">
          <div className="flex justify-center">
            <div className="inline-flex items-stretch rounded-2xl bg-white/80 backdrop-blur-md shadow-md ring-1 ring-slate-200/80 p-1.5">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    aria-label={`Pilih tab ${tab.label}`}
                    className={`group relative px-5 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all outline-none ${
                      active ? "text-white" : "text-slate-700 hover:text-slate-900"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex flex-col items-center">
                      <span>{tab.label}</span>
                      <span
                        className={`mt-0.5 text-xs ${
                          active ? "text-white/90" : "text-slate-500"
                        }`}
                      >
                        {tab.desc}
                      </span>
                    </span>

                    {active ? (
                      <motion.span
                        layoutId="tab-active-bg"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    ) : (
                      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-200/90" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 pb-8">
          <div className="mx-auto mt-8 max-w-6xl">
            {activeTab === "work-fabrication" && <WorkFabrication />}
            {activeTab === "machine-development" && <MachineDevelopment />}
          </div>
        </div>
      </div>
    </motion.section>
  );
}