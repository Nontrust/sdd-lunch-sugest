import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type { RestaurantData, HistoryData } from "@/lib/types";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");
const HISTORY_PATH = path.join(process.cwd(), "data", "history.json");

export const readStorage = (): RestaurantData =>
  JSON.parse(readFileSync(DATA_PATH, "utf-8"));

export const writeStorage = (data: RestaurantData): void =>
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

export const readHistory = (): HistoryData => {
  if (!existsSync(HISTORY_PATH)) {
    return { records: [] };
  }
  return JSON.parse(readFileSync(HISTORY_PATH, "utf-8"));
};

export const writeHistory = (data: HistoryData): void =>
  writeFileSync(HISTORY_PATH, JSON.stringify(data, null, 2), "utf-8");
