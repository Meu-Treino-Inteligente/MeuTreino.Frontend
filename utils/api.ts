export interface ApiConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

const defaultConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  config: ApiConfig = {}
): Promise<T> {
  const { baseUrl = defaultConfig.baseUrl, headers = {} } = config;
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultConfig.headers,
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      ...errorData,
    };
  }

  return response.json();
}

