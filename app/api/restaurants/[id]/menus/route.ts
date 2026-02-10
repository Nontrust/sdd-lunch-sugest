import { NextResponse } from "next/server";
import { withHandler } from "@/lib/api";
import * as menu from "@/lib/menu";

export const POST = withHandler<{ id: string }>(async (request, context) => {
  const { id } = await context.params;
  const { name } = (await request.json()) as { name: string };
  return NextResponse.json(menu.add(id, name), { status: 201 });
});
