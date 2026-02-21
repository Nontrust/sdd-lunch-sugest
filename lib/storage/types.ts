import type { RestaurantData, HistoryData } from "@/lib/types";

export interface RestaurantRepository {
  readonly read: () => RestaurantData;
  readonly write: (data: RestaurantData) => void;
}

export interface HistoryRepository {
  readonly read: () => HistoryData;
  readonly write: (data: HistoryData) => void;
}
