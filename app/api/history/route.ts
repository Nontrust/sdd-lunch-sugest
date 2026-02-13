import { NextResponse } from "next/server";
import { withHandler } from "@/lib/api";
import * as history from "@/lib/history";

export const GET = withHandler(async () => {
  const grouped = history.getRecentGrouped();
  return NextResponse.json(grouped);
});
