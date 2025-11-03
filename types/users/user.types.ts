import { ErrorResponse } from "../payments/common.types";

export interface CreateUserRequest {
  name: string;
  cpf?: string | null;
  email?: string | null;
  telefone?: string | null;
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: string;
  availableDays: number;
  trainingLocation: string;
}

export interface UpdateUserRequest {
  name?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  goal?: string;
  availableDays?: number;
  trainingLocation?: string;
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

export interface ListUsersParams {
  page?: number;
  pageSize?: number;
}

