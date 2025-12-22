"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/actions";
import { Save, Loader2, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const newPass = formData.get("newPassword") as string;
    const oldPass = formData.get("oldPassword") as string;

    // Validasi Client Side Sederhana
    if (newPass && !oldPass) {
        setMessage({ text: "Mohon isi Password Lama untuk keamanan.", type: "error" });
        setLoading(false);
        return;
    }

    if (newPass && newPass === oldPass) {
        setMessage({ text: "Password baru tidak boleh sama dengan password lama.", type: "error" });
        setLoading(false);
        return;
    }

    try {
      const result = await updateProfile(formData);
      
      if (result?.success) {
        setMessage({ text: "Profil berhasil diperbarui!", type: "success" });
        // Reset form password
        const form = e.target as HTMLFormElement;
        form.reset(); 
        // Kembalikan nilai nama karena form.reset() akan menghapusnya juga
        const nameInput = form.elements.namedItem("name") as HTMLInputElement;
        if(nameInput) nameInput.value = formData.get("name") as string;
        
        router.refresh();
      } else {
        setMessage({ text: result?.message || "Gagal update profil.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Terjadi kesalahan sistem.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      
      {/* Notifikasi Alert */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
            {message.type === 'success' ? <CheckCircle size={18}/> : <AlertCircle size={18}/>}
            {message.text}
        </div>
      )}

      {/* Email (Read Only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="text" 
          value={user.email} 
          disabled 
          className="w-full p-2.5 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm"
        />
      </div>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap / Username</label>
        <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input 
            name="name" 
            type="text" 
            defaultValue={user.name}
            required 
            className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
        </div>
      </div>

      {/* Area Ganti Password */}
      <div className="pt-6 mt-6 border-t border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lock size={16} /> Ganti Password
        </h3>
        
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Password Baru</label>
                <input 
                name="newPassword" 
                type="password" 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Kosongkan jika tidak ingin mengganti"
                minLength={6}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Password Lama <span className="text-red-500">*</span>
                </label>
                <input 
                name="oldPassword" 
                type="password" 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="Wajib diisi jika mengganti password baru"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                    *Diperlukan autentikasi password lama untuk menyimpan password baru.
                </p>
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-70 mt-6"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={18} />}
        Simpan Perubahan
      </button>
    </form>
  );
}