"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faChevronRight,
  faFire,
  faShield,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { getAllPlans } from "@/services/plans/plan.service";
import { Plan } from "@/types/plans/plan.types";

// Componente para renderizar a descrição do plano com ícones FontAwesome
const PlanDescription = ({ description }: { description: string }) => {
  const items = useMemo(() => {
    if (typeof window === "undefined") return [];

    // Criar um elemento temporário para parsear o HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;

    // Extrair os textos dos <li>
    const listItems = tempDiv.querySelectorAll("li");
    return Array.from(listItems).map((li) => li.textContent?.trim() || "");
  }, [description]);

  if (items.length === 0) return null;

  return (
    <ul className="list-none pl-0 m-0 space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-purple-400 mt-0.5 text-sm flex-shrink-0"
          />
          <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default function PlansPage() {
  const router = useRouter();

  const [plans, set_plans] = useState<Plan[]>([]);
  const [is_loading, set_is_loading] = useState(true);

  // Função para carregar planos
  const load_plans = async () => {
    try {
      // Buscar TODOS os planos (ativos e desabilitados)
      const response = await getAllPlans(); // Sem filtro de isActive
      const plansArray = response.data || [];

      if (plansArray.length > 0) {
        // Ordenar: planos desabilitados primeiro, depois ativos, depois desabilitados novamente
        // O objetivo é que o plano ativo fique no centro (índice 1)
        const activePlans = plansArray.filter((p) => p.isActive);
        const inactivePlans = plansArray.filter((p) => !p.isActive);

        // Reorganizar: primeiro desabilitado, depois ativo, depois os demais desabilitados
        let sortedPlans: Plan[] = [];

        if (activePlans.length > 0 && inactivePlans.length > 0) {
          // Se houver pelo menos 1 desabilitado e 1 ativo, colocar o ativo no meio
          const firstInactive = inactivePlans[0];
          const remainingInactive = inactivePlans.slice(1);

          sortedPlans = [firstInactive, ...activePlans, ...remainingInactive];
        } else {
          // Se não houver desabilitados ou ativos, manter ordenação original
          sortedPlans = [...plansArray].sort((a, b) => {
            if (a.isActive === b.isActive) return 0;
            return a.isActive ? -1 : 1;
          });
        }

        set_plans(sortedPlans);
      } else {
        console.warn("Nenhum plano encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar planos:", error);
    } finally {
      set_is_loading(false);
    }
  };

  useEffect(() => {
    load_plans();
  }, []);

  const format_price = (price: number) => {
    // O preço vem em reais do backend (10.00), não em centavos
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (is_loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
        <HeaderNavigation />
        <div className="flex items-center justify-center min-h-screen">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-5xl text-purple-400 animate-spin"
          />
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white">
      <HeaderNavigation />
      <div className="py-12 sm:py-16 md:py-20 px-4 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs md:text-sm mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Transforme Seu Corpo com IA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="block text-white">Escolha o Plano</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Perfeito para Você
              </span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Treinos personalizados por inteligência artificial. Resultados
              reais em 8 semanas.
            </p>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-[#0a0a0a]"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-yellow-400 text-xs"
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">
                    1.500 alunos satisfeitos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <FontAwesomeIcon icon={faUsers} className="text-lg" />
                <span className="text-sm font-semibold">
                  1.500 treinos gerados
                </span>
              </div>
            </div>
          </div>

          {/* Plans - Grid Display Only */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {plans.map((plan) => {
              const is_disabled = !plan.isActive;
              const activePlans = plans.filter((p) => p.isActive);
              const is_recommended =
                plan.id === activePlans[0]?.id && !is_disabled;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border-2 rounded-3xl p-6 md:p-8 text-left min-h-[500px] flex flex-col shadow-2xl ${
                    is_disabled
                      ? "border-gray-800/50 opacity-50"
                      : "border-gray-700/50"
                  }`}
                >
                  {/* Recommended Badge */}
                  {is_recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full text-white text-sm font-bold shadow-xl flex items-center gap-2 z-10">
                      <FontAwesomeIcon icon={faFire} className="text-sm" />
                      Mais Popular
                    </div>
                  )}

                  {/* Tag "Em breve" para planos desabilitados */}
                  {is_disabled && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-xs font-bold">
                      Em breve
                    </div>
                  )}

                  <div className="mb-6 flex-1 flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-1">
                        {format_price(plan.price)}
                      </div>
                      <p className="text-gray-400 text-sm">por mês</p>
                    </div>
                    <div className="flex-1">
                      <PlanDescription description={plan.description} />
                    </div>
                  </div>

                  {/* Security Badge */}
                  {!is_disabled && (
                    <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center gap-2 text-gray-400 text-xs">
                      <FontAwesomeIcon
                        icon={faShield}
                        className="text-purple-400"
                      />
                      <span>Pagamento 100% seguro</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-6">
              Pronto para começar? Complete seu cadastro para escolher um plano.
            </p>
            <button
              onClick={() => router.push("/register")}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full text-white font-bold text-lg
              hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Começar Agora
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
