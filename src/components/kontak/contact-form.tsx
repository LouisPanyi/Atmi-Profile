"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Paperclip,
  X,
  File as FileIcon,
  Lock,
  Power,
  ShieldAlert
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { sendContactMessage } from "@/lib/actions";
import Image from "next/image";

// --- KONFIGURASI UPLOAD ---
type UploadConfig = {
  maxFiles: number;
  maxPerFileMB: number;
  maxTotalMB: number;
  accept: string[];
};

const UPLOAD: UploadConfig = {
  maxFiles: 5,
  maxPerFileMB: 5, // 5MB per file
  maxTotalMB: 20,  // Total 20MB
  accept: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export default function ContactForm() {
  const { data: session, status } = useSession();

  // State Form
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [serverMessage, setServerMessage] = useState<{success: boolean, text: string} | null>(null);

  // --- VALIDASI ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.message.trim()) newErrors.message = "Pesan wajib diisi";
    if (formData.phone && !/^[+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Format telepon tidak valid (Gunakan angka/+).";
    }

    // Validasi File
    if (files.length > UPLOAD.maxFiles) {
      newErrors.files = `Maksimal ${UPLOAD.maxFiles} file.`;
    }
    
    let currentTotalSize = 0;
    for (const f of files) {
      if (!UPLOAD.accept.includes(f.type)) {
        newErrors.files = "Tipe file tidak didukung (Gunakan JPG, PNG, PDF, DOC).";
        break;
      }
      if (f.size > UPLOAD.maxPerFileMB * 1024 * 1024) {
        newErrors.files = `File terlalu besar. Maksimal ${UPLOAD.maxPerFileMB}MB per file.`;
        break;
      }
      currentTotalSize += f.size;
    }

    if (currentTotalSize > UPLOAD.maxTotalMB * 1024 * 1024) {
      newErrors.files = `Total ukuran file melebihi batas ${UPLOAD.maxTotalMB}MB.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLERS ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error saat user mengetik
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files ? Array.from(e.target.files) : [];
    const next = [...files, ...fl].slice(0, UPLOAD.maxFiles);
    setFiles(next);
    if (errors.files) {
        setErrors((prev) => {
            const n = { ...prev };
            delete n.files;
            return n;
        });
    }
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    const urls = files.map((f) =>
      f.type.startsWith("image/") ? URL.createObjectURL(f) : ""
    );
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerMessage(null);

    try {
      const fd = new FormData();
      // Kita kirim phone & message dari input, sisanya (nama/email) diambil dari session di server
      fd.append("phone", formData.phone);
      fd.append("message", formData.message);
      
      // Append files
      files.forEach((f) => fd.append("files", f, f.name));

      // Panggil Server Action
      const result = await sendContactMessage(fd);

      if (!result.success) {
        throw new Error(result.message || "Gagal mengirim pesan.");
      }

      setIsSubmitted(true);
      setCountdown(5);
      setFormData({ phone: "", message: "" });
      setFiles([]);
      
    } catch (error: any) {
      console.error("Submit error:", error);
      setErrors({ submit: error.message || "Terjadi kesalahan pada sistem." });
      setServerMessage({ success: false, text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isSubmitted && countdown === 0) {
      setIsSubmitted(false);
    }
    return () => timer && clearTimeout(timer);
  }, [isSubmitted, countdown]);


  // --- 1. RENDER: LOADING ---
  if (status === "loading") {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center max-w-xl mx-auto min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-sm">Memuat status login...</p>
            </div>
        </div>
    );
  }

  // --- 2. RENDER: JIKA ADMIN / WRITER (BLOCK ACCESS) ---
  if (session && session.user.role !== "user") {
    return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mode Staff Aktif</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Halo <strong>{session.user.name}</strong>.<br/>
                Anda sedang login sebagai <strong>{session.user.role === 'admin' ? 'Administrator' : 'Penulis Berita'}</strong>.
                <br/><br/>
                Formulir kontak ini hanya ditujukan untuk pengunjung (User Google). 
                Sebagai staff, Anda tidak perlu mengirim pesan ke sistem sendiri.
            </p>
             <button 
                onClick={() => signOut()} 
                className="text-sm text-amber-700 font-bold hover:text-amber-900 underline"
            >
                Logout untuk mencoba sebagai User
            </button>
        </div>
    );
  }

  // --- 3. RENDER: BELUM LOGIN (GOOGLE LOGIN ONLY) ---
  if (!session) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Akses Formulir Kontak
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
            Untuk memastikan keamanan dan mencegah spam, mohon verifikasi identitas Anda menggunakan akun Google sebelum mengirim pesan.
        </p>
        
        {/* Tombol Login Google */}
        <button
            onClick={() => signIn('google')} 
            className="flex items-center justify-center gap-3 w-full bg-white border border-gray-300 text-gray-700 font-bold py-3.5 px-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 group"
        >
            {/* PERBAIKAN: Menambahkan width dan height */}
            <Image 
                src="https://authjs.dev/img/providers/google.svg" 
                alt="Google Logo" 
                width={20}
                height={20}
                className="w-5 h-5"
            />
            <span className="group-hover:text-gray-900">Masuk dengan Google</span>
        </button>
      </div>
    );
  }

  // --- 4. RENDER: SUDAH LOGIN (USER FORM) ---
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header User Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative">
                {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        src={session.user.image} 
                        alt="Profile" 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                ) : (
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                        {session.user?.name?.charAt(0)}
                    </div>
                )}
                {/* Google Badge Kecil */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100" title="Terverifikasi Google">
                    {/* PERBAIKAN: Menambahkan width dan height */}
                    <Image 
                      src="https://authjs.dev/img/providers/google.svg" 
                      className="w-4 h-4" 
                      alt="G"
                      width={16}
                      height={16}
                    />
                </div>
            </div>
            
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pengirim</p>
                <p className="font-bold text-gray-900 text-lg leading-tight">{session.user?.name}</p>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
            </div>
          </div>

          <button 
            onClick={() => signOut()} 
            className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-2 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
          >
            <Power size={16} /> Logout
          </button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">Kirim Pesan</h2>
      <p className="text-sm text-gray-600 mb-6">Silakan lengkapi formulir di bawah ini.</p>

      {/* Success Message */}
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-in zoom-in-95">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Pesan Terkirim!</h3>
          <p className="text-green-700 mb-6">Kami akan segera memproses pesan Anda.</p>
          <div className="w-full bg-green-200 rounded-full h-1.5 mb-2 max-w-xs mx-auto overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-1000 ease-linear" style={{ width: `${(countdown / 5) * 100}%` }} />
          </div>
          <p className="text-xs text-green-600">Reset form dalam {countdown} detik...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama (Locked - ReadOnly) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                <div className="relative group">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                    <input 
                        type="text" 
                        value={session.user?.name || ""} 
                        readOnly 
                        className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 bg-gray-50 text-gray-500 font-medium rounded-lg cursor-not-allowed focus:outline-none select-none" 
                    />
                    <div className="absolute right-3 top-2.5" title="Terkunci (Data Google)">
                        <Lock className="w-4 h-4 text-gray-300" />
                    </div>
                </div>
              </div>

              {/* Email (Locked - ReadOnly) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                    <input 
                        type="email" 
                        value={session.user?.email || ""} 
                        readOnly 
                        className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 bg-gray-50 text-gray-500 font-medium rounded-lg cursor-not-allowed focus:outline-none select-none" 
                    />
                    <div className="absolute right-3 top-2.5" title="Terkunci (Data Google)">
                        <Lock className="w-4 h-4 text-gray-300" />
                    </div>
                </div>
              </div>
          </div>

          {/* Phone (Editable) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
              No. WhatsApp / Telepon <span className="text-gray-400 font-normal text-xs">(Opsional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2.5 text-sm border ${errors.phone ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"} rounded-lg focus:ring-2 outline-none transition-all text-gray-900 bg-white placeholder-gray-400`}
                placeholder="+62 8xx xxx xxx"
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12}/> {errors.phone}</p>}
          </div>

          {/* Message (Editable) */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
              Pesan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message" name="message" rows={4}
              value={formData.message} onChange={handleChange}
              className={`block w-full px-4 py-2.5 text-sm border ${errors.message ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"} rounded-lg focus:ring-2 outline-none transition-all resize-none text-gray-900 bg-white placeholder-gray-400`}
              placeholder="Tuliskan kebutuhan atau pertanyaan Anda di sini..."
            />
            {errors.message && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</p>}
          </div>

          {/* File Upload Compact Version */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 hover:bg-blue-50/50 transition-colors">
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-2 text-gray-500">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-700">Lampiran</span>
                </div>
                
                <p className="text-[10px] text-gray-400 text-center leading-tight">
                    Maks {UPLOAD.maxFiles} file (JPG, PDF, DOCX). Total {UPLOAD.maxTotalMB}MB.
                </p>
                
                <label className="cursor-pointer mt-1 bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded text-[10px] font-bold hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm">
                    Pilih File
                    <input type="file" className="hidden" multiple onChange={handleFileChange} accept={UPLOAD.accept.join(",")} />
                </label>
            </div>

            {/* File List Compact */}
            {files.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                    {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-2 py-1.5">
                            <div className="flex items-center gap-2 overflow-hidden">
                                {f.type.startsWith("image/") && previews[i] ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previews[i]} alt="preview" className="w-5 h-5 object-cover rounded" />
                                ) : (
                                    <FileIcon className="w-4 h-4 text-gray-400" />
                                )}
                                <div className="min-w-0">
                                    <p className="truncate text-[11px] font-medium text-gray-700 leading-none">{f.name}</p>
                                    <p className="text-[9px] text-gray-400 leading-none mt-0.5">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 p-0.5"><X size={12}/></button>
                        </li>
                    ))}
                </ul>
            )}
            {errors.files && <p className="mt-1 text-[10px] text-red-600 flex items-center gap-1 justify-center"><AlertCircle size={10}/> {errors.files}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mengirim...
                    </>
                ) : (
                    <>
                        <Send size={18} /> Kirim Pesan
                    </>
                )}
            </button>
            {errors.submit && (
                 <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle size={14}/> {errors.submit}
                 </div>
            )}
          </div>

        </form>
      )}
    </div>
  );
}