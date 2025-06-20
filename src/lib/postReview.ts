// src/lib/postReview.ts

export interface NewReview {
  postedBy: string;
  postedAt: string;
  rating: number;
  comment: string;
  castCustomID: string;
  isVisible: boolean;
}

export async function postReview(review: NewReview): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN_WRITE;

  // 環境変数の値をログに出す（デバッグ用）
  console.log("API URL:", baseUrl);
  console.log("API TOKEN:", token);

  if (!baseUrl) {
    throw new Error("StrapiのURLが設定されていません。");
  }
  if (!token) {
    throw new Error("StrapiのAPIトークンが設定されていません。");
  }

  const response = await fetch(`${baseUrl}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: review,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("投稿エラー:", errorText);
    throw new Error(`口コミの投稿に失敗しました: ${response.statusText}`);
  }
}
