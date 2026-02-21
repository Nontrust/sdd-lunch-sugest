"use client";

import { useState } from "react";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";
import { useApi } from "@/lib/hooks/useApi";
import { API } from "@/lib/api/routes";
import type { RecommendResult } from "@/lib/recommend";

export default function Home() {
  const [selected, setSelected] = useState<string>("all");
  const { data: result, error, loading, fetch: fetchRecommend } = useApi<RecommendResult>();

  const handleRecommend = () => {
    fetchRecommend(`${API.RECOMMEND}?category=${selected}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">오늘 점심 뭐 먹지?</h1>

      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            selected === "all"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-200 hover:border-blue-600 hover:text-blue-600"
          }`}
          onClick={() => setSelected("all")}
        >
          전체
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              selected === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-200 hover:border-blue-600 hover:text-blue-600"
            }`}
            onClick={() => setSelected(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <button
        className="py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        onClick={handleRecommend}
        disabled={loading}
      >
        {loading ? "추천 중..." : "추천 받기"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
          {result.isFallback && (
            <p className="text-amber-600 text-xs font-medium mb-3">
              최근 방문한 식당이지만 추천합니다
            </p>
          )}
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-3">
            {CATEGORY_LABELS[result.restaurant.category]}
          </span>
          <h2 className="text-xl font-bold mb-1">{result.restaurant.name}</h2>
          <p className="text-gray-500 text-lg">{result.menu.name}</p>
        </div>
      )}
    </div>
  );
}
