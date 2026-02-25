"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function formatCvv(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}

export interface CardPaymentFormProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  onCardNumberChange: (value: string) => void;
  onCardNameChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  formatPrice: (price: number | null) => string;
  finalPrice: number | null;
}

export function CardPaymentForm({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  onCardNumberChange,
  onCardNameChange,
  onCardExpiryChange,
  onCardCvvChange,
  onSubmit,
  isSubmitting = false,
  formatPrice,
  finalPrice,
}: CardPaymentFormProps) {
  const displayNumber = formatCardNumber(cardNumber) || "•••• •••• •••• ••••";
  const displayName = cardName.trim() || "NOME NO CARTÃO";
  const displayExpiry = cardExpiry ? formatExpiry(cardExpiry) : "MM/AA";
  const displayCvv = cardCvv ? "•".repeat(cardCvv.length) : "•••";

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 space-y-8">
      {/* Cartão visual fake */}
      <div className="relative max-w-sm mx-auto pb-10">
        <div className="aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white p-6 flex flex-col justify-between border border-slate-600/50">
          {/* Chip e bandeira */}
          <div className="flex items-start justify-between">
            <div className="w-12 h-9 rounded-md bg-amber-400/90 shadow-inner flex items-center justify-center">
              <div className="w-8 h-5 rounded-sm border-2 border-amber-600/50 bg-gradient-to-br from-amber-200 to-amber-500" />
            </div>
            <div className="text-xs font-semibold tracking-wider text-white/80">
              CRÉDITO
            </div>
          </div>

          {/* Número do cartão */}
          <p className="font-mono text-xl sm:text-2xl tracking-[0.2em] text-white/95 break-all">
            {displayNumber}
          </p>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">
                Nome
              </p>
              <p className="font-medium text-sm sm:text-base truncate uppercase tracking-wide">
                {displayName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-0.5">
                Validade
              </p>
              <p className="font-mono text-sm sm:text-base">{displayExpiry}</p>
            </div>
          </div>
        </div>

        {/* Faixa do CVV (costas do cartão) - só visual */}
        <div className="absolute -bottom-1 left-4 right-4 h-8 rounded bg-slate-900/90 border border-slate-600/50 flex items-center justify-end pr-3">
          <span className="font-mono text-xs text-white/80">CVV {displayCvv}</span>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Número do cartão
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
            />
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              value={formatCardNumber(cardNumber)}
              onChange={(e) =>
                onCardNumberChange(e.target.value.replace(/\D/g, ""))
              }
              maxLength={19}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl font-mono text-lg tracking-wider focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nome no cartão
          </label>
          <input
            type="text"
            autoComplete="cc-name"
            placeholder="Como está no cartão"
            value={cardName}
            onChange={(e) =>
              onCardNameChange(e.target.value.toUpperCase().slice(0, 26))
            }
            maxLength={26}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl uppercase tracking-wide focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Validade
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/AA"
              value={formatExpiry(cardExpiry)}
              onChange={(e) =>
                onCardExpiryChange(e.target.value.replace(/\D/g, ""))
              }
              maxLength={5}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              CVV
            </label>
            <input
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="•••"
              value={cardCvv}
              onChange={(e) => onCardCvvChange(formatCvv(e.target.value))}
              maxLength={4}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              3 ou 4 dígitos no verso do cartão
            </p>
          </div>
        </div>

        {onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl text-white font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCreditCard} className="text-sm" />
                Pagar {formatPrice(finalPrice)}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
