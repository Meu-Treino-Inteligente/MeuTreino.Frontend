"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
      <div
        className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-t border-purple-500/20 rounded-t-3xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-sm ${
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
            <span className="text-sm text-gray-400">
              {formatPrice(finalPrice)}
            </span>
          </div>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronUp}
            className="text-purple-400 text-xl"
          />
        </button>

        {/* Content - Visível apenas quando expandido */}
        {isExpanded && (
          <div className="flex-1 overflow-y-auto animate-fadeIn p-6">
            <OrderSummary
              plan={plan}
              couponCode={couponCode}
              discountAmount={discountAmount}
              finalPrice={finalPrice}
              formatPrice={formatPrice}
            />
          </div>
        )}
      </div>
    </div>
  );
}
