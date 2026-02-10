import { NextResponse } from "next/server";
import { withHandler } from "@/lib/api";
import * as restaurant from "@/lib/restaurant";
import type { Category } from "@/lib/types";

export const GET = withHandler(async () =>
  NextResponse.json(restaurant.getAll())
);

export const POST = withHandler(async (request) => {
  const { name, category } = (await request.json()) as {
    name: string;
    category: Category;
  };
  return NextResponse.json(restaurant.add(name, category), { status: 201 });
});
