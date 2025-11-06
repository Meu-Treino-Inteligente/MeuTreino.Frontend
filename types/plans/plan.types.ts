import { ApiResponse, ErrorResponse } from "../payments/common.types";

export interface Plan {
  id: number;
  name: string;
  price: number; // Preço em reais (ex: 10.00)
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export type PlanResponse = ApiResponse<Plan>;
export type PlansListResponse = ApiResponse<Plan[]>;
export type PlanErrorResponse = ErrorResponse;
