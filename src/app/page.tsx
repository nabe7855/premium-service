// app/page.tsx または src/app/page.tsx

import React from "react";
import CastCard from "@/components/CastCard";

interface StrapiCast {
  id: number;
  customId: string;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  catchCopy?: string;
  imageUrl: string;
  snsUrl?: string;
  sexinessLevel?: number;
  isNewcomer?: boolean;
  reviewCount?: number; 
}

async function getCastsFromStrapi(): Promise<StrapiCast[]> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const url = `${baseUrl}/api/casts?populate=Image`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Strapi fetch failed:", errorText);
    throw new Error(`Strapi fetch failed: ${errorText}`);
  }

  const json = await res.json();
  return json.data.map((cast: any, index: number) => {
    const imageData = Array.isArray(cast.Image)
      ? cast.Image[0]
      : cast.Image?.data?.attributes ?? null;
    const formats = imageData?.formats ?? {};
    const rawUrl =
      formats.medium?.url ||
      formats.small?.url ||
      formats.thumbnail?.url ||
      imageData?.url;
    const fullUrl =
      typeof rawUrl === "string" && rawUrl.startsWith("/")
        ? `${baseUrl}${rawUrl}`
        : rawUrl || "/default-image.png";

    return {
      id: cast.id,
      customId: cast.customId,
      name: cast.name,
      age: cast.age ?? null,
      height: cast.height ?? null,
      weight: cast.weight ?? null,
      catchCopy: cast.catchCopy ?? "",
      imageUrl: fullUrl,
      snsUrl: cast.SNSURL ?? "",
      sexinessLevel: cast.sexinessLevel ?? 0,
      isNewcomer: cast.isNew === true || cast.isNew === "true",
      reviewCount: cast.reviews?.length ?? 0,
    };
  });
}

export default async function HomePage() {
  const casts = await getCastsFromStrapi();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8 bg-strawberry-bg">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">キャスト一覧</h1>

      {/* モバイルは2列、sm以上も2列、md以上は3列 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {casts.map((cast, index) => (
          <CastCard
            key={cast.id}
            id={cast.id}
            customId={cast.customId}
            name={cast.name}
            age={cast.age}
            height={cast.height}
            weight={cast.weight}
            catchCopy={cast.catchCopy}
            imageUrl={cast.imageUrl}
            snsUrl={cast.snsUrl}
            sexinessLevel={cast.sexinessLevel}
            isNewcomer={cast.isNewcomer}
            reviewCount={cast.reviewCount}
            priority={index === 0}
          />
        ))}
      </div>
    </main>
  );
}
