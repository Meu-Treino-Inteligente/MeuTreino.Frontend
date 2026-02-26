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

/** Resposta da API (Mercado Pago): criar PIX e polling de status */
export interface PixQrcodeData {
  /** ID do pagamento — usar em GET /api/check/pix-qrcode/:id para polling (pending → approved) */
  paymentId: string;
  /** Compatibilidade: alguns backends podem retornar id em vez de paymentId */
  id?: string;
  /** Código PIX "copia e cola" para o usuário colar no app do banco */
  qrCode: string;
  /** Imagem do QR em base64 — exibir como <img src="data:image/png;base64,..." /> */
  qrCodeBase64: string;
  /** Link da página do Mercado Pago para pagar (opcional) */
  ticketUrl?: string;
  amount?: number;
  /** Status do pagamento: pending, approved, etc. */
  status?: string;
  expiresIn?: number;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePixQrcodeResponse = ApiResponse<PixQrcodeData>;
export type GetPixQrcodeResponse = ApiResponse<PixQrcodeData>;
export type CreatePixQrcodeErrorResponse = ErrorResponse;
