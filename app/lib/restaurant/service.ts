import { readStorage, writeStorage } from "@/app/lib/storage";
import type { Category, Restaurant } from "@/app/lib/types";

export const getAll = (): Restaurant[] => readStorage().restaurants;

export const add = (name: string, category: Category): Restaurant => {
  const data = readStorage();
  const isDuplicate = data.restaurants.some((r) => r.name === name);

  if (isDuplicate) {
    throw new Error("DUPLICATE");
  }

  const restaurant: Restaurant = {
    id: Date.now().toString(),
    name,
    category,
    menus: [],
  };

  writeStorage({
    restaurants: [...data.restaurants, restaurant],
  });

  return restaurant;
};

export const remove = (id: string): void => {
  const data = readStorage();

  writeStorage({
    restaurants: data.restaurants.filter((r) => r.id !== id),
  });
};
