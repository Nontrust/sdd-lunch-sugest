export type { RestaurantRepository, HistoryRepository } from "./types";
export {
  createFileRestaurantRepository,
  createFileHistoryRepository,
} from "./file-storage";

import { createFileRestaurantRepository, createFileHistoryRepository } from "./file-storage";

const defaultRestaurantRepo = createFileRestaurantRepository();
const defaultHistoryRepo = createFileHistoryRepository();

export const readStorage = defaultRestaurantRepo.read;
export const writeStorage = defaultRestaurantRepo.write;
export const readHistory = defaultHistoryRepo.read;
export const writeHistory = defaultHistoryRepo.write;
