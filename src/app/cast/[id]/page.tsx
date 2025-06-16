import React from 'react';
import Image from 'next/image';
import { getCastById } from '@/app/_data/castData';

interface Props {
  params: { id: string };
}

export default async function CastDetailPage({ params }: Props) {
  const castId = parseInt(params.id, 10);
  const cast = getCastById(castId);

  if (!cast) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 bg-strawberry-bg">
        <p className="text-xl text-red-500">キャストが見つかりませんでした。</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-strawberry-bg">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">
        {cast.name} の詳細ページ
      </h1>
      <div className="relative w-48 h-48 overflow-hidden mb-4">
        <Image
          src={cast.image}
          alt={cast.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <p className="text-xl text-strawberry-primary mb-2">年齢: {cast.age}</p>
      <p className="text-lg text-strawberry-text text-center max-w-md">
        {cast.description}
      </p>
    </main>
  );
}
