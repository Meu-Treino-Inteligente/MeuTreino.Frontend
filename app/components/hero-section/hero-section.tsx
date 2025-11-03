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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      
      <div
        className={`container mx-auto px-6 text-center z-10 transition-all duration-1000 ${
          is_visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
          Transforme Seu Corpo
          <br />
          <span className="text-white">Com Inteligência Artificial</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Planos de treino personalizados criados por IA. Alcançe seus objetivos
          de forma inteligente e eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#cta"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
          >
            Começar Agora
          </a>
          <a
            href="#features"
            className="px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-bold text-lg hover:bg-cyan-400/10 transition-all"
          >
            Saiba Mais
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

