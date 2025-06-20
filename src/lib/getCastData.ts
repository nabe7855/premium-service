export async function getCastData(customID: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
  // customID でフィルターするURLを生成
  const url = `${baseUrl}/api/casts?filters[customID][$eq]=${customID}&populate=*`;

  console.log("✅ DEBUG: fetch URL =>", url);

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(`キャストデータの取得に失敗しました: ${res.statusText}`);
    }

    const json = await res.json();
    console.log("✅ DEBUG: API response (raw json) =>", JSON.stringify(json, null, 2));

    if (!json.data || json.data.length === 0) {
      console.warn("指定されたcustomIDのキャストが見つかりませんでした:", customID);
      return null;
    }

    const dataItem = json.data[0];

    // attributesの有無で返すデータを分岐
    const cast = dataItem.attributes
      ? { id: dataItem.id, ...dataItem.attributes }
      : dataItem;

    console.log("✅ DEBUG: Data to be returned =>", cast);

    return cast;

  } catch (error) {
    console.error("getCastDataの実行中にエラーが発生しました:", error);
    throw error;
  }
}
