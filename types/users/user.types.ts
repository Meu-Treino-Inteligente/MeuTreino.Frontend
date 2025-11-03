import { ErrorResponse } from "../payments/common.types";
import { TrainingPlan } from "../training-plans/training-plan.types";

export enum GoalType {
  Hipertrofia = 1,
  Emagrecimento = 2,
  DisfuncaoSexual = 3,
}

export interface CreateUserRequest {
  name: string;
  cpf?: string | null;
  email?: string | null;
  phone?: string | null;
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: number;
  availableDays: number;
  trainingLocation: string;
  exercicesPerDay: number;
}

export interface UpdateUserRequest {
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  goal?: number;
  availableDays?: number;
  trainingLocation?: string;
  exercicesPerDay?: number;
}

export interface User {
  id: number;
  name: string;
  slug: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  bmi: number;
  goal: string;
  availableDays: number;
  trainingLocation: string;
  exercicesPerDay: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserResponse = User;
export type GetUserResponse = User;
export type ListUsersResponse = User[];
export type UpdateUserResponse = User;
export type GetUserErrorResponse = ErrorResponse;
export type CreateUserErrorResponse = ErrorResponse;
export type UpdateUserErrorResponse = ErrorResponse;

// Response para o endpoint /api/get/user-site/{slug}
export interface UserSiteResponse {
  id: number;
  userId: number;
  jsonTreino: TrainingPlan | string; // API pode retornar como string JSON ou objeto
  createdAt: string;
}

export interface ListUsersParams {
  page?: number;
  pageSize?: number;
}
