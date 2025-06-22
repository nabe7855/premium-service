import React from "react";
import CastCard from "@/components/CastCard";

interface StrapiCast {
  id: number;
  customID: string;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  catchCopy: string;
  imageUrl: string;
  sexinessLevel: number;
  isNewcomer: boolean;
  reviewCount: number;
}

// ✅ Strapiの生データ用型
interface StrapiCastRaw {
  id: number;
  attributes: {
    customID: string;
    name: string;
    age?: number;
    height?: number;
    weight?: number;
    catchCopy?: string;
    sexinessLevel?: number;
    isNew?: boolean | string;
    reviews?: { data: any[] };
    Image?: {
      data?: {
        attributes?: {
          url: string;
          formats?: {
            medium?: { url: string };
            small?: { url: string };
            thumbnail?: { url: string };
          };
        };
      }[];
    };
  };
}

async function getCastsFromStrapi(): Promise<StrapiCast[]> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const url = `${baseUrl}/api/casts?populate=Image,reviews`;

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

  console.log("Strapi API response:", JSON.stringify(json, null, 2));

  return json.data.map((castRaw: StrapiCastRaw): StrapiCast => {
    const attrs = castRaw.attributes;
    const imageData = attrs.Image?.data?.[0]?.attributes;
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
      id: castRaw.id,
      customID: attrs.customID,
      name: attrs.name,
      age: attrs.age ?? null,
      height: attrs.height ?? null,
      weight: attrs.weight ?? null,
      catchCopy: attrs.catchCopy ?? "",
      imageUrl: fullUrl,
      sexinessLevel: attrs.sexinessLevel ?? 0,
      isNewcomer: attrs.isNew === true || attrs.isNew === "true",
      reviewCount: attrs.reviews?.data?.length ?? 0,
    };
  });
}

export default async function HomePage() {
  const casts = await getCastsFromStrapi();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8 bg-strawberry-bg">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">キャスト一覧</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {casts.map((cast, index) => (
          <CastCard
            key={cast.id}
            id={cast.id}
            customID={cast.customID}
            name={cast.name}
            age={cast.age}
            height={cast.height}
            weight={cast.weight}
            catchCopy={cast.catchCopy}
            imageUrl={cast.imageUrl}
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
