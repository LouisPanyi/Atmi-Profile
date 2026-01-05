"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image
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
    images: any;
    features: any;
    specifications: any;
  };
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parseJSON = (data: any, fallback: any) => {
    if (!data) return fallback;
    return typeof data === 'string' ? JSON.parse(data) : data;
  };

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Board");

  const [images, setImages] = useState<ProductImage[]>(
    parseJSON(initialData?.images, [])
  );
  const [features, setFeatures] = useState<string[]>(
    parseJSON(initialData?.features, [""])
  );

  const initialSpecsObj = parseJSON(initialData?.specifications, {});
  const initialSpecsArray = Object.entries(initialSpecsObj).map(([key, value]) => ({
    key, value: String(value)
  }));

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    initialSpecsArray.length > 0 ? initialSpecsArray : [{ key: "", value: "" }]
  );

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass = "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const file = e.target.files[0];
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, { method: "POST", body: file });
      if (!res.ok) throw new Error("Gagal upload gambar");
      const data = await res.json();
      const newImage: ProductImage = {
        id: `img-${Date.now()}`,
        url: data.url,
        alt: name || "Product Image",
        caption: "",
        featured: images.length === 0,
      };
      setImages([...images, newImage]);
    } catch (err) {
      alert("Gagal mengupload gambar.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => setImages(images.filter((img) => img.id !== id));
  const setFeaturedImage = (id: string) => setImages(images.map(img => ({ ...img, featured: img.id === id })));
  const updateImageMeta = (id: string, field: 'alt' | 'caption', value: string) => setImages(images.map(img => img.id === id ? { ...img, [field]: value } : img));

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !category) {
      setError("Nama dan Kategori wajib diisi.");
      setLoading(false);
      return;
    }
    if (images.length === 0) {
      setError("Harap upload minimal 1 gambar.");
      setLoading(false);
      return;
    }

    const cleanFeatures = features.filter(f => f.trim() !== "");
    const cleanSpecsObject: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.value.trim()) cleanSpecsObject[s.key] = s.value;
    });

    const formData = new FormData();
    if (isEditMode && initialData) {
      formData.append("id", initialData.id);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("images", JSON.stringify(images));
    formData.append("features", JSON.stringify(cleanFeatures));
    formData.append("specifications", JSON.stringify(cleanSpecsObject));

    try {
      let res;
      if (isEditMode) {
        res = await updateProduct(formData);
      } else {
        res = await createProduct(formData);
      }

      if (res.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(res.message || "Gagal menyimpan.");
      }
    } catch (err) {
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

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Informasi Dasar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Nama Produk <span className="text-red-500">*</span></label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Contoh: White Board Premium" />
          </div>
          <div>
            <label className={labelClass}>Kategori <span className="text-red-500">*</span></label>
            <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
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
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className={inputClass} placeholder="Deskripsi singkat produk..." />
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
                  <p className="text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
                </>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} ref={fileInputRef} />
          </label>
        </div>

        <div className="space-y-4">
          {images.map((img) => (
            <div key={img.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 items-start">
              {/* Menggunakan Image untuk Preview */}
              <div className="w-24 h-24 flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-300 relative group">
                <Image
                  src={img.url}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                {img.featured && <div className="absolute top-0 right-0 bg-yellow-400 text-white p-1"><Star size={12} fill="white" /></div>}
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block">Alt Text</label>
                    <input type="text" value={img.alt} onChange={e => updateImageMeta(img.id, 'alt', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block">Caption</label>
                    <input type="text" value={img.caption || ""} onChange={e => updateImageMeta(img.id, 'caption', e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <button type="button" onClick={() => setFeaturedImage(img.id)} className={`flex items-center gap-1 ${img.featured ? "text-yellow-600 font-bold" : "text-gray-500"}`}>
                    <Star size={14} className={img.featured ? "fill-yellow-600" : ""} /> Utama
                  </button>
                  <button type="button" onClick={() => removeImage(img.id)} className="text-red-500 flex items-center gap-1"><Trash size={14} /> Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Spesifikasi & Fitur sama, tidak ada gambar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="font-semibold text-gray-800">Spesifikasi</h2>
            <button type="button" onClick={addSpec} className="text-blue-600 text-sm hover:underline flex items-center gap-1"><Plus size={14} /> Tambah</button>
          </div>
          <div className="space-y-3">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" placeholder="Label" value={spec.key} onChange={e => updateSpec(idx, 'key', e.target.value)} className={inputClass} />
                <input type="text" placeholder="Nilai" value={spec.value} onChange={e => updateSpec(idx, 'value', e.target.value)} className={inputClass} />
                <button type="button" onClick={() => removeSpec(idx)} className="text-red-400 p-2"><X size={16} /></button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="font-semibold text-gray-800">Fitur Unggulan</h2>
            <button type="button" onClick={addFeature} className="text-blue-600 text-sm hover:underline flex items-center gap-1"><Plus size={14} /> Tambah</button>
          </div>
          <div className="space-y-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" placeholder="Fitur" value={feat} onChange={e => updateFeature(idx, e.target.value)} className={inputClass} />
                <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 p-2"><X size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

      <div className="flex gap-4 pt-4 sticky bottom-0 bg-gray-50 p-4 -mx-4 md:static md:bg-transparent md:p-0">
        <Link href="/admin/products" className="flex-1 py-3 text-center border border-gray-300 rounded-lg text-gray-700 font-bold bg-white">Batal</Link>
        <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {isEditMode ? "Update Produk" : "Simpan Produk"}
        </button>
      </div>
    </form>
  );
}