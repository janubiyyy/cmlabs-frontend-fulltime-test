// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
              <span className="text-white text-sm font-bold">🍽</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Meal<span className="text-orange-400">Finder</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  : "text-gray-400 hover:text-white hover:bg-[#111]"
              }`}
            >
              Ingredients
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
