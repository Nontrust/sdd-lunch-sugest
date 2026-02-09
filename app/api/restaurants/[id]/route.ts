import { NextResponse } from "next/server";
import { withHandler } from "@/app/lib/api";
import * as restaurant from "@/app/lib/restaurant";

export const DELETE = withHandler<{ id: string }>(async (_request, context) => {
  const { id } = await context.params;
  restaurant.remove(id);
  return new NextResponse(null, { status: 204 });
});
