import { apiRequest } from "@/utils/api";

export interface UserTrainingResponse {
  id: number;
  userId: number;
  jsonTreino: string;
  createdAt: string;
}

export async function getUserTrainingByUserId(
  userId: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<UserTrainingResponse | null> {
  try {
    const response = await apiRequest<UserTrainingResponse>(
      `/api/users/${userId}/training`,
      {
        method: "GET",
      },
      config
    );

    return response as UserTrainingResponse;
  } catch (error) {
    console.error("Error fetching user training:", error);
    return null;
  }
}
