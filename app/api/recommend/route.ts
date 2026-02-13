import { NextResponse } from "next/server";
import { apiError, withHandler } from "@/lib/api";
import * as recommend from "@/lib/recommend";
import * as history from "@/lib/history";

export const GET = withHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const smart = searchParams.get("smart") !== "false";
  const result = recommend.pick(category, smart);

  if (!result) {
    throw apiError(404, "해당 카테고리에 등록된 식당이 없습니다");
  }

  history.addRecord(
    result.restaurant.id,
    result.restaurant.name,
    result.menu.name,
    result.restaurant.category
  );

  return NextResponse.json(result);
});
