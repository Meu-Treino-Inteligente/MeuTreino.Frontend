"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AboutSection() {
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

  const benefits = [
    {
      icon: "🧠",
      title: "Baseado em Ciência",
      description: "Algoritmos validados por especialistas em fitness e nutrição",
    },
    {
      icon: "🎯",
      title: "100% Personalizado",
      description: "Cada plano é único, criado especificamente para você",
    },
    {
      icon: "📈",
      title: "Resultados Comprovados",
      description: "1.500 usuários já alcançaram seus objetivos",
    },
    {
      icon: "⚡",
      title: "Atualização Instantânea",
      description: "Seu plano se adapta automaticamente ao seu progresso",
    },
  ];

  return (
    <section
      id="sobre"
      ref={section_ref}
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
      <div className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              is_visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="inline-block mb-4 sm:mb-6">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm text-orange-300 text-xs sm:text-sm font-semibold">
                🚀 Por Que Escolher MTI?
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Inteligência Artificial
              <br />
              <span className="text-white">Para Seu Sucesso</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Combinamos inteligência artificial de ponta com conhecimento
              científico em treinamento físico para criar a experiência mais
              personalizada possível.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Nosso sistema analisa centenas de variáveis para criar planos que
              se adaptam ao seu corpo, objetivos e rotina. Não é apenas um app,
              é seu personal trainer 24/7.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm hover:border-purple-500/50 transition-all group"
                  style={{
                    transform: `perspective(1000px) translateZ(${mousePosition.y * 5}px) rotateY(${mousePosition.x * 2}deg)`,
                    transition: "all 0.3s ease-out",
                  }}
                >
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{benefit.icon}</div>
                  <h4 className="text-white font-bold mb-1 text-sm sm:text-base">{benefit.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-tight">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Começar Agora - Grátis</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Right Content - 3D Card */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              is_visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div
              className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 backdrop-blur-xl"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(${mousePosition.y * 10}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-xl opacity-30 animate-pulse" />

              <div className="relative space-y-4 sm:space-y-6">
                {/* Status Card 1 */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                    <span className="text-purple-300 font-bold text-sm sm:text-lg">
                      IA Analisando
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2 text-xs sm:text-sm">Processando seus dados...</p>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>

                {/* Status Card 2 */}
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
                    <span className="text-orange-300 font-bold text-sm sm:text-lg">
                      Plano Gerado
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2 text-xs sm:text-sm">Treino personalizado pronto!</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-800 rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-orange-400">12</div>
                      <div className="text-xs text-gray-400">Semanas</div>
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-lg p-2 sm:p-3 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-pink-400">36</div>
                      <div className="text-xs text-gray-400">Treinos</div>
                    </div>
                  </div>
                </div>

                {/* Status Card 3 */}
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-pink-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
                    <span className="text-pink-300 font-bold text-sm sm:text-lg">
                      Progresso
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400">Força</span>
                      <span className="text-pink-400 font-bold">+25%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-1.5 sm:h-2 rounded-full w-3/4" />
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400">Resistência</span>
                      <span className="text-purple-400 font-bold">+18%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full w-2/3" />
                    </div>
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
