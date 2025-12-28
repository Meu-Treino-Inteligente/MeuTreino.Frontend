"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function CtaSection() {
  const section_ref = useRef<HTMLElement>(null);
  const [is_visible, set_is_visible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      if (section_ref.current) {
        const rect = section_ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="cta"
      ref={section_ref}
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            is_visible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-purple-300 text-xs sm:text-sm font-bold animate-pulse">
              ⚡ Oferta Especial - Comece Hoje
            </span>
          </div>

          {/* Main Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient leading-[1.1] sm:leading-tight px-2"
            style={{
              textShadow: `0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)`,
            }}
          >
            Pronto Para
            <br />
            <span className="text-white">Transformar Seu Corpo?</span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Comece sua jornada hoje. Crie seu plano personalizado em minutos e
            alcance resultados reais.
          </p>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-8 sm:mb-12 text-gray-400 text-sm sm:text-base">
            <div className="w-px h-4 sm:h-6 bg-gray-700" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl">👥</span>
              <span className="font-semibold">1.500</span>
              <span className="text-xs sm:text-sm hidden sm:inline">
                usuários
              </span>
            </div>
            <div className="w-px h-4 sm:h-6 bg-gray-700" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl">🏆</span>
              <span className="font-semibold">95%</span>
              <span className="text-xs sm:text-sm hidden sm:inline">
                atingem metas
              </span>
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8 px-4">
            <Link
              href="/register"
              className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl text-white font-black text-base sm:text-lg md:text-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span>🚀 Criar Meu Plano Agora</span>
                <span className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/plans"
              className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 border-2 border-purple-500/50 rounded-2xl text-purple-400 font-bold text-base sm:text-lg md:text-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all backdrop-blur-sm text-center"
            >
              Ver Planos e Preços
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="p-4 rounded-xl sm:rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">✅</div>
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">
                100% Gratuito
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Sem cartão de crédito
              </div>
            </div>
            <div className="p-4 rounded-xl sm:rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚡</div>
              <div className="text-white font-semibold mb-1 text-sm sm:text-base">
                Setup em 5min
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Comece imediatamente
              </div>
            </div>
          </div>

          {/* Urgency Text */}
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            <span className="text-orange-400 font-semibold">
              ⚡ Oferta limitada:
            </span>{" "}
            Primeiros 1.500 usuários ganham acesso premium grátis por 30 dias
          </p>
        </div>
      </div>
    </section>
  );
}
