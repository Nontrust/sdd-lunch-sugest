import { NextResponse } from "next/server";
import { ApiError, withHandler } from "@/app/lib/api";
import * as recommend from "@/app/lib/recommend";

export const GET = withHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const result = recommend.pick(category);

  if (!result) {
    throw new ApiError(404, "해당 카테고리에 등록된 식당이 없습니다");
  }

  return NextResponse.json(result);
});
