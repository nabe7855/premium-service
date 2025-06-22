// src/app/cast/[id]/page.tsx

import SwiperImageSlider from "@/components/SwiperImageSlider";
import { getCastData } from "@/lib/getCastData";
import CastDetailTabs from "@/components/CastDetailTabs";
import ReservationModal from "@/components/ReservationModal"; // モーダル追加

const CastDetailPage = async ({ params }: { params: { id: string } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  // キャストデータ取得
  const cast = await getCastData(params.id);

  // デバッグログ
  console.log("【CastDetailPage】getCastDataから返ってきた生のデータ:", cast);

  if (!cast) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 bg-pink-50">
        <p className="text-xl text-red-500">キャストが見つかりませんでした。</p>
      </main>
    );
  }

  const images = Array.isArray(cast.Image) ? cast.Image : [];

  return (
    <main className="bg-pink-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-pink-700 mb-4 text-center">
          {cast.name} のプロフィール
        </h1>

        <div className="mb-6 flex justify-center">
          <SwiperImageSlider images={images} baseUrl={baseUrl!} />
        </div>

        {/* 詳細タブ */}
        <CastDetailTabs cast={cast}>
          <div className="flex justify-center items-center flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-pink-600 text-xl font-bold px-6 py-4 rounded-lg shadow-md"
            >
              <span className="text-2xl">📷</span>
              写メ日記 <span className="font-medium">はこちら</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-pink-600 text-xl font-bold px-6 py-4 rounded-lg shadow-md"
            >
              <span className="text-2xl">📱</span>
              公式SNS <span className="font-medium">はこちら</span>
            </a>
          </div>
        </CastDetailTabs>
      </div>

      {/* モーダル */}
      <ReservationModal />
    </main>
  );
};

export default CastDetailPage;
