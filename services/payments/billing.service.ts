import {
  CreateBillingRequest,
  CreateBillingResponse,
} from "@/types/payments/billing.types";
import { apiRequest } from "@/utils/api";

export async function createBilling(
  data: CreateBillingRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreateBillingResponse> {
  return apiRequest<CreateBillingResponse>(
    "/api/create/billing",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

