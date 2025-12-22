"use client";

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// 1. KOMPONEN UTAMA (WRAPPER SUSPENSE)
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
        setLoading(false);
      } else {
        router.refresh();
        router.push(callbackUrl);
      }
    } catch { 
      setError("Terjadi kesalahan jaringan.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen w-full bg-white font-sans">

      {/* === BAGIAN KIRI: GAMBAR === */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>

        <div className="relative z-10 text-white p-12 max-w-lg">
          <h2 className="text-5xl font-bold mb-6">ATMI Solo</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Portal Administrasi untuk pengelolaan konten website, berita, dan informasi perusahaan PT ATMI Solo.
          </p>
          <div className="mt-10 flex gap-4">
            <div className="h-2 w-20 bg-green-500 rounded-full"></div>
            <div className="h-2 w-10 bg-white/30 rounded-full"></div>
            <div className="h-2 w-10 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* === BAGIAN KANAN: FORM === */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50 relative">

        <Link href="/" className="absolute top-8 right-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-semibold">
          <ArrowLeft size={18} /> Kembali ke Beranda
        </Link>

        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
              <Lock size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
            <p className="text-gray-500 mt-2">Silakan login untuk melanjutkan akses.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r flex items-center gap-3 animate-pulse">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white placeholder-gray-400"
                  placeholder="admin@atmi.co.id"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Memproses...
                </>
              ) : (
                'Masuk ke Sistem'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              &copy; 2025 PT ATMI Solo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}