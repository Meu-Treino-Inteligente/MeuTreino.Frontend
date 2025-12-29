"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faUserTie,
  faArrowRight,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderNavigation } from "./components/header-navigation/header-navigation";
import { FooterSection } from "./components/footer-section/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-x-hidden">
      <HeaderNavigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-4">
              <FontAwesomeIcon icon={faBrain} className="text-xs" />
              <span>Treinos por Inteligência Artificial</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight">
              <span className="block text-gray-900">Escolha Seu</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Caminho
              </span>
            </h1>
          </div>

          {/* Two Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Option 1: Quero fazer meu treino com IA */}
            <Link
              href="/register"
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-2xl text-white"
                  />
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-3">
                  Quero fazer meu treino com Inteligência Artificial
                </h2>

                <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Começar</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Option 2: Sou influencer, quero meu cupom exclusivo */}
            <Link
              href="/influencer"
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="text-2xl text-white"
                  />
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-3">
                  Sou influencer, quero meu cupom exclusivo
                </h2>

                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Solicitar</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
