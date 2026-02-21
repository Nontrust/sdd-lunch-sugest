import { createFileHistoryRepository } from "@/lib/storage";
import { createHistoryService } from "./service";

export type { HistoryService } from "./types";
export { createHistoryService } from "./service";

const defaultService = createHistoryService(createFileHistoryRepository());

export const addRecord = defaultService.addRecord;
export const getRecent = defaultService.getRecent;
export const getRecentGrouped = defaultService.getRecentGrouped;
export const getRecentRestaurantIds = defaultService.getRecentRestaurantIds;
