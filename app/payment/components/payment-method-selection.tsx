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
        className={`relative group bg-gradient-to-br from-gray-900/90 to-black/90 border-2 rounded-xl sm:rounded-2xl p-6 text-left transition-all duration-300 ${
          selectedMethod === "pix"
            ? "border-purple-500 shadow-xl shadow-purple-500/40 scale-[1.02] ring-2 ring-purple-500/30 bg-gradient-to-br from-purple-500/10 via-gray-900/90 to-black/90"
            : "border-gray-700/50 hover:border-purple-500/60 hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedMethod === "pix"
                  ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/40"
                  : "bg-gray-800/50 border border-gray-700/50 group-hover:border-purple-500/30"
              }`}
            >
              <FontAwesomeIcon
                icon={faQrcode}
                className={`text-2xl transition-colors ${
                  selectedMethod === "pix"
                    ? "text-purple-400"
                    : "text-gray-400 group-hover:text-purple-400"
                }`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">PIX</h3>
              <p className="text-sm text-gray-400">Aprovação instantânea</p>
            </div>
          </div>
          {selectedMethod === "pix" && (
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-white text-xs"
              />
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-black text-white">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-500">Pagamento único</p>
        </div>
      </button>

      {/* Card Cartão de Crédito */}
      <button
        disabled
        className="relative bg-gradient-to-br from-gray-900/40 to-black/40 border-2 border-gray-700/30 rounded-xl sm:rounded-2xl p-6 text-left opacity-50 cursor-not-allowed"
      >
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-gray-800/80 backdrop-blur-sm text-gray-500 text-xs font-semibold rounded-full border border-gray-700/50">
            Em breve
          </span>
        </div>
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-2xl text-gray-600"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-600">
                Cartão de Crédito
              </h3>
              <p className="text-sm text-gray-600">Em breve</p>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-black text-gray-600">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-600">Pagamento recorrente</p>
        </div>
      </button>
    </div>
  );
}
