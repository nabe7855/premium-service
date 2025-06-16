"use client";

import CastCard from "@/components/CastCard";
import castData from "@/app/_data/castData"; // ★★★ 新しい場所から、魂を呼び出す ★★★

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8 bg-strawberry-bg">
      <h1 className="text-4xl font-bold text-strawberry-text mb-4">
        キャスト一覧
      </h1>
      
      {castData.map((cast, index) => (
        <CastCard
          key={cast.id}
          id={cast.id}
          name={cast.name}
          age={cast.age}
          description={cast.description}
          image={cast.image} // ★★★ imageUrlではなく、image ★★★
          priority={index === 0}
        />
      ))}
    </main>
  );
}