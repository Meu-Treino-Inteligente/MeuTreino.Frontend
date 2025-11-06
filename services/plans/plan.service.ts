import {
  Plan,
  PlanResponse,
  PlansListResponse,
} from "@/types/plans/plan.types";
import { apiRequest } from "@/utils/api";

export async function getPlanById(
  id: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<PlanResponse> {
  const response = await apiRequest<Plan | PlanResponse>(
    `/api/plans/${id}`,
    {
      method: "GET",
    },
    config
  );

  // Normalizar resposta: a API pode retornar objeto diretamente ou { data: {...} }
  if (response && !("data" in response) && "id" in response) {
    return { data: response as Plan };
  }

  return response as PlanResponse;
}

export async function getAllPlans(
  isActive?: boolean,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<PlansListResponse> {
  const query = isActive !== undefined ? `?isActive=${isActive}` : "";
  const response = await apiRequest<Plan[] | PlansListResponse>(
    `/api/plans${query}`,
    {
      method: "GET",
    },
    config
  );

  // Normalizar resposta: a API pode retornar array diretamente ou { data: [...] }
  if (Array.isArray(response)) {
    return { data: response };
  }

  return response as PlansListResponse;
}
