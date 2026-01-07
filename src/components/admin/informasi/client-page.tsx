"use client";

import { useState } from "react";
import { FooterFile } from "@/lib/definitions";
import InformationTable from "./table";
import UploadFormModal from "./upload-modal";
import { Folder, Presentation, FileText } from "lucide-react";

export default function InformationClient({ files }: { files: FooterFile[] }) {
  const [activeTab, setActiveTab] = useState<"katalog" | "presentasi" | "profile">("katalog");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filter data berdasarkan tab
  const filteredFiles = files.filter((f) => f.category === activeTab);

  const tabs = [
    { id: "katalog", label: "Katalog", icon: Folder },
    { id: "presentasi", label: "Presentasi", icon: Presentation },
    { id: "profile", label: "Company Profile", icon: FileText },
  ];

  return (
    <div>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Upload File Baru
        </button>
      </div>

      {/* Table Content */}
      <InformationTable 
        files={filteredFiles} 
        category={activeTab} 
      />

      {/* Upload Modal */}
      <UploadFormModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultCategory={activeTab}
      />
    </div>
  );
}