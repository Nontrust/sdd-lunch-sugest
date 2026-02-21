import type { Category, Restaurant } from "@/lib/types";

export interface RestaurantService {
  readonly getAll: () => Restaurant[];
  readonly add: (name: string, category: Category) => Restaurant;
  readonly remove: (id: string) => void;
}
