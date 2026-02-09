import { NextResponse } from "next/server";
import { withHandler } from "@/app/lib/api";
import * as menu from "@/app/lib/menu";

export const DELETE = withHandler<{ id: string; menuId: string }>(
  async (_request, context) => {
    const { id, menuId } = await context.params;
    menu.remove(id, menuId);
    return new NextResponse(null, { status: 204 });
  }
);
