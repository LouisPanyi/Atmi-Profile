"use client";

import { useState, useEffect } from "react";
import { createUser } from "@/lib/actions"; // Pastikan path import ini benar
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Shield
} from "lucide-react";
import Link from "next/link";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user", // Default role
  });

  // Password State (Terpisah untuk validasi khusus)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Visibility State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error State
  const [passError, setPassError] = useState("");

  // --- DEBOUNCE VALIDATION ---
  // Mengecek validasi hanya jika user berhenti mengetik selama 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      let error = "";

      if (password || confirmPassword) {
        if (password.length < 6) {
          error = "Password minimal 6 karakter.";
        } else if (password !== confirmPassword && confirmPassword) {
          error = "Konfirmasi password tidak cocok.";
        }
      }
      
      setPassError(error);
    }, 500); // Delay 500ms agar tidak berat

    return () => clearTimeout(timer);
  }, [password, confirmPassword]);

  // Handle Input Biasa (Name, Email, Role)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validasi Akhir sebelum kirim ke server
    if (passError) return;
    if (!password || !confirmPassword) {
      setMessage({ text: "Password dan Konfirmasi Password wajib diisi.", type: "error" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: "Password tidak cocok.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Siapkan FormData untuk Server Action
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("email", formData.email);
    dataToSend.append("role", formData.role);
    dataToSend.append("password", password);

    try {
      const result = await createUser(dataToSend);

      if (result?.success) {
        setMessage({ text: "User berhasil dibuat! Mengalihkan...", type: "success" });
        // Reset form
        setFormData({ name: "", email: "", role: "user" });
        setPassword("");
        setConfirmPassword("");
        
        // Redirect setelah sukses
        setTimeout(() => {
          router.push("/admin/users");
          router.refresh();
        }, 1500);
      } else {
        setMessage({ text: result?.message || "Gagal membuat user.", type: "error" });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Terjadi kesalahan sistem.", type: "error" });
      setLoading(false);
    }
  }

  // Class Utility
  const inputWrapperClass = "relative";
  const inputClass = "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-gray-900 bg-white placeholder-gray-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4";
  const eyeBtnClass = "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors";

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/users" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Kembali ke Daftar User
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Pengguna Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Buat akun untuk akses ke dashboard admin.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        
        {/* Alert Notification */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
              {message.type === 'success' ? <CheckCircle size={18} className="shrink-0"/> : <AlertCircle size={18} className="shrink-0"/>}
              {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NAMA LENGKAP */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
            <div className={inputWrapperClass}>
              <User className={iconClass} />
              <input 
                name="name"
                type="text" 
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Contoh: Alex"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
            <div className={inputWrapperClass}>
              <Mail className={iconClass} />
              <input 
                name="email"
                type="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="nama@email.com"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Peran (Role)</label>
            <div className={inputWrapperClass}>
              <Shield className={iconClass} />
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`${inputClass} appearance-none bg-white`}
              >
                <option value="news_writer">News Writer (Penulis Berita)</option>
                <option value="admin">Admin (Akses Penuh)</option>
              </select>
              {/* Custom Arrow for Select */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* PASSWORD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className={inputWrapperClass}>
                <Lock className={iconClass} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-10 ${passError && passError.includes("minimal") ? "border-red-500 ring-1 ring-red-500" : ""}`}
                  placeholder="Min. 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={eyeBtnClass}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ulangi Password</label>
              <div className={inputWrapperClass}>
                <Lock className={iconClass} />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} pr-10 ${passError && passError.includes("cocok") ? "border-red-500 ring-1 ring-red-500" : ""}`}
                  placeholder="Ketik ulang password"
                  disabled={!password}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={eyeBtnClass}
                  disabled={!password}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* PESAN ERROR VALIDASI PASSWORD (Debounced) */}
          {passError && (
            <div className="flex items-center gap-2 text-red-600 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
              <AlertCircle size={14} />
              {passError}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !!passError || !password || !confirmPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={18} />}
              Buat Akun Baru
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}