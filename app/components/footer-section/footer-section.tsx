export function FooterSection() {
  return (
    <footer className="bg-black border-t border-cyan-500/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Meu treino Inteligente
            </h3>
            <p className="text-gray-400">
              Transforme seu corpo com planos de treino personalizados por IA.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Sobre
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">contato@meutreino.com</li>
              <li className="text-gray-400">Suporte 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Meu treino Inteligente. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

