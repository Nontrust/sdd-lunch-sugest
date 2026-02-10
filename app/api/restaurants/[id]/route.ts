import { NextResponse } from "next/server";
import { withHandler } from "@/lib/api";
import * as restaurant from "@/lib/restaurant";

export const DELETE = withHandler<{ id: string }>(async (_request, context) => {
  const { id } = await context.params;
  restaurant.remove(id);
  return new NextResponse(null, { status: 204 });
});
