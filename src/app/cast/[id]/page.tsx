import SwiperImageSlider from "@/components/SwiperImageSlider";
import { getCastData } from "@/lib/getCastData";
import { labelMap } from "@/constants/labelMaps";
import CastDetailTabs from "@/components/CastDetailTabs";

interface CastDetailPageProps {
  params: { id: string };
}

const CastDetailPage = async ({ params }: CastDetailPageProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const cast = await getCastData(params.id);

  if (!cast) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 bg-strawberry-bg">
        <p className="text-xl text-red-500">キャストが見つかりませんでした。</p>
      </main>
    );
  }

  const images = Array.isArray(cast.Image) ? cast.Image : [];
  const skills = cast.skills || [];
  const personalities = cast.personalities || [];
  const visualStyles = cast.visualStyles || [];

  return (
    <main className="flex flex-col items-center p-8 bg-strawberry-bg min-h-screen text-center">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">
        {cast.name} のプロフィール
      </h1>

      {/* 写真スライダー */}
      <SwiperImageSlider images={images} baseUrl={baseUrl!} />

      {/* 📷 写メ日記ボタン */}
      <div className="my-6">
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-white text-pink-600 text-xl font-bold px-6 py-4 rounded-lg shadow-md hover:bg-pink-50 transition-all duration-300 transform hover:-translate-y-1 animate-float"
        >
          <span className="text-2xl animate-wiggle">📷</span>
          写メ日記 <span className="font-medium">はこちら</span>
        </a>
      </div>

      {/* タブ表示（現在は見た目だけ） */}     
      <CastDetailTabs />

      {/* MBTI + キャッチコピー */}
      {(cast.MBTI || cast.catchCopy) && (
        <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
          {cast.MBTI && (
            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
              {labelMap.MBTI[cast.MBTI] || cast.MBTI}
            </span>
          )}
          {cast.catchCopy && (
            <span className="text-md text-gray-700 whitespace-pre-line">
              {cast.catchCopy}
            </span>
          )}
        </div>
      )}

      {/* タグバッジ */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {skills.map((skill: any, idx: number) => (
          <span
            key={`skill-${idx}`}
            className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
          >
            {labelMap.skills[skill.name] || skill.name}
          </span>
        ))}
        {personalities.map((p: any, idx: number) => (
          <span
            key={`personality-${idx}`}
            className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
          >
            {labelMap.personalities[p.type] || p.type}
          </span>
        ))}
        {visualStyles.map((v: any, idx: number) => (
          <span
            key={`visual-${idx}`}
            className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
          >
            {labelMap.visualStyles[v.type] || v.type}
          </span>
        ))}
      </div>

      {/* 基本情報（リスト形式） */}
      <div className="mt-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <div className="grid grid-cols-3 border-b border-gray-200">
          <div className="p-3 font-semibold text-gray-600">年齢</div>
          <div className="col-span-2 p-3">{cast.age}歳</div>
        </div>
        <div className="grid grid-cols-3 border-b border-gray-200">
          <div className="p-3 font-semibold text-gray-600">身長・体重</div>
          <div className="col-span-2 p-3">
            {cast.height}cm・{cast.weight}kg
          </div>
        </div>
        <div className="grid grid-cols-3 border-b border-gray-200">
          <div className="p-3 font-semibold text-gray-600">血液型</div>
          <div className="col-span-2 p-3">{cast.bloodtype || "非公開"}</div>
        </div>
        {cast.SNSURL && (
          <div className="grid grid-cols-3">
            <div className="p-3 font-semibold text-gray-600">SNS</div>
            <div className="col-span-2 p-3 text-pink-600 underline">
              <a href={cast.SNSURL} target="_blank" rel="noopener noreferrer">
                {cast.name}さんのSNSはこちら
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CastDetailPage;
