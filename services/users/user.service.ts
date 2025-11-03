import {
  CreateUserRequest,
  UpdateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  ListUsersResponse,
  UpdateUserResponse,
  ListUsersParams,
  UserSiteResponse,
} from "@/types/users/user.types";
import { apiRequest } from "@/utils/api";

export async function createUser(
  data: CreateUserRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<CreateUserResponse> {
  return apiRequest<CreateUserResponse>(
    "/api/users/create",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    config
  );
}

export async function getUserById(
  id: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<GetUserResponse> {
  return apiRequest<GetUserResponse>(
    `/api/get/users/${id}`,
    {
      method: "GET",
    },
    config
  );
}

export async function getUserBySlug(
  slug: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<GetUserResponse> {
  return apiRequest<GetUserResponse>(
    `/api/get/users/slug/${slug}`,
    {
      method: "GET",
    },
    config
  );
}

export async function listUsers(
  params?: ListUsersParams,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<ListUsersResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params?.pageSize) {
    queryParams.append("pageSize", params.pageSize.toString());
  }
  const queryString = queryParams.toString();
  const url = queryString
    ? `/api/list/users?${queryString}`
    : "/api/list/users";

  return apiRequest<ListUsersResponse>(
    url,
    {
      method: "GET",
    },
    config
  );
}

export async function updateUser(
  id: number,
  data: UpdateUserRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<UpdateUserResponse> {
  return apiRequest<UpdateUserResponse>(
    `/api/update/users/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    config
  );
}

export async function updateUserPartial(
  id: number,
  data: UpdateUserRequest,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<UpdateUserResponse> {
  return apiRequest<UpdateUserResponse>(
    `/api/update/users/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
    config
  );
}

export async function deleteUser(
  id: number,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<void> {
  await apiRequest<void>(
    `/api/delete/users/${id}`,
    {
      method: "DELETE",
    },
    config
  );
}

export async function getUserSiteBySlug(
  slug: string,
  config?: { baseUrl?: string; headers?: Record<string, string> }
): Promise<UserSiteResponse> {
  return apiRequest<UserSiteResponse>(
    `/api/get/user-site/${slug}`,
    {
      method: "GET",
    },
    config
  );
}
