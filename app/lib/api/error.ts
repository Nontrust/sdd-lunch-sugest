export interface ApiError {
  readonly status: number;
  readonly message: string;
}

const isApiError = (error: unknown): error is ApiError =>
  typeof error === "object" &&
  error !== null &&
  "status" in error &&
  "message" in error;

export const apiError = (status: number, message: string): ApiError & Error => {
  const error = new Error(message) as Error & ApiError;
  (error as Record<string, unknown>).status = status;
  return error;
};

export const duplicate = (name: string) =>
  apiError(409, `이미 존재하는 상호명입니다: ${name}`);

export const notFound = (resource: string) =>
  apiError(404, `${resource}을(를) 찾을 수 없습니다`);

export { isApiError };
