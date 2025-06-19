// app/page.tsx または src/app/page.tsx

import React from "react";
import CastCard from "@/components/CastCard";

interface StrapiCast {
  id: number;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  catchCopy?: string;
  imageUrl: string;
  snsUrl?: string;
  sexinessLevel?: number;
  isNewcomer?: boolean;
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
  console.log("🔥 Strapiレスポンス全体:", JSON.stringify(json, null, 2));

  return json.data.map((cast: any, index: number) => {
    const name = cast.name ?? `NoName${index + 1}`;
    const imageData = Array.isArray(cast.Image)
      ? cast.Image[0]
      : cast.Image?.data?.attributes ?? null;
    const imageAttr = imageData?.formats ?? {};
    const rawUrl =
      imageAttr?.medium?.url ??
      imageAttr?.small?.url ??
      imageAttr?.thumbnail?.url ??
      imageData?.url;

    const fullUrl =
      typeof rawUrl === "string" && rawUrl.startsWith("/")
        ? `${baseUrl}${rawUrl}`
        : rawUrl || "/default-image.png";

    const isNew = cast.isNew === true || cast.isNew === "true";

    return {
      id: cast.id,
      name,
      age: cast.age ?? null,
      height: cast.height ?? null,
      weight: cast.weight ?? null,
      catchCopy: cast.catchCopy ?? "",
      imageUrl: fullUrl,
      snsUrl: cast.SNSURL ?? "",
      sexinessLevel: cast.sexinessLevel ?? 0,
      isNewcomer: isNew,
    };
  });
}

export default async function HomePage() {
  const casts = await getCastsFromStrapi();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8 bg-strawberry-bg">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">キャスト一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {casts.map((cast, index) => (
          <CastCard
            key={cast.id}
            id={cast.id}
            name={cast.name}
            age={cast.age}
            height={cast.height}
            weight={cast.weight}
            catchCopy={cast.catchCopy}
            imageUrl={cast.imageUrl}
            snsUrl={cast.snsUrl}
            sexinessLevel={cast.sexinessLevel}
            isNewcomer={cast.isNewcomer}
            priority={index === 0}
          />
        ))}
      </div>
    </main>
  );
}
