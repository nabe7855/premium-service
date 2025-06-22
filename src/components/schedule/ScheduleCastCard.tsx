import React from "react";
import { Schedule } from "@/types/schedule";

interface Props {
  schedule: Schedule;
}

const ScheduleCastCard: React.FC<Props> = ({ schedule }) => {
  console.log("✅ schedule cast:", schedule.cast); // デバッグ用ログ

  return (
    <div className="border rounded p-4 shadow">
      <p className="text-lg font-bold">{schedule.cast.name}</p>
      <p className="text-sm text-gray-500">{schedule.date}</p>
    </div>
  );
};

export default ScheduleCastCard;
