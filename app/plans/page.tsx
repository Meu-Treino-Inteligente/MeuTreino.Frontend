"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faCheckCircle,
  faSpinner,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { getAllPlans } from "@/services/plans/plan.service";
import { Plan } from "@/types/plans/plan.types";
import { load_user_id } from "@/infrastructure/cookies";

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
    <ul className="list-none pl-0 m-0 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-cyan-400 mt-1 text-sm flex-shrink-0"
          />
          <span className="text-gray-400 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default function PlansPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon");

  const [plans, set_plans] = useState<Plan[]>([]);
  const [is_loading, set_is_loading] = useState(true);
  const [selected_plan_id, set_selected_plan_id] = useState<number | null>(
    null
  );
  const swiper_ref = useRef<SwiperType | null>(null);

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
        // Selecionar o primeiro plano ATIVO por padrão
        const firstActivePlan = sortedPlans.find((p) => p.isActive);
        if (firstActivePlan) {
          set_selected_plan_id(firstActivePlan.id);
        }
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

  // Sincronizar Swiper quando planos ou seleção mudarem
  useEffect(() => {
    if (swiper_ref.current && plans.length > 0 && selected_plan_id) {
      const activeIndex = plans.findIndex(
        (p) => p.id === selected_plan_id && p.isActive
      );
      if (activeIndex >= 0) {
        swiper_ref.current.slideTo(activeIndex);
      }
    }
  }, [plans, selected_plan_id]);

  const handle_select_plan = (
    plan_id: number,
    is_active: boolean,
    index?: number
  ) => {
    // Só permitir seleção de planos ativos
    if (is_active) {
      set_selected_plan_id(plan_id);
      // Se tiver índice e swiper, mover para o slide correspondente
      if (index !== undefined && swiper_ref.current) {
        swiper_ref.current.slideTo(index);
      }
    }
  };

  const handle_slide_change = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const activePlan = plans[activeIndex];
    if (activePlan && activePlan.isActive) {
      set_selected_plan_id(activePlan.id);
    }
  };

  const handle_continue = () => {
    if (!selected_plan_id) {
      return;
    }

    // Verificar se o plano selecionado está ativo
    const selectedPlan = plans.find((p) => p.id === selected_plan_id);
    if (!selectedPlan || !selectedPlan.isActive) {
      return; // Não permitir continuar com plano desabilitado
    }

    const user_id = load_user_id();
    if (!user_id) {
      // Se não tem user_id, redirecionar para registro
      router.push("/register");
      return;
    }

    // Redirecionar para pagamento com o planId e cupom (se houver)
    const params = new URLSearchParams();
    params.set("planId", selected_plan_id.toString());
    if (couponCode) {
      params.set("coupon", couponCode);
    }
    router.push(`/payment?${params.toString()}`);
  };

  const format_price = (price: number) => {
    // O preço vem em reais do backend (10.00), não em centavos
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (is_loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <HeaderNavigation />
        <div className="flex items-center justify-center min-h-screen">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-5xl text-cyan-400 animate-spin"
          />
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <HeaderNavigation />
      <div className="py-20 px-4 pt-32 pb-24 lg:pb-16">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-6">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-3xl text-cyan-400"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Escolha Seu Plano
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Selecione o plano que melhor se adapta às suas necessidades
            </p>
          </div>

          {/* Plans - Carousel Mobile / Grid Desktop */}
          {/* Mobile Carousel */}
          <div className="md:hidden mb-8 -mx-4 px-4 py-4">
            <Swiper
              onSwiper={(swiper) => {
                swiper_ref.current = swiper;
                // Encontrar o índice do plano ativo selecionado
                const activeIndex = plans.findIndex(
                  (p) => p.id === selected_plan_id && p.isActive
                );
                if (activeIndex >= 0) {
                  // Usar setTimeout para garantir que o Swiper está inicializado
                  setTimeout(() => {
                    swiper.slideTo(activeIndex);
                  }, 100);
                }
              }}
              onSlideChange={handle_slide_change}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={16}
              className="!pb-4 !overflow-visible"
              initialSlide={0}
            >
              {plans.map((plan, index) => {
                const is_disabled = !plan.isActive;
                const is_selected = selected_plan_id === plan.id;
                return (
                  <SwiperSlide key={plan.id} className="!w-[85%] !h-auto">
                    <button
                      onClick={() =>
                        handle_select_plan(plan.id, plan.isActive, index)
                      }
                      disabled={is_disabled}
                      className={`relative bg-gradient-to-br from-gray-900/50 to-black/50 border-2 rounded-2xl p-6 text-left transition-all w-full min-h-[385px] flex flex-col ${
                        is_disabled
                          ? "border-gray-800 opacity-60 cursor-not-allowed"
                          : is_selected
                          ? "border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105"
                          : "border-gray-700 opacity-80"
                      }`}
                    >
                      {/* Tag "Em breve" para planos desabilitados */}
                      {is_disabled && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-xs font-bold">
                          Em breve
                        </div>
                      )}

                      {/* Ícone de seleção para planos ativos */}
                      {!is_disabled && is_selected && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white text-xs"
                          />
                        </div>
                      )}

                      <div className="mb-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {plan.name}
                        </h3>
                        <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                          {format_price(plan.price)}
                        </div>
                        <div className="flex-1">
                          <PlanDescription description={plan.description} />
                        </div>
                      </div>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => {
              const is_disabled = !plan.isActive;
              return (
                <button
                  key={plan.id}
                  onClick={() => handle_select_plan(plan.id, plan.isActive)}
                  disabled={is_disabled}
                  className={`relative bg-gradient-to-br from-gray-900/50 to-black/50 border-2 rounded-2xl p-6 md:p-8 text-left transition-all ${
                    is_disabled
                      ? "border-gray-800 opacity-60 cursor-not-allowed"
                      : selected_plan_id === plan.id
                      ? "border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105"
                      : "border-gray-700 hover:border-cyan-500/50 hover:scale-[1.02] cursor-pointer"
                  }`}
                >
                  {/* Tag "Em breve" para planos desabilitados */}
                  {is_disabled && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-xs font-bold">
                      Em breve
                    </div>
                  )}

                  {/* Ícone de seleção para planos ativos */}
                  {!is_disabled && selected_plan_id === plan.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-white text-xs"
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                      {format_price(plan.price)}
                    </div>
                    <PlanDescription description={plan.description} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handle_continue}
              disabled={!selected_plan_id}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold 
              hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 
              disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 cursor-pointer"
            >
              Continuar para Pagamento
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
