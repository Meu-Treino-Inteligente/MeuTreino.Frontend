import { loadStripe } from "@stripe/stripe-js";

const key =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")
    : "";

/** Promise do Stripe para usar em <Elements stripe={stripePromise}> */
export const stripePromise = key ? loadStripe(key) : null;
