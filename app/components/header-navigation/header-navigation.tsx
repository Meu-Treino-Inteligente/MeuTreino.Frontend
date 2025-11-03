"use client";

export function HeaderNavigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MTI
        </div>
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a
              href="#inicio"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Recursos
            </a>
          </li>
          <li>
            <a
              href="#sobre"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Sobre
            </a>
          </li>
          <li>
            <a
              href="#cta"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Começar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
