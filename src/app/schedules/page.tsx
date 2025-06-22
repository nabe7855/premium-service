"use client";

import { useEffect, useState } from "react";
import { getAllSchedulesGroupedByDate } from "@/lib/getAllSchedulesGroupedByDate";
import { Schedule } from "@/types/schedule";
import ScheduleTabs from "@/components/schedule/ScheduleTabs";

const SchedulePage = () => {
  const [schedulesMap, setSchedulesMap] = useState<Record<string, Schedule[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSchedulesGroupedByDate();
        setSchedulesMap(data);
      } catch (error) {
        console.error("データ取得失敗", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-pink-700">
        全体出勤スケジュール
      </h2>
      <ScheduleTabs schedulesMap={schedulesMap} />
    </div>
  );
};

export default SchedulePage;
