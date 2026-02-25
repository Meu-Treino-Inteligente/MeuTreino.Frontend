# Backend: aceitar `paymentMethodId` no pagamento com cartão

O frontend usa **Stripe Elements** + `createPaymentMethod` no browser. Os dados do cartão **nunca** chegam ao backend; apenas o **ID do PaymentMethod** (`pm_xxx`) é enviado.

## O que o backend deve fazer (Nest/Stripe)

No endpoint que confirma o pagamento com cartão (ex.: `POST /api/create/stripe-card/confirm`):

1. **Body**: aceitar `paymentMethodId` (string, ex.: `pm_xxx`).

2. **Confirmar o PaymentIntent** com esse ID (não criar PaymentMethod no backend; o frontend já criou):
   ```ts
   await this.stripe.paymentIntents.confirm(paymentIntentId, {
     payment_method: paymentMethodId,  // pm_xxx vindo do body
     // ... resto (return_url, etc. se precisar)
   });
   ```

3. **Não** enviar `card[number]`, `card[exp_month]`, etc. para a API do Stripe. O Stripe não aceita mais isso; o fluxo correto é: frontend (Elements) → createPaymentMethod → envia `paymentMethodId` → backend confirma com esse id.

## Referência

- Frontend: `CardPaymentElementsForm` usa `CardElement` e `stripe.createPaymentMethod()`; a página envia `paymentMethodId` no body.
