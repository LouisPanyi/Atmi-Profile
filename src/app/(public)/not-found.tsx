// app/not-found.tsx
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Dekorasi latar: blob lembut + vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Blob kanan-atas */}
        <div className="absolute -top-20 right-[-10%] h-[380px] w-[380px] rounded-full bg-blue-100/70 blur-3xl" />
        {/* Blob kiri-bawah */}
        <div className="absolute -bottom-24 left-[-10%] h-[420px] w-[420px] rounded-full bg-pink-100/60 blur-3xl" />
        {/* Vignette halus */}
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent_80%)] bg-[radial-gradient(80%_50%_at_50%_30%,rgba(0,0,0,0.06),transparent_70%)]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <span className="text-3xl" aria-hidden>😵‍💫</span>
            <span className="sr-only">Halaman tidak ditemukan</span>
          </div>

          <p className="mb-2 text-sm font-medium tracking-wider text-blue-700">ERROR</p>
          <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-6xl font-extrabold leading-none text-transparent sm:text-7xl">
            404
          </h1>
          <h2 className="text-balance text-2xl font-semibold text-slate-800 sm:text-3xl">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-slate-600">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Periksa URL, atau pilih salah satu tautan di bawah untuk melanjutkan.
          </p>
        </div>

        {/* Footer kecil */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-xs text-slate-500">
            Kode: <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">404_NOT_FOUND</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Kembali
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white ring-1 ring-slate-900/10 transition hover:bg-black"
            >
              Laporkan Masalah
              <ExternalIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
function ExternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.3333 2.66699H13.3333V5.66699M13.3333 2.66699L6.66667 9.33366M13.3333 2.66699L6.66667 9.33366M4 4.00033H2.66667C2.31304 4.00033 1.97322 4.13117 1.72387 4.38052C1.47452 4.62987 1.33333 4.96969 1.33333 5.32332V12.667C1.33333 13.0206 1.47452 13.360
        1.72387 13.6093C1.97322 13.8587 2.31304 13.9998 2.66667 13.9998H10C10.3536 13.9998 10.6935 13.8587 10.9428 13.6093C11.1921 13.360 11.3333 13.0206 11.3333 12.667V11.3337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}