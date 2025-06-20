export interface Review {
  id: number;
  postedBy: string;
  postedAt: string;
  rating: number;
  comment: string;
}

export async function getReviewsByCustomID(customID: string): Promise<Review[]> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!baseUrl || !token) {
    throw new Error("API URLまたはトークンが設定されていません。");
  }

  const queryParams = new URLSearchParams({
    'filters[isVisible][$eq]': 'true',
    'filters[castCustomID][$eq]': String(customID),
    'sort': 'postedAt:desc',
  });

  const url = `${baseUrl}/api/reviews?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response Error:', errorText);
      throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
    }

    const strapiResponse = await response.json();

    if (!Array.isArray(strapiResponse.data)) {
      console.warn("APIレスポンスのdataが配列ではありません:", strapiResponse.data);
      return [];
    }

    return strapiResponse.data.map((item: any) => ({
      id: item.id,
      postedBy: typeof item.postedBy === "string" && item.postedBy.trim() !== "" ? item.postedBy : "名無し",
      postedAt: typeof item.postedAt === "string" ? item.postedAt : "",
      rating: typeof item.rating === "number" ? item.rating : 0,
      comment: typeof item.comment === "string" ? item.comment : "",
    }));
  } catch (error) {
    console.error("口コミデータの取得中にエラーが発生しました:", error);
    throw error;
  }
}
