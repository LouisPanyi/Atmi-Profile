"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash, Save, Loader2, UploadCloud, XCircle, X } from "lucide-react";
import { createNews, updateNews } from "@/lib/actions";
import ConfirmationModal from "@/components/admin/confirmation-modal"; 

interface Section {
  image: string;
  caption: string;
  description: string;
}

interface NewsFormProps {
  initialData?: {
    id: string;
    title: string;
    sections: string;
  };
  isEditMode?: boolean;
}

export default function NewsForm({ initialData, isEditMode = false }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  
  // --- STATE UNTUK MODAL HAPUS SECTION ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sectionToDeleteIndex, setSectionToDeleteIndex] = useState<number | null>(null);

  const [uploadingStates, setUploadingStates] = useState<{ [key: number]: boolean }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const [sections, setSections] = useState<Section[]>(() => {
    if (initialData?.sections) {
      try {
        return JSON.parse(initialData.sections);
      } catch {
        return [{ image: "", caption: "", description: "" }];
      }
    }
    return [{ image: "", caption: "", description: "" }];
  });

  const inputClassName = "w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm";
  const labelClassName = "block text-xs font-bold text-gray-600 uppercase mb-1 tracking-wider";

  const handleSectionChange = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  async function handleFileUpload(index: number, file: File | undefined) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap upload file gambar saja.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar (Maksimal 4MB).");
      return;
    }

    setUploadingStates((prev) => ({ ...prev, [index]: true }));

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) throw new Error("Gagal upload gambar");

      const newBlob = await response.json();
      handleSectionChange(index, "image", newBlob.url);

    } catch (error) {
      console.error(error);
      alert("Gagal mengupload gambar. Coba lagi.");
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index]!.value = "";
      }
    } finally {
      setUploadingStates((prev) => ({ ...prev, [index]: false }));
    }
  }

  const handleRemoveImage = (index: number) => {
    handleSectionChange(index, "image", "");
    if (fileInputRefs.current[index]) {
        fileInputRefs.current[index]!.value = "";
    }
  }

  const addSection = () => {
    setSections([...sections, { image: "", caption: "", description: "" }]);
  };
  
  // 1. TAHAP PERTAMA: Buka Modal Konfirmasi
  const initiateRemoveSection = (index: number) => {
    setSectionToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  // 2. TAHAP KEDUA: Eksekusi Hapus (Dipanggil jika user klik "Ya, Hapus")
  const confirmRemoveSection = () => {
    if (sectionToDeleteIndex === null) return;

    const index = sectionToDeleteIndex;
    
    // Logika hapus asli
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    
    // Bersihkan state upload dan ref yang terkait
    const newUploadingStates = { ...uploadingStates };
    delete newUploadingStates[index];
    setUploadingStates(newUploadingStates);
    delete fileInputRefs.current[index];

    // Tutup Modal
    setIsDeleteModalOpen(false);
    setSectionToDeleteIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!title.trim()) {
        alert("Judul berita tidak boleh kosong.");
        return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("sections", JSON.stringify(sections));

    try {
      let result;
      if (isEditMode && initialData?.id) {
        result = await updateNews(initialData.id, formData);
      } else {
        result = await createNews(formData);
      }

      if (result?.success) {
        router.refresh();
        router.push("/admin/berita");
      } else {
        alert(result?.message || "Gagal menyimpan berita.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Header Form */}
        <div className="border-b border-gray-100 pb-6 flex justify-between items-start">
          <div>
              <h2 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? "Edit Berita" : "Buat Berita Baru"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Isi formulir di bawah ini untuk mempublikasikan artikel.</p>
          </div>
          
          <Link 
              href="/admin/berita" 
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Tutup / Batal"
          >
              <X size={24} />
          </Link>
        </div>

        {/* Judul Utama */}
        <div>
          <label className={labelClassName}>Judul Berita Utama <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClassName + " text-lg font-semibold"}
            placeholder="Contoh: Perkembangan Teknologi AI di Indonesia Tahun 2024"
          />
        </div>

        <hr className="border-gray-100" />

        {/* Sections Container */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Konten Artikel (Bagian-bagian)</h3>
            <button type="button" onClick={addSection} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-100 transition-colors">
              <Plus size={16} /> Tambah Bagian Baru
            </button>
          </div>

          {sections.map((section, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative group transition-all hover:shadow-sm">
              <div className="absolute top-3 right-3">
                <button 
                  type="button" 
                  // UPDATE: Memanggil initiateRemoveSection (buka modal)
                  onClick={() => initiateRemoveSection(idx)} 
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-30"
                  disabled={sections.length === 1} // Mencegah hapus jika tinggal 1
                  title="Hapus bagian ini"
                >
                  <Trash size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-3">
                  <label className={labelClassName}>Gambar / Ilustrasi</label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white text-center relative min-h-[200px] flex flex-col justify-center items-center transition-colors hover:border-blue-400 hover:bg-blue-50/30">
                    {loading || uploadingStates[idx] ? (
                      <div className="flex flex-col items-center text-blue-500">
                          <Loader2 className="animate-spin mb-2" size={24} />
                          <span className="text-xs font-medium">Mengupload...</span>
                      </div>
                    ) : section.image ? (
                      <div className="relative w-full h-full flex flex-col items-center">
                          <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                               <img src={section.image} alt="Preview" className="object-cover w-full h-full" />
                          </div>
                          <div className="flex gap-2">
                             <label htmlFor={`file-upload-${idx}`} className="cursor-pointer text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-200 font-medium flex items-center gap-1">
                               Ganti
                             </label>
                             <button 
                               type="button"
                               onClick={() => handleRemoveImage(idx)}
                               className="text-xs bg-red-100 text-red-700 px-2 py-1.5 rounded-md hover:bg-red-200 font-medium flex items-center"
                               title="Hapus Gambar"
                             >
                               <XCircle size={16}/>
                             </button>
                          </div>
                      </div>
                    ) : (
                      <label htmlFor={`file-upload-${idx}`} className="cursor-pointer flex flex-col items-center w-full h-full justify-center py-6">
                        <UploadCloud className="w-10 h-10 text-gray-300 mb-2" />
                        <span className="text-sm font-medium text-blue-600 hover:underline">Pilih Gambar</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG (Max 4MB)</span>
                      </label>
                    )}
                    
                    <input
                      id={`file-upload-${idx}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileInputRefs.current[idx] = el; }}
                      onChange={(e) => handleFileUpload(idx, e.target.files?.[0])}
                      disabled={loading || uploadingStates[idx]}
                    />
                  </div>

                  <div>
                    <label className={labelClassName}>Caption (Opsional)</label>
                    <input
                      type="text"
                      value={section.caption}
                      onChange={(e) => handleSectionChange(idx, "caption", e.target.value)}
                      className={inputClassName}
                      placeholder="Contoh: Suasana acara..."
                    />
                  </div>
                </div>

                <div className="md:col-span-7">
                  <label className={labelClassName}>Isi Paragraf <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={10}
                    value={section.description}
                    onChange={(e) => handleSectionChange(idx, "description", e.target.value)}
                    className={inputClassName + " resize-y min-h-[200px]"}
                    placeholder="Tulis paragraf artikel di sini..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-100 sticky bottom-0 bg-white p-4 -mx-8 -mb-8 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex gap-4">
          <Link
              href="/admin/berita"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all"
          >
              Batal
          </Link>

          <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all disabled:bg-blue-400 text-lg shadow-lg shadow-blue-200"
          >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {isEditMode ? "Simpan Perubahan" : "Terbitkan Berita"}
          </button>
        </div>
      </form>

      {/* RENDER MODAL KONFIRMASI HAPUS SECTION DI SINI */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmRemoveSection}
        title="Hapus Bagian Artikel?"
        message="Apakah Anda yakin ingin menghapus bagian (paragraf/gambar) ini? Data yang sudah diketik di bagian ini akan hilang."
      />
    </>
  );
}