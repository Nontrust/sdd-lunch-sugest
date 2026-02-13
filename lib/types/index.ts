export interface Menu {
  readonly id: string;
  readonly name: string;
}

export interface Restaurant {
  readonly id: string;
  readonly name: string;
  readonly category: Category;
  readonly menus: Menu[];
}

export interface RestaurantData {
  readonly restaurants: Restaurant[];
}

export interface HistoryRecord {
  readonly id: string;
  readonly restaurantId: string;
  readonly restaurantName: string;
  readonly menuName: string;
  readonly category: Category;
  readonly recommendedAt: string;
}

export interface HistoryData {
  readonly records: HistoryRecord[];
}

export const CATEGORIES = ["korean", "chinese", "japanese", "western"] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
};
