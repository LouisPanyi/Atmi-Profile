// src/components/kontak/sections/FAQSection.tsx
const faqItems = [
  {
    question: "Bagaimana cara memesan produk dari ATMI?",
    answer: "Anda dapat menghubungi tim marketing kami melalui email, telepon, atau mengisi formulir kontak di halaman ini. Kami akan memberikan panduan lengkap tentang proses pemesanan."
  },
  {
    question: "Apakah ATMI menerima pesanan kustom?",
    answer: "Ya, kami menerima pesanan kustom sesuai kebutuhan Anda. Tim engineering kami siap membantu merancang produk yang sesuai dengan spesifikasi yang Anda butuhkan."
  },
  {
    question: "Berapa lama waktu pengiriman?",
    answer: "Waktu pengiriman tergantung pada kompleksitas pesanan dan ketersediaan bahan. Umumnya, pesanan standar membutuhkan 2-4 minggu, sedangkan pesanan kustom membutuhkan waktu lebih lama."
  },
  {
    question: "Apakah ada garansi produk?",
    answer: "Ya, semua produk kami dilengkapi dengan garansi sesuai dengan jenis produk dan kondisi penggunaan. Detail garansi akan dibahas saat proses pemesanan."
  }
];

export default function FAQSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pertanyaan Umum</h2>
      <div className="space-y-4">
        {faqItems.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer list-none hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 bg-white text-gray-600">
                {faq.answer}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}