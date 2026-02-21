import type { Category, HistoryRecord, GroupedHistory } from "@/lib/types";

export interface HistoryService {
  readonly addRecord: (
    restaurantId: string,
    restaurantName: string,
    menuName: string,
    category: Category
  ) => HistoryRecord;
  readonly getRecent: (days?: number) => HistoryRecord[];
  readonly getRecentGrouped: (days?: number) => GroupedHistory[];
  readonly getRecentRestaurantIds: (days?: number) => string[];
}
