export interface ErrorResponse {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  instance?: string;
  additionalProp1?: string;
  additionalProp2?: string;
  additionalProp3?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

