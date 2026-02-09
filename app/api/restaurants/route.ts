import { NextResponse } from "next/server";
import { withHandler } from "@/app/lib/api";
import * as restaurant from "@/app/lib/restaurant";
import type { Category } from "@/app/lib/types";

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
