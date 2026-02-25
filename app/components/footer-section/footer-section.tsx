"use client";

import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="bg-black border-t border-purple-500/20 py-12 sm:py-16 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Meu Treino Inteligente
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-md">
              Transforme seu corpo com planos de treino personalizados por inteligência artificial. 
              Alcançe seus objetivos de forma inteligente e eficiente.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href="/register"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Começar Grátis
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Links Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/influencer/coupons"
                  className="text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Sou Influencer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg">Contato</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                <span>📧</span>
                <span className="break-all">contato@meutreino.com</span>
              </li>
              <li className="text-sm sm:text-base text-gray-400">
                Suporte exclusivamente por email
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            &copy; 2026 Meu Treino Inteligente. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Termos
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
