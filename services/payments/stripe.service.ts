import { apiRequest } from "@/utils/api";
import type {
  CreateStripeCardRequest,
  CreateStripeCardResponse,
  CreateStripeCardConfirmRequest,
  StripePaymentStatusResponse,
} from "@/types/payments/stripe.types";

export async function createStripeCardPayment(
  data: CreateStripeCardRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreateStripeCardResponse> {
  return apiRequest<CreateStripeCardResponse>(
    "/api/create/stripe-card",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

/**
 * Cria e confirma pagamento com cartão.
 * O frontend envia paymentMethodId (pm_xxx) criado com Stripe Elements + createPaymentMethod.
 * Backend deve confirmar o PaymentIntent com payment_method: paymentMethodId.
 */
export async function createStripeCardConfirm(
  data: CreateStripeCardConfirmRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<StripePaymentStatusResponse> {
  return apiRequest<StripePaymentStatusResponse>(
    "/api/create/stripe-card/confirm",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

export async function checkStripePaymentStatus(
  paymentIntentId: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<StripePaymentStatusResponse> {
  return apiRequest<StripePaymentStatusResponse>(
    `/api/check/stripe-payment/${encodeURIComponent(paymentIntentId)}`,
    { method: "GET" },
    config
  );
}
