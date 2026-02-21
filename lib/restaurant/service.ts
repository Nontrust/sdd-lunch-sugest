import { duplicate } from "@/lib/api";
import type { Category, Restaurant } from "@/lib/types";
import type { RestaurantRepository } from "@/lib/storage";
import type { RestaurantService } from "./types";

export const createRestaurantService = (repo: RestaurantRepository): RestaurantService => ({
  getAll: (): Restaurant[] => repo.read().restaurants,

  add: (name: string, category: Category): Restaurant => {
    const data = repo.read();
    const isDuplicate = data.restaurants.some((r) => r.name === name);

    if (isDuplicate) {
      throw duplicate(name);
    }

    const restaurant: Restaurant = {
      id: Date.now().toString(),
      name,
      category,
      menus: [],
    };

    repo.write({
      restaurants: [...data.restaurants, restaurant],
    });

    return restaurant;
  },

  remove: (id: string): void => {
    const data = repo.read();

    repo.write({
      restaurants: data.restaurants.filter((r) => r.id !== id),
    });
  },
});
