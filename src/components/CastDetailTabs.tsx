// src/components/CastDetailTabs.tsx
"use client";

import React, { useState } from "react";

const tabLabels = ["基本情報", "口コミ", "出勤情報", "ギャラリー"];

const CastDetailTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-8 w-full max-w-3xl">
      <div className="flex justify-around border-b border-gray-300">
        {tabLabels.map((label, index) => (
          <button
            key={label}
            className={`flex-1 py-3 text-sm font-bold ${
              activeTab === index
                ? "border-b-4 border-pink-500 text-pink-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 中身はあとで実装 */}
      <div className="p-6 text-center text-gray-600">
        <p>{tabLabels[activeTab]} の内容はここに表示されます。</p>
      </div>
    </div>
  );
};

export default CastDetailTabs;
