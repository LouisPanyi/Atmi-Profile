// src/components/kontak/section/social-media.tsx
import * as React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

type SocialName = 'LinkedIn' | 'Instagram' | 'YouTube';

type Social = {
  name: SocialName;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const socialLinks: Social[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/pt-atmi-solo', icon: Linkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/atmisolo', icon: Instagram },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/your-channel-id', icon: Youtube },
];

// Brand style map (kelas Tailwind + inline style untuk gradien IG)
// why: memastikan hover/border/bg/ikon mengikuti identitas masing-masing platform
const brandStyles: Record<
  SocialName,
  {
    color: string;                // warna ikon (currentColor)
    borderClass: string;          // border default
    hoverBorderClass: string;     // border saat hover
    hoverBgClass: string;         // bg tipis saat hover
    textHoverClass: string;       // teks saat hover
    circleStyle: React.CSSProperties; // lingkaran belakang ikon
  }
> = {
  LinkedIn: {
    color: '#0A66C2',
    borderClass: 'border-[#0A66C2]/40',
    hoverBorderClass: 'hover:border-[#0A66C2]',
    hoverBgClass: 'hover:bg-[#0A66C2]/5',
    textHoverClass: 'group-hover:text-[#0A66C2]',
    circleStyle: { background: '#0A66C2' },
  },
  Instagram: {
    color: '#DD2A7B',
    borderClass: 'border-[#DD2A7B]/40',
    hoverBorderClass: 'hover:border-[#DD2A7B]',
    hoverBgClass: 'hover:bg-[#DD2A7B]/5',
    textHoverClass: 'group-hover:text-[#DD2A7B]',
    circleStyle: {
      // gradien klasik IG
      backgroundImage:
        'linear-gradient(45deg,#F58529 0%,#FEDA77 22%,#DD2A7B 48%,#8134AF 74%,#515BD4 100%)',
    },
  },
  YouTube: {
    color: '#FF0000',
    borderClass: 'border-[#FF0000]/40',
    hoverBorderClass: 'hover:border-[#FF0000]',
    hoverBgClass: 'hover:bg-[#FF0000]/5',
    textHoverClass: 'group-hover:text-[#FF0000]',
    circleStyle: { background: '#FF0000' },
  },
};

export default function SocialMedia() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ikuti Kami</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          const brand = brandStyles[social.name];

          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka ${social.name} (tab baru)`}
              className={[
                'group flex flex-col items-center p-4 rounded-lg border transition-all',
                'bg-gray-50', // tetap netral, warna datang dari hover & ikon
                brand.borderClass,
                brand.hoverBgClass,
                brand.hoverBorderClass,
              ].join(' ')}
            >
              <div
                className={[
                  'w-14 h-14 rounded-full flex items-center justify-center mb-3',
                  'transition-all duration-300 group-hover:scale-110 shadow-sm',
                ].join(' ')}
                style={brand.circleStyle}
              >
                {/* lucide pakai currentColor */}
                <Icon className="w-7 h-7" style={{ color: '#FFFFFF' }} />
              </div>

              <span
                className={[
                  'text-sm font-medium transition-colors',
                  'text-gray-700',
                  brand.textHoverClass,
                ].join(' ')}
              >
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
