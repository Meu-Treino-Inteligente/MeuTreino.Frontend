import { ApiResponse, ErrorResponse } from "./common.types";
import { CreateCustomerRequest } from "./customer.types";

export interface CreatePixQrcodeRequest {
  userId: number; // OBRIGATÓRIO - ID retornado ao criar o usuário
  planId: number; // OBRIGATÓRIO - ID do plano selecionado
  couponCode?: string; // Opcional - Código do cupom de desconto
  expiresIn?: number; // Opcional - Tempo de expiração em segundos (padrão: 3600)
  description?: string; // Opcional
  customer: CreateCustomerRequest; // OBRIGATÓRIO
  metadata?: Record<string, string>;
}

export interface PixQrcodeData {
  id: string;
  brCode: string; // Código PIX completo para copiar e colar (000201...)
  brCodeBase64: string; // Imagem do QR Code em base64 (data:image/png;base64,...)
  amount: number;
  status?: string;
  devMode?: boolean;
  expiresIn?: number;
  createdAt?: string;
  updatedAt?: string;
  expiresAt?: string;
  platformFee?: number;
}

export type CreatePixQrcodeResponse = ApiResponse<PixQrcodeData>;
export type GetPixQrcodeResponse = ApiResponse<PixQrcodeData>;
export type CreatePixQrcodeErrorResponse = ErrorResponse;
