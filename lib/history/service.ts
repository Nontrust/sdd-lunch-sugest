import { readHistory, writeHistory } from "@/lib/storage";
import type { HistoryRecord, Category } from "@/lib/types";

const DEDUP_DAYS = 3;

export const addRecord = (
  restaurantId: string,
  restaurantName: string,
  menuName: string,
  category: Category
): HistoryRecord => {
  const record: HistoryRecord = {
    id: Date.now().toString(),
    restaurantId,
    restaurantName,
    menuName,
    category,
    recommendedAt: new Date().toISOString(),
  };

  const data = readHistory();
  writeHistory({ records: [...data.records, record] });

  return record;
};

export const getRecent = (days: number = 7): HistoryRecord[] => {
  const { records } = readHistory();
  const since = new Date();
  since.setDate(since.getDate() - days);

  return records
    .filter((r) => new Date(r.recommendedAt) >= since)
    .sort((a, b) => new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime());
};

export interface GroupedHistory {
  readonly date: string;
  readonly records: HistoryRecord[];
}

export const getRecentGrouped = (days: number = 7): GroupedHistory[] => {
  const recent = getRecent(days);
  const groups = new Map<string, HistoryRecord[]>();

  for (const record of recent) {
    const date = record.recommendedAt.slice(0, 10);
    const group = groups.get(date) ?? [];
    group.push(record);
    groups.set(date, group);
  }

  return Array.from(groups.entries()).map(([date, records]) => ({
    date,
    records,
  }));
};

export const getRecentRestaurantIds = (days: number = DEDUP_DAYS): string[] => {
  const recent = getRecent(days);
  return [...new Set(recent.map((r) => r.restaurantId))];
};
