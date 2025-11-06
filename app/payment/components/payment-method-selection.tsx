import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faCreditCard,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface PaymentMethodSelectionProps {
  selectedMethod: "pix" | "card" | null;
  isLoading: boolean;
  finalPrice: number | null;
  onPixClick: () => void;
  formatPrice: (price: number | null) => string;
}

export function PaymentMethodSelection({
  selectedMethod,
  isLoading,
  finalPrice,
  onPixClick,
  formatPrice,
}: PaymentMethodSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card PIX */}
      <button
        onClick={onPixClick}
        disabled={isLoading || selectedMethod === "pix"}
        className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 rounded-xl p-6 text-left transition-all ${
          selectedMethod === "pix"
            ? "border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105"
            : "border-gray-700 hover:border-cyan-500/50 hover:scale-[1.02] cursor-pointer"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                selectedMethod === "pix" ? "bg-cyan-500/20" : "bg-gray-700/50"
              }`}
            >
              <FontAwesomeIcon
                icon={faQrcode}
                className={`text-2xl ${
                  selectedMethod === "pix" ? "text-cyan-400" : "text-gray-400"
                }`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">PIX</h3>
              <p className="text-sm text-gray-400">Aprovação instantânea</p>
            </div>
          </div>
          {selectedMethod === "pix" && (
            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-white text-xs"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-black text-white">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-400">Sem taxas adicionais</p>
        </div>
      </button>

      {/* Card Cartão de Crédito */}
      <button
        disabled
        className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-2 border-gray-700 rounded-xl p-6 text-left opacity-60 cursor-not-allowed"
      >
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-semibold rounded-full">
            Em breve
          </span>
        </div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-700/50 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-2xl text-gray-500"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-500">
                Cartão de Crédito
              </h3>
              <p className="text-sm text-gray-500">Em breve</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-black text-gray-500">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-500">Pagamento recorrente</p>
        </div>
      </button>
    </div>
  );
}
