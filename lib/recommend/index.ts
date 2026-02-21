import { createFileRestaurantRepository, createFileHistoryRepository } from "@/lib/storage";
import { createHistoryService } from "@/lib/history";
import { createRecommendService } from "./service";

export type { RecommendResult, RecommendService } from "./types";
export { createRecommendService } from "./service";

const defaultService = createRecommendService(
  createFileRestaurantRepository(),
  createHistoryService(createFileHistoryRepository())
);

export const pick = defaultService.pick;
export const recommend = defaultService.recommend;
