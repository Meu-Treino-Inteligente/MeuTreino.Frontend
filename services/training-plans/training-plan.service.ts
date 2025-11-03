import {
  CreateTrainingPlanRequest,
  CreateTrainingPlanResponse,
} from "@/types/training-plans/training-plan.types";
import { apiRequest } from "@/utils/api";

export async function createTrainingPlan(
  data: CreateTrainingPlanRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreateTrainingPlanResponse> {
  return apiRequest<CreateTrainingPlanResponse>(
    "/api/create/training-plan",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

