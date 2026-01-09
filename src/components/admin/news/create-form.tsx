// src/components/admin/news/create-form.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Plus,
  Save,
  Trash,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
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
    slug?: string;
  };
  isEditMode?: boolean;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function isRedirectError(err: unknown): boolean {
  const anyErr = err as { digest?: unknown; message?: unknown };
  const digest = typeof anyErr?.digest === "string" ? anyErr.digest : "";
  const msg = typeof anyErr?.message === "string" ? anyErr.message : "";
  return digest.includes("NEXT_REDIRECT") || msg.includes("NEXT_REDIRECT");
}

export default function NewsForm({ initialData, isEditMode = false }: NewsFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(() => {
    if (initialData?.slug) return initialData.slug;
    return slugify(initialData?.title || "");
  });
  const [isSlugTouched, setIsSlugTouched] = useState(Boolean(initialData?.slug));

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sectionToDeleteIndex, setSectionToDeleteIndex] = useState<number | null>(null);

  const [uploadingStates, setUploadingStates] = useState<{ [key: number]: boolean }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const [sections, setSections] = useState<Section[]>(() => {
    if (initialData?.sections) {
      try {
        const parsed = JSON.parse(initialData.sections);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // ignore
      }
    }
    return [{ image: "", caption: "", description: "" }];
  });

  const inputClassName =
    "w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm";
  const labelClassName =
    "block text-xs font-bold text-gray-600 uppercase mb-1 tracking-wider";

  const canSubmit = useMemo(() => {
    if (!title.trim()) return false;
    if (!slug.trim()) return false;
    if (!Array.isArray(sections) || sections.length === 0) return false;
    if (sections.some((s) => !s.description?.trim())) return false;
    if (Object.values(uploadingStates).some(Boolean)) return false;
    return true;
  }, [sections, slug, title, uploadingStates]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isSlugTouched) setSlug(slugify(value));
  };

  const handleSlugChange = (value: string) => {
    setIsSlugTouched(true);
    setSlug(slugify(value));
  };

  const handleSectionChange = (index: number, field: keyof Section, value: string) => {
    setSections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
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
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) throw new Error("Gagal upload gambar");

      const newBlob = (await response.json()) as { url?: string };
      if (!newBlob?.url) throw new Error("Response upload tidak valid");

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
  };

  const addSection = () => {
    setSections((prev) => [...prev, { image: "", caption: "", description: "" }]);
  };

  const initiateRemoveSection = (index: number) => {
    setSectionToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmRemoveSection = () => {
    if (sectionToDeleteIndex === null) return;
    const idx = sectionToDeleteIndex;

    setSections((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length > 0 ? next : [{ image: "", caption: "", description: "" }];
    });

    setUploadingStates((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });

    delete fileInputRefs.current[idx];

    setIsDeleteModalOpen(false);
    setSectionToDeleteIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalTitle = title.trim();
    const finalSlug = slugify(slug);

    if (!finalTitle) {
      alert("Judul berita tidak boleh kosong.");
      return;
    }

    if (!finalSlug) {
      alert("Slug tidak boleh kosong.");
      return;
    }

    if (!sections.length) {
      alert("Minimal harus ada 1 paragraf.");
      return;
    }

    if (sections.some((s) => !s.description?.trim())) {
      alert("Isi paragraf tidak boleh kosong.");
      return;
    }

    if (Object.values(uploadingStates).some(Boolean)) {
      alert("Masih ada gambar yang sedang diupload. Tunggu sampai selesai.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", finalTitle);
    formData.append("slug", finalSlug);
    formData.append("sections", JSON.stringify(sections));

    if (isEditMode && initialData?.id) {
      formData.append("id", initialData.id);
    }

    try {      
      let result;

      if (isEditMode && initialData?.id) {
        // updateNews akan mengambil ID dari formData.get("id")
        result = await updateNews(formData);
      } else {
        result = await createNews(formData);
      }

      if (result?.success) {
        router.refresh();
        router.push("/admin/berita");
        return;
      }

      if (result && result.success === false) {
        alert(result.message || "Gagal menyimpan berita.");
        return;
      }
    } catch (error) {
      if (isRedirectError(error)) return;
      console.error(error);
      alert("Terjadi kesalahan sistem. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Header Form */}
        <div className="border-b border-gray-100 pb-6 flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Berita" : "Buat Berita Baru"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Isi formulir di bawah ini untuk mempublikasikan artikel.
            </p>
          </div>

          <Link
            href="/admin/berita"
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Tutup / Batal"
          >
            <X size={24} />
          </Link>
        </div>

        {/* Judul */}
        <div>
          <label className={labelClassName}>
            Judul Berita Utama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClassName + " text-lg font-semibold"}
            placeholder="Contoh: Atmi Solo Raih Penghargaan..."
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClassName}>
            Slug URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className={inputClassName}
            placeholder="contoh: berita-atmi-solo"
          />
          <p className="text-xs text-gray-500 mt-2">
            Preview URL: <span className="font-mono text-gray-700">/berita/{slug || "..."}</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Konten Berita</h3>
              <p className="text-sm text-gray-500">
                Tambahkan paragraf. Setiap Section bisa punya gambar dan caption.
              </p>
            </div>

            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              <Plus size={18} />
              Tambah Section
            </button>
          </div>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-50/40 p-6">
                {/* Section header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Section {idx + 1}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => initiateRemoveSection(idx)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-sm font-semibold"
                    title="Hapus paragraf"
                    disabled={loading || uploadingStates[idx]}
                  >
                    <Trash size={16} />
                    Hapus
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left: image + caption */}
                  <div className="md:col-span-5 space-y-3">
                    <label className={labelClassName}>Gambar / Ilustrasi</label>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white text-center relative min-h-[220px] flex flex-col justify-center items-center transition-colors hover:border-blue-400 hover:bg-blue-50/30">
                      {loading || uploadingStates[idx] ? (
                        <div className="flex flex-col items-center text-blue-500">
                          <Loader2 className="animate-spin mb-2" size={24} />
                          <span className="text-xs font-medium">Mengupload...</span>
                        </div>
                      ) : section.image ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                          <div className="relative w-full h-44 mb-3 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                            <Image
                              src={section.image}
                              alt="Preview"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          <div className="flex gap-2">
                            <label
                              htmlFor={`file-upload-${idx}`}
                              className="cursor-pointer text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-200 font-medium flex items-center gap-1"
                            >
                              Ganti
                            </label>

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="text-xs bg-red-100 text-red-700 px-2 py-1.5 rounded-md hover:bg-red-200 font-medium flex items-center"
                              title="Hapus Gambar"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor={`file-upload-${idx}`}
                          className="cursor-pointer flex flex-col items-center w-full h-full justify-center py-6"
                        >
                          <UploadCloud className="w-10 h-10 text-gray-300 mb-2" />
                          <span className="text-sm font-medium text-blue-600 hover:underline">
                            Pilih Gambar
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            PNG, JPG (Max 4MB)
                          </span>
                        </label>
                      )}

                      <input
                        id={`file-upload-${idx}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => {
                          fileInputRefs.current[idx] = el;
                        }}
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

                  {/* Right: description */}
                  <div className="md:col-span-7">
                    <label className={labelClassName}>
                      Isi Deskripsi <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={14}
                      value={section.description}
                      onChange={(e) => handleSectionChange(idx, "description", e.target.value)}
                      className={inputClassName + " resize-y min-h-[360px]"}
                      placeholder="Tulis paragraf artikel di sini..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tips: gunakan enter untuk paragraf baru. Jika kamu render di halaman publik,
                      pastikan kamu menampilkan line-break sesuai kebutuhan.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-semibold"
            disabled={loading}
          >
            <Plus size={18} />
            Tambah Section
          </button>

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors text-sm font-semibold"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {isEditMode ? "Simpan Perubahan" : "Publish Berita"}
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmRemoveSection}
        isLoading={loading}
        title="Hapus Section?"
        message="Section yang dipilih akan dihapus. Tindakan ini tidak bisa dibatalkan."
      />
    </>
  );
}
