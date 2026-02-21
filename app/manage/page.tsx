"use client";

import { useEffect, useState } from "react";
import type { Category, Restaurant } from "@/lib/types";
import { useApi } from "@/lib/hooks/useApi";
import { useApiMutation } from "@/lib/hooks/useApiMutation";
import { API } from "@/lib/api/routes";
import RestaurantForm from "./RestaurantForm";
import RestaurantCard from "./RestaurantCard";

export default function ManagePage() {
  const { data: restaurants, fetch: fetchRestaurants } = useApi<Restaurant[]>();
  const { execute, error: mutationError } = useApiMutation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("korean");
  const [menuInputs, setMenuInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchRestaurants(API.RESTAURANTS);
  }, [fetchRestaurants]);

  const handleAddRestaurant = async () => {
    if (!name.trim()) return;
    const res = await execute({
      url: API.RESTAURANTS,
      body: { name: name.trim(), category },
    });
    if (res) {
      setName("");
      fetchRestaurants(API.RESTAURANTS);
    }
  };

  const handleDeleteRestaurant = async (id: string) => {
    await execute({ url: API.restaurant(id), method: "DELETE" });
    fetchRestaurants(API.RESTAURANTS);
  };

  const handleAddMenu = async (restaurantId: string) => {
    const menuName = menuInputs[restaurantId]?.trim();
    if (!menuName) return;
    const res = await execute({
      url: API.menus(restaurantId),
      body: { name: menuName },
    });
    if (res) {
      setMenuInputs((prev) => ({ ...prev, [restaurantId]: "" }));
      fetchRestaurants(API.RESTAURANTS);
    }
  };

  const handleDeleteMenu = async (restaurantId: string, menuId: string) => {
    await execute({ url: API.menu(restaurantId, menuId), method: "DELETE" });
    fetchRestaurants(API.RESTAURANTS);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">식당 관리</h1>

      <RestaurantForm
        name={name}
        category={category}
        onNameChange={setName}
        onCategoryChange={setCategory}
        onAdd={handleAddRestaurant}
      />

      {mutationError && <p className="text-red-600 text-sm">{mutationError}</p>}

      <div className="flex flex-col gap-4">
        {(restaurants ?? []).map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            menuInput={menuInputs[r.id] ?? ""}
            onDeleteRestaurant={handleDeleteRestaurant}
            onAddMenu={handleAddMenu}
            onDeleteMenu={handleDeleteMenu}
            onMenuInputChange={(id, value) =>
              setMenuInputs((prev) => ({ ...prev, [id]: value }))
            }
          />
        ))}

        {(restaurants ?? []).length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            등록된 식당이 없습니다. 위에서 추가해보세요!
          </p>
        )}
      </div>
    </div>
  );
}
