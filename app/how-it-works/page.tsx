"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faUser,
  faDumbbell,
  faChartLine,
  faCheckCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { HeaderNavigation } from "@/app/components/header-navigation/header-navigation";
import { FooterSection } from "@/app/components/footer-section/footer-section";

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Preencha Seu Perfil",
      description:
        "Responda algumas perguntas sobre seus objetivos, experiência, disponibilidade e preferências. Nossa IA precisa conhecer você para criar o plano perfeito.",
      icon: faUser,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: 2,
      title: "IA Analisa Seus Dados",
      description:
        "Nossa inteligência artificial processa todas as informações usando algoritmos avançados e uma biblioteca com centenas de exercícios diferentes para diferentes perfis.",
      icon: faBrain,
      gradient: "from-pink-500 to-orange-500",
    },
    {
      number: 3,
      title: "Plano Personalizado Gerado",
      description:
        "Receba um plano de treino completo, adaptado especificamente para você. Inclui exercícios, séries, repetições e progressão semanal.",
      icon: faDumbbell,
      gradient: "from-orange-500 to-red-500",
    },
    {
      number: 4,
      title: "Siga Seu Plano",
      description:
        "Receba seu plano completo e comece a treinar. Siga as diretrizes, exercícios e progressão semanal definidos especialmente para você.",
      icon: faChartLine,
      gradient: "from-red-500 to-pink-500",
    },
  ];

  const features = [
    {
      title: "Análise Inteligente",
      description:
        "Nossa IA analisa múltiplos fatores: seus objetivos, experiência, limitações físicas, disponibilidade e preferências.",
    },
    {
      title: "Biblioteca Completa",
      description:
        "Treinada com centenas de exercícios diferentes para diferentes pessoas, garantindo variedade e adequação ao seu perfil.",
    },
    {
      title: "Personalização Total",
      description:
        "Cada plano é único. Não existem dois planos iguais, pois cada pessoa tem necessidades e objetivos diferentes.",
    },
    {
      title: "Baseado em Ciência",
      description:
        "Nossos algoritmos são baseados em princípios científicos de treinamento e fisiologia do exercício.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-6">
              <FontAwesomeIcon icon={faBrain} className="text-xs" />
              <span>Como Funciona</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="block text-gray-900">Como Nossa IA</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Cria Seu Treino
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra como nossa inteligência artificial transforma suas informações em um plano de treino personalizado e eficiente
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              O Processo em 4 Passos
            </h2>
            <div className="space-y-8 sm:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-6 md:gap-12`}
                >
                  {/* Icon/Number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl relative`}
                    >
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="text-4xl sm:text-5xl text-white"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center">
                        <span className="text-gray-900 font-black text-sm sm:text-base">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              Por Que Nossa IA é Diferente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-2xl text-purple-600"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Crie seu plano personalizado agora e descubra como é ter um treino feito especialmente para você
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-lg text-white font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Criar Meu Plano Agora</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-base" />
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

