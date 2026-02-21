import { notFound } from "@/lib/api";
import type { Menu } from "@/lib/types";
import type { RestaurantRepository } from "@/lib/storage";
import type { MenuService } from "./types";

export const createMenuService = (repo: RestaurantRepository): MenuService => ({
  add: (restaurantId: string, menuName: string): Menu => {
    const data = repo.read();
    const restaurant = data.restaurants.find((r) => r.id === restaurantId);

    if (!restaurant) {
      throw notFound("식당");
    }

    const menu: Menu = {
      id: `${restaurantId}-${Date.now()}`,
      name: menuName,
    };

    repo.write({
      restaurants: data.restaurants.map((r) =>
        r.id === restaurantId ? { ...r, menus: [...r.menus, menu] } : r
      ),
    });

    return menu;
  },

  remove: (restaurantId: string, menuId: string): void => {
    const data = repo.read();
    const restaurant = data.restaurants.find((r) => r.id === restaurantId);

    if (!restaurant) {
      throw notFound("식당");
    }

    repo.write({
      restaurants: data.restaurants.map((r) =>
        r.id === restaurantId
          ? { ...r, menus: r.menus.filter((m) => m.id !== menuId) }
          : r
      ),
    });
  },
});
