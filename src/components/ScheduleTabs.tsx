// src/components/ScheduleTabs.tsx
"use client";

import { useState, useEffect } from "react";

interface Cast {
  id: number;
  name: string;
}

interface ScheduleTabsProps {
  scheduleMap: Record<string, Cast[]>;
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ scheduleMap }) => {
  const dates = Object.keys(scheduleMap).slice(0, 14); // 14日分だけ表示
  const [activeDate, setActiveDate] = useState(dates[0]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (dates.includes(today)) {
      setActiveDate(today);
    }
  }, [dates]);

  return (
    <div>
      {/* 横スクロール可能なタブバー */}
      <div className="overflow-x-auto mb-4">
        <div className="flex w-max min-w-full gap-2 pb-1">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                activeDate === date
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* 選択された日のキャスト一覧 */}
      <div className="grid gap-3">
        {scheduleMap[activeDate]?.map((cast) => (
          <div key={cast.id} className="p-4 border rounded bg-white shadow">
            {cast.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTabs;
