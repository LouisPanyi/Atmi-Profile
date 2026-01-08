// src/components/admin/product-form.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProduct, updateProduct } from "@/lib/actions";
import { Save, Loader2, Plus, Trash, UploadCloud, X, Star } from "lucide-react";
import Link from "next/link";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  featured: boolean;
}

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
    category: string;
    images: string | ProductImage[];
    features: string | string[];
    specifications: string | Record<string, string>;
  };
}

function safeParseJSON<T>(data: string | T | null | undefined, fallback: T): T {
  if (data == null) return fallback;
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

function ensureSingleFeatured(images: ProductImage[]): ProductImage[] {
  if (images.length === 0) return images;
  const featuredCount = images.filter((i) => i.featured).length;

  if (featuredCount === 1) return images;

  // If none or multiple, force first as featured.
  return images.map((img, idx) => ({ ...img, featured: idx === 0 }));
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "Board");

  const initialImages = useMemo(() => {
    const parsed = safeParseJSON<ProductImage[]>(initialData?.images ?? null, []);
    // Normalize minimal fields + featured
    const normalized = parsed
      .filter((x) => x && typeof x.url === "string" && x.url.length > 0)
      .map((x) => ({
        id: x.id || `img-${crypto?.randomUUID?.() ?? Date.now()}`,
        url: x.url,
        alt: x.alt || initialData?.name || "Product Image",
        caption: x.caption ?? "",
        featured: !!x.featured,
      }));
    return ensureSingleFeatured(normalized);
  }, [initialData]);

  const [images, setImages] = useState<ProductImage[]>(initialImages);

  const [features, setFeatures] = useState<string[]>(
    safeParseJSON<string[]>(initialData?.features ?? null, [""])
  );

  const initialSpecsObj = safeParseJSON<Record<string, string>>(
    initialData?.specifications ?? null,
    {}
  );

  const initialSpecsArray = useMemo(() => {
    const arr = Object.entries(initialSpecsObj).map(([key, value]) => ({
      key,
      value: String(value ?? ""),
    }));
    return arr.length > 0 ? arr : [{ key: "", value: "" }];
  }, [initialSpecsObj]);

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(initialSpecsArray);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass =
    "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });

      if (!res.ok) throw new Error("Gagal upload gambar");

      const data: unknown = await res.json();
      const url = (data as { url?: string })?.url;
      if (!url) throw new Error("Response upload tidak valid (url kosong)");

      const id = crypto?.randomUUID?.() ?? `img-${Date.now()}`;
      const newImage: ProductImage = {
        id,
        url,
        alt: name || "Product Image",
        caption: "",
        featured: false,
      };

      setImages((prev) => ensureSingleFeatured([...prev, newImage]));
    } catch (err) {
      console.error(err);
      setError("Gagal mengupload gambar.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => ensureSingleFeatured(prev.filter((img) => img.id !== id)));
  };

  const setFeaturedImage = (id: string) => {
    setImages((prev) => prev.map((img) => ({ ...img, featured: img.id === id })));
  };

  const updateImageMeta = (id: string, field: "alt" | "caption", value: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, [field]: value } : img)));
  };

  const addFeature = () => setFeatures((prev) => [...prev, ""]);
  const removeFeature = (index: number) =>
    setFeatures((prev) => (prev.length <= 1 ? [""] : prev.filter((_, i) => i !== index)));
  const updateFeature = (index: number, value: string) => {
    setError("");
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);
  const removeSpec = (index: number) =>
    setSpecs((prev) => (prev.length <= 1 ? [{ key: "", value: "" }] : prev.filter((_, i) => i !== index)));
  const updateSpec = (index: number, field: "key" | "value", val: string) => {
    setError("");
    setSpecs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

const validateBeforeSubmit = (): string => {
    if (!name.trim() || !category.trim()) return "Nama dan Kategori wajib diisi.";
    if (images.length === 0) return "Harap upload minimal 1 gambar.";

    // Pastikan ada featured (harus 1)
    const featuredCount = images.filter((i) => i.featured).length;
    if (featuredCount !== 1) return "Harus ada tepat 1 gambar Utama (featured).";

    // Validasi Spesifikasi: Duplikasi & Kelengkapan
    const keys = specs.map((s) => s.key.trim()).filter(Boolean);
    const seen = new Set<string>();

    for (const [index, s] of specs.entries()) {
      const k = s.key.trim();
      const v = s.value.trim();

      // 1. Cek Duplikasi Judul
      if (k) {
        const norm = k.toLowerCase();
        if (seen.has(norm)) return `Judul spesifikasi tidak boleh sama: "${k}" duplikat.`;
        seen.add(norm);
      }

      // 2. Cek Kelengkapan Pasangan (Validasi Baru)
      // Jika Judul diisi tapi Nilai kosong -> Error
      if (k && !v) return `Nilai spesifikasi untuk "${k}" wajib diisi.`;
      
      // Jika Nilai diisi tapi Judul kosong -> Error
      if (!k && v) return `Judul spesifikasi untuk nilai "${v}" wajib diisi.`;
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validationError = validateBeforeSubmit();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);

    const cleanSpecsObject: Record<string, string> = {};
    for (const s of specs) {
      const k = s.key.trim();
      const v = s.value.trim();
      if (k && v) cleanSpecsObject[k] = v;
    }

    const normalizedImages = ensureSingleFeatured(images);

    const formData = new FormData();
    if (isEditMode && initialData) formData.append("id", initialData.id);
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("category", category.trim());
    formData.append("images", JSON.stringify(normalizedImages));
    formData.append("features", JSON.stringify(cleanFeatures));
    formData.append("specifications", JSON.stringify(cleanSpecsObject));

    try {
      const res = isEditMode ? await updateProduct(formData) : await createProduct(formData);

      if (res?.success) {
        router.push("/admin/products");
        router.refresh();
        return;
      }

      setError(res?.message || "Gagal menyimpan.");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2 animate-pulse">
          <X size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Informasi Dasar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setError("");
                setName(e.target.value);
              }}
              className={inputClass}
              placeholder="Contoh: White Board Premium"
            />
          </div>
          <div>
            <label className={labelClass}>
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => {
                setError("");
                setCategory(e.target.value);
              }}
              className={inputClass}
            >
              <option value="Board">Board</option>
              <option value="Cabinet">Cabinet</option>
              <option value="Chair">Chair</option>
              <option value="Cupboard">Cupboard</option>
              <option value="Desk">Desk & Table</option>
              <option value="Locker">Locker</option>
              <option value="Rack">Rack</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Tool Cabinet">Tool Cabinet</option>
              <option value="Tool Cart">Tool Cart</option>
              <option value="Mobile File">Mobile File</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Deskripsi</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setError("");
                setDescription(e.target.value);
              }}
              className={inputClass}
              placeholder="Deskripsi singkat produk..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Galeri Gambar</h2>

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload</span>
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              ref={fileInputRef}
            />
          </label>
        </div>

        <div className="space-y-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 items-start"
            >
              <div className="w-24 h-24 flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-300 relative group">
                <Image src={img.url} alt={img.alt || "Preview"} fill className="object-cover" sizes="96px" />
                {img.featured && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-white p-1">
                    <Star size={12} fill="white" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block">Alt Text</label>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => updateImageMeta(img.id, "alt", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block">Caption</label>
                    <input
                      type="text"
                      value={img.caption || ""}
                      onChange={(e) => updateImageMeta(img.id, "caption", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <button
                    type="button"
                    onClick={() => setFeaturedImage(img.id)}
                    className={`flex items-center gap-1 ${img.featured ? "text-yellow-600 font-bold" : "text-gray-500"}`}
                  >
                    <Star size={14} className={img.featured ? "fill-yellow-600" : ""} /> Utama
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="text-red-500 flex items-center gap-1"
                  >
                    <Trash size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="font-semibold text-gray-800">Spesifikasi</h2>
            <button
              type="button"
              onClick={addSpec}
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>

          <div className="space-y-4">
            {specs.map((spec, idx) => {
              const normalized = spec.key.trim().toLowerCase();
              
              // Cek Duplikat
              const isDuplicate =
                normalized !== "" &&
                specs.some((s, i) => i !== idx && s.key.trim().toLowerCase() === normalized);

              // Cek Kosong tapi pasangannya terisi (Validasi Visual)
              const isEmptyKey = spec.value.trim() !== "" && spec.key.trim() === "";
              const isEmptyValue = spec.key.trim() !== "" && spec.value.trim() === "";

              return (
                <div key={idx} className="flex gap-4 items-start">
                  
                  {/* INPUT JUDUL (KEY) */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Label (mis: Warna)"
                      value={spec.key}
                      onChange={(e) => updateSpec(idx, "key", e.target.value)}
                      className={`${inputClass} ${
                        isDuplicate || isEmptyKey ? "border-red-500 bg-red-50 focus:ring-red-500" : ""
                      }`}
                    />
                    {isDuplicate && (
                      <p className="text-[11px] text-red-600 mt-1 absolute -bottom-5 left-1 font-medium">
                        *Judul duplikat
                      </p>
                    )}
                    {isEmptyKey && (
                      <p className="text-[11px] text-red-600 mt-1 absolute -bottom-5 left-1 font-medium">
                        *Wajib diisi
                      </p>
                    )}
                  </div>

                  {/* INPUT NILAI (VALUE) */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Nilai (mis: Putih)"
                      value={spec.value}
                      onChange={(e) => updateSpec(idx, "value", e.target.value)}
                      className={`${inputClass} ${
                        isEmptyValue ? "border-red-500 bg-red-50 focus:ring-red-500" : ""
                      }`}
                    />
                     {isEmptyValue && (
                      <p className="text-[11px] text-red-600 mt-1 absolute -bottom-5 left-1 font-medium">
                        *Wajib diisi
                      </p>
                    )}
                  </div>

                  {/* TOMBOL HAPUS */}
                  <button
                    type="button"
                    onClick={() => removeSpec(idx)}
                    className="text-red-500 hover:text-red-700 p-2.5 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Spesifikasi"
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="font-semibold text-gray-800">Fitur Unggulan</h2>
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Tambah
            </button>
          </div>

          <div className="space-y-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Fitur"
                  value={feat}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  className={inputClass}
                />
                <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 p-2">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 sticky bottom-0 bg-gray-50 p-4 -mx-4 md:static md:bg-transparent md:p-0">
        <Link
          href="/admin/products"
          className="flex-1 py-3 text-center border border-gray-300 rounded-lg text-gray-700 font-bold bg-white"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {isEditMode ? "Update Produk" : "Simpan Produk"}
        </button>
      </div>
    </form>
  );
}
