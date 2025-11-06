"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faCheckCircle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { OrderSummary } from "./order-summary";
import { Plan } from "@/types/plans/plan.types";

interface OrderSummaryDrawerProps {
  plan: Plan | null;
  couponCode: string;
  discountAmount: number;
  finalPrice: number | null;
  formatPrice: (price: number | null) => string;
}

export function OrderSummaryDrawer({
  plan,
  couponCode,
  discountAmount,
  finalPrice,
  formatPrice,
}: OrderSummaryDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
      <div
        className={`bg-gradient-to-br from-gray-900 to-black border-t border-cyan-500/20 rounded-t-3xl flex flex-col overflow-hidden shadow-2xl ${
          isExpanded ? "animate-slideUpExpand" : "animate-slideDownCollapse"
        }`}
        style={{
          maxHeight: isExpanded ? "85vh" : "100px",
          transition:
            "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header do Drawer - Sempre Visível */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between p-4 border-b border-gray-700 w-full hover:bg-gray-800/50 transition-colors"
          aria-label={isExpanded ? "Recolher resumo" : "Expandir resumo"}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Resumo do Pedido</h2>
            <span className="text-sm text-gray-400">{formatPrice(finalPrice)}</span>
          </div>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronUp}
            className="text-cyan-400 text-xl"
          />
        </button>

        {/* Swiper Container - Visível apenas quando expandido */}
        {isExpanded && (
          <div className="flex-1 overflow-hidden relative animate-fadeIn">
            <Swiper
              onSwiper={setSwiperInstance}
              spaceBetween={0}
              slidesPerView={1}
              className="h-full"
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
            >
              {/* Slide 1: Produto */}
              <SwiperSlide className="p-6 overflow-y-auto">
                <OrderSummary
                  plan={plan}
                  couponCode={couponCode}
                  discountAmount={discountAmount}
                  finalPrice={finalPrice}
                  formatPrice={formatPrice}
                />
              </SwiperSlide>

              {/* Slide 2: Benefícios */}
              <SwiperSlide className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    O que está incluído
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-cyan-400 mt-1"
                      />
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Plano de treino único
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Treino personalizado criado exclusivamente para você
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-cyan-400 mt-1"
                      />
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Ajustes conforme seu progresso
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Atualizações automáticas baseadas no seu desempenho
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-cyan-400 mt-1"
                      />
                      <div>
                        <h4 className="text-white font-semibold mb-1">
                          Suporte via email
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Tire suas dúvidas sempre que precisar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3: Garantia */}
              <SwiperSlide className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Garantia e Segurança
                  </h3>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-4xl text-cyan-400 mb-4"
                    />
                    <h4 className="text-white font-semibold mb-2">
                      Pagamento 100% Seguro
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Seus dados estão protegidos, não guardamos nenhum dado sensível.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 text-sm">
                        Após a confirmação do pagamento, você receberá seu plano
                        de treino personalizado por email em alguns minutos.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Navegação Customizada */}
            <button
              className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Slide anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Próximo slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
