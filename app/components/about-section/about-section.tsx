"use client";

import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const section_ref = useRef<HTMLElement>(null);
  const [is_visible, set_is_visible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          set_is_visible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (section_ref.current) {
      observer.observe(section_ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      ref={section_ref}
      className="py-32 bg-gradient-to-b from-black via-gray-800 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              is_visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Por Que Escolher FITAI?
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Combinamos inteligência artificial de ponta com conhecimento
              científico em treinamento físico para criar a experiência mais
              personalizada possível.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Nosso sistema analisa centenas de variáveis para criar planos que
              se adaptam ao seu corpo, objetivos e rotina. Não é apenas um app,
              é seu personal trainer 24/7.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-lg">
                  Baseado em ciência
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-lg">
                  100% Personalizado
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-gray-300 text-lg">
                  Resultados Comprovados
                </span>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              is_visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 animate-pulse" />
              <div className="relative space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                    <span className="text-cyan-400 font-semibold">
                      IA Ativa
                    </span>
                  </div>
                  <p className="text-gray-300">Analisando seus dados...</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-500 font-semibold">
                      Plano Gerado
                    </span>
                  </div>
                  <p className="text-gray-300">Treino personalizado pronto!</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-blue-400 font-semibold">
                      Progresso
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
