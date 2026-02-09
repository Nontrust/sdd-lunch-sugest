import { readFileSync, writeFileSync } from "fs";
import path from "path";
import type { RestaurantData } from "@/app/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");

export const readStorage = (): RestaurantData =>
  JSON.parse(readFileSync(DATA_PATH, "utf-8"));

export const writeStorage = (data: RestaurantData): void =>
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
