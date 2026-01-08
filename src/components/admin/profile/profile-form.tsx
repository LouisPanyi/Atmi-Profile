// src/components/profile-form.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { updateProfile } from "@/lib/actions";
import {
  Save,
  Loader2,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProps {
  name: string;
  email: string;
  [key: string]: unknown;
}

type Message = { text: string; type: "success" | "error" } | null;

function validatePasswords(args: {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}): string {
  const { oldPass, newPass, confirmPass } = args;

  if (!oldPass && !newPass && !confirmPass) return "";

  if (oldPass && !newPass) return "Harap isi Password Baru jika ingin mengganti.";
  if (newPass && !oldPass) return "Harap isi Password Lama untuk verifikasi.";
  if (newPass && !confirmPass) return "Harap ketik ulang Password Baru di kolom konfirmasi.";
  if (newPass && newPass.length < 6) return "Password baru terlalu pendek (min. 6 karakter).";
  if (newPass && confirmPass && newPass !== confirmPass) return "Konfirmasi password baru tidak cocok.";
  if (newPass && oldPass && newPass === oldPass) return "Password baru tidak boleh sama dengan password lama.";

  return "";
}

export default function ProfileForm({ user }: { user: UserProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [passError, setPassError] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const computedPassError = useMemo(
    () => validatePasswords({ oldPass, newPass, confirmPass }),
    [oldPass, newPass, confirmPass]
  );

  // Debounce untuk UX (tidak “berkedip” tiap ketik)
  useEffect(() => {
    const timer = setTimeout(() => setPassError(computedPassError), 500);
    return () => clearTimeout(timer);
  }, [computedPassError]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validasi sinkron (anti-stale karena debounce)
    const immediateError = validatePasswords({ oldPass, newPass, confirmPass });
    if (immediateError) {
      setPassError(immediateError);
      setMessage({ text: "Mohon perbaiki error pada password sebelum menyimpan.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);

      if (result?.success) {
        setMessage({ text: "Profil berhasil diperbarui!", type: "success" });

        setOldPass("");
        setNewPass("");
        setConfirmPass("");
        setPassError("");

        setShowOldPass(false);
        setShowNewPass(false);
        setShowConfirmPass(false);

        router.refresh();
        return;
      }

      setMessage({ text: result?.message || "Gagal update profil.", type: "error" });
    } catch (err) {
      console.error(err);
      setMessage({ text: "Terjadi kesalahan sistem.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 bg-white placeholder-gray-400 pr-10 transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden";

  const submitDisabled =
    loading ||
    !!computedPassError || // pakai computed biar responsif walau passError masih debounce
    ((!!oldPass && !newPass) || (!!newPass && !oldPass) || (!!newPass && !confirmPass));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={18} className="shrink-0" />
          ) : (
            <AlertCircle size={18} className="shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="text"
          value={user.email}
          disabled
          className="w-full p-2.5 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap / Username</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <input
            name="name"
            type="text"
            defaultValue={user.name}
            required
            className="w-full pl-9 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 bg-white placeholder-gray-400"
            placeholder="Masukkan nama lengkap"
            autoComplete="name"
          />
        </div>
      </div>

      <div
        className={`pt-6 mt-6 border-t border-gray-100 bg-gray-50/50 p-4 rounded-xl transition-all duration-300 ${
          computedPassError ? "ring-1 ring-red-200 bg-red-50/30" : ""
        }`}
      >
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Lock size={16} className="text-blue-600" /> Ganti Password
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Password Lama {newPass && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                name="oldPassword"
                type={showOldPass ? "text" : "password"}
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                className={`${inputClass} ${(oldPass && !newPass) ? "border-amber-400 bg-amber-50" : ""}`}
                placeholder="Password lama"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowOldPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password Baru</label>
            <div className="relative">
              <input
                name="newPassword"
                type={showNewPass ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className={`${inputClass} ${computedPassError ? "border-red-500 ring-1 ring-red-500" : ""}`}
                placeholder="Password baru (min. 6 karakter)"
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ulangi Password Baru</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className={`${inputClass} ${computedPassError ? "border-red-500 ring-1 ring-red-500" : ""}`}
                placeholder="Ketik ulang password baru"
                disabled={!newPass}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={!newPass}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {computedPassError && (
              <div className="mt-3 text-[11px] font-semibold text-red-600 bg-red-100 px-3 py-2 rounded-lg border border-red-200 flex items-center gap-2">
                <AlertCircle size={14} /> {computedPassError}
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
            <AlertCircle size={10} />
            Kosongkan semua kolom password jika hanya ingin mengubah Nama.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitDisabled}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-sm hover:shadow-md"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={18} />}
        Simpan Perubahan
      </button>
    </form>
  );
}
