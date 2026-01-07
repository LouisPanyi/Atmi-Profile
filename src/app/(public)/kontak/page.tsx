"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import Head from 'next/head';
import Hero from '@/components/kontak/section/hero';
import QuickActions from '@/components/kontak/section/quick-action';
import ContactInfo from '@/components/kontak/section/contact-info';
import TeamSection from '@/components/kontak/section/team';
import FAQSection from '@/components/kontak/section/faq';
import MapSection from '@/components/kontak/section/map';
import SocialMedia from '@/components/kontak/section/social-media';
import ContactForm from '@/components/kontak/contact-form';
import Breadcrumb from '@/components/breadcrumb';
import { CheckCircle, X } from 'lucide-react'; // Icon untuk modal

// 1. WRAPPER COMPONENT (Wajib untuk useSearchParams di Next.js App Router)
export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}

// 2. KONTEN HALAMAN UTAMA
function ContactPageContent() {
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ambil fungsi update dari useSession untuk memaksa refresh status login
  const { update, status } = useSession();

  useEffect(() => {
    // Override title & meta (Logika SEO Anda)
    document.title = "Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', "Hubungi PT ATMI SOLO...");
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', "kontak ATMI...");

    // --- LOGIKA UTAMA PERBAIKAN ---
    const checkLoginSuccess = async () => {
      // Jika URL mengandung ?login_success=true
      if (searchParams.get('login_success') === 'true') {

        // 1. Tampilkan Modal
        setShowLoginSuccess(true);

        // 2. Paksa refresh session agar Form mendeteksi user sudah login
        await update();

        // 3. Bersihkan URL (hapus query param) agar rapi
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    };

    checkLoginSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, update]);

  return (
    <>
      <Head>
        <title>Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering</title>
        <meta name="description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta name="keywords" content="kontak ATMI, informasi produk, penawaran, dukungan teknis, manufaktur presisi, rekayasa mesin, PT ATMI SOLO" />
        <meta name="author" content="PT ATMI SOLO" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://atmi.ac.id/kontak" />
        <meta property="og:title" content="Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering" />
        <meta property="og:description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta property="og:image" content="/images/og-image-kontak.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://atmi.ac.id/kontak" />
        <meta property="twitter:title" content="Kontak | PT ATMI SOLO - Precision Manufacturing & Engineering" />
        <meta property="twitter:description" content="Hubungi PT ATMI SOLO untuk informasi produk, penawaran, atau dukungan teknis. Tim kami siap membantu kebutuhan manufaktur dan rekayasa mesin Anda." />
        <meta property="twitter:image" content="/images/twitter-image-kontak.jpg" />
      </Head>

      {/* === MODAL POPUP LOGIN SUKSES === */}
      {showLoginSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full transform transition-all scale-100 relative">
            <button
              onClick={() => setShowLoginSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-300">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Berhasil!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Halo! Identitas Anda telah diverifikasi oleh Google. Formulir kontak di bawah sekarang <strong>sudah terbuka</strong> dan siap digunakan.
              </p>
              <button
                onClick={() => setShowLoginSuccess(false)}
                className="w-full bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
              >
                Mulai Tulis Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen">
        <Hero />
        <section className="container mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Kontak', href: '/kontak' },
            ]}
          />
        </section>

        <QuickActions />

        <section className="pt-8 pb-4">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Kontak & Informasi</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Temukan semua informasi yang Anda butuhkan untuk terhubung dengan kami.
            </p>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kolom Kiri */}
              <div className="lg:col-span-2 space-y-8">
                <ContactInfo />
                <TeamSection />
                <FAQSection />
                <MapSection />
              </div>

              {/* Kolom Kanan - Sticky Container */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* FORMULIR KONTAK AKAN RELOAD STATUSNYA DI SINI */}
                  <ContactForm />

                  <div className="sticky top-40">
                    <SocialMedia />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}