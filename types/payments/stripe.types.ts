import { CreateCustomerRequest } from "./customer.types";

/** Body para criar pagamento com cartão (mesmo do PIX) */
export interface CreateStripeCardRequest {
  userId: number;
  planId: number;
  customer: CreateCustomerRequest;
  couponCode?: string;
}

/** Resposta da API create/stripe-card */
export interface CreateStripeCardResponse {
  clientSecret: string;
  paymentIntentId: string;
}

/** Resposta do check/stripe-payment/:id */
export interface StripePaymentStatusResponse {
  paymentIntentId: string;
  status: string;
}

/** Dados do cartão para confirmar no backend (create/stripe-card/confirm) - não use; prefira stripeToken */
export interface CardDataRequest {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}

/** Body para create/stripe-card/confirm. Use paymentMethodId (criado com Stripe Elements + createPaymentMethod). */
export interface CreateStripeCardConfirmRequest extends CreateStripeCardRequest {
  /** ID do PaymentMethod (pm_xxx) criado no frontend com Stripe Elements. Backend confirma o PaymentIntent com este id. */
  paymentMethodId: string;
}
