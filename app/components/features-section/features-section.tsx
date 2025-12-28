"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faBrain,
  faChartLine,
  faDumbbell,
  faClock,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface FeatureItem {
  title: string;
  description: string;
  icon: IconDefinition;
  gradient: string;
  hoverGradient: string;
  comingSoon?: boolean;
}

export function FeaturesSection() {
  const section_ref = useRef<HTMLElement>(null);
  const [visible_items, set_visible_items] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features: FeatureItem[] = [
    {
      title: "Planos Personalizados",
      description:
        "Crie planos de treino únicos baseados nas suas necessidades, objetivos e limitações. IA analisa seu perfil completo.",
      icon: faBullseye,
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Análise Inteligente",
      description:
        "IA analisa seus dados físicos e cria estratégias de treino otimizadas para você. Resultados baseados em ciência.",
      icon: faBrain,
      gradient: "from-pink-500 to-orange-500",
      hoverGradient: "from-pink-600 to-orange-600",
    },
    {
      title: "Acompanhamento Completo",
      description:
        "Monitore seu progresso com métricas detalhadas e ajustes automáticos do plano. Veja sua evolução em tempo real.",
      icon: faChartLine,
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "from-orange-600 to-red-600",
      comingSoon: true,
    },
    {
      title: "Flexibilidade Total",
      description:
        "Treine em casa, na academia ou onde preferir. Adaptamos o plano ao seu espaço e equipamentos disponíveis.",
      icon: faDumbbell,
      gradient: "from-red-500 to-pink-500",
      hoverGradient: "from-red-600 to-pink-600",
    },
    {
      title: "Biblioteca de Exercícios",
      description:
        "Nossa IA é treinada com centenas de exercícios diferentes para diferentes pessoas. Sempre encontre o exercício perfeito para você.",
      icon: faBookOpen,
      gradient: "from-purple-500 to-orange-500",
      hoverGradient: "from-purple-600 to-orange-600",
    },
    {
      title: "Economia de Tempo",
      description:
        "Sem precisar de personal trainer. Tenha um plano profissional 24/7 ao seu alcance por uma fração do preço.",
      icon: faClock,
      gradient: "from-pink-500 to-purple-500",
      hoverGradient: "from-pink-600 to-purple-600",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            set_visible_items((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = section_ref.current?.querySelectorAll("[data-index]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={section_ref}
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]" />
      <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm text-purple-300 text-xs sm:text-sm font-semibold">
              ✨ Recursos Poderosos
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight px-2">
            Tudo Que Você Precisa
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl lg:max-w-3xl mx-auto px-4">
            Recursos avançados para alcançar seus objetivos de forma inteligente e eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-700 cursor-pointer ${
                visible_items.has(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              } ${
                hoveredIndex === index
                  ? "scale-105 shadow-2xl"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
              style={{
                transform: hoveredIndex === index
                  ? "perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)"
                  : undefined,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
              />

              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-xs font-bold z-10">
                  Em breve
                </div>
              )}

              {/* Icon */}
              <div className="mb-4 sm:mb-6 flex items-center justify-center relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity`}
                />
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform transition-transform group-hover:rotate-6 group-hover:scale-110`}
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-3xl sm:text-4xl text-white"
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold">Saiba mais</span>
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center px-4">
          <div className="inline-block p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Pronto para começar?
            </h3>
            <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Crie seu plano personalizado agora e transforme seu corpo com IA
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">Criar Plano Grátis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-8 py-4 border-2 border-purple-500/50 rounded-full text-purple-400 font-bold text-base sm:text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all text-center"
              >
                Ver Todos os Planos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
