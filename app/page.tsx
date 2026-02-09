"use client";

import { useState } from "react";
import { CATEGORIES, CATEGORY_LABELS } from "@/app/lib/types";
import type { RecommendResult } from "@/app/lib/recommend";

export default function Home() {
  const [selected, setSelected] = useState<string>("all");
  const [result, setResult] = useState<RecommendResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch(`/api/recommend?category=${selected}`);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      setLoading(false);
      return;
    }

    setResult(await res.json());
    setLoading(false);
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
