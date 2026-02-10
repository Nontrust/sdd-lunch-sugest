"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";
import type { Category, Restaurant } from "@/lib/types";

export default function ManagePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("korean");
  const [menuInputs, setMenuInputs] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const fetchRestaurants = async () => {
    const res = await fetch("/api/restaurants");
    setRestaurants(await res.json());
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async () => {
    if (!name.trim()) return;
    setError("");

    const res = await fetch("/api/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), category }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    setName("");
    fetchRestaurants();
  };

  const handleDeleteRestaurant = async (id: string) => {
    await fetch(`/api/restaurants/${id}`, { method: "DELETE" });
    fetchRestaurants();
  };

  const handleAddMenu = async (restaurantId: string) => {
    const menuName = menuInputs[restaurantId]?.trim();
    if (!menuName) return;

    await fetch(`/api/restaurants/${restaurantId}/menus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: menuName }),
    });

    setMenuInputs((prev) => ({ ...prev, [restaurantId]: "" }));
    fetchRestaurants();
  };

  const handleDeleteMenu = async (restaurantId: string, menuId: string) => {
    await fetch(`/api/restaurants/${restaurantId}/menus/${menuId}`, {
      method: "DELETE",
    });
    fetchRestaurants();
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">식당 관리</h1>

      {/* 식당 추가 폼 */}
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-600"
          placeholder="상호명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddRestaurant()}
        />
        <select
          className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleAddRestaurant}
        >
          추가
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* 식당 목록 */}
      <div className="flex flex-col gap-4">
        {restaurants.map((r) => (
          <div key={r.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold">{r.name}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {CATEGORY_LABELS[r.category]}
                </span>
              </div>
              <button
                className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded transition-colors"
                onClick={() => handleDeleteRestaurant(r.id)}
              >
                삭제
              </button>
            </div>

            {/* 메뉴 목록 */}
            <ul className="flex flex-col gap-1 mt-2">
              {r.menus.map((m) => (
                <li
                  key={m.id}
                  className="flex justify-between items-center px-2 py-1 text-sm rounded hover:bg-gray-50"
                >
                  <span>{m.name}</span>
                  <button
                    className="text-red-600 text-xs hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    onClick={() => handleDeleteMenu(r.id, m.id)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>

            {/* 메뉴 추가 */}
            <div className="flex gap-2 mt-2">
              <input
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-600"
                placeholder="메뉴 추가"
                value={menuInputs[r.id] ?? ""}
                onChange={(e) =>
                  setMenuInputs((prev) => ({ ...prev, [r.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && handleAddMenu(r.id)}
              />
              <button
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => handleAddMenu(r.id)}
              >
                추가
              </button>
            </div>
          </div>
        ))}

        {restaurants.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            등록된 식당이 없습니다. 위에서 추가해보세요!
          </p>
        )}
      </div>
    </div>
  );
}
