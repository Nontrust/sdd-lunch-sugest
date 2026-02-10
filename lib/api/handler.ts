import { NextResponse } from "next/server";
import { isApiError } from "./error";

type RouteContext<T = Record<string, string>> = {
  params: Promise<T>;
};

type RouteHandler<T = Record<string, string>> = (
  request: Request,
  context: RouteContext<T>
) => Promise<NextResponse>;

export const withHandler =
  <T = Record<string, string>>(fn: RouteHandler<T>) =>
  async (request: Request, context: RouteContext<T>): Promise<NextResponse> => {
    try {
      return await fn(request, context);
    } catch (e) {
      if (isApiError(e)) {
        return NextResponse.json({ error: e.message }, { status: e.status });
      }
      return NextResponse.json(
        { error: "알 수 없는 오류가 발생했습니다" },
        { status: 500 }
      );
    }
  };
