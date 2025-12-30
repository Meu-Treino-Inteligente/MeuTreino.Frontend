import {
  InfluencerRequestCreateDto,
  InfluencerRequestApiResponse,
  InfluencerRequestResponseDto,
  InfluencerRequestsListResponse,
} from "@/types/influencers/influencer-request.types";
import { apiRequest } from "@/utils/api";

export async function createInfluencerRequest(
  data: InfluencerRequestCreateDto,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<InfluencerRequestApiResponse> {
  // A API retorna o objeto diretamente (CreatedAtAction retorna o objeto no body)
  const response = await apiRequest<InfluencerRequestResponseDto>(
    "/api/influencer-requests/create",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );

  // Normalizar para o formato esperado
  return { data: response };
}

export async function getInfluencerRequestById(
  id: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<InfluencerRequestApiResponse> {
  const response = await apiRequest<InfluencerRequestResponseDto | InfluencerRequestApiResponse>(
    `/api/get/influencer-requests/${id}`,
    {
      method: "GET",
    },
    config
  );

  // Normalizar resposta
  if (response && !("data" in response) && "id" in response) {
    return { data: response as InfluencerRequestResponseDto };
  }

  return response as InfluencerRequestApiResponse;
}

export async function listInfluencerRequests(
  page: number = 1,
  pageSize: number = 10,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<InfluencerRequestsListResponse> {
  return apiRequest<InfluencerRequestsListResponse>(
    `/api/list/influencer-requests?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
    },
    config
  );
}

export async function getInfluencerRequestsByStatus(
  status: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<InfluencerRequestResponseDto[]> {
  const response = await apiRequest<InfluencerRequestResponseDto[] | { data: InfluencerRequestResponseDto[] }>(
    `/api/get/influencer-requests/status/${status}`,
    {
      method: "GET",
    },
    config
  );

  // Normalizar resposta
  if (Array.isArray(response)) {
    return response;
  }

  if (response && "data" in response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

