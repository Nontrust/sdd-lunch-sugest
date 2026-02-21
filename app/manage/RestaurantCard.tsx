"use client";

import { CATEGORY_LABELS } from "@/lib/types";
import type { Restaurant } from "@/lib/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  menuInput: string;
  onDeleteRestaurant: (id: string) => void;
  onAddMenu: (restaurantId: string) => void;
  onDeleteMenu: (restaurantId: string, menuId: string) => void;
  onMenuInputChange: (restaurantId: string, value: string) => void;
}

export default function RestaurantCard({
  restaurant,
  menuInput,
  onDeleteRestaurant,
  onAddMenu,
  onDeleteMenu,
  onMenuInputChange,
}: RestaurantCardProps) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-semibold">{restaurant.name}</span>
          <span className="text-xs text-gray-400 ml-2">
            {CATEGORY_LABELS[restaurant.category]}
          </span>
        </div>
        <button
          className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
          onClick={() => onDeleteRestaurant(restaurant.id)}
        >
          삭제
        </button>
      </div>

      <ul className="flex flex-col gap-1 mt-2">
        {restaurant.menus.map((m) => (
          <li
            key={m.id}
            className="flex justify-between items-center px-2 py-1 text-sm rounded hover:bg-gray-50"
          >
            <span>{m.name}</span>
            <button
              className="text-red-600 text-xs hover:bg-red-50 px-2 py-1 rounded transition-colors"
              onClick={() => onDeleteMenu(restaurant.id, m.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-600"
          placeholder="메뉴 추가"
          value={menuInput}
          onChange={(e) => onMenuInputChange(restaurant.id, e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddMenu(restaurant.id)}
        />
        <button
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => onAddMenu(restaurant.id)}
        >
          추가
        </button>
      </div>
    </div>
  );
}
