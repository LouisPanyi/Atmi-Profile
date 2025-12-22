// src/components/layanan/section/coating-detail.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CoatingDetailData {
  pretreatment?: {
    description: string;
    types: {
      iron: string[];
      aluminum: string[];
    };
    processes: {
      types: string[];
      stages: {
        name: string;
        description: string;
      }[];
    };
  };
  coating?: {
    description: string;
    types: {
      iron: string[];
      aluminum: string[];
    };
    processes: {
      types: string[];
      stages: {
        name: string;
        description: string;
      }[];
    };
  };
}

interface CoatingDetailSectionProps {
  sections: CoatingDetailData;
}

export default function CoatingDetailSection({ sections }: CoatingDetailSectionProps) {
  const [openSections, setOpenSections] = useState({
    pretreatment: false,
    coating: false
  });

  const toggleSection = (section: 'pretreatment' | 'coating') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Pretreatment Section */}
      {sections.pretreatment && (
        <div className="bg-blue-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('pretreatment')}
            className="w-full flex items-center justify-between p-4 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Pretreatment</h3>
            </div>
            {openSections.pretreatment ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          <AnimatePresence>
            {openSections.pretreatment && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-4">
                  <p className="text-gray-700">{sections.pretreatment.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Jenis Material</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Besi:</p>
                          <ul className="text-sm text-gray-600 ml-4">
                            {sections.pretreatment.types.iron.map((type, index) => (
                              <li key={index}>• {type}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Aluminium:</p>
                          <ul className="text-sm text-gray-600 ml-4">
                            {sections.pretreatment.types.aluminum.map((type, index) => (
                              <li key={index}>• {type}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Proses & Tahapan</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Jenis Proses:</p>
                          <div className="flex flex-wrap gap-1">
                            {sections.pretreatment.processes.types.map((type, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tahapan Utama:</p>
                          <ul className="text-sm text-gray-600 ml-4 space-y-1">
                            {sections.pretreatment.processes.stages.slice(0, 3).map((stage, index) => (
                              <li key={index}>• {stage.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Coating Section */}
      {sections.coating && (
        <div className="bg-green-50 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('coating')}
            className="w-full flex items-center justify-between p-4 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Coating</h3>
            </div>
            {openSections.coating ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          <AnimatePresence>
            {openSections.coating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-4">
                  <p className="text-gray-700">{sections.coating.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Jenis Material</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Besi:</p>
                          <ul className="text-sm text-gray-600 ml-4">
                            {sections.coating.types.iron.map((type, index) => (
                              <li key={index}>• {type}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Aluminium:</p>
                          <ul className="text-sm text-gray-600 ml-4">
                            {sections.coating.types.aluminum.map((type, index) => (
                              <li key={index}>• {type}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Proses & Tahapan</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Jenis Proses:</p>
                          <div className="flex flex-wrap gap-1">
                            {sections.coating.processes.types.map((type, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tahapan Utama:</p>
                          <ul className="text-sm text-gray-600 ml-4 space-y-1">
                            {sections.coating.processes.stages.slice(0, 3).map((stage, index) => (
                              <li key={index}>• {stage.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}