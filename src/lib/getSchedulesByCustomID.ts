// lib/getSchedulesByCustomID.ts

export async function getSchedulesByCustomID(customID: string) {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  // ✅ URL構築（populate=* を含めて attributes を取得可能に）
  const url =
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/schedules` +
    `?filters[cast][customID][$eq]=${customID}` +
    `&filters[date][$gte]=${formatDate(today)}` +
    `&filters[date][$lte]=${formatDate(twoWeeksLater)}` +
    `&populate=*` + // ← attributes 全体を含めるため重要
    `&sort=date:asc`;

  // ✅ デバッグログ
  console.log("🔥 [getSchedulesByCustomID] fetch URL:", url);
  console.log("🧠 customID:", customID);
  console.log("📆 date range:", formatDate(today), "〜", formatDate(twoWeeksLater));

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ [getSchedulesByCustomID] fetch失敗:", errorText);
      throw new Error(`Strapi returned ${res.status}`);
    }

    const json = await res.json();
    console.log("✅ [getSchedulesByCustomID] Strapiから取得した schedules:", json.data);

    return json.data;

  } catch (err) {
    console.error("🔥 [getSchedulesByCustomID] 例外発生:", err);
    return []; // 安全に空配列を返す
  }
}
