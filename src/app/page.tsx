"use client"; // ブラウザだけで動かすコードですよ、という、大切なおまじない

// ===================================
// ボタンの部品（コンポーネント）の設計図
// ===================================
function StrawberryButton({ children }: { children: React.ReactNode }) {
  // ボタンがクリックされたときの、お祝いのメッセージ
  const handleClick = () => {
    alert("おめでとうございます！ついに、いちご色の世界が完成しました！🍓🎉");
  };

  return (
    <button
      onClick={handleClick}
      className="
        w-full max-w-xs h-[56px] rounded-xl text-white text-lg font-bold
        bg-gradient-to-r from-strawberry-primary to-pink-400
        shadow-[0_4px_12px_rgba(255,20,147,0.3)]
        transition-transform duration-100 active:scale-95
      "
    >
      {children}
    </button>
  );
}

// ===================================
// ページ全体の設計図
// ===================================
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-strawberry-bg">
      <h1 className="text-2xl font-bold text-strawberry-text mb-8">
        プレミアム出張サービス
      </h1>
      
      {/* ここで、上で作ったボタンの部品を、実際に使います */}
      <StrawberryButton>
        キャスト一覧を見る
      </StrawberryButton>
    </main>
  );
}