import type { Menu } from "@/lib/types";

export interface MenuService {
  readonly add: (restaurantId: string, menuName: string) => Menu;
  readonly remove: (restaurantId: string, menuId: string) => void;
}
