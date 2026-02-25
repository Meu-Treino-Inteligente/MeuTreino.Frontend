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
  onCardClick: () => void;
  formatPrice: (price: number | null) => string;
}

export function PaymentMethodSelection({
  selectedMethod,
  isLoading,
  finalPrice,
  onPixClick,
  onCardClick,
  formatPrice,
}: PaymentMethodSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card PIX */}
      <button
        onClick={onPixClick}
        disabled={isLoading || selectedMethod === "pix"}
        className={`relative group bg-white border-2 rounded-xl sm:rounded-2xl p-6 text-left transition-all duration-300 ${
          selectedMethod === "pix"
            ? "border-purple-500 shadow-xl shadow-purple-500/40 scale-[1.02] ring-2 ring-purple-500/30 bg-purple-50"
            : "border-gray-200 hover:border-purple-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedMethod === "pix"
                  ? "bg-purple-100 border border-purple-300"
                  : "bg-gray-100 border border-gray-200 group-hover:border-purple-300"
              }`}
            >
              <FontAwesomeIcon
                icon={faQrcode}
                className={`text-2xl transition-colors ${
                  selectedMethod === "pix"
                    ? "text-purple-600"
                    : "text-gray-400 group-hover:text-purple-600"
                }`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">PIX</h3>
              <p className="text-sm text-gray-600">Aprovação instantânea</p>
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
          <p className="text-2xl font-black text-gray-900">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-500">Pagamento único</p>
        </div>
      </button>

      {/* Card Cartão de Crédito */}
      <button
        type="button"
        onClick={onCardClick}
        disabled={isLoading || selectedMethod === "card"}
        className={`relative group bg-white border-2 rounded-xl sm:rounded-2xl p-6 text-left transition-all duration-300 ${
          selectedMethod === "card"
            ? "border-purple-500 shadow-xl shadow-purple-500/40 scale-[1.02] ring-2 ring-purple-500/30 bg-purple-50"
            : "border-gray-200 hover:border-purple-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedMethod === "card"
                  ? "bg-purple-100 border border-purple-300"
                  : "bg-gray-100 border border-gray-200 group-hover:border-purple-300"
              }`}
            >
              <FontAwesomeIcon
                icon={faCreditCard}
                className={`text-2xl transition-colors ${
                  selectedMethod === "card"
                    ? "text-purple-600"
                    : "text-gray-400 group-hover:text-purple-600"
                }`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Cartão de Crédito
              </h3>
              <p className="text-sm text-gray-600">Pagamento recorrente</p>
            </div>
          </div>
          {selectedMethod === "card" && (
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-white text-xs"
              />
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-black text-gray-900">
            {formatPrice(finalPrice)}
          </p>
          <p className="text-xs text-gray-500">Pagamento recorrente</p>
        </div>
      </button>
    </div>
  );
}
