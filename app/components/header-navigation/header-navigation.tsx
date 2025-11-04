"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          MTI
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href={isHomePage ? "#inicio" : "/#inicio"}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#features" : "/#features"}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Recursos
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#sobre" : "/#sobre"}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#cta" : "/#cta"}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Começar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
