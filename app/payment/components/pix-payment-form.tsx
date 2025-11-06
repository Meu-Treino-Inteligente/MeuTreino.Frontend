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
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Informações para Pagamento
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Preencha seus dados para gerar o QR Code PIX
        </p>
      </div>

      {/* Campo Nome */}
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Nome Completo <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Seu nome completo"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            nameError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-700 focus:border-cyan-500"
          }`}
        />
        {nameError && <p className="text-red-400 text-xs mt-1">{nameError}</p>}
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="seu@email.com"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            emailError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-700 focus:border-cyan-500"
          }`}
        />
        {emailError && (
          <p className="text-red-400 text-xs mt-1">{emailError}</p>
        )}
      </div>

      {/* Campo Telefone */}
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Telefone/Celular <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={cellphone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(00) 00000-0000"
          maxLength={15}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            cellphoneError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-700 focus:border-cyan-500"
          }`}
        />
        {cellphoneError && (
          <p className="text-red-400 text-xs mt-1">{cellphoneError}</p>
        )}
      </div>

      {/* Campo CPF */}
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          CPF <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => handleCpfChange(e.target.value)}
          placeholder="000.000.000-00"
          maxLength={14}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            cpfError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-700 focus:border-cyan-500"
          }`}
        />
        {cpfError && <p className="text-red-400 text-xs mt-1">{cpfError}</p>}
      </div>

      {/* Campo Cupom de Desconto */}
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Cupom de Desconto
        </label>
        <div className="relative">
          <FontAwesomeIcon
            icon={faTag}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponCodeChange(e.target.value.toUpperCase())}
            placeholder="Digite o código do cupom"
            className={`w-full pl-12 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
              couponError
                ? "border-red-500 focus:border-red-500"
                : couponCode.trim() && !couponError && discountAmount > 0
                ? "border-green-500 focus:border-green-500"
                : "border-gray-700 focus:border-cyan-500"
            }`}
          />
          {isValidatingCoupon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-cyan-400 animate-spin"
              />
            </div>
          )}
        </div>
        {couponError && (
          <p className="text-red-400 text-xs mt-1">{couponError}</p>
        )}
        {couponCode.trim() && !couponError && discountAmount > 0 && (
          <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
            <FontAwesomeIcon icon={faCheckCircle} />
            Cupom aplicado! Desconto de {formatPrice(discountAmount)}
          </p>
        )}
      </div>

      {/* Botão Gerar QR Code */}
      <button
        onClick={onGenerateQrCode}
        disabled={isLoading}
        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
            Gerando QR Code...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faQrcode} className="mr-2" />
            Gerar QR Code PIX
          </>
        )}
      </button>
    </div>
  );
}
