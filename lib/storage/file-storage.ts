import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type { RestaurantData, HistoryData } from "@/lib/types";
import type { RestaurantRepository, HistoryRepository } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "restaurants.json");
const HISTORY_PATH = path.join(process.cwd(), "data", "history.json");

export const createFileRestaurantRepository = (): RestaurantRepository => ({
  read: () => JSON.parse(readFileSync(DATA_PATH, "utf-8")),
  write: (data) => writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8"),
});

export const createFileHistoryRepository = (): HistoryRepository => ({
  read: () => {
    if (!existsSync(HISTORY_PATH)) {
      return { records: [] };
    }
    return JSON.parse(readFileSync(HISTORY_PATH, "utf-8"));
  },
  write: (data) => writeFileSync(HISTORY_PATH, JSON.stringify(data, null, 2), "utf-8"),
});
