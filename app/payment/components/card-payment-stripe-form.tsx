"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export interface CardPaymentStripeFormProps {
  formatPrice: (price: number | null) => string;
  finalPrice: number | null;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function CardPaymentStripeForm({
  formatPrice,
  finalPrice,
  onSuccess,
  onError,
}: CardPaymentStripeFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      onError("Stripe ainda não carregou. Tente novamente.");
      return;
    }

    setIsSubmitting(true);
    try {
      const returnUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.search ? "&" : "?"}card=success`
          : "";

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      if (error) {
        onError(error.message ?? "Erro ao processar pagamento.");
        return;
      }
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl text-white font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faLock} className="text-sm" />
            Pagar {formatPrice(finalPrice)}
          </>
        )}
      </button>
    </form>
  );
}
