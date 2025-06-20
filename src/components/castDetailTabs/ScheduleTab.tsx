// components/castDetailTabs/ScheduleTab.tsx

"use client";
import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

// --- 型定義 ---
type ScheduleStatus = 'available' | 'full' | 'off';

interface ScheduleDay {
  id: number;
  date: string;
  dayOfWeek: string;
  dayOfWeekNumber: number; // 0=日, ..., 6=土
  status: ScheduleStatus;
  timeSlots: string[];
}

// --- モックデータ ---
const mockScheduleData: ScheduleDay[] = [
  { id: 1, date: "6/19", dayOfWeek: "木", dayOfWeekNumber: 4, status: 'available', timeSlots: ["18:00~翌08:00"] },
  { id: 2, date: "6/20", dayOfWeek: "金", dayOfWeekNumber: 5, status: 'available', timeSlots: ["13:00~16:00", "18:00~翌08:00"] },
  { id: 3, date: "6/21", dayOfWeek: "土", dayOfWeekNumber: 6, status: 'available', timeSlots: ["13:30~18:00"] },
  { id: 4, date: "6/22", dayOfWeek: "日", dayOfWeekNumber: 0, status: 'available', timeSlots: ["20:00~翌08:00"] },
  { id: 5, date: "6/23", dayOfWeek: "月", dayOfWeekNumber: 1, status: 'available', timeSlots: ["11:00~16:00", "18:00~翌08:00"] },
  { id: 6, date: "6/24", dayOfWeek: "火", dayOfWeekNumber: 2, status: 'full',      timeSlots: [] },
  { id: 7, date: "6/25", dayOfWeek: "水", dayOfWeekNumber: 3, status: 'available', timeSlots: ["08:00~16:00", "18:00~翌08:00"] },
  { id: 8, date: "6/26", dayOfWeek: "木", dayOfWeekNumber: 4, status: 'available', timeSlots: ["08:00~16:00", "18:00~翌08:00"] },
  { id: 9, date: "6/27", dayOfWeek: "金", dayOfWeekNumber: 5, status: 'off',       timeSlots: [] },
  { id: 10, date: "6/28", dayOfWeek: "土", dayOfWeekNumber: 6, status: 'off',      timeSlots: [] },
  { id: 11, date: "6/29", dayOfWeek: "日", dayOfWeekNumber: 0, status: 'off',      timeSlots: [] },
  { id: 12, date: "6/30", dayOfWeek: "月", dayOfWeekNumber: 1, status: 'available', timeSlots: ["08:00~16:00", "18:00~翌08:00"] },
];

const ScheduleTab = () => {
  // 曜日の背景色を、より妖艶な深みのある色に変更
  const getDayBgColor = (dayNumber: number): string => {
    if (dayNumber === 6) return 'bg-indigo-800'; // 土曜日: 深い青紫
    if (dayNumber === 0) return 'bg-rose-900';   // 日曜日: 深いワインレッド
    return ''; // 平日
  };

  const StatusDisplay = ({ day }: { day: ScheduleDay }) => {
    switch (day.status) {
      case 'available':
        return (
          <div className="flex flex-col items-center justify-center">
            {day.timeSlots.map(slot => (
              <span key={slot} className="font-semibold">{slot}</span>
            ))}
          </div>
        );
      case 'full':
        return <span className="font-bold text-yellow-400">予約満了</span>;
      case 'off':
        return <span className="font-semibold text-gray-400">休み</span>;
      default:
        return null;
    }
  };

  const ActionButton = ({ status }: { status: ScheduleStatus }) => {
    if (status === 'available') {
      return (
        // ★★★ ボタンの色をワインレッドに変更 ★★★
        <button className="
          bg-rose-700 hover:bg-rose-800 
          text-white font-bold py-2 px-8 rounded-md 
          shadow-lg shadow-rose-900/30 
          transition-all duration-300 transform hover:scale-105">
          予約
        </button>
      );
    }
    return <div className="h-10"></div>;
  };

  return (
    <div className="bg-[#120112] text-white p-2 sm:p-4 rounded-lg shadow-lg border border-yellow-800/50">
      <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2 bg-black py-3">
        {/* アイコンの色もテーマに合わせて変更 */}
        <CalendarDaysIcon className="w-6 h-6 text-rose-400" />
        出勤スケジュール
      </h3>
      
      <div className="w-full">
        {/* スマートフォン表示 */}
        <div className="sm:hidden">
            {mockScheduleData.map((day) => (
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
            {mockScheduleData.map(day => (
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
    </div>
  );
};

export default ScheduleTab;