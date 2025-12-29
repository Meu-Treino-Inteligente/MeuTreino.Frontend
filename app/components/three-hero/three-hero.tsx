"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] pt-20 pb-16"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Background 3D Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate3d(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px, 0)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Floating 3D Cards - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
          style={{
            transform: `perspective(1000px) translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, ${mousePosition.x * 20}px) rotateX(${mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 backdrop-blur-sm"
          style={{
            transform: `perspective(1000px) translate3d(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px, ${-mousePosition.x * 20}px) rotateX(${-mousePosition.y * 8}deg) rotateY(${-mousePosition.x * 8}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge com animação */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 animate-pulse">
          <span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-ping" />
          <span className="font-semibold">✨ Treinos Personalizados por IA</span>
        </div>

        {/* Título Principal com efeito 3D */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-[1.1] sm:leading-tight px-2">
          <span
            className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient"
            style={{
              textShadow: `0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)`,
            }}
          >
            Transforme
          </span>
          <span className="block text-white mt-1 sm:mt-2">
            Seu Corpo
          </span>
          <span
            className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mt-1 sm:mt-2"
            style={{
              textShadow: `0 0 20px rgba(251, 146, 60, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)`,
            }}
          >
            Com IA
          </span>
        </h1>

        {/* Descrição */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
          Planos de treino personalizados criados por inteligência artificial.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> <span className="text-purple-400 font-semibold">Alcançe seus objetivos</span> de forma inteligente e eficiente.</span>
        </p>

        {/* CTAs Principais */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <Link
            href="/register"
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl text-white font-bold text-base sm:text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Começar Agora
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link
            href="/how-it-works"
            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-purple-500/50 rounded-2xl text-purple-400 font-bold text-base sm:text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all backdrop-blur-sm text-center"
          >
            Como Funciona
          </Link>
        </div>

        {/* Estatísticas com efeito 3D */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto px-4">
          {[
            { value: "+25%", label: "adesão ao treino", color: "from-purple-500 to-pink-500" },
            { value: "-32%", label: "tempo pra atingir metas", color: "from-orange-500 to-red-500" },
            { value: "100%", label: "planos personalizados", color: "from-pink-500 to-purple-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                {stat.value}
              </div>
              <div className="text-white/60 text-xs sm:text-sm leading-tight">{stat.label}</div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity`} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator 3D */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-purple-500 rounded-full flex justify-center relative overflow-hidden animate-bounce">
          <div className="w-1.5 h-2.5 sm:w-2 sm:h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

