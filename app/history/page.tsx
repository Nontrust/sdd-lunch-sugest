"use client";

import { useEffect, useState } from "react";
import { CATEGORY_LABELS } from "@/lib/types";
import type { Category } from "@/lib/types";

interface HistoryRecord {
  id: string;
  restaurantName: string;
  menuName: string;
  category: Category;
  recommendedAt: string;
}

interface GroupedHistory {
  date: string;
  records: HistoryRecord[];
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
};

export default function HistoryPage() {
  const [groups, setGroups] = useState<GroupedHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">불러오는 중...</p>;
  }

  if (groups.length === 0) {
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
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{record.menuName}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
