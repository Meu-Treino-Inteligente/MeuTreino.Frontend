"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
/** Opções de aparência do CardElement para combinar com o layout */
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      fontFamily: "ui-monospace, monospace",
      color: "#1f2937",
      "::placeholder": { color: "#9ca3af" },
      iconColor: "#6b7280",
    },
    invalid: {
      color: "#dc2626",
      iconColor: "#dc2626",
    },
  },
  hidePostalCode: true,
};

export interface CardPaymentElementsFormProps {
  cardName: string;
  onCardNameChange: (value: string) => void;
  onSubmit: (paymentMethodId: string) => void | Promise<void>;
  isSubmitting?: boolean;
  formatPrice: (price: number | null) => string;
  finalPrice: number | null;
}

export function CardPaymentElementsForm({
  cardName,
  onCardNameChange,
  onSubmit,
  isSubmitting = false,
  formatPrice,
  finalPrice,
}: CardPaymentElementsFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string>("");
  const [cardDisplay, setCardDisplay] = useState<{
    last4?: string;
    brand?: string;
    expiry?: string;
  }>({});

  const displayNumber = cardDisplay.last4
    ? `•••• •••• •••• ${cardDisplay.last4}`
    : "•••• •••• •••• ••••";
  const displayName = cardName.trim() || "NOME NO CARTÃO";
  const displayExpiry = cardDisplay.expiry || "MM/AA";

  const handleCardChange = (event: { complete: boolean; error?: { message?: string }; brand?: string; last4?: string; expiryMonth?: number; expiryYear?: number }) => {
    setCardComplete(event.complete);
    setCardError(event.error?.message ?? "");
    if (event.brand) {
      setCardDisplay((prev) => ({
        ...prev,
        brand: event.brand,
        last4: event.last4 ?? prev.last4,
        expiry: event.expiryMonth && event.expiryYear
          ? `${String(event.expiryMonth).padStart(2, "0")}/${String(event.expiryYear).slice(-2)}`
          : prev.expiry,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Preencha os dados do cartão.");
      return;
    }
    if (!cardComplete) {
      setCardError("Complete os dados do cartão.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardName.trim() || undefined,
      },
    });

    if (error) {
      setCardError(error.message ?? "Erro ao validar o cartão.");
      return;
    }
    if (!paymentMethod?.id) {
      setCardError("Não foi possível processar o cartão.");
      return;
    }

    setCardError("");
    await onSubmit(paymentMethod.id);
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 space-y-8">
      {/* Cartão visual (mesmo layout de antes) */}
      <div className="relative max-w-sm mx-auto pb-10">
        <div className="aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white p-6 flex flex-col justify-between border border-slate-600/50">
          <div className="flex items-start justify-between">
            <div className="w-12 h-9 rounded-md bg-amber-400/90 shadow-inner flex items-center justify-center">
              <div className="w-8 h-5 rounded-sm border-2 border-amber-600/50 bg-gradient-to-br from-amber-200 to-amber-500" />
            </div>
            <div className="text-xs font-semibold tracking-wider text-white/80">
              CRÉDITO
            </div>
          </div>
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
        <div className="absolute -bottom-1 left-4 right-4 h-8 rounded bg-slate-900/90 border border-slate-600/50 flex items-center justify-end pr-3">
          <span className="font-mono text-xs text-white/80">CVV •••</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Dados do cartão
          </label>
          <div className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 outline-none transition-all bg-white">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleCardChange}
            />
          </div>
          {cardError && (
            <p className="text-red-600 text-sm font-medium mt-1.5">{cardError}</p>
          )}
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

        <button
          type="submit"
          disabled={!stripe || !cardComplete || isSubmitting}
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
      </form>
    </div>
  );
}
