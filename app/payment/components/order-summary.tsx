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
      <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
            <FontAwesomeIcon
              icon={faDumbbell}
              className="text-xl text-cyan-400"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">
              {plan?.name || "Plano de Treino Personalizado"}
            </h3>
            <p className="text-gray-400 text-sm">
              Criado por Inteligência Artificial
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Plano de treino único</span>
            <span className="text-white">Incluído</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Ajustes conforme seu progresso</span>
            <span className="text-white">Incluído</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Suporte via email</span>
            <span className="text-white">Incluído</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-700 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white font-semibold">
            {formatPrice(plan?.price || null)}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Desconto {couponCode && `(${couponCode})`}
            </span>
            <span className="text-green-400 font-semibold">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Taxa</span>
          <span className="text-green-400 font-semibold">Grátis</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <span className="text-xl font-bold text-white">Total</span>
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {formatPrice(finalPrice)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400 text-xs text-center">
          Após a confirmação do pagamento, você receberá seu plano de treino
          personalizado por email em alguns minutos.
        </p>
      </div>
    </>
  );
}
