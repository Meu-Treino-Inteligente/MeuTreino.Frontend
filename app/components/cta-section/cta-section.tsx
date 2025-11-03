"use client";

import { useEffect, useRef, useState } from "react";

export function CtaSection() {
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
      id="cta"
      ref={section_ref}
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            is_visible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Pronto Para Transformar Seu Corpo?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Comece sua jornada hoje. Crie seu plano personalizado em minutos e
            alcance resultados reais.
          </p>
          <a
            href="/register"
            className="inline-block px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-110"
          >
            Criar Meu Plano Agora
          </a>
          <p className="text-gray-500 mt-6">
            100% Gratuito • Sem Cartão de Crédito
          </p>
        </div>
      </div>
    </section>
  );
}
