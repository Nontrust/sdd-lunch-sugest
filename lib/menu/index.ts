import { createFileRestaurantRepository } from "@/lib/storage";
import { createMenuService } from "./service";

export type { MenuService } from "./types";
export { createMenuService } from "./service";

const defaultService = createMenuService(createFileRestaurantRepository());

export const add = defaultService.add;
export const remove = defaultService.remove;
