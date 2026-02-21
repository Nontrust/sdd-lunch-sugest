import { NextResponse } from "next/server";
import { apiError, withHandler } from "@/lib/api";
import * as recommend from "@/lib/recommend";

export const GET = withHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const smart = searchParams.get("smart") !== "false";
  const result = recommend.recommend(category, smart);

  if (!result) {
    throw apiError(404, "해당 카테고리에 등록된 식당이 없습니다");
  }

  return NextResponse.json(result);
});
