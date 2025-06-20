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
    'filters[castCustomID][$eq]': customID,
    'sort': 'postedAt:desc',
  });

  const url = `${baseUrl}/api/reviews?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('API Response Error:', await response.text());
      throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
    }

    const strapiResponse = await response.json();

    // ✅ attributes ではなく、item 自体に各項目がある前提
    return strapiResponse.data.map((item: any) => ({
      id: item.id,
      postedBy: item.postedBy || '名無し',
      postedAt: item.postedAt || '',
      rating: item.rating || 0,
      comment: item.comment || '',
    }));
  } catch (error) {
    console.error("口コミデータの取得中にエラーが発生しました:", error);
    throw error;
  }
}
