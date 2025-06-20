"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// (型定義とモックデータは変更なしのため省略)
// ...

const MasterSchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);

  useEffect(() => {
    setScheduleData(mockApiData);
    if (mockApiData.length > 0) {
      setSelectedDate(mockApiData[0].isoDate);
    }
  }, []);

  const activeCasts = scheduleData.find(day => day.isoDate === selectedDate)?.casts || [];

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* --- ヘッダー部分 --- */}
        <div className="text-center mb-6">
            <p className="text-sm text-pink-400">東京 女性用風俗 ▶ 出勤スケジュール</p>
            <h2 className="text-3xl font-bold tracking-widest mt-4">SCHEDULE</h2>
            <p className="text-xs text-gray-400 mt-1">※要確認に関してはお店にご連絡下さい</p>
        </div>

        {/* --- 日付選択ボタンのグリッド --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
          {scheduleData.map((day) => (
            <button
              key={day.isoDate}
              onClick={() => setSelectedDate(day.isoDate)}
              className={`p-4 rounded-lg text-center font-semibold transition-all duration-300 ${
                selectedDate === day.isoDate
                  ? 'bg-pink-600 text-white ring-2 ring-pink-400 shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>

        {/* --- 選択された日の出勤キャスト一覧 --- */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-4 text-pink-400">
            {scheduleData.find(d => d.isoDate === selectedDate)?.date || ''} の出勤キャスト
          </h3>
          
          {activeCasts.length > 0 ? (
            <div className="space-y-4">
              {activeCasts.map((cast) => (
                <div key={cast.id} className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                  <Image 
                    src={cast.thumbnailUrl} 
                    alt={cast.name} 
                    width={64} 
                    height={64} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div className="flex-grow">
                    <p className="text-lg font-bold">{cast.name}</p>
                    <p className="text-sm text-yellow-400">{cast.workingHours}</p>
                  </div>

                  {/* ★★★ ここを修正しました ★★★ */}
                  <Link 
                    href={`/cast/${cast.id}`}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    詳細
                  </Link>

                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              この日は出勤するキャストがいません。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterSchedulePage;