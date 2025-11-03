import { ApiResponse, ErrorResponse } from "./common.types";
import { CreateCustomerRequest, CustomerMetadata, CustomerData } from "./customer.types";

export interface BillingProduct {
  externalId?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface CreateBillingRequest {
  userId?: number;
  frequency?: string;
  methods?: string[];
  products: BillingProduct[];
  returnUrl?: string;
  completionUrl?: string;
  customerId?: string;
  customer?: CreateCustomerRequest;
  allowCoupons?: boolean;
  coupons?: string[];
  externalId?: string;
}

export interface BillingProductResponse {
  id: string;
  externalId?: string;
  quantity: number;
}

export interface BillingData {
  id: string;
  url: string;
  amount: number;
  status: string;
  devMode: boolean;
  methods?: string[];
  products: BillingProductResponse[];
  frequency?: string;
  nextBilling?: string;
  customer: CustomerData;
  allowCoupons?: boolean;
  coupons?: string[];
}

export type CreateBillingResponse = ApiResponse<BillingData>;
export type CreateBillingErrorResponse = ErrorResponse;

