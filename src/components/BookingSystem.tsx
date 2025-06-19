"use client"; // この部品は、ユーザーの操作で動く、特別な部品です

import React, { useState } from 'react';

// 予約システムの設計図
const BookingSystem: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('ご希望の日時を選択してください。');
      return;
    }
    alert(`${selectedDate.toLocaleDateString()} の ${selectedTime} で予約を試みました！（まだ仮の機能です）`);
  };

  return (
    <div className="w-full max-w-md p-6 mt-8 bg-white rounded-2xl shadow-lg border border-strawberry-secondary/50">
      <h3 className="text-2xl font-bold text-center text-strawberry-primary mb-6">ご予約はこちら</h3>
      
      {/* 日付選択（仮） */}
      <div className="mb-4">
        <label className="block text-strawberry-text/80 mb-2">ご希望日</label>
        <input 
          type="date"
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-strawberry-primary focus:border-transparent"
        />
      </div>

      {/* 時間選択（仮） */}
      <div className="mb-6">
        <label className="block text-strawberry-text/80 mb-2">ご希望時間</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-strawberry-primary focus:border-transparent"
        >
          <option value="">時間を選択してください</option>
          <option value="13:00">13:00</option>
          <option value="15:00">15:00</option>
          <option value="17:00">17:00</option>
          <option value="19:00">19:00</option>
        </select>
      </div>
      
      {/* 予約ボタン */}
      <button
        onClick={handleBooking}
        className="w-full h-[56px] rounded-xl text-white text-lg font-bold bg-gradient-to-r from-strawberry-primary to-pink-400 shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        この内容で予約する
      </button>
    </div>
  );
};

export default BookingSystem;