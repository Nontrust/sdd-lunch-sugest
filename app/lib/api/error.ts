export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }

  static duplicate = (name: string) =>
    new ApiError(409, `이미 존재하는 상호명입니다: ${name}`);

  static notFound = (resource: string) =>
    new ApiError(404, `${resource}을(를) 찾을 수 없습니다`);
}
