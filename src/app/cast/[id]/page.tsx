import SwiperImageSlider from '@/components/SwiperImageSlider';

interface CastDetailPageProps {
  params: { id: string };
}

const CastDetailPage = async ({ params }: CastDetailPageProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const res = await fetch(
    `${baseUrl}/api/casts?filters[documentId][$eq]=${params.id}&populate=Image`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const json = await res.json();
  const cast = json.data?.[0];
  if (!cast) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 bg-strawberry-bg">
        <p className="text-xl text-red-500">キャストが見つかりませんでした。</p>
      </main>
    );
  }

  const attr = cast;
  const images = Array.isArray(attr.Image) ? attr.Image : [];

  return (
    <main className="flex flex-col items-center p-8 bg-strawberry-bg min-h-screen text-center">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">
        {attr.name} のプロフィール
      </h1>

      <SwiperImageSlider images={images} baseUrl={baseUrl!} />

      <p className="text-lg text-gray-800 mb-1">年齢: {attr.age}歳</p>
      <p className="text-lg text-gray-800 mb-1">身長: {attr.height}cm</p>
      <p className="text-lg text-gray-800 mb-4">体重: {attr.weight}kg</p>

      {attr.Description && (
        <p className="text-md text-gray-700 max-w-xl leading-relaxed whitespace-pre-line">
          {attr.Description}
        </p>
      )}
    </main>
  );
};

export default CastDetailPage;
