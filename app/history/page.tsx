"use client";

import { useEffect } from "react";
import { CATEGORY_LABELS } from "@/lib/types";
import type { GroupedHistory } from "@/lib/types";
import { useApi } from "@/lib/hooks/useApi";
import { API } from "@/lib/api/routes";
import { formatDate } from "@/lib/utils/date";

export default function HistoryPage() {
  const { data: groups, loading, fetch: fetchHistory } = useApi<GroupedHistory[]>();

  useEffect(() => {
    fetchHistory(API.HISTORY);
  }, [fetchHistory]);

  if (loading) {
    return <p className="text-gray-400 text-sm">불러오는 중...</p>;
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">추천 기록</h1>
        <p className="text-gray-500 text-sm">추천 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">추천 기록</h1>

      {groups.map((group) => (
        <div key={group.date}>
          <h2 className="text-sm font-semibold text-gray-500 mb-2">
            {formatDate(group.date)}
          </h2>
          <div className="flex flex-col gap-2">
            {group.records.map((record) => (
              <div
                key={record.id}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {CATEGORY_LABELS[record.category]}
                </span>
                <span className="font-medium">{record.restaurantName}</span>
                <span className="text-gray-400">&middot;</span>
                <span className="text-gray-500">{record.menuName}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
