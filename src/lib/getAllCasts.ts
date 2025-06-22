export async function getAllCasts() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  // Strapiから全キャストと関連する口コミ（reviews）を取得
  const url = `${baseUrl}/api/casts?populate[reviews]=*&populate[Image]=*&pagination[pageSize]=100`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Strapi API error:", errorText);
      throw new Error(`キャスト一覧の取得に失敗しました: ${res.statusText}`);
    }

    const json = await res.json();

    return json.data.map((item: any) => {
      const attributes = item.attributes;

      return {
        id: item.id,
        customID: attributes.customID,
        name: attributes.name,
        age: attributes.age,
        height: attributes.height,
        weight: attributes.weight,
        catchCopy: attributes.catchCopy,
        isNewcomer: attributes.isNew,
        sexinessLevel: attributes.sexinessLevel,
        reviewCount: attributes.reviews?.data?.length || 0,
        imageUrl: attributes.Image?.[0]?.formats?.thumbnail?.url || "",
      };
    });

  } catch (error) {
    console.error("❌ getAllCasts 実行中にエラー:", error);
    throw error;
  }
}
