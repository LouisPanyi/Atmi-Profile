// src/app/peta-situs/page.tsx (UI saja)
import Link from "next/link";

export default function PetaSitusPage() {
  const links = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/layanan", label: "Layanan" },
    { href: "/produk", label: "Produk" },
    { href: "/kontak", label: "Kontak" },
    { href: "/berita", label: "News" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold text-slate-900">Peta Situs</h1>
      <p className="mt-2 text-slate-600">
        Temukan halaman-halaman utama situs kami. Untuk file XML silakan lihat{" "}
        <Link href="/sitemap.xml" className="text-blue-600 hover:underline">/sitemap.xml</Link>.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <span>{l.label}</span>
              <svg className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}