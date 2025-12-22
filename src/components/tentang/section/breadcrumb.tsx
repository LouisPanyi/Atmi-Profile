// src/components/tentang/section/BreadcrumbSection.tsx
import Breadcrumb from '@/components/breadcrumb';

export default function BreadcrumbSection() {
  return (
    <section className="container mx-auto px-6 mt-8">
      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Tentang', href: '/tentang' },
        ]}
      />
    </section>
  );
}