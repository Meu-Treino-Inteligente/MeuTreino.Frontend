import { ApiResponse, ErrorResponse } from "./common.types";

export interface CreateCustomerRequest {
  name: string;
  email: string; // OBRIGATÓRIO
  cpf: string; // OBRIGATÓRIO (aceita com ou sem formatação)
  cellphone?: string; // Opcional
}

export interface CustomerMetadata {
  name: string;
  cellphone: string;
  email: string;
  taxId: string;
}

export interface CustomerData {
  id: string;
  metadata: CustomerMetadata;
}

export type CreateCustomerResponse = ApiResponse<CustomerData>;
export type CreateCustomerErrorResponse = ErrorResponse;

