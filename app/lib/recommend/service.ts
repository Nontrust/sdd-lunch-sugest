import { readStorage } from "@/app/lib/storage";
import type { Menu, Restaurant } from "@/app/lib/types";

export interface RecommendResult {
  readonly restaurant: Restaurant;
  readonly menu: Menu;
}

const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const pick = (category?: string): RecommendResult | null => {
  const { restaurants } = readStorage();

  const candidates = restaurants
    .filter((r) => !category || category === "all" || r.category === category)
    .filter((r) => r.menus.length > 0);

  if (candidates.length === 0) return null;

  const restaurant = pickRandom(candidates);
  const menu = pickRandom(restaurant.menus);

  return { restaurant, menu };
};
