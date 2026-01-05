"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Produk', href: '/produk' },
    { name: 'News', href: '/berita' }, 
    { name: 'Kontak', href: '/kontak' },
  ];

  const textColor = hasScrolled ? 'text-gray-800' : 'text-white';
  const logoColor = hasScrolled ? 'text-blue-700' : 'text-white';
  const menuBgColor = hasScrolled ? 'bg-white' : 'bg-black/90';

  const isActive = (href: string) => isClient && pathname === href;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${hasScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center gap-8">
        
        {/* 1. LOGO */}
        <Link href="/" className={`transition-colors flex-shrink-0 ${logoColor}`}>
          {/* PERBAIKAN DI SINI: Ditambahkan width, height, dan w-auto */}
          <Image 
            src="/images/logo-teks.png" 
            alt="PT ATMI SOLO" 
            width={150}   // Nilai lebar intrinsik (sesuaikan jika gambar gepeng)
            height={40}   // Nilai tinggi intrinsik
            className="h-8 w-auto object-contain" // w-auto menjaga rasio aspek
          />
        </Link>

        {/* 2. MENU TENGAH */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link 
                  href={item.href} 
                  className={`relative font-medium transition-colors duration-300 text-sm lg:text-base ${
                    isActive(item.href) ? 'text-blue-600' : `${textColor} hover:text-blue-600`
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`focus:outline-none ${textColor}`} 
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={`md:hidden ${menuBgColor} backdrop-blur-sm border-t border-gray-200 h-screen fixed w-full left-0 top-[64px]`}>
          <ul className="flex flex-col items-center p-8 space-y-6">
            {navItems.map((item) => (
              <li key={item.name} className="relative w-full text-center">
                <Link 
                  href={item.href} 
                  className={`text-xl font-medium ${
                    hasScrolled ? 'text-gray-700' : 'text-white'
                  } ${isActive(item.href) ? 'text-blue-600' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      )}
    </header>
  );
}