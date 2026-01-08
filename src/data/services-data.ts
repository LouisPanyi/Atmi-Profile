import { Wrench, Bot } from 'lucide-react';

export interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
}

export const servicesData = [
    {
      icon: Wrench,
      title: 'Work Fabrication',
      description: 'Solusi manufaktur komponen presisi, fabrikasi lembaran logam, mould & dies, didukung oleh mesin CNC dan tim terampil.',
      href: '/layanan',
      features: ['Punching & Shearing', 'Bending', 'Welding', 'Coating', 'Assembly', 'Inline Panel Bender']
    },
    {
      icon: Bot,
      title: 'Machine Development Center',
      description: 'Pengembangan mesin-mesin industri khusus (special purpose machine) dari tahap konsep, desain, hingga instalasi.',
      href: '/layanan',
      features: ['Design Engineering', 'Electronic', 'Manufacture', 'Quality Control & Assembly']
    },
  ];