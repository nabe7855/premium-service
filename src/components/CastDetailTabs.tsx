"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileTab from "./castDetailTabs/ProfileTab";
import ReviewsTab from "./castDetailTabs/ReviewsTab";
import ScheduleTab from "./castDetailTabs/ScheduleTab";
import { getSchedulesByCustomID } from "@/lib/getSchedulesByCustomID";

interface Cast {
  id: number;
  customID: string;
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  [key: string]: unknown;
}

// Strapiのレスポンスデータ型
interface Schedule {
    id: number;
      date: string;
      rawText?: string;
      isFullyBooked?: boolean;
  
}

interface CastDetailTabsProps {
  cast: Cast;
  children: React.ReactNode;
}

const tabLabels = ["プロフィール", "口コミ", "出勤情報", "ギャラリー"];

const CastDetailTabs: React.FC<CastDetailTabsProps> = ({ cast, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    // customID があるときだけ fetch 実行
    if (!cast.customID) return;

    const fetchSchedules = async () => {
      try {
        const data = await getSchedulesByCustomID(cast.customID);
        setSchedules(data);
      } catch (error) {
        console.error("❌ スケジュール取得エラー:", error);
      }
    };

    fetchSchedules();
  }, [cast.customID]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="sticky top-16 z-10 bg-pink-50 pt-4 shadow-sm">
        <div className="pb-4">{children}</div>

        <div className="flex justify-around border-b border-gray-300">
          {tabLabels.map((label, index) => (
            <button
              key={label}
              className={`flex-1 py-3 text-sm font-bold transition-colors duration-200 ${
                activeTab === index
                  ? "border-b-4 border-pink-500 text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-b-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="p-6 text-sm text-gray-800 min-h-[50vh]"
          >
            {activeTab === 0 && <ProfileTab cast={cast} />}
            {activeTab === 1 && <ReviewsTab cast={cast} />}
            {activeTab === 2 && <ScheduleTab schedules={schedules} />}
            {activeTab === 3 && (
              <p className="text-center text-gray-400 py-8">
                {tabLabels[activeTab]} の内容はまだ準備中です。
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CastDetailTabs;
