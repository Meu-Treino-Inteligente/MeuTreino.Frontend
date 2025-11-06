import { ApiResponse, ErrorResponse } from "../payments/common.types";

export interface Coupon {
  id: number;
  code: string;
  discountAmount: number | null; // Desconto fixo em reais (ex: 2.00)
  discountPercentage: number | null; // Desconto percentual
  isActive: boolean;
  expirationDate: string | null;
  maxUses: number | null;
  usedCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface CouponValidateRequest {
  code: string;
  originalPrice: number; // Preço original em reais (ex: 10.00)
}

export interface CouponValidationResponse {
  isValid: boolean;
  errorMessage?: string;
  finalPrice: number; // Preço final em reais após desconto (ex: 8.00)
  discountAmount: number; // Valor do desconto em reais (ex: 2.00)
  coupon?: Coupon;
}

export type CouponResponse = ApiResponse<Coupon>;
export type CouponsListResponse = ApiResponse<Coupon[]>;
export type CouponValidationApiResponse = ApiResponse<CouponValidationResponse>;
export type CouponErrorResponse = ErrorResponse;
