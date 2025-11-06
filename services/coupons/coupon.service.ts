import {
  CouponResponse,
  CouponsListResponse,
  CouponValidateRequest,
  CouponValidationApiResponse,
  CouponValidationResponse,
} from "@/types/coupons/coupon.types";
import { apiRequest } from "@/utils/api";

export async function getCouponById(
  id: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CouponResponse> {
  return apiRequest<CouponResponse>(
    `/api/coupons/${id}`,
    {
      method: "GET",
    },
    config
  );
}

export async function getCouponByCode(
  code: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CouponResponse> {
  return apiRequest<CouponResponse>(
    `/api/coupons/code/${encodeURIComponent(code)}`,
    {
      method: "GET",
    },
    config
  );
}

export async function getAllCoupons(
  isActive?: boolean,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CouponsListResponse> {
  const query = isActive !== undefined ? `?isActive=${isActive}` : "";
  return apiRequest<CouponsListResponse>(
    `/api/coupons${query}`,
    {
      method: "GET",
    },
    config
  );
}

export async function validateCoupon(
  data: CouponValidateRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CouponValidationApiResponse> {
  const response = await apiRequest<CouponValidationResponse | CouponValidationApiResponse>(
    "/api/coupons/validate",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
  
  // Normalizar resposta: a API pode retornar objeto diretamente ou { data: {...} }
  if (response && !("data" in response) && "isValid" in response) {
    return { data: response as CouponValidationResponse };
  }
  
  return response as CouponValidationApiResponse;
}
