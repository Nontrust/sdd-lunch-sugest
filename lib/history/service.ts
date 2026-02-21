import type { HistoryRecord, Category, GroupedHistory } from "@/lib/types";
import type { HistoryRepository } from "@/lib/storage";
import type { HistoryService } from "./types";

const DEDUP_DAYS = 3;

export const createHistoryService = (repo: HistoryRepository): HistoryService => {
  const getRecent = (days: number = 7): HistoryRecord[] => {
    const { records } = repo.read();
    const since = new Date();
    since.setDate(since.getDate() - days);

    return records
      .filter((r) => new Date(r.recommendedAt) >= since)
      .sort((a, b) => new Date(b.recommendedAt).getTime() - new Date(a.recommendedAt).getTime());
  };

  return {
    addRecord: (
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

      const data = repo.read();
      repo.write({ records: [...data.records, record] });

      return record;
    },

    getRecent,

    getRecentGrouped: (days: number = 7): GroupedHistory[] => {
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
    },

    getRecentRestaurantIds: (days: number = DEDUP_DAYS): string[] => {
      const recent = getRecent(days);
      return [...new Set(recent.map((r) => r.restaurantId))];
    },
  };
};
