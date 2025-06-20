// src/lib/getAllSchedulesGroupedByDate.ts

export const getAllSchedulesGroupedByDate = async () => {
  const startDate = new Date("2025-06-21");
  const scheduleMap: Record<string, { id: number; name: string; dayOfWeek?: number }[]> = {};

  const castNames = ["イチゴくん", "バナナくん", "メロンくん", "モモくん", "レモンくん"];

  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const formattedDate = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay(); // 0: 日曜, 6: 土曜

    // ランダムに1〜3人のキャストを割り当てる
    const numCasts = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...castNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numCasts).map((name, index) => ({
      id: i * 10 + index,
      name,
      dayOfWeek
    }));

    scheduleMap[formattedDate] = selected;
  }

  return scheduleMap;
};
