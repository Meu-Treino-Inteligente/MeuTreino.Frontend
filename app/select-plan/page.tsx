"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faChevronRight,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
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
            className="text-purple-600 mt-0.5 text-sm shrink-0"
          />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default function SelectPlanPage() {
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
      const response = await getAllPlans();
      const plansArray = response.data || [];

      if (plansArray.length > 0) {
        // Filtrar apenas planos ativos
        const activePlans = plansArray.filter((p) => p.isActive);
        const inactivePlans = plansArray.filter((p) => !p.isActive);

        // Reorganizar: primeiro desabilitado, depois ativo, depois os demais desabilitados
        let sortedPlans: Plan[] = [];

        if (activePlans.length > 0 && inactivePlans.length > 0) {
          const firstInactive = inactivePlans[0];
          const remainingInactive = inactivePlans.slice(1);
          sortedPlans = [firstInactive, ...activePlans, ...remainingInactive];
        } else {
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
    if (is_active) {
      set_selected_plan_id(plan_id);
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

    const selectedPlan = plans.find((p) => p.id === selected_plan_id);
    if (!selectedPlan || !selectedPlan.isActive) {
      return;
    }

    // Redirecionar para pagamento (checkout) com o planId e cupom (se houver)
    const params = new URLSearchParams();
    params.set("planId", selected_plan_id.toString());
    if (couponCode) {
      params.set("coupon", couponCode);
    }
    router.push(`/payment?${params.toString()}`);
  };

  const format_price = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (is_loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <HeaderNavigation />
        <div className="flex items-center justify-center min-h-screen">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-5xl text-purple-600 animate-spin"
          />
        </div>
        <FooterSection />
      </div>
    );
  }

  const activePlans = plans.filter((p) => p.isActive);
  const recommendedPlan =
    activePlans.find((p) => p.id === selected_plan_id) || activePlans[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="py-8 sm:py-12 md:py-16 px-4 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 leading-tight text-gray-900">
              Escolha Seu Plano
            </h1>
          </div>

          {/* Plans - Carousel Mobile / Grid Desktop */}
          {/* Mobile Carousel */}
          <div className="md:hidden mb-6 -mx-4 px-4 py-4">
            {/* Indicador de arrastar */}
            {plans.length > 1 && (
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm">Arraste para ver mais planos</p>
              </div>
            )}
            <Swiper
              onSwiper={(swiper) => {
                swiper_ref.current = swiper;
                const activeIndex = plans.findIndex(
                  (p) => p.id === selected_plan_id && p.isActive
                );
                if (activeIndex >= 0) {
                  setTimeout(() => {
                    swiper.slideTo(activeIndex);
                  }, 100);
                }
              }}
              onSlideChange={handle_slide_change}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              spaceBetween={20}
              className="!pb-4 !overflow-visible"
              initialSlide={0}
            >
              {plans.map((plan, index) => {
                const is_disabled = !plan.isActive;
                const is_selected = selected_plan_id === plan.id;
                const is_recommended =
                  plan.id === recommendedPlan?.id && !is_disabled;
                return (
                  <SwiperSlide key={plan.id} className="!w-[90%] !h-auto">
                    <button
                      onClick={() =>
                        handle_select_plan(plan.id, plan.isActive, index)
                      }
                      disabled={is_disabled}
                      className={`relative bg-white border-2 rounded-3xl p-6 text-left transition-all w-full min-h-[420px] flex flex-col shadow-xl ${
                        is_disabled
                          ? "border-gray-200 opacity-50 cursor-not-allowed"
                          : is_selected
                          ? "border-purple-500 shadow-2xl shadow-purple-500/30 scale-[1.02] ring-2 ring-purple-500/20"
                          : "border-gray-200 hover:border-purple-300 hover:scale-[1.01]"
                      }`}
                    >
                      {/* Recommended Badge */}
                      {is_recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faFire} className="text-xs" />
                          Mais Popular
                        </div>
                      )}

                      {/* Tag "Em breve" para planos desabilitados */}
                      {is_disabled && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-xs font-bold">
                          Em breve
                        </div>
                      )}

                      {/* Ícone de seleção para planos ativos */}
                      {!is_disabled && is_selected && (
                        <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white text-sm"
                          />
                        </div>
                      )}

                      <div className="mb-6 flex-1 flex flex-col">
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                          {plan.name}
                        </h3>
                        <div className="mb-4">
                          <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-1">
                            {format_price(plan.price)}
                          </div>
                          <p className="text-gray-600 text-xs">por mês</p>
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
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {plans.map((plan) => {
              const is_disabled = !plan.isActive;
              const is_selected = selected_plan_id === plan.id;
              const is_recommended =
                plan.id === recommendedPlan?.id && !is_disabled;
              return (
                <button
                  key={plan.id}
                  onClick={() => handle_select_plan(plan.id, plan.isActive)}
                  disabled={is_disabled}
                  className={`relative bg-white border-2 rounded-3xl p-6 md:p-8 text-left transition-all min-h-[500px] flex flex-col shadow-xl ${
                    is_disabled
                      ? "border-gray-200 opacity-50 cursor-not-allowed"
                      : is_selected
                      ? "border-purple-500 shadow-2xl shadow-purple-500/30 scale-[1.03] ring-2 ring-purple-500/20"
                      : "border-gray-200 hover:border-purple-300 hover:scale-[1.02] cursor-pointer"
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
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-xs font-bold">
                      Em breve
                    </div>
                  )}

                  {/* Ícone de seleção para planos ativos */}
                  {!is_disabled && is_selected && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-white text-sm"
                      />
                    </div>
                  )}

                  <div className="mb-6 flex-1 flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-1">
                        {format_price(plan.price)}
                      </div>
                      <p className="text-gray-600 text-sm">por mês</p>
                    </div>
                    <div className="flex-1">
                      <PlanDescription description={plan.description} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={handle_continue}
              disabled={!selected_plan_id}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-lg text-white font-semibold text-lg
              hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 disabled:opacity-50 
              disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center gap-3 mx-auto overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Continuar para Pagamento
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
