"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function HeaderNavigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-purple-500/30 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent hover:scale-110 transition-transform relative group"
        >
          <span className="relative z-10">MTI</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href={isHomePage ? "#inicio" : "/#inicio"}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium relative group"
            >
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all" />
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#features" : "/#features"}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium relative group"
            >
              Recursos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all" />
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#sobre" : "/#sobre"}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium relative group"
            >
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all" />
            </Link>
          </li>
          <li>
            <Link
              href="/plans"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Ver Planos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Começar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span
              className={`h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-purple-500/30 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
          <li>
            <Link
              href={isHomePage ? "#inicio" : "/#inicio"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium block py-2"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#features" : "/#features"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium block py-2"
            >
              Recursos
            </Link>
          </li>
          <li>
            <Link
              href={isHomePage ? "#sobre" : "/#sobre"}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-purple-400 transition-colors font-medium block py-2"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-center"
            >
              Ver Planos
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-center"
            >
              Começar Agora
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
