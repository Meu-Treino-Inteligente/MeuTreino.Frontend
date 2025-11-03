import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from "@/types/payments/customer.types";
import { apiRequest } from "@/utils/api";

export async function createCustomer(
  data: CreateCustomerRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreateCustomerResponse> {
  return apiRequest<CreateCustomerResponse>(
    "/api/create/customer",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

