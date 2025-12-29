import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { Plan } from "@/types/plans/plan.types";

interface OrderSummaryProps {
  plan: Plan | null;
  couponCode: string;
  discountAmount: number;
  finalPrice: number | null;
  formatPrice: (price: number | null) => string;
}

export function OrderSummary({
  plan,
  couponCode,
  discountAmount,
  finalPrice,
  formatPrice,
}: OrderSummaryProps) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Resumo do Pedido
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </div>

      <div className="space-y-5 mb-6">
        <div className="flex items-start gap-4 pb-5 border-b border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 border border-purple-200">
            <FontAwesomeIcon
              icon={faDumbbell}
              className="text-xl text-purple-600"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold mb-1.5 leading-tight">
              {plan?.name || "Plano de Treino Personalizado"}
            </h3>
            <p className="text-gray-600 text-sm">
              Criado por Inteligência Artificial
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-1.5">
            <span className="text-gray-600">Plano de treino único</span>
            <span className="text-gray-900 font-medium">Incluído</span>
          </div>

          <div className="flex justify-between items-center py-1.5">
            <span className="text-gray-600">Suporte via email</span>
            <span className="text-gray-900 font-medium">Incluído</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 space-y-3.5">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Subtotal</span>
          <span className="text-gray-900 font-semibold">
            {formatPrice(plan?.price || null)}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              Desconto {couponCode && `(${couponCode})`}
            </span>
            <span className="text-green-600 font-semibold">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Taxa</span>
          <span className="text-green-600 font-semibold">Grátis</span>
        </div>
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            {formatPrice(finalPrice)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-gray-600 text-xs text-center leading-relaxed">
          Após a confirmação do pagamento, você receberá seu plano de treino
          personalizado por email em alguns minutos.
        </p>
      </div>
    </>
  );
}
