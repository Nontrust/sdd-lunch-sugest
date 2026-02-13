import { readStorage } from "@/lib/storage";
import { getRecentRestaurantIds } from "@/lib/history";
import type { Menu, Restaurant } from "@/lib/types";

export interface RecommendResult {
  readonly restaurant: Restaurant;
  readonly menu: Menu;
  readonly isFallback?: boolean;
}

const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const pick = (category?: string, smart: boolean = true): RecommendResult | null => {
  const { restaurants } = readStorage();

  const candidates = restaurants
    .filter((r) => !category || category === "all" || r.category === category)
    .filter((r) => r.menus.length > 0);

  if (candidates.length === 0) return null;

  if (smart) {
    const recentIds = getRecentRestaurantIds();
    const filtered = candidates.filter((r) => !recentIds.includes(r.id));

    if (filtered.length > 0) {
      const restaurant = pickRandom(filtered);
      const menu = pickRandom(restaurant.menus);
      return { restaurant, menu };
    }

    // 폴백: 모든 후보가 최근 추천된 경우
    const restaurant = pickRandom(candidates);
    const menu = pickRandom(restaurant.menus);
    return { restaurant, menu, isFallback: true };
  }

  const restaurant = pickRandom(candidates);
  const menu = pickRandom(restaurant.menus);

  return { restaurant, menu };
};
