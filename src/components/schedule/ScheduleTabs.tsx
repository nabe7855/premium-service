"use client";

import { useState } from "react";
import { Schedule } from "@/types/schedule";
import Link from "next/link";

interface ScheduleTabsProps {
  schedulesMap: Record<string, Schedule[]>;
}

// ✅ 今日から14日分の連続日付を生成
const getNext14Days = (): string[] => {
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split("T")[0];
  });
};

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ schedulesMap }) => {
  const dates = getNext14Days();
  const [activeDate, setActiveDate] = useState(dates[0]);

  const schedules = schedulesMap[activeDate] || [];

  return (
    <div>
      {/* 日付タブ */}
      <div className="overflow-x-auto mb-4">
        <div className="flex w-max min-w-full gap-2 pb-1">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeDate === date ? "bg-pink-500 text-white" : "bg-gray-200"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* キャスト表示 */}
      <div className="space-y-2">
        {schedules.length === 0 ? (
          <div className="text-gray-500">出勤キャストがいません</div>
        ) : (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <Link href={`/cast/${schedule.cast.customID}`}>
                <span className="text-lg font-semibold text-blue-600 underline">
                  {schedule.cast.name}
                </span>
              </Link>
              <span className="text-sm text-gray-600">
                {schedule.rawText}{" "}
                {schedule.isFullyBooked && (
                  <span className="text-red-500 ml-2">🈵 満了</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleTabs;
