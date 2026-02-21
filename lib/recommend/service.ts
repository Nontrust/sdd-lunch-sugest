import type { RestaurantRepository } from "@/lib/storage";
import type { HistoryService } from "@/lib/history";
import type { RecommendResult, RecommendService } from "./types";

const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const createRecommendService = (
  repo: RestaurantRepository,
  historyService: HistoryService
): RecommendService => {
  const pick = (category?: string, smart: boolean = true): RecommendResult | null => {
    const { restaurants } = repo.read();

    const candidates = restaurants
      .filter((r) => !category || category === "all" || r.category === category)
      .filter((r) => r.menus.length > 0);

    if (candidates.length === 0) return null;

    if (smart) {
      const recentIds = historyService.getRecentRestaurantIds();
      const filtered = candidates.filter((r) => !recentIds.includes(r.id));

      if (filtered.length > 0) {
        const restaurant = pickRandom(filtered);
        const menu = pickRandom(restaurant.menus);
        return { restaurant, menu };
      }

      const restaurant = pickRandom(candidates);
      const menu = pickRandom(restaurant.menus);
      return { restaurant, menu, isFallback: true };
    }

    const restaurant = pickRandom(candidates);
    const menu = pickRandom(restaurant.menus);

    return { restaurant, menu };
  };

  return {
    pick,

    recommend: (category?: string, smart: boolean = true): RecommendResult | null => {
      const result = pick(category, smart);

      if (result) {
        historyService.addRecord(
          result.restaurant.id,
          result.restaurant.name,
          result.menu.name,
          result.restaurant.category
        );
      }

      return result;
    },
  };
};
