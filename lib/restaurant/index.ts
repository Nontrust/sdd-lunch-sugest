import { createFileRestaurantRepository } from "@/lib/storage";
import { createRestaurantService } from "./service";

export type { RestaurantService } from "./types";
export { createRestaurantService } from "./service";

const defaultService = createRestaurantService(createFileRestaurantRepository());

export const getAll = defaultService.getAll;
export const add = defaultService.add;
export const remove = defaultService.remove;
