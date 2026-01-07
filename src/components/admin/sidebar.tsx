"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  User,
  LogOut,
  Menu,
  X,
  ChevronUp,
  Package
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ["admin", "news_writer", "user"]
    },
    {
      name: "Berita",
      href: "/admin/berita",
      icon: Newspaper,
      roles: ["admin", "news_writer"]
    },
    {
      name: "Produk",
      href: "/admin/products",
      icon: Package,
      roles: ["admin"] // Hanya Admin
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      roles: ["admin"]
    },
    //informasi
    {
      name: "Informasi",
      href: "/admin/informasi",
      icon: User,
      roles: ["admin"]
    },
  ];

  const userRole = session?.user?.role || "user";

  // LOGIKA DINAMIS JUDUL PANEL
  const panelTitle = userRole === "news_writer" ? "News Writer Panel" : "Admin Panel";

  return (
    <>
      {/* Tombol Hamburger (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-[60] p-2 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[50] md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-[55] h-full w-64 bg-white border-r border-gray-200 shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col
      `}>

        {/* Header - DINAMIS */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {userRole === "news_writer" ? "W" : "A"}
            </div>
            <span>{panelTitle}</span>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Menu Utama
          </p>

          {menus.map((item) => {
            if (!item.roles.includes(userRole)) return null;
            const isActive = item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                  ${isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
              >
                <item.icon size={18} className={isActive ? "text-blue-600" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Menu */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 relative">

          {isUserMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
              <div className="py-1">
                <Link
                  href="/admin/profile"
                  onClick={() => { setIsUserMenuOpen(false); setIsOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <User size={16} />
                  Ganti Password / Username
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all border ${isUserMenuOpen ? 'bg-white border-blue-200 shadow-sm' : 'border-transparent hover:bg-white hover:shadow-sm'}`}
          >
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                {userRole.replace("_", " ")}
              </p>
            </div>

            <ChevronUp
              size={16}
              className={`text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180 text-blue-500' : ''}`}
            />
          </button>
        </div>

      </aside>
    </>
  );
}