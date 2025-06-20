"use client";

import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useModalStore } from "@/store/modalStore"; // 🆕 Zustand モーダル状態管理

type ScheduleStatus = "available" | "full" | "off";

interface ScheduleDay {
  id: number;
  date: string;
  dayOfWeek: string;
  dayOfWeekNumber: number;
  status: ScheduleStatus;
  timeSlots: string[];
}

interface StrapiSchedule {
  id: number;
  date: string;
  rawText?: string;
  isFullyBooked?: boolean;
}

const ScheduleTab = ({ schedules }: { schedules: StrapiSchedule[] }) => {
  console.log("✅ ScheduleTab: schedules = ", schedules);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const openModal = useModalStore((state) => state.openModal); // 🆕 モーダル開く関数取得

  const processedScheduleData: ScheduleDay[] = schedules
    .map((schedule) => {
      const { id, date, rawText, isFullyBooked } = schedule;

      const safeDateString = date?.replace(/-/g, "/");
      const dateObj = new Date(safeDateString);

      if (isNaN(dateObj.getTime())) {
        console.warn("⚠️ 無効な日付のスケジュール:", schedule);
        return null;
      }

      if (dateObj < today) {
        console.log("🧹 過去スケジュール除外:", dateObj.toDateString());
        return null;
      }

      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const dayOfWeekNumber = dateObj.getDay();
      const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeekNumber];
      const timeSlots = rawText ? rawText.split(/\s*\/\s*/) : [];

      let status: ScheduleStatus = "off";
      if (isFullyBooked === true) {
        status = "full";
      } else if (timeSlots.length > 0) {
        status = "available";
      }

      return {
        id,
        date: `${month}/${day}`,
        dayOfWeek,
        dayOfWeekNumber,
        status,
        timeSlots,
      };
    })
    .filter(Boolean) as ScheduleDay[];

  console.log("🎯 processedScheduleData:", processedScheduleData);

  const getDayBgColor = (dayNumber: number): string => {
    if (dayNumber === 6) return "bg-indigo-800";
    if (dayNumber === 0) return "bg-rose-900";
    return "";
  };

  const StatusDisplay = ({ day }: { day: ScheduleDay }) => {
    switch (day.status) {
      case "available":
        return (
          <div className="flex flex-col items-center justify-center">
            {day.timeSlots.map((slot) => (
              <span key={slot} className="font-semibold">
                {slot}
              </span>
            ))}
          </div>
        );
      case "full":
        return <span className="font-bold text-yellow-400">予約満了</span>;
      case "off":
        return <span className="font-semibold text-gray-400">休み</span>;
      default:
        return null;
    }
  };

  const ActionButton = ({ status }: { status: ScheduleStatus }) => {
    if (status === "available") {
      return (
        <button
          onClick={openModal} // 🆕 モーダル開く
          className="bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-8 rounded-md shadow-lg shadow-rose-900/30 transition-all duration-300 transform hover:scale-105"
        >
          予約
        </button>
      );
    }
    return <div className="h-10"></div>;
  };

  return (
    <div className="bg-[#120112] text-white p-2 sm:p-4 rounded-lg shadow-lg border border-yellow-800/50">
      <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2 bg-black py-3">
        <CalendarDaysIcon className="w-6 h-6 text-rose-400" />
        出勤スケジュール
      </h3>

      {processedScheduleData.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          出勤スケジュールはまだ登録されていません。
        </div>
      ) : (
        <div className="w-full">
          {/* モバイル表示 */}
          <div className="sm:hidden">
            {processedScheduleData.map((day) => (
              <div key={day.id} className="border-b-2 border-gray-700 last:border-b-0">
                <div className={`p-3 font-bold text-center text-lg ${getDayBgColor(day.dayOfWeekNumber)}`}>
                  {day.date} ({day.dayOfWeek})
                </div>
                <div className="p-4 text-center text-yellow-300">
                  <StatusDisplay day={day} />
                </div>
                <div className="p-3 text-center">
                  <ActionButton status={day.status} />
                </div>
              </div>
            ))}
          </div>

          {/* PC表示 */}
          <table className="hidden sm:table w-full border-collapse">
            <tbody>
              {processedScheduleData.map((day) => (
                <tr key={day.id} className="border-t border-gray-700">
                  <td className={`w-1/4 p-3 font-bold text-center text-lg ${getDayBgColor(day.dayOfWeekNumber)}`}>
                    {day.date} ({day.dayOfWeek})
                  </td>
                  <td className="w-1/2 p-3 text-center text-yellow-300 border-x border-gray-700">
                    <StatusDisplay day={day} />
                  </td>
                  <td className="w-1/4 p-3 text-center">
                    <ActionButton status={day.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
