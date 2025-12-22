// src/components/layanan/section/BreadcrumbSection.tsx
import Breadcrumb from '@/components/breadcrumb';

export default function BreadcrumbSection() {
  return (
    <section className="container mx-auto px-6 py-4">
      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
        ]}
      />
    </section>
  );
}