import type { Menu, Restaurant } from "@/lib/types";

export interface RecommendResult {
  readonly restaurant: Restaurant;
  readonly menu: Menu;
  readonly isFallback?: boolean;
}

export interface RecommendService {
  readonly pick: (category?: string, smart?: boolean) => RecommendResult | null;
  readonly recommend: (category?: string, smart?: boolean) => RecommendResult | null;
}
