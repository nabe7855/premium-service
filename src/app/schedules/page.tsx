import { getAllSchedulesGroupedByDate } from "../../lib/getAllSchedulesGroupedByDate";
import ScheduleTabs from "../../components/ScheduleTabs";

const SchedulePage = async () => {
  const scheduleMap = await getAllSchedulesGroupedByDate();

  return (
    <main className="bg-pink-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-pink-700 text-center mb-6">
        全体出勤スケジュール
      </h1>
      <ScheduleTabs scheduleMap={scheduleMap} />
    </main>
  );
};

export default SchedulePage;
