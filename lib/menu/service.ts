import { notFound } from "@/lib/api";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Menu } from "@/lib/types";

export const add = (restaurantId: string, menuName: string): Menu => {
  const data = readStorage();
  const restaurant = data.restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    throw notFound("식당");
  }

  const menu: Menu = {
    id: `${restaurantId}-${Date.now()}`,
    name: menuName,
  };

  writeStorage({
    restaurants: data.restaurants.map((r) =>
      r.id === restaurantId ? { ...r, menus: [...r.menus, menu] } : r
    ),
  });

  return menu;
};

export const remove = (restaurantId: string, menuId: string): void => {
  const data = readStorage();
  const restaurant = data.restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    throw notFound("식당");
  }

  writeStorage({
    restaurants: data.restaurants.map((r) =>
      r.id === restaurantId
        ? { ...r, menus: r.menus.filter((m) => m.id !== menuId) }
        : r
    ),
  });
};
