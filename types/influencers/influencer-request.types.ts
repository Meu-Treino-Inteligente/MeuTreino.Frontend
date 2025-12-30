export interface InfluencerRequestCreateDto {
  name: string;
  email: string;
  instagram: string;
  phone?: string;
}

export interface InfluencerRequestResponseDto {
  id: number;
  name: string;
  email: string;
  instagram: string;
  phone?: string | null;
  status: string; // Pending, Approved, Rejected
  couponId?: number | null;
  couponCode?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  reviewedAt?: string | null;
}

export interface InfluencerRequestApiResponse {
  data: InfluencerRequestResponseDto;
}

export interface InfluencerRequestsListResponse {
  data: InfluencerRequestResponseDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

