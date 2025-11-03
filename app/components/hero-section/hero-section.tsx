"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const section_ref = useRef<HTMLElement>(null);
  const [is_visible, set_is_visible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          set_is_visible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (section_ref.current) {
      observer.observe(section_ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={section_ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Glow cyan central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_70%)]" />
      {/* Grid sutil com máscara para profundidade */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div
        className={`container mx-auto px-4 sm:px-6 text-center z-10 transition-all duration-1000 ${
          is_visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge sutil com paleta antiga */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs sm:text-sm mb-4 sm:mb-6">
          <span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 animate-pulse" />
          Treinos personalizados por IA
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient px-2">
          Transforme Seu Corpo
          <br />
          <span className="text-white">Com Inteligência Artificial</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Planos de treino personalizados criados por IA. Alcançe seus objetivos
          de forma inteligente e eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
          <a
            href="/register"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 text-center"
          >
            Começar Agora
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-base sm:text-lg hover:bg-cyan-400/10 transition-all text-center"
          >
            Saiba Mais
          </a>
        </div>

        {/* Estatísticas rápidas mantendo a paleta antiga */}
        <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto text-left px-2">
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              +25%
            </div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">
              adesão ao treino
            </div>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              -32%
            </div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">
              tempo pra atingir metas
            </div>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">
              planos personalizados
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
