import {
  CreatePixQrcodeRequest,
  CreatePixQrcodeResponse,
  GetPixQrcodeResponse,
} from "@/types/payments/pix.types";
import { apiRequest } from "@/utils/api";

export async function createPixQrcode(
  data: CreatePixQrcodeRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreatePixQrcodeResponse> {
  return apiRequest<CreatePixQrcodeResponse>(
    "/api/create/pix-qrcode",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

export async function getPixQrcodeStatus(
  paymentId: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<GetPixQrcodeResponse> {
  return apiRequest<GetPixQrcodeResponse>(
    `/api/check/pix-qrcode/${paymentId}`,
    {
      method: "GET",
    },
    config
  );
}
