"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faTag,
  faShoppingCart,
  faPercent,
  faDollarSign,
  faCheckCircle,
  faArrowRight,
  faGift,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { HeaderNavigation } from "@/app/components/header-navigation/header-navigation";
import { FooterSection } from "@/app/components/footer-section/footer-section";

export default function CouponsPage() {
  const [selectedSales, setSelectedSales] = useState(10);

  // Cálculos baseados em R$ 12,90
  const planPrice = 12.9;
  const discount = 20;
  const finalPrice = planPrice * (1 - discount / 100); // R$ 10,32
  const commissionPerSale = finalPrice * 0.2; // 20% de R$ 10,32 = R$ 2,06

  const salesOptions = [10, 25, 50, 100, 1000];
  const totalEarnings = commissionPerSale * selectedSales;
  const steps = [
    {
      number: 1,
      title: "Solicite Seu Cupom",
      description:
        "Preencha o formulário com suas informações de influencer. Nossa equipe analisa seu perfil e aprova sua solicitação em até 48 horas.",
      icon: faUserTie,
      gradient: "from-orange-500 to-red-500",
    },
    {
      number: 2,
      title: "Receba Seu Código Exclusivo",
      description:
        "Após aprovação, você recebe um cupom de desconto exclusivo e personalizado para compartilhar com sua audiência.",
      icon: faTag,
      gradient: "from-red-500 to-pink-500",
    },
    {
      number: 3,
      title: "Compartilhe com Seus Seguidores",
      description:
        "Divulgue seu cupom nas suas redes sociais, stories, posts ou vídeos. Quanto mais você compartilha, mais pessoas usam seu código.",
      icon: faGift,
      gradient: "from-pink-500 to-purple-500",
    },
    {
      number: 4,
      title: "Ganhe 20% de Cada Venda",
      description:
        "A cada compra realizada com seu cupom, você ganha automaticamente 20% do valor da venda. Quanto mais vendas, mais você ganha!",
      icon: faDollarSign,
      gradient: "from-purple-500 to-orange-500",
    },
  ];

  const benefits = [
    {
      title: "Comissão de 20%",
      description:
        "Ganhe 20% de comissão sobre cada venda realizada com seu cupom. Sem limites de ganhos!",
      icon: faPercent,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Pagamento Automático",
      description:
        "Seus ganhos são pagos automaticamente a cada 30 dias via PIX para a chave cadastrada no seu painel. Sem burocracias ou processos manuais.",
      icon: faCheckCircle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cupom Exclusivo",
      description:
        "Cada influencer recebe um código único e personalizado, facilitando o rastreamento das suas vendas.",
      icon: faTag,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Acompanhamento em Tempo Real",
      description:
        "Monitore suas vendas e ganhos em tempo real através do seu painel de influencer.",
      icon: faShoppingCart,
      color: "from-orange-500 to-red-500",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 text-orange-700 text-xs font-semibold mb-6">
              <FontAwesomeIcon icon={faTag} className="text-xs" />
              <span>Sistema de Cupons</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="block text-gray-900">Como Funcionam os</span>
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Cupons de Desconto
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra como ganhar 20% de comissão a cada venda realizada com seu cupom exclusivo
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

        {/* Example Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 text-gray-900">
              Exemplo Prático
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Valor do Plano:</span>
                  <span className="text-2xl font-black text-gray-900">
                    R$ {planPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Desconto do Cupom:</span>
                  <span className="text-2xl font-black text-green-600">
                    -{discount}%
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-gray-300">
                  <span className="text-gray-900 text-xl font-bold">Valor Final:</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    R$ {finalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">
                        Sua Comissão por Venda (20%)
                      </span>
                      <span className="text-3xl font-black text-orange-600">
                        R$ {commissionPerSale.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faPercent}
                        className="text-2xl text-white"
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    A cada venda realizada com seu cupom, você ganha automaticamente 20% do valor da compra.
                  </p>
                  
                  {/* Dropdown de Vendas */}
                  <div className="mt-6 pt-6 border-t border-orange-200">
                    <label className="block text-gray-700 font-semibold mb-3 text-sm">
                      Calcule seus ganhos:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedSales}
                        onChange={(e) => setSelectedSales(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-lg text-gray-900 font-semibold appearance-none cursor-pointer focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      >
                        {salesOptions.map((sales) => (
                          <option key={sales} value={sales}>
                            {sales} {sales === 1 ? "venda" : "vendas"}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-orange-600"
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-orange-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-600 text-sm block mb-1">
                            Total de Ganhos ({selectedSales} {selectedSales === 1 ? "venda" : "vendas"}):
                          </span>
                          <span className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            R$ {totalEarnings.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            className="text-xl text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-gray-900">
              Vantagens do Programa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <FontAwesomeIcon
                        icon={benefit.icon}
                        className="text-2xl text-white"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
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
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Pronto para Começar a Ganhar?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Solicite seu cupom exclusivo agora e comece a ganhar comissões a cada venda realizada com seu código
            </p>
            <Link
              href="/influencer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-lg text-white font-bold text-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Solicitar Meu Cupom</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-base" />
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

