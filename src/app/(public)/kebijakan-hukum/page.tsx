// app/informasi-hukum/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Informasi Hukum - ATMI SOLO',
  description: 'Kebijakan privasi dan syarat penggunaan website profil PT. ATMI SOLO.',
}

export default function LegalInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Informasi Hukum</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Kebijakan Privasi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  PT. ATMI SOLO menghormati privasi pengunjung website. Informasi pribadi Anda hanya 
                  dikumpulkan jika Anda memberikannya secara sukarela melalui formulir kontak atau 
                  komunikasi dengan kami.
                </p>
                <p>
                  Informasi yang dikumpulan hanya digunakan untuk:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Memproses permintaan Anda</li>
                  <li>Mengirim informasi yang Anda minta</li>
                  <li>Meningkatkan layanan kami</li>
                </ul>
                <p>
                  Kami tidak akan membagikan informasi Anda kepada pihak ketiga tanpa izin Anda.
                </p>
              </div>
            </section>

            {/* Syarat Penggunaan */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Syarat Penggunaan Website</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Dengan menggunakan website ATMI SOLO, Anda setuju untuk:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li> tidak menggunakan website untuk tujuan ilegal</li>
                  <li> tidak mencoba mendapatkan akses tidak sah ke sistem kami</li>
                  <li> tidak menyalin atau mendistribusikan konten tanpa izin</li>
                </ul>
                <p>
                  Semua konten di website ini adalah milik PT. ATMI SOLO dan dilindungi oleh hak cipta.
                </p>
              </div>
            </section>

            {/* Kontak */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pertanyaan Hukum</h2>
              <p className="text-gray-700 mb-4">
                Jika Anda memiliki pertanyaan tentang informasi hukum ini, silakan hubungi kami:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Email:</strong> 
                    <Link href="mailto:marketing@atmisolo.co.id" className="text-blue-600 hover:text-blue-800 ml-2">
                      marketing@atmisolo.co.id
                    </Link>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Telepon:</strong> (0271) 714466 - Ext. 209/245
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  )
}