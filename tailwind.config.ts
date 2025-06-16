import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ↓↓↓ ここからが追加・変更部分です！ ↓↓↓
      colors: {
        primary: '#FF1493',      // 濃いピンク (設計書より)
        secondary: '#FFB6C1',    // 淡いピンク (設計書より)
        cta: '#FFD700',          // ゴールド (設計書より)
        'brand-bg': '#FFFEF7',   // 背景のクリーム色 (設計書より)
        'brand-brown': '#2D1B1B',// テキストの濃いブラウン (設計書より)
      },
      // ↑↑↑ ここまでが追加・変更部分です！ ↑↑↑
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;