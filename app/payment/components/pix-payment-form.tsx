import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faSpinner,
  faTag,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { format_cpf, format_phone } from "@/utils/validation";

interface PixPaymentFormProps {
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  couponCode: string;
  nameError: string;
  emailError: string;
  cellphoneError: string;
  cpfError: string;
  couponError: string;
  isValidatingCoupon: boolean;
  discountAmount: number;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onCouponCodeChange: (value: string) => void;
  onGenerateQrCode: () => void;
  formatPrice: (price: number | null) => string;
}

export function PixPaymentForm({
  name,
  email,
  cellphone,
  cpf,
  couponCode,
  nameError,
  emailError,
  cellphoneError,
  cpfError,
  couponError,
  isValidatingCoupon,
  discountAmount,
  isLoading,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onCpfChange,
  onCouponCodeChange,
  onGenerateQrCode,
  formatPrice,
}: PixPaymentFormProps) {
  const handleCpfChange = (value: string) => {
    const formatted = format_cpf(value);
    onCpfChange(formatted);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = format_phone(value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Informações para Pagamento
        </h3>
        <p className="text-gray-600 text-sm">
          Preencha seus dados para gerar o QR Code PIX
        </p>
      </div>

      {/* Campo Nome */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2.5">
          Nome Completo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Seu nome completo"
          className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm ${
            nameError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50"
              : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300"
          }`}
        />
        {nameError && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">{nameError}</p>
        )}
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2.5">
          Email (para receber o treino) <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="seu@email.com"
          className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm ${
            emailError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50"
              : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300"
          }`}
        />
        {emailError && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {emailError}
          </p>
        )}
      </div>

      {/* Campo Telefone */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2.5">
          Telefone/Celular <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={cellphone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(00) 00000-0000"
          maxLength={15}
          className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm ${
            cellphoneError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50"
              : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300"
          }`}
        />
        {cellphoneError && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {cellphoneError}
          </p>
        )}
      </div>

      {/* Campo CPF */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2.5">
          CPF <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => handleCpfChange(e.target.value)}
          placeholder="000.000.000-00"
          maxLength={14}
          className={`w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm ${
            cpfError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50"
              : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300"
          }`}
        />
        {cpfError && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">{cpfError}</p>
        )}
      </div>

      {/* Campo Cupom de Desconto */}
      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-2.5">
          Cupom de Desconto
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faTag}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
          />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponCodeChange(e.target.value.toUpperCase())}
            placeholder="Digite o código do cupom"
            className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm ${
              couponError
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 bg-red-50"
                : couponCode.trim() && !couponError && discountAmount > 0
                ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 bg-green-50"
                : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300"
            }`}
          />
          {isValidatingCoupon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-purple-600 animate-spin"
              />
            </div>
          )}
        </div>
        {couponError && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {couponError}
          </p>
        )}
        {couponCode.trim() && !couponError && discountAmount > 0 && (
          <p className="text-green-600 text-xs mt-1.5 flex items-center gap-2 font-medium">
            <FontAwesomeIcon icon={faCheckCircle} className="text-sm" />
            Cupom aplicado! Desconto de {formatPrice(discountAmount)}
          </p>
        )}
      </div>

      {/* Botão Gerar QR Code */}
      <button
        onClick={onGenerateQrCode}
        disabled={isLoading}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl text-white font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            <span>Gerando QR Code...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faQrcode} />
            <span>Gerar QR Code PIX</span>
          </>
        )}
      </button>
    </div>
  );
}
