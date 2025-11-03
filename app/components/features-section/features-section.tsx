"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faBrain,
  faChartLine,
  faDumbbell,
  faBolt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FeatureItem {
  title: string;
  description: string;
  icon: IconDefinition;
}

export function FeaturesSection() {
  const section_ref = useRef<HTMLElement>(null);
  const [visible_items, set_visible_items] = useState<Set<number>>(new Set());

  const features: FeatureItem[] = [
    {
      title: "Planos Personalizados",
      description:
        "Crie planos de treino únicos baseados nas suas necessidades, objetivos e limitações.",
      icon: faBullseye,
    },
    {
      title: "Análise Inteligente",
      description:
        "IA analisa seus dados físicos e cria estratégias de treino otimizadas para você.",
      icon: faBrain,
    },
    {
      title: "Acompanhamento Completo",
      description:
        "Monitore seu progresso com métricas detalhadas e ajustes automáticos do plano.",
      icon: faChartLine,
    },
    {
      title: "Flexibilidade Total",
      description:
        "Treine em casa, na academia ou onde preferir. Adaptamos o plano ao seu espaço.",
      icon: faDumbbell,
    },
    {
      title: "Atualização Contínua",
      description:
        "Seu plano evolui conforme você progride, mantendo sempre o desafio ideal.",
      icon: faBolt,
    },
    {
      title: "Economia de Tempo",
      description:
        "Sem precisar de personal trainer. Tenha um plano profissional 24/7 ao seu alcance.",
      icon: faClock,
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
      { threshold: 0.2 }
    );

    const elements = section_ref.current?.querySelectorAll("[data-index]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={section_ref}
      className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.05),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tudo que você precisa para alcançar seus objetivos de forma
            inteligente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`p-8 bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
                visible_items.has(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              } hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transform hover:scale-105`}
            >
              <div className="mb-4 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-5xl text-cyan-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
