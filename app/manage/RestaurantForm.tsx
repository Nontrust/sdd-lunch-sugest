"use client";

import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";
import type { Category } from "@/lib/types";

interface RestaurantFormProps {
  name: string;
  category: Category;
  onNameChange: (name: string) => void;
  onCategoryChange: (category: Category) => void;
  onAdd: () => void;
}

export default function RestaurantForm({
  name,
  category,
  onNameChange,
  onCategoryChange,
  onAdd,
}: RestaurantFormProps) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-600"
        placeholder="상호명"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      />
      <select
        className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_LABELS[cat]}
          </option>
        ))}
      </select>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        onClick={onAdd}
      >
        추가
      </button>
    </div>
  );
}
